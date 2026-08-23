import { ChefHat } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import PlaceholderArt from "@/components/ui/PlaceholderArt";
import Reveal from "@/components/motion/Reveal";
import FadeUp from "@/components/motion/FadeUp";

/**
 * Full-bleed image with the headline overlaid bottom-left and a
 * handwritten aside floating near the top-right — the same
 * overlapping-layers language as the site's other cinematic
 * moments (Hero, RecipeHero), not a text-left/image-right split.
 */
export default function AboutHero() {
  return (
    <div className="relative">
      <FadeUp>
        <Eyebrow>The Person Behind the Mess</Eyebrow>
      </FadeUp>

      <div className="relative mt-5 aspect-[3/4] overflow-hidden rounded-md border border-cream/10 sm:aspect-[16/9] lg:aspect-[21/9]">
        <PlaceholderArt alt="A kitchen mid-project, flour everywhere" tone="chocolate" icon={ChefHat} />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/95 via-espresso/25 to-transparent"
        />

        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:max-w-4xl">
          <Reveal>
            <h1 className="text-balance font-display text-4xl font-medium leading-[1.05] text-cream [text-shadow:0_4px_24px_rgba(0,0,0,0.4)] sm:text-6xl lg:text-7xl">
              I started baking
              <br />
              because I liked eating.
            </h1>
          </Reveal>
        </div>

        <FadeUp
          delay={0.3}
          distance={0}
          className="pointer-events-none absolute right-5 top-6 max-w-[11rem] rotate-2 sm:right-10 sm:top-10 sm:max-w-xs"
        >
          <p className="font-hand text-xl leading-snug text-biscuit/70 sm:text-2xl">
            unfortunately, I got good at it.
          </p>
        </FadeUp>
      </div>
    </div>
  );
}
