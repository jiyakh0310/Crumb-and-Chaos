import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/motion/Reveal";
import FadeUp from "@/components/motion/FadeUp";
import StorefrontGlow from "@/components/about/StorefrontGlow";
import MailingListTeaser from "@/components/about/MailingListTeaser";

export default function FutureBakehouseSection() {
  return (
    <div className="flex flex-col gap-10 sm:gap-14">
      <div className="flex flex-col items-center gap-4 text-center">
        <FadeUp>
          <Eyebrow className="justify-center">One Day, Maybe</Eyebrow>
        </FadeUp>
        <Reveal>
          <h2 className="font-display text-7xl font-medium leading-[1.05] text-cream sm:text-8xl lg:text-9xl">
            SOMEDAY.
          </h2>
        </Reveal>
      </div>

      <FadeUp delay={0.1}>
        <StorefrontGlow className="aspect-[4/3] w-full sm:aspect-[16/9] lg:aspect-[21/9]" />
      </FadeUp>

      <div className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
        <FadeUp delay={0.15}>
          <p className="text-balance font-display text-xl italic leading-snug text-cream/90 sm:text-2xl">
            Warm bread. Good coffee.
            <br />
            Desserts behind glass.
            <br />
            People staying longer than they planned.
          </p>
        </FadeUp>
        <FadeUp delay={0.22} className="flex flex-col gap-3 font-sans text-base leading-relaxed text-biscuit sm:text-lg">
          <p>For now, CRUMB &amp; CHAOS lives on the internet.</p>
          <p>
            Someday, maybe it&apos;ll have an oven, a front door, a few tiny tables, and the
            smell of something baking.
          </p>
        </FadeUp>
        <FadeUp delay={0.28} className="font-hand text-lg text-biscuit/40">
          future bakehouse pending.
        </FadeUp>
      </div>

      <MailingListTeaser />
    </div>
  );
}
