import FadeUp from "@/components/motion/FadeUp";
import { getTotalTime } from "@/utils/recipeFormat";

/**
 * Prep / Cook / Total / Makes / Difficulty — a two-column grid on
 * mobile so nothing gets cramped, one row from sm up.
 */
export default function RecipeMeta({ recipe }) {
  const items = [
    { label: "Prep", value: recipe.prepTime },
    { label: "Cook", value: recipe.cookTime },
    { label: "Total", value: getTotalTime(recipe) },
    { label: "Makes", value: recipe.servings },
    { label: "Difficulty", value: recipe.difficulty },
  ];

  return (
    <FadeUp
      delay={0.1}
      className="grid grid-cols-2 gap-x-4 gap-y-5 border-y border-cream/10 py-6 sm:grid-cols-5 sm:gap-6"
    >
      {items.map((item) => (
        <div key={item.label} className="flex flex-col gap-1">
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-caramel/70">
            {item.label}
          </span>
          <span className="text-balance font-display text-lg text-cream sm:text-xl">{item.value}</span>
        </div>
      ))}
    </FadeUp>
  );
}
