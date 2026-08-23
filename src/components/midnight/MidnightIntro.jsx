import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LINE_1_MS = 900;
const LINE_2_MS = 900;

const LINES = ["you weren't supposed to find this.", "...but since you're here."];

/**
 * A short, skippable atmospheric intro shown once per session
 * before the Midnight Menu content. Reduced-motion visitors never
 * see this at all — the parent skips rendering it entirely.
 */
export default function MidnightIntro({ onDone }) {
  const [line, setLine] = useState(0);
  const skipRef = useRef(null);

  useEffect(() => {
    skipRef.current?.focus();

    const advance = setTimeout(() => setLine(1), LINE_1_MS);
    const finish = setTimeout(onDone, LINE_1_MS + LINE_2_MS);

    return () => {
      clearTimeout(advance);
      clearTimeout(finish);
    };
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-espresso px-6 text-center"
    >
      <AnimatePresence mode="wait">
        <motion.p
          key={line}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-sm font-display text-xl italic leading-snug text-cream/85 sm:text-2xl"
        >
          {LINES[line]}
        </motion.p>
      </AnimatePresence>

      <button
        ref={skipRef}
        type="button"
        onClick={onDone}
        className="mt-12 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-biscuit/30 transition-colors hover:text-biscuit/60 focus-visible:outline-2 focus-visible:outline-cherry"
      >
        skip →
      </button>
    </motion.div>
  );
}
