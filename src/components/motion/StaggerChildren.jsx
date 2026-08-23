import { motion, useReducedMotion } from "framer-motion";
import { useRevealTrigger } from "@/hooks/useRevealTrigger";

/**
 * Wrap a list of elements in <StaggerGroup> and each element in
 * <StaggerItem> to get a smooth, staggered fade-up entrance.
 */
export function StaggerGroup({ as = "div", children, className, delayChildren = 0, staggerChildren = 0.12, once = true, ...props }) {
  const Comp = motion[as] ?? motion.div;
  const { ref, inView } = useRevealTrigger({ once });

  return (
    <Comp
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren, delayChildren },
        },
      }}
      {...props}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({ as = "div", children, className, distance = 20, ...props }) {
  const shouldReduceMotion = useReducedMotion();
  const Comp = motion[as] ?? motion.div;

  return (
    <Comp
      className={className}
      variants={{
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : distance },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: shouldReduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      {...props}
    >
      {children}
    </Comp>
  );
}
