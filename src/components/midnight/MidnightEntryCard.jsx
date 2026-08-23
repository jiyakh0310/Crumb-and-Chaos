import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import PlaceholderArt from "@/components/ui/PlaceholderArt";
import RecipeConnection from "./RecipeConnection";
import { useRevealTrigger } from "@/hooks/useRevealTrigger";
import { cn } from "@/utils/cn";

const TITLE_SIZE = {
  large: "text-2xl sm:text-3xl",
  tall: "text-xl sm:text-2xl",
  wide: "text-xl sm:text-2xl",
  note: "text-2xl sm:text-3xl",
  small: "text-lg sm:text-xl",
};

/**
 * One archive entry. Hovering (desktop) previews the hidden note;
 * the "uncover" button makes the reveal sticky and is how touch/
 * keyboard visitors get there — hover is a bonus, never a
 * requirement.
 */
export default function MidnightEntryCard({ entry, relatedRecipe, unlocked, onPlayRecipe, index = 0, className }) {
  const [revealed, setRevealed] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const isTextOnly = entry.layoutHint === "note";
  const noteId = `midnight-note-${entry.id}`;
  const { ref, inView } = useRevealTrigger();

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
      className={cn(
        "group relative isolate overflow-hidden rounded-md border",
        isTextOnly ? "border-cream/15 bg-chocolate/50" : "border-cream/10",
        className,
      )}
    >
      {!isTextOnly ? (
        <>
          <PlaceholderArt
            src={entry.image?.src}
            alt=""
            tone={entry.tone}
            icon={entry.icon}
            className={cn(
              "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
              revealed ? "brightness-[0.6]" : "lg:group-hover:brightness-[0.65]",
            )}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/95 via-espresso/35 to-transparent"
          />
        </>
      ) : null}

      <div
        className={cn(
          "relative z-10 flex flex-col gap-2",
          isTextOnly ? "h-full justify-center p-6 text-center sm:p-8" : "absolute inset-x-0 bottom-0 p-5 sm:p-6",
        )}
      >
        <div className={cn("flex items-center gap-2", isTextOnly ? "justify-center" : "justify-between")}>
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-cherry/80">
            {entry.type}
          </span>
          {entry.time ? (
            <span className="font-sans text-[10px] uppercase tracking-[0.18em] text-biscuit/50">{entry.time}</span>
          ) : null}
        </div>

        <h3 className={cn("font-display font-medium text-cream", TITLE_SIZE[entry.layoutHint])}>{entry.title}</h3>

        {!isTextOnly ? (
          <p className="font-sans text-sm leading-relaxed text-biscuit/85 sm:text-base">{entry.shortDescription}</p>
        ) : null}

        <div
          id={noteId}
          className={cn(
            "overflow-hidden transition-all duration-500 ease-out",
            revealed
              ? "mt-1 max-h-40 opacity-100"
              : "max-h-0 opacity-0 lg:group-hover:mt-1 lg:group-hover:max-h-40 lg:group-hover:opacity-100",
          )}
        >
          <p className="font-hand text-lg leading-snug text-biscuit/70">{entry.hiddenNote}</p>
          {entry.status ? (
            <p className="mt-1 font-sans text-xs uppercase tracking-wide text-biscuit/40">status: {entry.status}</p>
          ) : null}
          <RecipeConnection recipe={relatedRecipe} unlocked={unlocked} onPlay={onPlayRecipe} />
        </div>

        <button
          type="button"
          onClick={() => setRevealed((prev) => !prev)}
          aria-expanded={revealed}
          aria-controls={noteId}
          className={cn(
            "mt-1 inline-flex w-fit items-center gap-1 font-sans text-xs font-semibold uppercase tracking-wide text-biscuit/60 transition-colors hover:text-cream focus-visible:outline-2 focus-visible:outline-cherry",
            isTextOnly && "mx-auto",
          )}
        >
          {revealed ? "hide" : "uncover"} →
        </button>
      </div>
    </motion.div>
  );
}
