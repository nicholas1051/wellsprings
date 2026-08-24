"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import { BookViewingButton } from "@/components/modals/BookViewingButton";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { waLinkForUnit } from "@/lib/contact";

function WordStagger({ text, reduceMotion }: { text: string; reduceMotion: boolean }) {
  const words = text.split(" ");

  return (
    <span>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          initial={reduceMotion ? {} : { opacity: 0, y: 16, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export function FinalCta() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-ink py-28 sm:py-36">
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={
          reduceMotion
            ? {}
            : {
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }
        }
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 50%, rgba(196,113,74,0.12) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(90,135,168,0.10) 0%, transparent 50%)",
          backgroundSize: "200% 100%",
        }}
        aria-hidden="true"
      />

      <div className="container-site relative z-10 text-center">
        <Reveal once={false}>
          <motion.p
            className="eyebrow mb-4 text-gold"
            initial={reduceMotion ? {} : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            Ready to visit?
          </motion.p>

          <h2 className="mx-auto max-w-3xl font-heading text-3xl leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            <WordStagger text="See the homes in person." reduceMotion={!!reduceMotion} />
          </h2>

          <motion.p
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/70"
            initial={reduceMotion ? {} : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Book a site visit or message us on WhatsApp. Whichever is easier.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col justify-center gap-3 sm:flex-row"
            initial={reduceMotion ? {} : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="inline-block"
            >
              <BookViewingButton size="lg" source="final-cta" label="Schedule a Visit" />
            </motion.span>
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="inline-block"
            >
              <ButtonLink
                href={waLinkForUnit()}
                external
                variant="whatsapp"
                size="lg"
                ariaLabel="Chat with us on WhatsApp"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                Chat on WhatsApp
              </ButtonLink>
            </motion.span>
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="inline-block"
            >
              <ButtonLink
                href="tel:+2348070710100"
                external
                variant="outline-white"
                size="lg"
                ariaLabel="Call us"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                Call Now
              </ButtonLink>
            </motion.span>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
