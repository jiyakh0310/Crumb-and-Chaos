import { useEffect } from "react";
import { AnimatePresence, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import FadeUp from "@/components/motion/FadeUp";
import MidnightIntro from "@/components/midnight/MidnightIntro";
import MidnightTopBar from "@/components/midnight/MidnightTopBar";
import MidnightFooter from "@/components/midnight/MidnightFooter";
import MidnightArchive from "@/components/midnight/MidnightArchive";
import MidnightDivider from "@/components/midnight/MidnightDivider";
import KitchenConfessions from "@/components/midnight/KitchenConfessions";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { useMidnightIntroSeen } from "@/hooks/useMidnightIntroSeen";
import { GRAIN_URL } from "@/utils/grain";

export default function MidnightMenu() {
  useScrollToTop();
  const shouldReduceMotion = useReducedMotion();
  const [introSeen, markIntroSeen] = useMidnightIntroSeen();

  const showIntro = !shouldReduceMotion && !introSeen;

  useEffect(() => {
    document.body.style.overflow = showIntro ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showIntro]);

  return (
    <div className="relative min-h-dvh bg-espresso">
      <AnimatePresence>{showIntro ? <MidnightIntro key="intro" onDone={markIntroSeen} /> : null}</AnimatePresence>

      <MidnightTopBar />

      <main className="relative overflow-x-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 opacity-[0.035] mix-blend-overlay"
          style={{ backgroundImage: `url("${GRAIN_URL}")` }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-cherry/[0.06] blur-3xl"
        />

        <Container className="relative flex flex-col gap-6 pb-16 pt-16 sm:pb-20 sm:pt-24">
          <FadeUp>
            <Eyebrow tone="cherry">After Hours / 12:03 AM</Eyebrow>
          </FadeUp>
          <FadeUp distance={32} duration={0.9}>
            <h1 className="font-display text-6xl font-medium leading-[0.92] text-cream sm:text-8xl lg:text-9xl">
              THE
              <br />
              MIDNIGHT
              <br />
              MENU.
            </h1>
          </FadeUp>
          <FadeUp delay={0.1} className="max-w-md font-sans text-base leading-relaxed text-biscuit sm:text-lg">
            Experiments, bad ideas, and things that somehow worked.
          </FadeUp>
          <FadeUp delay={0.16} className="font-hand text-lg text-biscuit/40">
            none of this was supervised.
          </FadeUp>
        </Container>

        <Container className="relative pb-10 sm:pb-12">
          <FadeUp
            delay={0.2}
            className="inline-flex w-fit rounded-full border border-cream/10 px-4 py-1.5 font-sans text-[10px] uppercase tracking-[0.18em] text-biscuit/40"
          >
            demo entries — sample content, not real experiences
          </FadeUp>
        </Container>

        <Container id="midnight-archive" className="relative pb-20 sm:pb-28">
          <MidnightArchive />
        </Container>

        <Container className="relative">
          <MidnightDivider />
        </Container>

        <Container className="relative py-20 sm:py-28">
          <KitchenConfessions />
        </Container>

        <Container className="relative flex flex-col items-center gap-5 border-t border-cream/10 py-20 text-center sm:py-28">
          <FadeUp>
            <Eyebrow tone="cherry" className="justify-center">
              That&apos;s Enough Internet for Tonight
            </Eyebrow>
          </FadeUp>
          <FadeUp distance={28}>
            <h2 className="text-balance font-display text-4xl font-medium leading-[1.05] text-cream sm:text-5xl">
              You should probably leave.
            </h2>
          </FadeUp>
          <FadeUp delay={0.1} className="max-w-sm font-sans text-base leading-relaxed text-biscuit sm:text-lg">
            Before another recipe becomes a personality trait.
          </FadeUp>
          <FadeUp delay={0.18} className="pt-2">
            <Button to="/" variant="primary" arrow>
              Leave Before Someone Notices
            </Button>
          </FadeUp>
          <FadeUp delay={0.24}>
            <a
              href="#midnight-archive"
              className="font-hand text-lg text-biscuit/40 transition-colors hover:text-cherry"
            >
              one more bad idea →
            </a>
          </FadeUp>
        </Container>
      </main>

      <MidnightFooter />
    </div>
  );
}
