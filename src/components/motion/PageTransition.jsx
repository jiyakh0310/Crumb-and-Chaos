import { motion, useReducedMotion } from "framer-motion";

/**
 * Wraps route content so navigating between pages feels like a
 * single smooth cut, not a hard reload. Pair with <AnimatePresence>
 * and key by pathname at the call site.
 */
export default function PageTransition({ children }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
