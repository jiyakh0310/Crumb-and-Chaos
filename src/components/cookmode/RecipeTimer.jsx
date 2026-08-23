import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play, RotateCcw } from "lucide-react";
import Button from "@/components/ui/Button";
import { formatTimer } from "@/utils/recipeFormat";

/**
 * A single countdown timer. One `setInterval` per "running" spell,
 * always cleaned up on pause/reset/unmount. Callers should `key`
 * this by step id so switching steps discards it for free.
 */
export default function RecipeTimer({ seconds }) {
  const [remaining, setRemaining] = useState(seconds);
  const [status, setStatus] = useState("idle"); // idle | running | paused | done

  useEffect(() => {
    if (status !== "running") return;

    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setStatus("done");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [status]);

  const reset = () => {
    setStatus("idle");
    setRemaining(seconds);
  };

  return (
    <div className="flex flex-col gap-3 rounded-md border border-cream/15 bg-chocolate/70 p-5 sm:p-6">
      <AnimatePresence mode="wait">
        {status === "done" ? (
          <motion.div
            key="done"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            role="status"
            aria-live="polite"
            className="flex flex-col items-center gap-2 py-1 text-center"
          >
            <span className="font-display text-2xl text-caramel sm:text-3xl">TIME&apos;S UP.</span>
            <span className="font-hand text-lg text-biscuit/60">Go rescue it.</span>
            <button
              type="button"
              onClick={reset}
              className="mt-2 inline-flex items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-wide text-biscuit/70 transition-colors hover:text-cream focus-visible:outline-2 focus-visible:outline-caramel"
            >
              <RotateCcw size={13} strokeWidth={2} />
              Reset Timer
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="live"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-wrap items-center justify-between gap-4"
          >
            <span className="font-display text-4xl tabular-nums text-cream sm:text-5xl">
              {formatTimer(remaining)}
            </span>
            <div className="flex items-center gap-2">
              {status === "idle" ? (
                <Button onClick={() => setStatus("running")} variant="primary" size="sm">
                  Start Timer
                </Button>
              ) : status === "running" ? (
                <button
                  type="button"
                  onClick={() => setStatus("paused")}
                  aria-label="Pause timer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors hover:border-caramel/50 focus-visible:outline-2 focus-visible:outline-caramel"
                >
                  <Pause size={16} strokeWidth={1.75} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setStatus("running")}
                  aria-label="Resume timer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors hover:border-caramel/50 focus-visible:outline-2 focus-visible:outline-caramel"
                >
                  <Play size={16} strokeWidth={1.75} />
                </button>
              )}
              {status !== "idle" ? (
                <button
                  type="button"
                  onClick={reset}
                  aria-label="Reset timer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream/70 transition-colors hover:border-cream/40 hover:text-cream focus-visible:outline-2 focus-visible:outline-caramel"
                >
                  <RotateCcw size={15} strokeWidth={1.75} />
                </button>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
