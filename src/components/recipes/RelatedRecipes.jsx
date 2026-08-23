import SectionHeading from "@/components/ui/SectionHeading";
import RecipeVaultCard from "./RecipeVaultCard";

export default function RelatedRecipes({ recipes, isUnlocked, onPlay }) {
  if (!recipes.length) return null;

  return (
    <div className="flex flex-col gap-6 print:hidden">
      <SectionHeading eyebrow="Keep Going" title="You Might Also Like" size="md" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {recipes.map((recipe, index) => (
          <RecipeVaultCard
            key={recipe.id}
            recipe={recipe}
            unlocked={isUnlocked(recipe.slug)}
            onPlay={onPlay}
            index={index}
            className="aspect-[4/5]"
          />
        ))}
      </div>
    </div>
  );
}
