import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/motion/Reveal";
import FadeUp from "@/components/motion/FadeUp";
import PlaceholderArt from "@/components/ui/PlaceholderArt";
import { GRAIN_URL } from "@/utils/grain";

/**
 * The editorial opening — oversized type up top, a staggered pair of
 * cropped, overlapping images off to the side rather than a
 * conventional text-left/image-right hero split.
 */
export default function KitchenHero({ things, recipesUnlockable, questionable, imageA, imageB }) {
  return (
    <div className="relative">
      {/* Scoped to its own clipping box (not the page) so decorative
          bleed never becomes an ancestor of anything that needs
          position: sticky further down the page. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
          style={{ backgroundImage: `url("${GRAIN_URL}")` }}
        />
        <div className="absolute -left-32 top-16 h-96 w-96 rounded-full bg-caramel/10 blur-3xl" />
      </div>

      <div className="relative flex flex-col gap-4">
        <FadeUp>
          <Eyebrow>The Edible Archive</Eyebrow>
        </FadeUp>
        <Reveal>
          <h1 className="text-balance font-display text-6xl font-medium leading-[1.05] text-cream sm:text-8xl lg:text-[7rem]">
            Welcome to
            <br />
            the Kitchen.
          </h1>
        </Reveal>
      </div>

      <div className="relative mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col gap-6 lg:col-span-5 lg:pt-4">
          <FadeUp delay={0.05} className="max-w-md text-balance font-sans text-base leading-relaxed text-biscuit sm:text-lg">
            Everything I&rsquo;ve baked, cooked, experimented with and managed to photograph before someone ate
            it.
          </FadeUp>
          <FadeUp delay={0.1} className="font-hand text-lg text-biscuit/40">
            the survival rate varies.
          </FadeUp>
          <FadeUp
            delay={0.16}
            className="flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-biscuit/50"
          >
            <span>{things} things made</span>
            <span aria-hidden="true">·</span>
            <span>{recipesUnlockable} recipes unlockable</span>
            <span aria-hidden="true">·</span>
            <span>{questionable} questionable decisions</span>
          </FadeUp>
        </div>

        <div className="relative h-[24rem] sm:h-[28rem] lg:col-span-7 lg:h-[30rem]">
          {imageA ? (
            <FadeUp
              delay={0.1}
              distance={16}
              className="absolute right-0 top-0 w-[68%] overflow-hidden rounded-md border border-cream/10 shadow-2xl shadow-black/40 sm:w-[62%]"
            >
              <PlaceholderArt
                src={imageA.image?.src}
                alt={imageA.title}
                tone={imageA.tone}
                icon={imageA.icon}
                className="aspect-[4/5]"
              />
            </FadeUp>
          ) : null}

          {imageB ? (
            <FadeUp
              delay={0.22}
              distance={16}
              className="absolute bottom-0 left-0 w-[52%] overflow-hidden rounded-md border border-cream/10 shadow-2xl shadow-black/40 sm:w-[46%]"
            >
              <PlaceholderArt
                src={imageB.image?.src}
                alt={imageB.title}
                tone={imageB.tone}
                icon={imageB.icon}
                className="aspect-[3/4]"
              />
              <span className="pointer-events-none absolute bottom-3 left-3 font-sans text-[10px] uppercase tracking-[0.18em] text-cream/70">
                No. 02 — {imageB.title}
              </span>
            </FadeUp>
          ) : null}
        </div>
      </div>
    </div>
  );
}
