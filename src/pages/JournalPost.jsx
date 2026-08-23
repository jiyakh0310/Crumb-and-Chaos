import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import PlaceholderArt from "@/components/ui/PlaceholderArt";
import Reveal from "@/components/motion/Reveal";
import FadeUp from "@/components/motion/FadeUp";
import ArticleSection from "@/components/journal/ArticleSection";
import RecipeVaultCard from "@/components/recipes/RecipeVaultCard";
import GameModal from "@/components/games/GameModal";
import IngredientCatchGame from "@/components/games/IngredientCatchGame";
import { getAdjacentJournalPosts, getJournalPostBySlug } from "@/data/journalPosts";
import { getRecipeBySlug } from "@/data/recipes";
import { useRecipeVault } from "@/hooks/useRecipeVault";
import { formatJournalDate } from "@/utils/text";

export default function JournalPost() {
  const { slug } = useParams();
  const post = getJournalPostBySlug(slug);

  if (!post) {
    return (
      <div className="relative flex min-h-[calc(100dvh-5rem)] items-center overflow-hidden pt-32 sm:pt-40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-caramel/10 blur-3xl"
        />
        <Container className="relative flex flex-col items-start gap-6">
          <FadeUp>
            <Eyebrow>Lost Note</Eyebrow>
          </FadeUp>
          <Reveal>
            <h1 className="text-balance font-display text-4xl font-medium leading-[1.05] text-cream sm:text-5xl lg:text-6xl">
              This note seems to have fallen behind the oven.
            </h1>
          </Reveal>
          <FadeUp delay={0.15} className="max-w-md font-sans text-base leading-relaxed text-biscuit sm:text-lg">
            It might turn up during a deep clean. Until then, there's plenty else in the journal worth reading.
          </FadeUp>
          <FadeUp delay={0.25} className="pt-4">
            <Button to="/journal" variant="primary" arrow>
              Back to the Journal
            </Button>
          </FadeUp>
        </Container>
      </div>
    );
  }

  return <JournalArticle post={post} />;
}

function JournalArticle({ post }) {
  const { isUnlocked, activeRecipe, modalOpen, sessionKey, openGame, closeGame, handleWin } = useRecipeVault();
  const relatedRecipe = post.relatedRecipeSlug ? getRecipeBySlug(post.relatedRecipeSlug) : null;
  const { previous, next } = getAdjacentJournalPosts(post.slug);

  return (
    <div className="relative overflow-hidden pb-24 pt-32 sm:pb-32 sm:pt-40">
      <article>
        <Container className="mx-auto flex max-w-2xl flex-col gap-4">
          <FadeUp className="flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-xs font-semibold uppercase tracking-[0.22em] text-caramel/80">
            <span>{post.category}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{formatJournalDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime}</span>
          </FadeUp>
          <Reveal>
            <h1 className="text-balance font-display text-4xl font-medium leading-[1.05] text-cream sm:text-5xl lg:text-6xl">
              {post.title}
            </h1>
          </Reveal>
          <FadeUp delay={0.1} className="font-sans text-lg leading-relaxed text-biscuit sm:text-xl">
            {post.excerpt}
          </FadeUp>
        </Container>

        <FadeUp delay={0.18} className="mt-10 sm:mt-14">
          <Container className="mx-auto max-w-4xl">
            <div className="aspect-[16/9] w-full overflow-hidden rounded-md border border-cream/10">
              <PlaceholderArt
                src={post.coverImage?.src}
                alt={post.title}
                tone={post.coverImage?.tone}
                icon={post.coverImage?.icon}
              />
            </div>
          </Container>
        </FadeUp>

        <Container className="mt-14 flex flex-col gap-8 sm:mt-16 sm:gap-10">
          {post.sections.map((section, index) => (
            <ArticleSection key={`${post.id}-section-${index}`} section={section} />
          ))}
        </Container>

        {relatedRecipe ? (
          <Container className="mt-16 sm:mt-20">
            <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 border-t border-cream/10 pt-12">
              <Eyebrow>Make Something From This</Eyebrow>
              <RecipeVaultCard
                recipe={relatedRecipe}
                unlocked={isUnlocked(relatedRecipe.slug)}
                onPlay={openGame}
                className="aspect-[16/10]"
              />
            </div>
          </Container>
        ) : null}

        <Container className="mt-16 sm:mt-20">
          <nav
            aria-label="More journal entries"
            className="mx-auto flex w-full max-w-2xl flex-col gap-6 border-t border-cream/10 pt-10 sm:flex-row sm:justify-between sm:gap-8"
          >
            {previous ? (
              <Link to={`/journal/${previous.slug}`} className="group flex flex-1 flex-col gap-1.5">
                <span className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-wide text-biscuit/50">
                  <ArrowLeft size={12} strokeWidth={2.5} />
                  Previous Note
                </span>
                <span className="font-display text-lg text-cream transition-colors duration-300 group-hover:text-caramel">
                  {previous.title}
                </span>
              </Link>
            ) : (
              <span aria-hidden="true" className="flex-1" />
            )}

            {next ? (
              <Link
                to={`/journal/${next.slug}`}
                className="group flex flex-1 flex-col gap-1.5 sm:items-end sm:text-right"
              >
                <span className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-wide text-biscuit/50">
                  Next Note
                  <ArrowRight size={12} strokeWidth={2.5} />
                </span>
                <span className="font-display text-lg text-cream transition-colors duration-300 group-hover:text-caramel">
                  {next.title}
                </span>
              </Link>
            ) : (
              <span aria-hidden="true" className="flex-1" />
            )}
          </nav>
        </Container>

        <Container className="mt-10">
          <div className="mx-auto flex w-full max-w-2xl">
            <Button to="/journal" variant="ghost" size="sm">
              Return to the Journal
            </Button>
          </div>
        </Container>
      </article>

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
