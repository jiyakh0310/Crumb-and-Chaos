import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import Button from "@/components/ui/Button";
import CustomCursor from "@/components/ui/CustomCursor";
import Reveal from "@/components/motion/Reveal";
import FadeUp from "@/components/motion/FadeUp";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerChildren";
import { useFinePointer } from "@/hooks/useFinePointer";
import { cn } from "@/utils/cn";

const GRAIN_URL =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'>
      <filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter>
      <rect width='100%' height='100%' filter='url(#n)'/>
    </svg>`,
  );

const CRUMBS = [
  { top: "20%", left: "9%", size: 9, color: "bg-biscuit/60", float: true },
  { top: "74%", left: "14%", size: 6, color: "bg-caramel/50", float: false },
  { top: "30%", left: "89%", size: 8, color: "bg-cherry/40", float: true },
  { top: "62%", left: "93%", size: 5, color: "bg-pistachio/40", float: false },
  { top: "85%", left: "48%", size: 5, color: "bg-cream/40", float: false },
];

export default function Hero() {
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const isFinePointer = useFinePointer();
  const showCustomCursor = isFinePointer && !shouldReduceMotion;

  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const parallaxX = useSpring(mvX, { damping: 40, stiffness: 60, mass: 0.6 });
  const parallaxY = useSpring(mvY, { damping: 40, stiffness: 60, mass: 0.6 });

  const handlePointerMove = (e) => {
    if (shouldReduceMotion || !isFinePointer) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    mvX.set(relX * 24);
    mvY.set(relY * 24);
  };

  const handlePointerLeave = () => {
    mvX.set(0);
    mvY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn(
        "relative flex min-h-[max(100svh,100dvh,600px)] w-full flex-col overflow-hidden bg-espresso",
        showCustomCursor && "[@media(pointer:fine)]:cursor-none",
      )}
    >
      {/* ---------------------------------------------------------- */}
      {/* Background — layered, swappable for real photography/video */}
      {/* ---------------------------------------------------------- */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, var(--color-espresso) 0%, var(--color-chocolate) 48%, var(--color-cocoa) 100%)",
          }}
        />

        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.12 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: shouldReduceMotion ? 0 : 1.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ x: parallaxX, y: parallaxY }}
          className="absolute -bottom-[22%] -right-[26%] h-[100vw] w-[100vw] max-h-[520px] max-w-[520px] rounded-[48%_52%_55%_45%/45%_42%_58%_55%] sm:-bottom-[18%] sm:-right-[12%] sm:h-[65vw] sm:w-[65vw] sm:max-h-[820px] sm:max-w-[820px]"
        >
          <div
            className="h-full w-full rounded-[inherit]"
            style={{
              background:
                "radial-gradient(circle at 32% 28%, color-mix(in oklab, var(--color-caramel) 55%, transparent) 0%, transparent 45%), radial-gradient(circle at 62% 68%, color-mix(in oklab, var(--color-cocoa) 85%, transparent) 0%, transparent 60%), radial-gradient(circle at 50% 50%, var(--color-cocoa) 0%, var(--color-chocolate) 70%)",
            }}
          />
        </motion.div>

        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.12 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: shouldReduceMotion ? 0 : 1.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ x: parallaxX, y: parallaxY }}
          className="absolute -left-[16%] -top-[14%] h-[42vw] w-[42vw] max-h-[520px] max-w-[520px] rounded-full opacity-70 blur-[2px]"
        >
          <div
            className="h-full w-full rounded-full"
            style={{
              background:
                "repeating-radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--color-biscuit) 22%, transparent) 0px, transparent 14px, color-mix(in oklab, var(--color-cocoa) 30%, transparent) 22px, transparent 34px)",
            }}
          />
        </motion.div>

        {/* grain */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
          style={{ backgroundImage: `url("${GRAIN_URL}")` }}
        />

        {/* vignette for legibility */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 65% at 50% 42%, transparent 40%, color-mix(in oklab, var(--color-espresso) 65%, transparent) 100%), linear-gradient(180deg, color-mix(in oklab, var(--color-espresso) 55%, transparent) 0%, transparent 22%, transparent 72%, var(--color-espresso) 100%)",
          }}
        />

        {/* crumbs */}
        {CRUMBS.map((crumb, i) => (
          <motion.span
            key={i}
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={
              crumb.float && !shouldReduceMotion
                ? { opacity: 1, y: [0, -7, 0] }
                : { opacity: 1 }
            }
            transition={
              crumb.float && !shouldReduceMotion
                ? { opacity: { duration: 1, delay: 0.8 }, y: { duration: 5 + i, repeat: Infinity, ease: "easeInOut" } }
                : { duration: 1, delay: 0.8 }
            }
            className={cn("absolute rounded-[40%_60%_55%_45%/45%_40%_60%_55%]", crumb.color)}
            style={{ top: crumb.top, left: crumb.left, width: crumb.size, height: crumb.size }}
          />
        ))}
      </div>

      {/* ---------------------------------------------------------- */}
      {/* Content                                                     */}
      {/* ---------------------------------------------------------- */}
      <div className="relative z-10 flex h-full flex-col">
        <div className="h-20 shrink-0 sm:h-24" aria-hidden="true" />

        <FadeUp
          delay={0.5}
          distance={0}
          duration={0.9}
          className="pointer-events-none absolute right-[6%] top-[19%] hidden max-w-[13rem] -rotate-3 sm:block lg:right-[10%]"
        >
          <p className="font-hand text-xl leading-snug text-biscuit/70 lg:text-2xl">
            yes, I ate one before taking the photo.
          </p>
        </FadeUp>

        <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center sm:gap-8 sm:px-8">
          <div>
            <Reveal>
              <h1 className="font-display font-medium text-cream [text-shadow:0_4px_30px_rgba(0,0,0,0.45)]">
                <span className="block text-[clamp(3.4rem,15vw,10.5rem)] leading-[1.05]">CRUMB</span>
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="-mt-1 font-display font-medium text-[clamp(2.7rem,12vw,8.5rem)] leading-[1.05] text-cream sm:-mt-3 lg:-mt-5 [text-shadow:0_4px_30px_rgba(0,0,0,0.45)]">
                <span className="italic text-caramel">&amp;</span> CHAOS
              </p>
            </Reveal>
          </div>

          <FadeUp delay={0.55}>
            <p className="font-sans text-base font-semibold tracking-wide text-caramel sm:text-lg">
              Made with butter, chaos &amp; love.
            </p>
          </FadeUp>

          <FadeUp delay={0.65} className="max-w-md sm:max-w-lg">
            <p className="text-balance font-sans text-sm leading-relaxed text-biscuit/85 sm:text-base lg:text-lg">
              Things I've baked, cooked, loved
              <br className="hidden sm:block" /> and been bullied into sharing the recipe for.
            </p>
          </FadeUp>

          <StaggerGroup className="flex flex-col items-center gap-3 pt-2 sm:flex-row sm:gap-4" delayChildren={0.8}>
            <StaggerItem>
              <Button to="/kitchen" variant="primary" arrow className="w-56 sm:w-auto">
                see what's cooking
              </Button>
            </StaggerItem>
            <StaggerItem>
              <Button to="/recipes" variant="secondary" className="w-56 sm:w-auto">
                steal a recipe 🔐
              </Button>
            </StaggerItem>
          </StaggerGroup>
        </div>

        <FadeUp delay={1.1} className="flex shrink-0 flex-col items-center gap-2 pb-8 pt-10 sm:pb-10 sm:pt-12">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-biscuit/55 sm:text-xs">
            scroll before I eat everything ↓
          </span>
          <span className="relative h-8 w-px overflow-hidden bg-cream/15">
            <motion.span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-3 bg-caramel"
              animate={shouldReduceMotion ? {} : { y: [0, 20, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </FadeUp>
      </div>

      {showCustomCursor ? <CustomCursor containerRef={sectionRef} /> : null}
    </section>
  );
}
