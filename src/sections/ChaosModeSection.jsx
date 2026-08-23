import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Lock, LockOpen } from "lucide-react";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import PlaceholderArt from "@/components/ui/PlaceholderArt";
import Reveal from "@/components/motion/Reveal";
import FadeUp from "@/components/motion/FadeUp";
import GameModal from "@/components/games/GameModal";
import IngredientCatchGame from "@/components/games/IngredientCatchGame";
import { recipes, getRandomRecipe } from "@/data/recipes";
import { useRecipeVault } from "@/hooks/useRecipeVault";
import { useRevealTrigger } from "@/hooks/useRevealTrigger";
import { getTotalTime } from "@/utils/recipeFormat";
import { GRAIN_URL } from "@/utils/grain";
import { cn } from "@/utils/cn";

const CYCLE_INTERVAL_MS = 130;
const CYCLE_DURATION_MS = 1900;
const CONSULTING_MESSAGES = ["consulting the crumbs...", "this feels legally binding.", "too late. fate has spoken."];

/**
 * A dramatic, unnecessary decision made on the visitor's behalf.
 * Reuses the same unlock hook/modal/game the rest of the Vault
 * uses — Chaos Mode never talks to localStorage or the game engine
 * directly.
 */
export default function ChaosModeSection() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const { isUnlocked, activeRecipe: gameRecipe, modalOpen, sessionKey, openGame, closeGame, handleWin } =
    useRecipeVault();

  const [phase, setPhase] = useState("idle"); // idle | choosing | result
  const [cyclingRecipe, setCyclingRecipe] = useState(recipes[0]);
  const [messageIndex, setMessageIndex] = useState(0);
  const [pick, setPick] = useState(null);

  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const lastPickIdRef = useRef(null);

  const clearTimers = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    intervalRef.current = null;
    timeoutRef.current = null;
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const causeChaos = useCallback(() => {
    if (phase === "choosing") return;
    clearTimers();
    setPhase("choosing");
    setMessageIndex(0);

    if (shouldReduceMotion) {
      timeoutRef.current = setTimeout(() => {
        const finalPick = getRandomRecipe(lastPickIdRef.current);
        lastPickIdRef.current = finalPick.id;
        setPick(finalPick);
        setPhase("result");
      }, 350);
      return;
    }

    const start = Date.now();
    intervalRef.current = setInterval(() => {
      setCyclingRecipe(getRandomRecipe());
      const elapsed = Date.now() - start;
      setMessageIndex(Math.min(2, Math.floor(elapsed / (CYCLE_DURATION_MS / 3))));
    }, CYCLE_INTERVAL_MS);

    timeoutRef.current = setTimeout(() => {
      clearTimers();
      const finalPick = getRandomRecipe(lastPickIdRef.current);
      lastPickIdRef.current = finalPick.id;
      setPick(finalPick);
      setPhase("result");
    }, CYCLE_DURATION_MS);
  }, [phase, shouldReduceMotion, clearTimers]);

  const standards = () => {
    clearTimers();
    setPhase("idle");
    setPick(null);
  };

  const handleAcceptFate = () => {
    if (!pick) return;
    if (isUnlocked(pick.slug)) {
      navigate(`/recipes/${pick.slug}`);
    } else {
      openGame(pick);
    }
  };

  const pickUnlocked = pick ? isUnlocked(pick.slug) : false;
  const { ref: underlineRef, inView: underlineInView } = useRevealTrigger();

  return (
    <Section
      className="relative overflow-hidden bg-espresso"
      padding="py-24 sm:py-32 lg:py-40"
      id="chaos-mode"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <span className="select-none whitespace-nowrap font-display text-[26vw] font-medium leading-[1.05] text-cream/[0.03]">
          CHAOS
        </span>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{ backgroundImage: `url("${GRAIN_URL}")` }}
      />

      <div className="relative flex min-h-[26rem] flex-col items-center gap-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <FadeUp>
            <Eyebrow className="justify-center">Decisions Are Overrated</Eyebrow>
          </FadeUp>
          <Reveal>
            <h2 className="font-display text-5xl font-medium text-cream sm:text-6xl lg:text-7xl">
              CHAOS MODE<span className="align-super text-lg text-caramel sm:text-xl">™</span>
            </h2>
          </Reveal>
          <motion.div
            ref={underlineRef}
            aria-hidden="true"
            className="h-px w-16 origin-center bg-caramel/60"
            initial={{ scaleX: 0 }}
            animate={underlineInView ? { scaleX: 1 } : undefined}
            transition={{ duration: shouldReduceMotion ? 0 : 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        <AnimatePresence mode="wait">
          {phase === "idle" ? (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-3"
            >
              <p className="font-sans text-lg text-cream sm:text-xl">No idea what to make? Perfect.</p>
              <p className="font-hand text-lg text-biscuit/60">Let the crumbs decide.</p>
              <Button onClick={causeChaos} variant="primary" arrow className="mt-3 text-base">
                Cause Some Chaos
              </Button>
              <p className="font-hand text-base text-biscuit/40">this may or may not be a good idea.</p>
            </motion.div>
          ) : null}

          {phase === "choosing" ? (
            <motion.div
              key="choosing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center gap-6"
              aria-live="polite"
            >
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.24em] text-caramel/70">
                {CONSULTING_MESSAGES[messageIndex]}
              </span>

              {!shouldReduceMotion ? (
                <div className="relative flex flex-col items-center gap-5">
                  <div
                    aria-hidden="true"
                    className="h-28 w-28 overflow-hidden rounded-full border border-cream/10 opacity-50 blur-[1px] sm:h-32 sm:w-32"
                  >
                    <PlaceholderArt tone={cyclingRecipe.tone} icon={cyclingRecipe.icon} alt="" />
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.h3
                      key={cyclingRecipe.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.14 }}
                      className="max-w-sm text-balance font-display text-3xl font-medium text-cream sm:text-4xl"
                    >
                      {cyclingRecipe.title}
                    </motion.h3>
                  </AnimatePresence>
                </div>
              ) : (
                <div className="h-16 w-16 animate-pulse rounded-full border border-caramel/40" />
              )}
            </motion.div>
          ) : null}

          {phase === "result" && pick ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 16, scale: shouldReduceMotion ? 1 : 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-5"
            >
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.24em] text-pistachio">
                The Crumbs Have Decided.
              </span>

              <div className="relative h-52 w-52 overflow-hidden rounded-md border border-cream/15 sm:h-64 sm:w-64">
                <PlaceholderArt
                  src={pick.image?.src}
                  alt={pick.title}
                  tone={pick.tone}
                  icon={pick.icon}
                  className={cn(!pickUnlocked && "saturate-[0.6] brightness-[0.75]")}
                />
                <div
                  aria-hidden="true"
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-cream/20 bg-espresso/70 backdrop-blur-sm"
                >
                  {pickUnlocked ? (
                    <LockOpen size={13} strokeWidth={1.75} className="text-caramel" />
                  ) : (
                    <Lock size={13} strokeWidth={1.75} className="text-biscuit/70" />
                  )}
                </div>
              </div>

              <div className="flex flex-col items-center gap-2">
                <h3 className="text-balance font-display text-3xl font-medium text-cream sm:text-4xl">{pick.title}</h3>
                <div className="flex flex-wrap items-center justify-center gap-2 font-sans text-xs text-biscuit/60 sm:text-sm">
                  <span>{pick.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{getTotalTime(pick)}</span>
                  <span aria-hidden="true">·</span>
                  <span>{pick.difficulty}</span>
                </div>
                <p className="max-w-sm text-balance font-sans text-sm text-biscuit sm:text-base">{pick.description}</p>
              </div>

              {!pickUnlocked ? (
                <p className="font-hand text-base text-cherry/70 sm:text-lg">Fate chose it. The vault still has rules.</p>
              ) : null}

              <div className="mt-1 flex flex-col items-center gap-3 sm:flex-row">
                <Button onClick={handleAcceptFate} variant="primary" arrow>
                  Accept Fate
                </Button>
                <Button onClick={causeChaos} variant="secondary">
                  spin again because I&apos;m difficult
                </Button>
              </div>
              <button
                type="button"
                onClick={standards}
                className="font-sans text-xs text-biscuit/40 underline-offset-4 transition-colors hover:text-biscuit/70 hover:underline focus-visible:outline-2 focus-visible:outline-caramel"
              >
                actually, I have standards.
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <GameModal
        open={modalOpen}
        onClose={closeGame}
        title={gameRecipe ? `Catch the Ingredients — ${gameRecipe.title}` : "Catch the Ingredients"}
      >
        {gameRecipe ? (
          <IngredientCatchGame key={sessionKey} recipe={gameRecipe} onWin={handleWin} onClose={closeGame} />
        ) : null}
      </GameModal>
    </Section>
  );
}
