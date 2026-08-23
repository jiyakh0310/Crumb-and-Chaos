import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeUp from "@/components/motion/FadeUp";
import RecipeVaultCard from "@/components/recipes/RecipeVaultCard";
import GameModal from "@/components/games/GameModal";
import IngredientCatchGame from "@/components/games/IngredientCatchGame";
import { recipes } from "@/data/recipes";
import { useRecipeVault } from "@/hooks/useRecipeVault";

export default function RecipeVaultSection() {
  const { isUnlocked, activeRecipe, modalOpen, sessionKey, openGame, closeGame, handleWin } = useRecipeVault();

  const spotlight = recipes.find((recipe) => recipe.spotlight) ?? recipes[0];
  const supporting = recipes.filter((recipe) => recipe.id !== spotlight.id).slice(0, 3);

  return (
    <Section
      className="bg-chocolate"
      padding="pt-12 sm:pt-16 lg:pt-20 pb-20 sm:pb-28 lg:pb-32"
      id="recipe-vault"
    >
      <div className="flex flex-col gap-12 sm:gap-16">
        <div className="flex flex-col gap-5">
          <SectionHeading
            eyebrow="Classified Information"
            title="The Recipe Vault."
            description={["Yes, you can have the recipe.", "No, I'm not making it that easy."]}
          />
          <FadeUp delay={0.15} className="font-hand text-lg text-biscuit/50">
            nothing good is free. apparently.
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:h-[560px] lg:grid-cols-5 lg:grid-rows-3">
          <RecipeVaultCard
            recipe={spotlight}
            unlocked={isUnlocked(spotlight.slug)}
            onPlay={openGame}
            size="large"
            index={0}
            className="aspect-[4/5] lg:col-span-3 lg:row-span-3 lg:aspect-auto"
          />
          {supporting.map((recipe, i) => (
            <RecipeVaultCard
              key={recipe.id}
              recipe={recipe}
              unlocked={isUnlocked(recipe.slug)}
              onPlay={openGame}
              index={i + 1}
              className="aspect-[16/10] lg:col-span-2 lg:row-span-1 lg:aspect-auto"
            />
          ))}
        </div>
      </div>

      <GameModal
        open={modalOpen}
        onClose={closeGame}
        title={activeRecipe ? `Catch the Ingredients — ${activeRecipe.title}` : "Catch the Ingredients"}
      >
        {activeRecipe ? (
          <IngredientCatchGame key={sessionKey} recipe={activeRecipe} onWin={handleWin} onClose={closeGame} />
        ) : null}
      </GameModal>
    </Section>
  );
}
