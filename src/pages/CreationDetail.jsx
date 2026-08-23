import { useParams } from "react-router-dom";
import { Lock } from "lucide-react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import PlaceholderArt from "@/components/ui/PlaceholderArt";
import Reveal from "@/components/motion/Reveal";
import FadeUp from "@/components/motion/FadeUp";
import GameModal from "@/components/games/GameModal";
import IngredientCatchGame from "@/components/games/IngredientCatchGame";
import { getCreationBySlug } from "@/data/creations";
import { getRecipeBySlug } from "@/data/recipes";
import { getCreationStatus } from "@/utils/creationStatus";
import { humanizeSlug } from "@/utils/text";
import { useRecipeVault } from "@/hooks/useRecipeVault";

export default function CreationDetail() {
  const { slug } = useParams();
  const creation = getCreationBySlug(slug);
  const { isUnlocked, activeRecipe, modalOpen, sessionKey, openGame, closeGame, handleWin } = useRecipeVault();

  if (!creation) {
    return (
      <div className="relative flex min-h-[calc(100dvh-5rem)] items-center overflow-hidden pt-32 sm:pt-40">
        <Container className="relative flex flex-col items-start gap-6">
          <FadeUp>
            <Eyebrow tone="cherry">Not in the Archive</Eyebrow>
          </FadeUp>
          <Reveal delay={0.05}>
            <h1 className="text-balance font-display text-5xl font-medium leading-[1.05] text-cream sm:text-6xl">
              {humanizeSlug(slug)}
            </h1>
          </Reveal>
          <FadeUp delay={0.15} className="max-w-md font-sans text-base leading-relaxed text-biscuit sm:text-lg">
            Nothing filed under that name yet — it might have been eaten before it could be catalogued.
          </FadeUp>
          <FadeUp delay={0.25} className="pt-4">
            <Button to="/kitchen" variant="primary" arrow>
              Back to the Kitchen
            </Button>
          </FadeUp>
        </Container>
      </div>
    );
  }

  const recipe = creation.recipeSlug ? getRecipeBySlug(creation.recipeSlug) : null;
  const status = getCreationStatus(creation, isUnlocked);

  return (
    <div className="relative overflow-hidden pb-24 pt-32 sm:pb-32 sm:pt-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-caramel/10 blur-3xl"
      />

      <Container className="relative flex flex-col gap-12 sm:gap-16">
        <FadeUp>
          <Button to="/kitchen" variant="ghost" className="w-fit">
            ← Back to the Kitchen
          </Button>
        </FadeUp>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-7">
            <PlaceholderArt
              src={creation.image?.src}
              alt={creation.title}
              tone={creation.tone}
              icon={creation.icon}
              className="aspect-[4/5] rounded-md border border-cream/10 sm:aspect-[16/11]"
            />
          </Reveal>

          <div className="flex flex-col gap-6 lg:col-span-5 lg:pt-4">
            <FadeUp>
              <Eyebrow>{creation.category}</Eyebrow>
            </FadeUp>
            <Reveal delay={0.05}>
              <h1 className="text-balance font-display text-4xl font-medium leading-[1.05] text-cream sm:text-5xl">
                {creation.title}
              </h1>
            </Reveal>
            <FadeUp delay={0.12} className="font-sans text-base leading-relaxed text-biscuit sm:text-lg">
              {creation.description}
            </FadeUp>
            <FadeUp delay={0.18}>
              <p className="font-hand text-xl text-biscuit/60">{creation.note}</p>
            </FadeUp>

            <FadeUp
              delay={0.24}
              className="inline-flex w-fit items-center gap-1.5 rounded-full border border-cream/15 px-3 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-biscuit/70"
            >
              {status.label}
            </FadeUp>

            {creation.tags?.length ? (
              <FadeUp delay={0.28} className="flex flex-wrap gap-2">
                {creation.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-cream/10 px-3 py-1 font-sans text-[10px] uppercase tracking-wide text-biscuit/50"
                  >
                    {tag}
                  </span>
                ))}
              </FadeUp>
            ) : null}

            {recipe ? (
              <FadeUp delay={0.34} className="flex flex-col gap-3 border-t border-cream/10 pt-6">
                <p className="font-sans text-sm leading-relaxed text-biscuit/70">
                  {isUnlocked(recipe.slug)
                    ? "You've already earned this one."
                    : "This one has a real recipe — you just have to earn it."}
                </p>
                {isUnlocked(recipe.slug) ? (
                  <Button to={`/recipes/${recipe.slug}`} variant="primary" arrow>
                    Read the Recipe
                  </Button>
                ) : (
                  <Button onClick={() => openGame(recipe)} variant="primary" arrow>
                    <Lock size={14} className="mr-1" strokeWidth={2} />
                    Earn the Recipe
                  </Button>
                )}
              </FadeUp>
            ) : (
              <FadeUp delay={0.34} className="flex flex-col gap-3 border-t border-cream/10 pt-6">
                <p className="font-sans text-sm leading-relaxed text-biscuit/70">
                  {creation.status === "coming-soon"
                    ? "Recipe currently being held hostage. Some things are still being figured out."
                    : creation.status === "experiment"
                      ? "Still under investigation — no recipe has escaped the kitchen yet."
                      : "No recipe yet. This one's just here to look pretty."}
                </p>
                <Button to={`/ask?recipe=${encodeURIComponent(creation.title)}`} variant="secondary" arrow>
                  Ask Me About This
                </Button>
              </FadeUp>
            )}
          </div>
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
