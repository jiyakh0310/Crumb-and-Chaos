import { motion, useReducedMotion } from "framer-motion";
import { useRevealTrigger } from "@/hooks/useRevealTrigger";
import { cn } from "@/utils/cn";

/**
 * A cinematic clip-reveal: content slides up from behind a mask
 * instead of simply fading. Reserved for statement moments —
 * hero copy, big pull quotes, section openers.
 */
export default function Reveal({ children, delay = 0, duration = 0.9, once = true, className, innerClassName }) {
  const shouldReduceMotion = useReducedMotion();
  const { ref, inView } = useRevealTrigger({ once });

  return (
    // The -my-4 / py-4 pair cancels out (no visible layout change) but
    // pushes the actual overflow-hidden clip boundary 16px further from
    // the text on both edges — serif ascenders/descenders (and glyphs
    // mid-slide during the reveal) need real room beyond a tight
    // line-box, or the clip catches them regardless of how careful the
    // heading's own line-height is. Central fix for every Reveal caller
    // rather than tuning line-height per heading.
    <div ref={ref} className={cn("-my-4 overflow-hidden", className)}>
      <motion.div
        className={cn("py-4", innerClassName)}
        initial={{ y: shouldReduceMotion ? 0 : "110%", opacity: shouldReduceMotion ? 1 : 0 }}
        animate={inView ? { y: "0%", opacity: 1 } : undefined}
        transition={{ duration: shouldReduceMotion ? 0 : duration, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
