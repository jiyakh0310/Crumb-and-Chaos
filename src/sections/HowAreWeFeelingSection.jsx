import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Candy, Dices, Feather, HeartCrack, Sparkles, Users } from "lucide-react";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import FadeUp from "@/components/motion/FadeUp";
import MoodRecipeCard from "@/components/recipes/MoodRecipeCard";
import GameModal from "@/components/games/GameModal";
import IngredientCatchGame from "@/components/games/IngredientCatchGame";
import { getRecipesByMood, getSurpriseRecipes } from "@/data/recipes";
import { useRecipeVault } from "@/hooks/useRecipeVault";
import { cn } from "@/utils/cn";

const MOODS = [
  {
    id: "chocolate",
    label: ["I need", "chocolate."],
    icon: Candy,
    caption: "dessert has been prescribed.",
  },
  {
    id: "comfort",
    label: ["Life is", "terrible."],
    icon: HeartCrack,
    caption: "rough day? understandable.",
  },
  {
    id: "fancy",
    label: ["Feeling", "fancy."],
    icon: Sparkles,
    caption: "look at you, having people over.",
  },
  {
    id: "easy",
    label: ["Zero effort", "please."],
    icon: Feather,
    caption: "ambition is optional here.",
  },
  {
    id: "cooking-for-someone",
    label: ["Cooking for", "someone."],
    icon: Users,
    caption: "good luck pretending this is for two.",
  },
  {
    id: "surprise",
    label: ["Surprise", "me."],
    icon: Dices,
    caption: "no notes. no complaints allowed.",
  },
];

function getRecommendations(moodId) {
  if (moodId === "surprise") return getSurpriseRecipes(3);
  return getRecipesByMood(moodId, 3);
}

export default function HowAreWeFeelingSection() {
  const shouldReduceMotion = useReducedMotion();
  const { isUnlocked, activeRecipe, modalOpen, sessionKey, openGame, closeGame, handleWin } = useRecipeVault();
  const [activeMoodId, setActiveMoodId] = useState(null);

  const activeMood = useMemo(() => MOODS.find((m) => m.id === activeMoodId) ?? null, [activeMoodId]);
  const recommendations = useMemo(() => (activeMoodId ? getRecommendations(activeMoodId) : []), [activeMoodId]);

  return (
    <Section
      className="bg-chocolate"
      padding="pt-12 sm:pt-16 lg:pt-20 pb-20 sm:pb-28 lg:pb-32"
      id="how-are-we-feeling"
    >
      <div className="flex flex-col gap-12 sm:gap-16">
        <div className="flex flex-col gap-4">
          <FadeUp className="font-hand text-lg text-biscuit/40">still no idea? here's a gentler way.</FadeUp>
          <SectionHeading
            eyebrow="Emotional Support, But Edible"
            title="How Are We Feeling?"
            description="Pick a mood. I'll prescribe something edible."
          />
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
          {MOODS.map((mood, index) => (
            <MoodButton
              key={mood.id}
              mood={mood}
              index={index}
              active={mood.id === activeMoodId}
              onClick={() => setActiveMoodId((current) => (current === mood.id ? null : mood.id))}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeMood ? (
            <motion.div
              key={activeMood.id}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-6"
            >
              <p className="font-hand text-lg text-biscuit/50">{activeMood.caption}</p>

              {recommendations.length > 0 ? (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                  <AnimatePresence mode="popLayout">
                    {recommendations.map((recipe, i) => (
                      <MoodRecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        unlocked={isUnlocked(recipe.slug)}
                        onPlay={openGame}
                        index={i}
                        className="aspect-[4/5]"
                      />
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4 border border-dashed border-cream/15 px-6 py-16 text-center">
                  <p className="font-display text-2xl text-cream">
                    The crumbs found nothing.
                    <br />
                    That feels personal.
                  </p>
                  <Button onClick={() => setActiveMoodId("surprise")} variant="secondary" arrow>
                    Surprise Me
                  </Button>
                </div>
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>
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

/**
 * One mood choice. Alternates alignment on odd indices and swaps
 * emphasis between the two copy lines so the six cards read as
 * related but not identical.
 */
function MoodButton({ mood, index, active, onClick }) {
  const Icon = mood.icon;
  const altAlign = index % 2 === 1;

  return (
    <FadeUp delay={Math.min(index * 0.05, 0.2)}>
      <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className={cn(
          "group relative flex h-full min-h-[11rem] w-full flex-col justify-between gap-6 overflow-hidden rounded-md border p-5 text-left transition-colors duration-300 sm:min-h-[13rem] sm:p-7",
          active ? "border-caramel/50 bg-caramel/[0.06]" : "border-cream/10 hover:border-cream/25",
          altAlign && "sm:items-end sm:text-right",
        )}
      >
        <Icon
          size={20}
          strokeWidth={1.5}
          className={cn(
            "shrink-0 transition-colors duration-300",
            active ? "text-caramel" : "text-biscuit/50 group-hover:text-biscuit/80",
          )}
        />
        <span className="font-display text-xl font-medium leading-[1.15] text-cream/90 sm:text-2xl lg:text-3xl">
          {mood.label[0]}
          <br />
          <span className={active ? "text-caramel" : "text-biscuit/70"}>{mood.label[1]}</span>
        </span>

        {active ? (
          <motion.span
            layoutId="mood-active-line"
            className="absolute inset-x-5 bottom-0 h-px bg-caramel sm:inset-x-7"
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          />
        ) : null}
      </button>
    </FadeUp>
  );
}
