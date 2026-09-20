import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Candy, Dices, Feather, HeartCrack, Lock, Sparkles, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Section from "@/components/ui/Section";
import FadeUp from "@/components/motion/FadeUp";
import ResponsiveFoodImage from "@/components/ui/ResponsiveFoodImage";
import GameModal from "@/components/games/GameModal";
import IngredientCatchGame from "@/components/games/IngredientCatchGame";
import { getRecipesByMood, getSurpriseRecipes } from "@/data/recipes";
import { useRecipeVault } from "@/hooks/useRecipeVault";
import { cn } from "@/utils/cn";

const MOODS = [
  { id: "chocolate", label: "I need chocolate.", note: "understandable.", icon: Candy },
  { id: "comfort", label: "Life is terrible.", note: "dessert has been prescribed.", icon: HeartCrack },
  { id: "fancy", label: "Feeling fancy.", note: "bring out the good plate.", icon: Sparkles },
  { id: "easy", label: "Zero effort please.", note: "minimum effort. maximum reward.", icon: Feather },
  { id: "cooking-for-someone", label: "Cooking for someone.", note: "good luck pretending it’s casual.", icon: Users },
  { id: "surprise", label: "Surprise me.", note: "dangerous choice.", icon: Dices },
];

// A tiny, fixed scatter of rotation/lift per chip so the row reads as
// handwritten menu slips laid down by hand, not a repeating pattern —
// index-based (not random) so it never jitters on re-render.
const CHIP_TILT = [-2.5, 2, -1.5, 3, -2, 1.5];

const REASONS = {
  chocolate: "Because chocolate and patience solve more than expected.",
  comfort: "Because the day has already asked quite enough of you.",
  fancy: "Because a little ceremony is sometimes the whole point.",
  easy: "Because low effort still deserves very good food.",
  "cooking-for-someone": "Because feeding someone is a suspiciously effective love language.",
  surprise: "Because handing over control occasionally has excellent consequences.",
};

function getRecommendations(moodId) {
  return moodId === "surprise" ? getSurpriseRecipes(3) : getRecipesByMood(moodId, 3);
}

export default function HowAreWeFeelingSection() {
  const shouldReduceMotion = useReducedMotion();
  const { isUnlocked, activeRecipe, modalOpen, sessionKey, openGame, closeGame, handleWin } = useRecipeVault();
  const [activeMoodId, setActiveMoodId] = useState(null);
  const activeMood = MOODS.find((mood) => mood.id === activeMoodId);
  const recommendations = useMemo(() => (activeMoodId ? getRecommendations(activeMoodId) : []), [activeMoodId]);

  return (
    <Section className="relative overflow-hidden bg-espresso" padding="py-20 sm:py-28 lg:py-32" id="how-are-we-feeling">
      {/* soft warm radial light, not a strong gradient */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-0 h-[30rem] w-[30rem] rounded-full bg-caramel/[0.08] blur-[110px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-cherry/[0.05] blur-[100px]" />

      {/* faint oversized word, purely textural */}
      <div aria-hidden="true" className="pointer-events-none absolute left-[2%] top-[6%] hidden select-none font-display text-[15vw] font-medium leading-none text-cream/[0.02] lg:block">
        MOOD
      </div>

      {/* tiny crumb cluster — one motif, not scattered doodles */}
      <div aria-hidden="true" className="pointer-events-none absolute right-[8%] top-[14%] hidden sm:block">
        <span className="absolute h-2 w-2 rounded-[40%_60%_55%_45%/45%_40%_60%_55%] bg-biscuit/40" />
        <span className="absolute left-3 top-2.5 h-1.5 w-1.5 rounded-[45%_55%_50%_50%/50%_45%_55%_50%] bg-caramel/35" />
        <span className="absolute -left-1 top-4 h-1 w-1 rounded-full bg-cream/25" />
      </div>

      <div className="relative grid gap-12 lg:grid-cols-[0.62fr_1.38fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <FadeUp className="font-hand text-lg text-biscuit/45">still no idea? here’s a gentler way.</FadeUp>
          <FadeUp delay={0.05} className="mt-7 font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-caramel">
            Emotional Support, But Edible
          </FadeUp>
          <FadeUp delay={0.08} distance={30}>
            <h2 className="mt-4 max-w-md font-display text-5xl font-medium uppercase leading-[0.88] text-cream sm:text-7xl lg:text-[5.4rem]">
              How are we feeling?
            </h2>
          </FadeUp>
          <FadeUp delay={0.12} className="mt-6 max-w-sm font-sans text-base leading-relaxed text-biscuit sm:text-lg">
            Pick a mood. I’ll prescribe something edible.
          </FadeUp>
          <div aria-hidden="true" className="mt-10 hidden h-px w-36 bg-gradient-to-r from-caramel to-transparent lg:block" />
        </div>

        <div className="min-w-0">
          {/* one loose, editorial cluster of floating labels — not a card grid */}
          <div className="flex flex-wrap items-start gap-x-4 gap-y-5 sm:gap-x-6">
            {MOODS.map((mood, index) => (
              <MoodChip
                key={mood.id}
                mood={mood}
                tilt={CHIP_TILT[index]}
                active={mood.id === activeMoodId}
                dimmed={Boolean(activeMoodId) && mood.id !== activeMoodId}
                onClick={() => setActiveMoodId((current) => (current === mood.id ? null : mood.id))}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeMood ? (
              <motion.div
                key={activeMood.id}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="mt-12 border-t border-caramel/25 pt-8"
                aria-live="polite"
              >
                <div className="mb-6 flex items-center gap-3">
                  <span className="h-px w-8 bg-caramel" />
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-caramel">
                    your prescription
                  </span>
                </div>

                {recommendations.length ? (
                  <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
                    <PrescriptionFeature
                      recipe={recommendations[0]}
                      unlocked={isUnlocked(recommendations[0].slug)}
                      onPlay={openGame}
                      reason={REASONS[activeMood.id]}
                      className="lg:flex-[1.4]"
                    />
                    {recommendations.length > 1 ? (
                      <div className="flex flex-col gap-3 lg:flex-1">
                        <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-biscuit/45">
                          also worth trying
                        </span>
                        {recommendations.slice(1, 3).map((recipe) => (
                          <PrescriptionAlt
                            key={recipe.id}
                            recipe={recipe}
                            unlocked={isUnlocked(recipe.slug)}
                            onPlay={openGame}
                          />
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <p className="font-hand text-xl text-biscuit/60">The crumbs found nothing. That feels personal.</p>
                )}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      <GameModal open={modalOpen} onClose={closeGame} title={activeRecipe ? `Catch the Ingredients — ${activeRecipe.title}` : "Catch the Ingredients"}>
        {activeRecipe ? <IngredientCatchGame key={sessionKey} recipe={activeRecipe} onWin={handleWin} onClose={closeGame} /> : null}
      </GameModal>
    </Section>
  );
}

function MoodChip({ mood, tilt, active, dimmed, onClick }) {
  const Icon = mood.icon;
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      initial={false}
      animate={{
        rotate: active ? 0 : tilt,
        scale: active ? 1.06 : 1,
        opacity: dimmed ? 0.45 : 1,
        y: active ? -2 : 0,
      }}
      whileHover={{ rotate: 0, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative flex min-h-11 touch-manipulation items-center gap-2.5 whitespace-nowrap rounded-[1.1rem_0.3rem_1.1rem_0.3rem] border px-4 py-2.5 text-left transition-colors",
        active
          ? "border-caramel/70 bg-caramel/[0.14] shadow-[0_10px_28px_rgba(10,5,3,0.25)]"
          : "border-cream/14 bg-cocoa/25 hover:border-caramel/40 hover:bg-cocoa/40",
      )}
    >
      <span
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors",
          active ? "border-caramel/60 bg-chocolate/70 text-caramel" : "border-cream/15 bg-chocolate/50 text-biscuit/70",
        )}
      >
        <Icon size={14} strokeWidth={1.6} />
      </span>
      <span className="flex flex-col">
        <span
          className={cn(
            "font-display text-base font-medium leading-tight sm:text-lg",
            active ? "text-cream" : "text-cream/85",
          )}
        >
          {mood.label}
        </span>
        <AnimatePresence initial={false}>
          {active ? (
            <motion.span
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden font-hand text-sm text-caramel"
            >
              {mood.note}
            </motion.span>
          ) : null}
        </AnimatePresence>
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-x-3 bottom-1 h-px bg-caramel/70 origin-left scale-x-0 transition-transform duration-300",
          active && "scale-x-100",
        )}
      />
    </motion.button>
  );
}

function PrescriptionFeature({ recipe, unlocked, onPlay, reason, className }) {
  const content = (
    <>
      <ResponsiveFoodImage
        images={recipe.images}
        fallbackSrc={recipe.image?.src}
        variant="wide"
        alt={recipe.title}
        tone={recipe.tone}
        icon={recipe.icon}
        priority
        className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.035]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso via-espresso/45 to-transparent" />
      {!unlocked ? (
        <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 bg-espresso/75">
          <Lock size={14} />
        </span>
      ) : null}
      <div className="relative mt-auto flex flex-col items-start gap-2 p-6 sm:p-7">
        <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.25em] text-caramel">{recipe.category}</span>
        <h3 className="font-display text-3xl font-medium leading-none text-cream sm:text-4xl">{recipe.title}</h3>
        <p className="max-w-md font-sans text-sm leading-relaxed text-biscuit">“{reason}”</p>
        <div className="mt-1 flex items-center gap-2 font-sans text-xs text-biscuit/70">
          <span>{recipe.totalTime}</span>
          <span aria-hidden="true">·</span>
          <span>{recipe.difficulty}</span>
        </div>
        <span className="mt-2 inline-flex items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-caramel">
          {unlocked ? "Make this" : "Earn this one"}
          <ArrowRight size={13} />
        </span>
      </div>
    </>
  );
  const classes = cn(
    "group relative isolate flex aspect-[4/5] overflow-hidden rounded-lg border border-cream/12 bg-espresso text-left sm:aspect-[16/11]",
    className,
  );
  return unlocked ? (
    <Link to={`/recipes/${recipe.slug}`} className={classes}>
      {content}
    </Link>
  ) : (
    <button type="button" onClick={() => onPlay(recipe)} className={classes}>
      {content}
    </button>
  );
}

function PrescriptionAlt({ recipe, unlocked, onPlay }) {
  const content = (
    <>
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md">
        <ResponsiveFoodImage
          images={recipe.images}
          fallbackSrc={recipe.image?.src}
          variant="card"
          alt={recipe.title}
          tone={recipe.tone}
          icon={recipe.icon}
        />
      </div>
      <div className="min-w-0 flex-1">
        <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.2em] text-caramel/70">{recipe.category}</span>
        <h4 className="truncate font-display text-base font-medium text-cream">{recipe.title}</h4>
      </div>
      {!unlocked ? <Lock size={13} className="shrink-0 text-biscuit/60" /> : <ArrowRight size={13} className="shrink-0 text-caramel" />}
    </>
  );
  const classes =
    "group flex items-center gap-3 rounded-md border border-cream/10 bg-cocoa/20 p-2.5 text-left transition-colors hover:border-caramel/40 hover:bg-cocoa/35";
  return unlocked ? (
    <Link to={`/recipes/${recipe.slug}`} className={classes}>
      {content}
    </Link>
  ) : (
    <button type="button" onClick={() => onPlay(recipe)} className={classes}>
      {content}
    </button>
  );
}
