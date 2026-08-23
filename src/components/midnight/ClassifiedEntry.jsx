import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import PlaceholderArt from "@/components/ui/PlaceholderArt";
import RecipeConnection from "./RecipeConnection";
import { useRevealTrigger } from "@/hooks/useRevealTrigger";
import { cn } from "@/utils/cn";

const HOLD_MS = 700;

/**
 * The one obscured entry. A genuine mouse/touch hold fills the
 * progress bar for the tactile "hold to peek" moment, but a plain
 * click or keyboard activation reveals immediately too — the hold
 * is a bonus, never a requirement, per the brief's own accessible-
 * fallback guidance.
 */
export default function ClassifiedEntry({ entry, relatedRecipe, unlocked, onPlayRecipe, index = 0, className }) {
  const [revealed, setRevealed] = useState(false);
  const [holding, setHolding] = useState(false);
  const timeoutRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { ref, inView } = useRevealTrigger();

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const startHold = () => {
    if (revealed) return;
    setHolding(true);
    timeoutRef.current = setTimeout(() => setHolding(false), HOLD_MS);
  };

  const cancelHold = () => {
    setHolding(false);
    clearTimeout(timeoutRef.current);
  };

  const reveal = () => {
    cancelHold();
    setRevealed(true);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.6,
        delay: shouldReduceMotion ? 0 : Math.min(index * 0.06, 0.3),
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn("group relative isolate overflow-hidden rounded-md border border-cherry/25", className)}
    >
      <PlaceholderArt
        src={entry.image?.src}
        alt=""
        tone={entry.tone}
        icon={entry.icon}
        className={cn(
          "transition-all duration-700",
          revealed ? "brightness-[0.65]" : "scale-105 brightness-[0.4] saturate-[0.4] blur-[3px]",
        )}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/95 via-espresso/45 to-espresso/20"
      />

      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-3 p-5 sm:p-6">
        {!revealed ? (
          <>
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-cherry/80">
              Classified Until Further Notice.
            </span>
            <p className="select-none font-display text-2xl font-medium text-cream/40 blur-[1px] sm:text-3xl">
              REDACTED
            </p>

            <button
              type="button"
              onPointerDown={startHold}
              onPointerUp={cancelHold}
              onPointerLeave={cancelHold}
              onPointerCancel={cancelHold}
              onClick={reveal}
              aria-label="Hold to peek, or press to reveal the classified entry"
              className="relative mt-1 flex w-fit items-center overflow-hidden rounded-full border border-cherry/40 px-4 py-2.5 font-sans text-xs font-semibold uppercase tracking-wide text-cream transition-colors hover:border-cherry/70 focus-visible:outline-2 focus-visible:outline-cherry"
            >
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 bg-cherry/35"
                style={{
                  width: holding && !shouldReduceMotion ? "100%" : "0%",
                  transition: holding ? `width ${HOLD_MS}ms linear` : "width 150ms ease-out",
                }}
              />
              <span className="relative">Hold to Peek</span>
            </button>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
            className="flex flex-col gap-2"
          >
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-cherry/80">
              {entry.type}
            </span>
            <h3 className="font-display text-2xl font-medium text-cream sm:text-3xl">{entry.title}</h3>
            <p className="font-sans text-sm leading-relaxed text-biscuit/85 sm:text-base">{entry.shortDescription}</p>
            <p className="font-hand text-lg leading-snug text-biscuit/70">{entry.hiddenNote}</p>
            <p className="font-hand text-base text-cherry/70">fine. you can look.</p>
            <RecipeConnection recipe={relatedRecipe} unlocked={unlocked} onPlay={onPlayRecipe} />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
