import Eyebrow from "@/components/ui/Eyebrow";
import FadeUp from "@/components/motion/FadeUp";
import { kitchenConfessions } from "@/data/midnightEntries";
import { cn } from "@/utils/cn";

/**
 * A simple stacked layout, not a carousel — the brief explicitly
 * says stacked is enough, and it keeps this calm rather than fussy.
 */
export default function KitchenConfessions() {
  return (
    <div className="flex flex-col gap-10">
      <FadeUp>
        <Eyebrow tone="cherry">Kitchen Confessions.</Eyebrow>
      </FadeUp>

      <div className="flex flex-col gap-7 sm:gap-8">
        {kitchenConfessions.map((confession, index) => (
          <FadeUp
            key={confession}
            delay={Math.min(index * 0.07, 0.28)}
            className={cn(
              "max-w-xl text-balance font-display text-xl italic leading-snug text-cream/85 sm:text-2xl",
              index % 2 === 1 && "sm:ml-auto sm:text-right",
            )}
          >
            &ldquo;{confession}&rdquo;
          </FadeUp>
        ))}
      </div>
    </div>
  );
}
