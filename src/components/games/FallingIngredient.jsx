import { motion } from "framer-motion";

/**
 * One falling, tappable ingredient. Animates via transform (x/y
 * motion values) rather than top/left so it stays GPU-cheap even
 * with several on screen at once.
 */
export default function FallingIngredient({ item, playHeight, onCatch, onExpire }) {
  return (
    <motion.button
      type="button"
      onClick={() => onCatch(item)}
      initial={{ y: -60, x: "-50%" }}
      animate={{ y: playHeight + 60, x: "-50%" }}
      transition={{ duration: item.duration, ease: "linear" }}
      onAnimationComplete={() => onExpire(item.id)}
      style={{ left: `${item.x}%`, top: 0 }}
      className="absolute whitespace-nowrap rounded-full border border-cream/20 bg-chocolate/95 px-4 py-3 font-sans text-sm font-semibold text-cream shadow-lg backdrop-blur-sm transition-colors hover:border-caramel/60 active:scale-95 sm:px-5 sm:py-3.5 sm:text-base"
    >
      {item.word}
    </motion.button>
  );
}
