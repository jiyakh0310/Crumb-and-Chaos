import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { getIngredientIcon } from "./ingredientIcons";

/**
 * One drifting, tappable ingredient token. Animates via transform
 * (x/y motion values) rather than top/left so it stays GPU-cheap even
 * with several on screen at once.
 *
 * Catching it doesn't remove it from the DOM immediately — it freezes
 * in place and plays a short, obvious reaction (a pulse for a correct
 * pick, a wobble for a wrong one) before `onExpire` actually drops it,
 * so a tap always has a visible result instead of the token just
 * vanishing.
 */
export default function FallingIngredient({ item, playHeight, onCatch, onExpire }) {
  const [caught, setCaught] = useState(false);
  const Icon = getIngredientIcon(item.word);

  const catchToken = (event) => {
    if (event.currentTarget.dataset.caught === "true") return;
    event.currentTarget.dataset.caught = "true";
    setCaught(true);
    onCatch(item);
  };

  const catchOnPointerDown = (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    catchToken(event);
  };

  useEffect(() => {
    if (!caught) return undefined;
    const timeout = setTimeout(() => onExpire(item), item.correct ? 260 : 340);
    return () => clearTimeout(timeout);
  }, [caught, item.correct, item.id, onExpire]);

  return (
    <motion.button
      type="button"
      onPointerDownCapture={catchOnPointerDown}
      onClick={(event) => {
        if (event.currentTarget.dataset.caught !== "true") catchToken(event);
      }}
      initial={{ y: -70, x: -28, rotate: item.rotate - 3, opacity: 0 }}
      animate={
        caught
          ? item.correct
            ? { scale: [1, 1.22, 0.85], opacity: [1, 1, 0], transition: { duration: 0.26, times: [0, 0.45, 1], ease: "easeOut" } }
            : {
                rotate: [item.rotate, item.rotate - 9, item.rotate + 9, item.rotate - 6, item.rotate + 3],
                scale: [1, 1, 0.88],
                opacity: [1, 1, 0],
                transition: { duration: 0.32, ease: "easeInOut" },
              }
          : {
              y: [-70, playHeight * 0.26, playHeight * 0.58, playHeight + 70],
              x: [-28, item.drift * 0.45, item.drift, item.drift * 0.72],
              rotate: [item.rotate - 3, item.rotate + 2, item.rotate - 1, item.rotate + 4],
              opacity: [0, 1, 1, 0.92],
              transition: { duration: item.duration, ease: "linear", times: [0, 0.28, 0.62, 1] },
            }
      }
      exit={{ opacity: 0, scale: 0.72, transition: { duration: 0.12 } }}
      onAnimationComplete={() => {
        if (!caught) onExpire(item);
      }}
      style={{ left: `${item.x}%`, top: 0, translate: "-50% 0" }}
      className={cn(
        // fixed footprint (wraps rather than stretching) so a token's width
        // never eats into a neighboring lane's spacing, whatever the word length
        "before:content-[''] absolute z-10 flex h-14 w-16 touch-manipulation select-none flex-col items-center justify-center gap-1 rounded-[0.9rem_0.35rem_0.9rem_0.35rem] border bg-gradient-to-b from-cocoa/95 to-chocolate/95 px-1.5 py-2 text-center font-sans text-[10px] font-semibold leading-tight text-cream shadow-[0_8px_22px_rgba(8,4,2,0.28)] transition-colors before:absolute before:-inset-2 sm:h-16 sm:w-20 sm:px-2 sm:text-[11px]",
        caught
          ? item.correct
            ? "border-pistachio/70 bg-pistachio/10"
            : "border-cherry/70 bg-cherry/10"
          : "border-caramel/35 hover:z-20 hover:border-caramel active:border-cream",
      )}
    >
      <Icon size={18} strokeWidth={1.5} className="shrink-0 text-biscuit/90" aria-hidden="true" />
      <span>{item.word}</span>
    </motion.button>
  );
}
