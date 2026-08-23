import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import FadeUp from "@/components/motion/FadeUp";
import StorefrontGlow from "@/components/about/StorefrontGlow";
import CrumbMotif from "@/components/ui/CrumbMotif";

export default function FutureBakehouseTeaser() {
  return (
    <Section
      className="bg-chocolate"
      padding="py-20 sm:py-28 lg:py-32 pb-28 sm:pb-36 lg:pb-44"
      id="future-bakehouse-teaser"
    >
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <FadeUp className="lg:col-span-5">
          <StorefrontGlow className="aspect-[4/3] w-full sm:aspect-[16/10]" />
        </FadeUp>

        <div className="flex flex-col items-start gap-4 lg:col-span-7">
          <FadeUp>
            <Eyebrow>The Long-Term Plan</Eyebrow>
          </FadeUp>
          <Reveal>
            <h2 className="text-balance font-display text-3xl font-medium leading-[1.1] text-cream sm:text-4xl lg:text-5xl">
              Maybe this becomes a real bakehouse.
            </h2>
          </Reveal>
          <FadeUp delay={0.1} className="max-w-md font-sans text-base leading-relaxed text-biscuit sm:text-lg">
            For now, it lives here. Someday, maybe it gets an oven and a front door.
          </FadeUp>
          <FadeUp delay={0.18} className="flex flex-wrap items-center gap-4 pt-2">
            <Button to="/about" variant="secondary" arrow>
              Read the Story
            </Button>
          </FadeUp>
          <FadeUp delay={0.24} className="flex items-center gap-3">
            <span className="font-hand text-lg text-biscuit/40">manifesting responsibly.</span>
            <CrumbMotif />
          </FadeUp>
        </div>
      </div>
    </Section>
  );
}
