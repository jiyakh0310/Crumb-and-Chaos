import { useState } from "react";
import { useParams } from "react-router-dom";
import { Lock } from "lucide-react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import PagePlaceholder from "@/components/ui/PagePlaceholder";
import Reveal from "@/components/motion/Reveal";
import FadeUp from "@/components/motion/FadeUp";
import GameModal from "@/components/games/GameModal";
import IngredientCatchGame from "@/components/games/IngredientCatchGame";
import RecipeHero from "@/components/recipes/RecipeHero";
import RecipeMeta from "@/components/recipes/RecipeMeta";
import ServingScaler from "@/components/recipes/ServingScaler";
import IngredientsList from "@/components/recipes/IngredientsList";
import MethodSteps from "@/components/recipes/MethodSteps";
import RecipeTips from "@/components/recipes/RecipeTips";
import ShareControls from "@/components/recipes/ShareControls";
import KitchenSOSTeaser from "@/components/recipes/KitchenSOSTeaser";
import RelatedRecipes from "@/components/recipes/RelatedRecipes";
import CookMode from "@/components/cookmode/CookMode";
import { getRecipeBySlug, getRelatedRecipes } from "@/data/recipes";
import { isRecipeUnlocked } from "@/utils/recipeUnlocks";
import { humanizeSlug } from "@/utils/text";
import { useRecipeVault } from "@/hooks/useRecipeVault";

export default function RecipeDetail() {
  const { slug } = useParams();
  const recipe = getRecipeBySlug(slug);

  // not one of the Vault recipes at all — keep the existing generic
  // "still being written down" placeholder for everything else.
  if (!recipe) {
    return (
      <PagePlaceholder
        eyebrow={`Recipe · ${slug}`}
        title={humanizeSlug(slug)}
        note="cook mode, method & notes are still being written down."
      >
        This recipe exists in my head and in several slightly different notebooks — mostly
        because I keep changing my mind about the butter. The full method, ingredient notes,
        and a proper Cook Mode are on their way.
      </PagePlaceholder>
    );
  }

  if (!isRecipeUnlocked(recipe.slug)) {
    return (
      <div className="relative flex min-h-[calc(100dvh-5rem)] items-center overflow-hidden pt-32 sm:pt-40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-cherry/10 blur-3xl"
        />
        <Container className="relative flex flex-col items-start gap-6">
          <FadeUp className="flex h-14 w-14 items-center justify-center rounded-full border border-cherry/30 bg-cherry/10">
            <Lock size={20} className="text-cherry" />
          </FadeUp>
          <FadeUp delay={0.05}>
            <Eyebrow tone="cherry">No Cheating</Eyebrow>
          </FadeUp>
          <Reveal delay={0.1}>
            <h1 className="text-balance font-display text-5xl font-medium leading-[1.05] text-cream sm:text-6xl">
              Earn the recipe first.
            </h1>
          </Reveal>
          <FadeUp delay={0.2} className="max-w-md font-sans text-base leading-relaxed text-biscuit sm:text-lg">
            {recipe.title} is locked behind Catch the Ingredients. No shortcuts, no screenshots, no asking nicely.
          </FadeUp>
          <FadeUp delay={0.3} className="pt-4">
            <Button to="/recipes" variant="primary" arrow>
              Take Me to the Vault
            </Button>
          </FadeUp>
        </Container>
      </div>
    );
  }

  return <UnlockedRecipe recipe={recipe} />;
}

function UnlockedRecipe({ recipe }) {
  const [multiplier, setMultiplier] = useState(1);
  const [cookModeOpen, setCookModeOpen] = useState(false);
  const [cookStep, setCookStep] = useState(0);
  const { isUnlocked, activeRecipe, modalOpen, sessionKey, openGame, closeGame, handleWin } = useRecipeVault();

  const related = getRelatedRecipes(recipe, 3);

  return (
    <div className="relative overflow-hidden pb-24 pt-32 print:overflow-visible sm:pb-32 sm:pt-40">
      <Container className="print-area relative flex flex-col gap-16 sm:gap-20">
        <RecipeHero recipe={recipe} />

        <div className="flex flex-col gap-8">
          <RecipeMeta recipe={recipe} />
          <Reveal>
            <p className="max-w-2xl text-balance font-display text-2xl italic leading-snug text-cream/90 sm:text-3xl">
              {recipe.description}
            </p>
          </Reveal>
          <ShareControls />
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,1fr)_1.4fr]">
          <div className="flex flex-col gap-6">
            <SectionHeading eyebrow="What You'll Need" title="Ingredients" size="md" />
            <ServingScaler
              yieldAmount={recipe.yieldAmount}
              yieldUnit={recipe.yieldUnit}
              multiplier={multiplier}
              onChange={setMultiplier}
            />
            <IngredientsList recipe={recipe} multiplier={multiplier} />
          </div>

          <div className="flex flex-col gap-8">
            <SectionHeading eyebrow="Step by Step" title="Method" size="md" />
            <MethodSteps instructions={recipe.instructions} />
          </div>
        </div>

        <RecipeTips tips={recipe.tips} />

        <FadeUp className="flex flex-col items-center gap-4 rounded-md border border-caramel/25 bg-caramel/[0.05] px-6 py-12 text-center print:hidden sm:py-16">
          <span className="font-hand text-lg text-biscuit/60">one step at a time. less scrolling. fewer disasters.</span>
          <Button onClick={() => setCookModeOpen(true)} variant="primary" arrow className="text-base">
            Start Cook Mode
          </Button>
        </FadeUp>

        <KitchenSOSTeaser recipeTitle={recipe.title} />

        <RelatedRecipes recipes={related} isUnlocked={isUnlocked} onPlay={openGame} />
      </Container>

      <CookMode
        open={cookModeOpen}
        recipe={recipe}
        step={cookStep}
        onStepChange={setCookStep}
        onClose={() => setCookModeOpen(false)}
      />

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
