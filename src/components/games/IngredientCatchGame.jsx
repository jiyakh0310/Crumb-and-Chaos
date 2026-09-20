import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Heart } from "lucide-react";
import Button from "@/components/ui/Button";
import FallingIngredient from "./FallingIngredient";
import GameReaction from "./GameReaction";
import { getIngredientIcon } from "./ingredientIcons";
import { GRAIN_URL } from "@/utils/grain";
import { cn } from "@/utils/cn";

const WIN_SCORE = 5;
const START_LIVES = 3;
const STATIC_BATCH_SIZE = 6;
const CORRECT_CHANCE = 0.55;

// Fixed horizontal lanes across the play area. Tokens only ever spawn
// into a lane nothing else currently occupies, so two tokens can
// never land on top of each other — no random overlap, no "random
// pill" feeling.
const LANES = [13, 31, 50, 69, 87];

const CORRECT_REACTIONS = [
  "acceptable.",
  "chef behavior.",
  "good choice.",
  "you may continue.",
  "okay, you know things.",
];

const WRONG_REACTIONS = [
  "absolutely not 😭",
  "straight to jail.",
  "who taught you this?",
  "that is a culinary crime.",
  "please leave the kitchen.",
];

function randomFrom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function createIngredient(correctPool, wrongPool, idRef, laneIndex, slow = false) {
  const isCorrect = Math.random() < CORRECT_CHANCE;
  const id = idRef.current++;
  const fromSide = id % 3;
  return {
    id,
    word: isCorrect ? randomFrom(correctPool) : randomFrom(wrongPool),
    correct: isCorrect,
    laneIndex,
    x: LANES[laneIndex] + (Math.random() * 2 - 1),
    // kept small and well within half a lane's width so a token drifting
    // mid-fall can never swing into a neighboring lane's token
    drift: fromSide === 0 ? 16 : fromSide === 1 ? -14 : 8,
    rotate: (Math.random() * 10 - 5),
    duration: (5.2 + Math.random() * 1.8) * (slow ? 1.28 : 1),
  };
}

/**
 * The whole game engine, phase machine and all. Data-driven by
 * `recipe` — nothing here is specific to any single dish, so the
 * same component powers every recipe's unlock game.
 */
export default function IngredientCatchGame({ recipe, onWin, onClose }) {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(() => window.matchMedia("(max-width: 639px)").matches);

  const [phase, setPhase] = useState("intro"); // intro | playing | win | lose
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(START_LIVES);
  const [items, setItems] = useState([]);
  const [reaction, setReaction] = useState(null);
  const [playHeight, setPlayHeight] = useState(360);

  const nextId = useRef(0);
  const hasUnlockedRef = useRef(false);
  const resizeObserverRef = useRef(null);
  const occupiedLanesRef = useRef(new Set());

  const correctPool = recipe.ingredients;
  const wrongPool = recipe.wrongIngredients;

  const pickAvailableLane = useCallback(() => {
    const occupied = occupiedLanesRef.current;
    // prefer a lane whose immediate neighbors are also free, so active
    // tokens keep generous breathing room instead of clustering edge to edge
    for (let i = 0; i < LANES.length; i++) {
      if (occupied.has(i)) continue;
      const leftFree = i === 0 || !occupied.has(i - 1);
      const rightFree = i === LANES.length - 1 || !occupied.has(i + 1);
      if (leftFree && rightFree) return i;
    }
    for (let i = 0; i < LANES.length; i++) {
      if (!occupied.has(i)) return i;
    }
    return null;
  }, []);

  const spawnIngredient = useCallback(
    (slow) => {
      const lane = pickAvailableLane();
      if (lane === null) return null;
      occupiedLanesRef.current.add(lane);
      return createIngredient(correctPool, wrongPool, nextId, lane, slow);
    },
    [correctPool, wrongPool, pickAvailableLane],
  );

  const releaseLane = useCallback((item) => {
    if (item && typeof item.laneIndex === "number") occupiedLanesRef.current.delete(item.laneIndex);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const startGame = useCallback(() => {
    setScore(0);
    setLives(START_LIVES);
    occupiedLanesRef.current = new Set();
    setReaction(null);
    hasUnlockedRef.current = false;
    setPhase("playing");
    setItems(
      Array.from({ length: isMobile ? 2 : 3 }, () => spawnIngredient(isMobile)).filter(Boolean),
    );
  }, [isMobile, spawnIngredient]);

  const handleCatch = useCallback((item) => {
    setReaction({
      id: item.id,
      correct: item.correct,
      text: randomFrom(item.correct ? CORRECT_REACTIONS : WRONG_REACTIONS),
    });

    if (item.correct) {
      setScore((prev) => {
        const next = prev + 1;
        if (next >= WIN_SCORE) {
          setPhase("win");
          setItems([]);
        }
        return next;
      });
    } else {
      setLives((prev) => {
        const next = prev - 1;
        if (next <= 0) {
          setPhase("lose");
          setItems([]);
        }
        return next;
      });
    }
  }, []);

  const handleExpire = useCallback(
    (expiredItem) => {
      releaseLane(expiredItem);
      setItems((prev) => prev.filter((i) => i.id !== expiredItem.id));
    },
    [releaseLane],
  );

  // measure the play area so falling items animate real pixel distances —
  // a callback ref fires on mount/unmount, so this needs no separate effect
  const setPlayAreaRef = useCallback((node) => {
    if (resizeObserverRef.current) {
      resizeObserverRef.current.disconnect();
      resizeObserverRef.current = null;
    }
    if (!node) return;
    setPlayHeight(node.offsetHeight);
    const observer = new ResizeObserver(() => setPlayHeight(node.offsetHeight));
    observer.observe(node);
    resizeObserverRef.current = observer;
  }, []);

  // continuous spawn loop — motion mode only
  useEffect(() => {
    if (phase !== "playing" || shouldReduceMotion) return;
    const interval = setInterval(() => {
      setItems((prev) => {
        if (prev.length >= (isMobile ? 3 : 5)) return prev;
        const next = spawnIngredient(isMobile);
        return next ? [...prev, next] : prev;
      });
    }, isMobile ? 1350 : 1000);
    return () => clearInterval(interval);
  }, [phase, shouldReduceMotion, isMobile, spawnIngredient]);

  // static top-up — reduced motion mode: always keep a tappable batch visible
  useEffect(() => {
    if (phase !== "playing" || !shouldReduceMotion) return;
    setItems((prev) => {
      if (prev.length >= STATIC_BATCH_SIZE) return prev;
      const next = [...prev];
      while (next.length < STATIC_BATCH_SIZE) {
        next.push(createIngredient(correctPool, wrongPool, nextId, 0));
      }
      return next;
    });
  }, [phase, shouldReduceMotion, items.length, correctPool, wrongPool]);

  // persist the unlock the moment the game is won, not on click-through
  useEffect(() => {
    if (phase === "win" && !hasUnlockedRef.current) {
      hasUnlockedRef.current = true;
      onWin(recipe.slug);
    }
  }, [phase, onWin, recipe.slug]);

  // reaction toast auto-dismiss
  useEffect(() => {
    if (!reaction) return;
    const timeout = setTimeout(() => setReaction(null), 1100);
    return () => clearTimeout(timeout);
  }, [reaction]);

  const handleLetMeCook = () => {
    onClose();
    navigate(`/recipes/${recipe.slug}`);
  };

  return (
    <div className="flex flex-col gap-6">
      <AnimatePresence mode="wait">
        {phase === "intro" ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-5 py-4 text-center"
          >
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-caramel/80">
              Catch the Ingredients
            </span>
            <h2 className="text-balance font-display text-2xl font-medium leading-tight text-cream sm:text-3xl">
              {recipe.title}
            </h2>
            <p className="max-w-xs font-sans text-base leading-relaxed text-biscuit">
              Prove you deserve the recipe.
            </p>
            <p className="font-hand text-lg text-biscuit/50">
              Five good decisions. Three lives. No culinary crimes.
            </p>
            <Button onClick={startGame} variant="primary" arrow className="mt-2">
              START THE CHAOS
            </Button>
          </motion.div>
        ) : null}

        {phase === "playing" ? (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-start justify-between gap-3 pr-10">
              <div className="flex flex-col gap-0.5">
                <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-caramel/70">
                  {recipe.title}
                </span>
                <span className="font-display text-lg text-cream">
                  Score: {score} / {WIN_SCORE}
                </span>
              </div>
              <div className="flex items-center gap-1.5 pt-1" aria-label={`${lives} of ${START_LIVES} lives remaining`}>
                {Array.from({ length: START_LIVES }).map((_, i) => (
                  <Heart
                    key={i}
                    size={16}
                    strokeWidth={1.75}
                    className={i < lives ? "fill-cherry text-cherry" : "text-cream/15"}
                  />
                ))}
              </div>
            </div>

            <p className="font-sans text-xs text-biscuit/60 sm:text-sm">
              Tap the ingredients that actually belong in this recipe.
            </p>

            {shouldReduceMotion ? (
              <div className="flex flex-wrap items-center justify-center gap-3 rounded-md border border-cream/10 bg-espresso/60 p-5 sm:p-6">
                {items.map((item) => {
                  const Icon = getIngredientIcon(item.word);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        handleCatch(item);
                        handleExpire(item);
                      }}
                      className="flex min-h-12 min-w-12 flex-col items-center justify-center gap-1 rounded-[0.9rem_0.35rem_0.9rem_0.35rem] border border-cream/20 bg-chocolate px-4 py-3 font-sans text-sm font-semibold text-cream transition-colors hover:border-caramel/60 active:scale-95 focus-visible:outline-2 focus-visible:outline-caramel sm:px-5 sm:text-base"
                    >
                      <Icon size={18} strokeWidth={1.5} className="text-biscuit/90" aria-hidden="true" />
                      {item.word}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div
                ref={setPlayAreaRef}
                className="relative isolate h-[320px] w-full touch-manipulation overflow-hidden rounded-md border border-cream/10 bg-espresso/60 sm:h-[380px]"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-[0.05]"
                  style={{ backgroundImage: `url("${GRAIN_URL}")` }}
                />
                <GameReaction reaction={reaction} />
                <AnimatePresence>
                  {items.map((item) => (
                    <FallingIngredient
                      key={item.id}
                      item={item}
                      playHeight={playHeight}
                      onCatch={handleCatch}
                      onExpire={handleExpire}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}

            {shouldReduceMotion ? <GameReactionInline reaction={reaction} /> : null}
          </motion.div>
        ) : null}

        {phase === "win" ? (
          <motion.div
            key="win"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-4 py-4 text-center"
          >
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-pistachio">
              Recipe Unlocked 🔓
            </span>
            <h2 className="text-balance font-display text-3xl font-medium leading-tight text-cream sm:text-4xl">
              OKAY CHEF.
              <br />
              YOU EARNED THIS.
            </h2>
            <p className="font-hand text-lg text-biscuit/60">the crumbs have spoken.</p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <Button onClick={handleLetMeCook} variant="primary" arrow>
                LET ME COOK
              </Button>
              <Button onClick={onClose} variant="ghost">
                back to the vault
              </Button>
            </div>
          </motion.div>
        ) : null}

        {phase === "lose" ? (
          <motion.div
            key="lose"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-4 py-4 text-center"
          >
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-cherry">
              Game Over
            </span>
            <h2 className="text-balance font-display text-3xl font-medium leading-tight text-cream sm:text-4xl">
              CONGRATULATIONS.
              <br />
              YOU BURNT IT.
            </h2>
            <p className="max-w-xs font-sans text-sm text-biscuit/70">
              Somewhere, a stick of butter just sighed.
            </p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <Button onClick={startGame} variant="primary" arrow>
                TRY AGAIN
              </Button>
              <Button onClick={onClose} variant="ghost">
                retreat with dignity
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/**
 * Reduced-motion mode has no absolutely-positioned play area for
 * GameReaction to anchor inside, so it gets a small static line
 * under the ingredient grid instead.
 */
function GameReactionInline({ reaction }) {
  return (
    <div className={cn("flex min-h-6 items-center justify-center")}>
      <AnimatePresence mode="wait">
        {reaction ? (
          <motion.p
            key={reaction.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "font-sans text-xs font-semibold uppercase tracking-wide",
              reaction.correct ? "text-pistachio" : "text-cherry",
            )}
          >
            {reaction.text}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
