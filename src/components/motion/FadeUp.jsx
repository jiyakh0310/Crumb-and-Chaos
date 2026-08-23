import { motion, useReducedMotion } from "framer-motion";
import { useRevealTrigger } from "@/hooks/useRevealTrigger";

/**
 * Fades and lifts children into place once they enter the viewport.
 * The workhorse reveal used across the site.
 */
export default function FadeUp({
  as = "div",
  children,
  delay = 0,
  duration = 0.8,
  distance = 24,
  once = true,
  className,
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();
  const Comp = motion[as] ?? motion.div;
  const { ref, inView } = useRevealTrigger({ once });

  return (
    <Comp
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : distance }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: shouldReduceMotion ? 0 : duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </Comp>
  );
}
