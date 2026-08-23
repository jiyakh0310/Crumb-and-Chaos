import Eyebrow from "@/components/ui/Eyebrow";
import FadeUp from "@/components/motion/FadeUp";
import Reveal from "@/components/motion/Reveal";

/**
 * A typographic split rather than two feature cards — CRUMB and
 * CHAOS lean toward each other, rotated slightly opposite ways,
 * meeting at a small "+".
 */
export default function BrandExplanation() {
  return (
    <div className="flex flex-col items-center gap-12 text-center">
      <div className="flex flex-col items-center gap-3">
        <FadeUp>
          <Eyebrow className="justify-center">The Name, Explained</Eyebrow>
        </FadeUp>
        <FadeUp delay={0.05} className="max-w-md font-sans text-base text-biscuit sm:text-lg">
          Two words. One fairly literal description of what happens in here.
        </FadeUp>
      </div>

      <Reveal className="w-full">
        <div className="flex flex-col items-center lg:flex-row lg:items-center lg:justify-center">
          <div className="flex flex-col items-center gap-4 lg:items-end lg:pr-10 lg:text-right">
            <h3 className="-rotate-2 font-display text-6xl font-medium text-cream sm:text-7xl lg:text-8xl">
              CRUMB
            </h3>
            <p className="max-w-[15rem] font-sans text-xs uppercase tracking-[0.22em] text-biscuit/60">
              warmth · comfort · food · baking · sharing · made by hand
            </p>
          </div>

          <span aria-hidden="true" className="my-4 font-display text-3xl text-caramel lg:my-0 lg:mx-4">
            +
          </span>

          <div className="flex flex-col items-center gap-4 lg:items-start lg:pl-10 lg:text-left">
            <h3 className="rotate-2 font-display text-6xl font-medium italic text-caramel sm:text-7xl lg:text-8xl">
              CHAOS
            </h3>
            <p className="max-w-[15rem] font-sans text-xs uppercase tracking-[0.22em] text-biscuit/60">
              experiments · mistakes · mini-games · weird ideas · kitchen disasters · fun
            </p>
          </div>
        </div>
      </Reveal>

      <FadeUp delay={0.15} className="font-hand text-lg text-biscuit/50">
        feeding people counts as a personality trait.
      </FadeUp>
    </div>
  );
}
