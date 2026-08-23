import { cn } from "@/utils/cn";
import { formatQuantity } from "@/utils/recipeFormat";

const MULTIPLIERS = [0.5, 1, 1.5, 2];

export default function ServingScaler({ yieldAmount, yieldUnit, multiplier, onChange }) {
  if (!yieldAmount) return null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-baseline gap-2">
        <span className="font-sans text-sm text-biscuit/70">Makes</span>
        <span className="font-display text-2xl text-cream">
          {formatQuantity(yieldAmount * multiplier)} {yieldUnit}
        </span>
      </div>

      <div
        className="flex items-center gap-1.5"
        role="group"
        aria-label="Scale ingredient quantities"
      >
        {MULTIPLIERS.map((value) => {
          const active = value === multiplier;
          return (
            <button
              key={value}
              type="button"
              onClick={() => onChange(value)}
              aria-pressed={active}
              className={cn(
                "rounded-full border px-3 py-1.5 font-sans text-xs font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-caramel",
                active
                  ? "border-caramel bg-caramel text-espresso"
                  : "border-cream/20 text-cream/70 hover:border-cream/40 hover:text-cream",
              )}
            >
              {value}×
            </button>
          );
        })}
      </div>
    </div>
  );
}
