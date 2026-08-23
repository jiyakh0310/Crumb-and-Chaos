import { Croissant } from "lucide-react";
import Section from "./Section";
import Eyebrow from "./Eyebrow";
import Button from "./Button";
import Reveal from "@/components/motion/Reveal";
import FadeUp from "@/components/motion/FadeUp";
import { cn } from "@/utils/cn";

/**
 * Polished "still proofing" state shared by every page that isn't
 * fully built yet. Uses the real site chrome (nav/footer already
 * wrap this via RootLayout) so it never looks like a raw dev stub.
 */
export default function PagePlaceholder({
  eyebrow,
  eyebrowTone,
  title,
  note,
  children,
  accent = "caramel",
}) {
  const blobClass =
    accent === "cherry" ? "bg-cherry/15" : accent === "pistachio" ? "bg-pistachio/15" : "bg-caramel/15";

  return (
    <Section className="relative min-h-[calc(100dvh-5rem)] overflow-hidden pt-32 sm:pt-40">
      <div aria-hidden="true" className={cn("pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full blur-3xl", blobClass)} />

      <div className="relative flex max-w-3xl flex-col gap-8">
        {eyebrow ? (
          <FadeUp>
            <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow>
          </FadeUp>
        ) : null}

        <Reveal>
          <h1 className="text-balance font-display text-5xl font-medium leading-[1.05] text-cream sm:text-6xl lg:text-7xl">
            {title}
          </h1>
        </Reveal>

        {children ? (
          <FadeUp delay={0.1} className="text-balance max-w-xl font-sans text-base leading-relaxed text-biscuit sm:text-lg">
            {children}
          </FadeUp>
        ) : null}

        <FadeUp delay={0.2} className="flex flex-wrap items-center gap-4 pt-4">
          <Button to="/" variant="secondary" size="sm">
            Back to Home
          </Button>
          <Button to="/ask" variant="ghost" size="sm" arrow>
            Ask the Baker
          </Button>
        </FadeUp>

        {note ? (
          <FadeUp delay={0.3} className="flex items-center gap-2 pt-10 text-biscuit/50">
            <Croissant size={16} strokeWidth={1.75} />
            <span className="font-hand text-lg">{note}</span>
          </FadeUp>
        ) : null}
      </div>
    </Section>
  );
}
