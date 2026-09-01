"use client";

import { useReducedMotion } from "framer-motion";

export interface Phrase {
  words: string;
  hint: string;
}

interface PhraseRevealProps {
  text: string;
  phrases: Phrase[];
  className?: string;
}

function Highlight({ phrase, reduced }: { phrase: Phrase; reduced: boolean }) {
  return (
    <span
      className={`group relative inline-flex items-center whitespace-nowrap font-semibold text-brand-blue transition-colors duration-300 ${reduced ? "" : "cursor-help hover:text-brand-blue-deep"}`}
    >
      {phrase.words}
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-brand-blue-deep transition-transform duration-300 group-hover:scale-x-100"
      />
      <span
        role="tooltip"
        className={`pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 w-max max-w-[240px] -translate-x-1/2 whitespace-normal rounded-xl bg-navy px-4 py-2 text-xs font-medium leading-snug text-white shadow-xl ${
          reduced
            ? "hidden group-hover:block"
            : "scale-90 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100"
        }`}
      >
        {phrase.hint}
        <span
          aria-hidden="true"
          className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-navy"
        />
      </span>
    </span>
  );
}

export function PhraseReveal({ text, phrases, className = "" }: PhraseRevealProps) {
  const reduced = !!useReducedMotion();

  const nodes: React.ReactNode[] = [];
  let rest = text;
  let guard = 0;

  while (rest.length > 0 && guard < 100) {
    guard += 1;

    let earliest: { idx: number; phrase: Phrase } | null = null;
    for (const p of phrases) {
      const idx = rest.indexOf(p.words);
      if (idx >= 0 && (!earliest || idx < earliest.idx)) {
        earliest = { idx, phrase: p };
      }
    }

    if (!earliest) {
      if (rest.length > 0) nodes.push(rest);
      break;
    }

    if (earliest.idx > 0) nodes.push(rest.slice(0, earliest.idx));
    nodes.push(<Highlight key={`${earliest.idx}-${earliest.phrase.words}`} phrase={earliest.phrase} reduced={reduced} />);
    rest = rest.slice(earliest.idx + earliest.phrase.words.length);
  }

  return (
    <span className={className} aria-label={phrases.map((p) => `${p.words}. ${p.hint}`).join(" ")}>
      {nodes}
    </span>
  );
}