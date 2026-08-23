import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/utils/cn";

/**
 * A small trailing ring, scoped to whatever container ref is passed
 * in. Only ever mounted for fine-pointer, motion-safe visitors —
 * callers are expected to gate that before rendering this.
 */
export default function CustomCursor({ containerRef, className }) {
  const [active, setActive] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 30, stiffness: 320, mass: 0.4 });
  const springY = useSpring(y, { damping: 30, stiffness: 320, mass: 0.4 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const enter = () => setActive(true);
    const leave = () => setActive(false);

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
    };
  }, [containerRef, x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-[60] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-caramel/70 mix-blend-difference transition-opacity duration-300",
        active ? "opacity-100" : "opacity-0",
        className,
      )}
      style={{ x: springX, y: springY }}
    />
  );
}
