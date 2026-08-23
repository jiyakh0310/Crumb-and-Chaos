import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Button from "@/components/ui/Button";
import RecipeTimer from "./RecipeTimer";
import { cn } from "@/utils/cn";

const FOCUSABLE_SELECTOR = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Full-screen, mobile-first, single-step-at-a-time cooking view.
 * Step index is a controlled prop so the parent can remember where
 * the visitor left off across a close/reopen in the same session.
 */
export default function CookMode({ open, recipe, step, onStepChange, onClose }) {
  const panelRef = useRef(null);
  const totalSteps = recipe.instructions.length;
  const currentStep = recipe.instructions[step];
  const isFirst = step === 0;
  const isLast = step === totalSteps - 1;

  const goNext = useCallback(() => {
    if (isLast) {
      onClose();
      return;
    }
    onStepChange((s) => Math.min(s + 1, totalSteps - 1));
  }, [isLast, onClose, onStepChange, totalSteps]);

  const goPrev = useCallback(() => {
    onStepChange((s) => Math.max(s - 1, 0));
  }, [onStepChange]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event) => {
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key === "ArrowRight") {
        goNext();
        return;
      }
      if (event.key === "ArrowLeft") {
        goPrev();
        return;
      }
      if (event.key === "Tab") {
        const focusable = panelRef.current?.querySelectorAll(FOCUSABLE_SELECTOR);
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose, goNext, goPrev]);

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Cook Mode — ${recipe.title}`}
          tabIndex={-1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] flex h-dvh w-full flex-col bg-espresso focus:outline-none"
        >
          <div className="flex shrink-0 items-center justify-between gap-4 border-b border-cream/10 px-5 py-4 sm:px-8">
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="truncate font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-caramel/70">
                {recipe.title}
              </span>
              <span className="font-sans text-xs text-cream/60">
                Step {step + 1} of {totalSteps}
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Exit Cook Mode"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-colors hover:border-cream/40 hover:text-cream focus-visible:outline-2 focus-visible:outline-caramel"
            >
              <X size={18} strokeWidth={1.75} />
            </button>
          </div>

          <div className="flex shrink-0 gap-1 px-5 pt-4 sm:px-8">
            {recipe.instructions.map((instructionStep, i) => (
              <span
                key={instructionStep.id}
                aria-hidden="true"
                className={cn(
                  "h-[3px] flex-1 rounded-full transition-colors duration-300",
                  i <= step ? "bg-caramel" : "bg-cream/10",
                )}
              />
            ))}
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-8 sm:px-8 sm:py-12">
            <div className="mx-auto flex w-full max-w-xl flex-col gap-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col gap-6"
                >
                  <span className="font-display text-6xl leading-none text-caramel/50 sm:text-7xl">
                    {String(step + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-balance font-display text-3xl font-medium leading-tight text-cream sm:text-4xl">
                    {currentStep.title}
                  </h2>
                  <p className="text-balance font-sans text-lg leading-relaxed text-biscuit sm:text-xl">
                    {currentStep.text}
                  </p>
                  {currentStep.note ? (
                    <p className="font-hand text-lg text-biscuit/50 sm:text-xl">{currentStep.note}</p>
                  ) : null}
                  {currentStep.timerSeconds ? (
                    <RecipeTimer key={currentStep.id} seconds={currentStep.timerSeconds} />
                  ) : null}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div
            className="flex shrink-0 items-center justify-between gap-4 border-t border-cream/10 px-5 py-4 sm:px-8"
            style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
          >
            <Button onClick={goPrev} variant="secondary" disabled={isFirst} className="flex-1 sm:flex-none sm:min-w-32">
              Previous
            </Button>
            <Button onClick={goNext} variant="primary" arrow className="flex-1 sm:flex-none sm:min-w-32">
              {isLast ? "Finish Cooking" : "Next"}
            </Button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
