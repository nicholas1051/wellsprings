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
import { X, PhoneCall } from "lucide-react";
import { CallbackForm } from "@/components/forms/CallbackForm";

interface CallbackContextValue {
  openCallback: (source?: string) => void;
  closeCallback: () => void;
}

const CallbackContext = createContext<CallbackContextValue | null>(null);

export function useOpenCallback() {
  const context = useContext(CallbackContext);
  if (!context) {
    throw new Error("useOpenCallback must be used within CallbackProvider");
  }
  return context;
}

export function CallbackProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState<string>("hero-cta");
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const openCallback = useCallback((src?: string) => {
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    setSource(src ?? "hero-cta");
    setOpen(true);
  }, []);

  const closeCallback = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCallback();
    };
    document.addEventListener("keydown", onKeyDown);
    dialogRef.current?.focus();
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, closeCallback]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      lastFocusedRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <CallbackContext.Provider value={{ openCallback, closeCallback }}>
      {children}
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] flex items-end justify-center bg-navy/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
            onClick={closeCallback}
          >
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="callback-modal-title"
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
                  <p className="eyebrow mb-1 text-brand-blue-dark">Get in touch</p>
                  <h2 id="callback-modal-title" className="text-2xl font-bold text-navy">
                    Request a Call
                  </h2>
                  <p className="mt-1 text-sm text-text-grey">
                    Leave your details and we&apos;ll call you back shortly.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeCallback}
                  aria-label="Close callback form"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-off-white text-navy transition-colors hover:bg-grey-line"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
              <CallbackForm source={source} />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </CallbackContext.Provider>
  );
}
