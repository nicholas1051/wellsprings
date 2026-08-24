"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { ViewingForm } from "@/components/forms/ViewingForm";

interface ViewingState {
  unit: string;
  source?: string;
}

interface ViewingContextValue {
  openViewing: (state?: Partial<ViewingState>) => void;
  closeViewing: () => void;
}

const ViewingContext = createContext<ViewingContextValue | null>(null);

export function useViewing() {
  const context = useContext(ViewingContext);
  if (!context) {
    throw new Error("useViewing must be used within ViewingProvider");
  }
  return context;
}

export function ViewingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ViewingState | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const openViewing = useCallback((next?: Partial<ViewingState>) => {
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    setState({ unit: next?.unit ?? "not-sure", source: next?.source });
  }, []);

  const closeViewing = useCallback(() => {
    setState(null);
  }, []);

  useEffect(() => {
    if (!state) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeViewing();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    dialogRef.current?.focus();
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [state, closeViewing]);

  useEffect(() => {
    if (state) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      lastFocusedRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [state]);

  return (
    <ViewingContext.Provider value={{ openViewing, closeViewing }}>
      {children}
      <AnimatePresence>
        {state ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
            onClick={closeViewing}
          >
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="viewing-modal-title"
              tabIndex={-1}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-warm-white p-6 shadow-2xl sm:rounded-2xl sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow mb-1 text-brand-blue-dark">Private viewing</p>
                  <h2 id="viewing-modal-title" className="text-2xl font-bold text-navy">
                    Book a Viewing
                  </h2>
                  <p className="mt-1 text-sm text-text-grey">
                    Pick a date and time. We will confirm by phone or WhatsApp.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeViewing}
                  aria-label="Close viewing form"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-off-white text-navy transition-colors hover:bg-grey-line"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
              <ViewingForm defaultUnit={state.unit} source={state.source} />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </ViewingContext.Provider>
  );
}
