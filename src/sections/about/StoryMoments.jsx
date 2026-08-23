import { Utensils } from "lucide-react";
import PlaceholderArt from "@/components/ui/PlaceholderArt";
import Reveal from "@/components/motion/Reveal";
import FadeUp from "@/components/motion/FadeUp";

/**
 * The four-beat story flow. Each moment is deliberately composed
 * differently — a magazine spread, not four repeated templates.
 */
export default function StoryMoments() {
  return (
    <div className="flex flex-col gap-20 sm:gap-28">
      {/* 01 — text + offset image */}
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-6">
        <div className="flex flex-col gap-4 lg:col-span-7">
          <FadeUp className="font-display text-5xl text-caramel/50 sm:text-6xl">01</FadeUp>
          <Reveal>
            <h2 className="text-balance font-display text-3xl font-medium leading-[1.1] text-cream sm:text-4xl lg:text-5xl">
              I like food.
              <br />A lot.
            </h2>
          </Reveal>
          <FadeUp delay={0.1} className="max-w-lg font-sans text-base leading-relaxed text-biscuit sm:text-lg">
            This started as an obsession with eating well — trying anything that sounded
            interesting, then figuring out how to make it myself. Cooking for other people
            turned out to be the part that stuck the hardest.
          </FadeUp>
          <FadeUp delay={0.18} className="font-hand text-lg text-biscuit/50">
            mostly here for the snacks.
          </FadeUp>
        </div>
        <FadeUp delay={0.15} className="lg:col-span-5">
          <div className="aspect-[4/5] w-full overflow-hidden rounded-md border border-cream/10 lg:ml-auto lg:max-w-sm">
            <PlaceholderArt alt="A close-up of dough being kneaded" tone="biscuit" icon={Utensils} />
          </div>
        </FadeUp>
      </div>

      {/* 02 — wide banner image below a centered statement */}
      <div className="flex flex-col gap-10">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <FadeUp className="font-display text-5xl text-caramel/50 sm:text-6xl">02</FadeUp>
          <Reveal>
            <h2 className="text-balance font-display text-3xl font-medium leading-[1.1] text-cream sm:text-4xl lg:text-5xl">
              Then people started asking for recipes.
            </h2>
          </Reveal>
          <FadeUp delay={0.1} className="max-w-lg font-sans text-base leading-relaxed text-biscuit sm:text-lg">
            Somewhere between all the baking and all the eating, other people started asking
            how things were made. Sharing recipes turned out to be almost as satisfying as
            making them in the first place.
          </FadeUp>
          <FadeUp delay={0.18} className="font-hand text-lg text-biscuit/50">
            professional recipe gatekeeper.
          </FadeUp>
        </div>
        <FadeUp delay={0.2}>
          <div className="aspect-[21/9] w-full overflow-hidden rounded-md border border-cream/10">
            <PlaceholderArt alt="A worn notebook full of handwritten recipe notes" tone="caramel" icon={Utensils} />
          </div>
        </FadeUp>
      </div>

      {/* 03 — text only, generous breathing room */}
      <div className="mx-auto flex max-w-2xl flex-col items-start gap-4">
        <FadeUp className="font-display text-5xl text-caramel/50 sm:text-6xl">03</FadeUp>
        <Reveal>
          <h2 className="text-balance font-display text-3xl font-medium leading-[1.1] text-cream sm:text-4xl lg:text-5xl">
            So I gave the chaos a home.
          </h2>
        </Reveal>
        <FadeUp delay={0.1} className="font-sans text-base leading-relaxed text-biscuit sm:text-lg">
          CRUMB &amp; CHAOS became the place to put all of it — recipes worth keeping, notes
          from things that went sideways, and the odd experiment that had no business working
          as well as it did. Part archive, part diary, part organized chaos.
        </FadeUp>
        <FadeUp delay={0.18} className="font-hand text-lg text-biscuit/50">
          somehow this became a website.
        </FadeUp>
      </div>

      {/* 04 — short, a deliberate cliffhanger into SOMEDAY */}
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
        <FadeUp className="font-display text-5xl text-caramel/50 sm:text-6xl">04</FadeUp>
        <Reveal>
          <h2 className="text-balance font-display text-3xl font-medium leading-[1.1] text-cream sm:text-4xl lg:text-5xl">
            And maybe someday...
          </h2>
        </Reveal>
        <FadeUp delay={0.1} className="font-sans text-base leading-relaxed text-biscuit sm:text-lg">
          The recipes are real. The chaos is real. The only thing that isn't real yet is the
          building.
        </FadeUp>
      </div>
    </div>
  );
}
