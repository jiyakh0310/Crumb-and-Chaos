import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/utils/cn";

/**
 * Small animated toast for the "acceptable." / "straight to jail."
 * reactions — deliberately tiny, never a blocking alert.
 */
export default function GameReaction({ reaction }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-3 z-30 flex justify-center px-4">
      <AnimatePresence mode="wait">
        {reaction ? (
          <motion.p
            key={reaction.id}
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "rounded-full border px-4 py-1.5 text-center font-sans text-xs font-semibold uppercase tracking-wide backdrop-blur-sm",
              reaction.correct
                ? "border-pistachio/40 bg-pistachio/10 text-pistachio"
                : "border-cherry/40 bg-cherry/10 text-cherry",
            )}
          >
            {reaction.text}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
