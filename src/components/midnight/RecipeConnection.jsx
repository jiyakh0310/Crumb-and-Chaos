import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const linkClass =
  "pointer-events-auto relative z-30 mt-1 inline-flex w-fit items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-wide text-caramel transition-colors hover:text-cream focus-visible:outline-2 focus-visible:outline-caramel";

/**
 * "This became a recipe →" — reuses the existing unlock system
 * rather than any Midnight-specific logic. Locked recipes open the
 * real Catch the Ingredients game; unlocked ones link straight
 * through.
 */
export default function RecipeConnection({ recipe, unlocked, onPlay }) {
  if (!recipe) return null;

  if (unlocked) {
    return (
      <Link to={`/recipes/${recipe.slug}`} onClick={(event) => event.stopPropagation()} className={linkClass}>
        This Became a Recipe
        <ArrowRight size={12} strokeWidth={2.5} />
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onPlay(recipe);
      }}
      className={linkClass}
    >
      This Became a Recipe
      <ArrowRight size={12} strokeWidth={2.5} />
    </button>
  );
}
