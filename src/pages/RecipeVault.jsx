import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/motion/Reveal";
import FadeUp from "@/components/motion/FadeUp";
import RecipeVaultCard from "@/components/recipes/RecipeVaultCard";
import GameModal from "@/components/games/GameModal";
import IngredientCatchGame from "@/components/games/IngredientCatchGame";
import { recipes } from "@/data/recipes";
import { useRecipeVault } from "@/hooks/useRecipeVault";

export default function RecipeVault() {
  const { unlockedSlugs, isUnlocked, activeRecipe, modalOpen, sessionKey, openGame, closeGame, handleWin } =
    useRecipeVault();

  const unlockedCount = unlockedSlugs.length;

  return (
    <div className="relative overflow-hidden pb-24 pt-32 sm:pb-32 sm:pt-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-caramel/10 blur-3xl"
      />

      <Container className="relative flex flex-col gap-12 sm:gap-16">
        <div className="flex max-w-2xl flex-col gap-5">
          <FadeUp>
            <Eyebrow>Classified Information</Eyebrow>
          </FadeUp>
          <Reveal>
            <h1 className="text-balance font-display text-5xl font-medium leading-[1.05] text-cream sm:text-6xl lg:text-7xl">
              The Recipe Vault.
            </h1>
          </Reveal>
          <FadeUp delay={0.1} className="flex flex-col gap-1">
            <p className="font-sans text-base leading-relaxed text-biscuit sm:text-lg">
              Every recipe I've made is in here somewhere.
            </p>
            <p className="font-sans text-base leading-relaxed text-biscuit sm:text-lg">
              You just have to earn your way in.
            </p>
          </FadeUp>
          <FadeUp delay={0.2} className="font-sans text-sm text-biscuit/50">
            {unlockedCount} of {recipes.length} unlocked{unlockedCount === recipes.length ? " — show-off." : "."}
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {recipes.map((recipe, index) => (
            <RecipeVaultCard
              key={recipe.id}
              recipe={recipe}
              unlocked={isUnlocked(recipe.slug)}
              onPlay={openGame}
              index={index}
              className="aspect-[4/5]"
            />
          ))}
        </div>
      </Container>

      <GameModal
        open={modalOpen}
        onClose={closeGame}
        title={activeRecipe ? `Catch the Ingredients — ${activeRecipe.title}` : "Catch the Ingredients"}
      >
        {activeRecipe ? (
          <IngredientCatchGame key={sessionKey} recipe={activeRecipe} onWin={handleWin} onClose={closeGame} />
        ) : null}
      </GameModal>
    </div>
  );
}
