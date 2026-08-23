import FadeUp from "@/components/motion/FadeUp";

/**
 * The atmospheric midpoint of the page — a beat, not a section.
 */
export default function MidnightDivider() {
  return (
    <div className="flex flex-col items-center gap-5 py-4 text-center">
      <FadeUp distance={28} duration={0.9}>
        <p className="font-display text-6xl font-medium leading-none text-cherry/80 sm:text-7xl lg:text-8xl">
          2:17 AM.
        </p>
      </FadeUp>
      <FadeUp delay={0.15} className="max-w-md text-balance font-sans text-base leading-relaxed text-biscuit sm:text-lg">
        this is usually where the good ideas
        <br className="hidden sm:block" /> and bad decisions become indistinguishable.
      </FadeUp>
    </div>
  );
}
