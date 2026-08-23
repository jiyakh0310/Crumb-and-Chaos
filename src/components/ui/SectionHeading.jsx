import { cn } from "@/utils/cn";
import Eyebrow from "./Eyebrow";
import FadeUp from "../motion/FadeUp";

/**
 * Eyebrow + serif heading + optional description, used to open
 * most sections and pages consistently.
 */
export default function SectionHeading({
  eyebrow,
  eyebrowTone,
  title,
  description,
  align = "left",
  size = "lg",
  className,
}) {
  const alignClass = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  const titleSize =
    size === "xl"
      ? "text-4xl sm:text-5xl lg:text-6xl"
      : size === "md"
        ? "text-3xl sm:text-4xl"
        : "text-4xl sm:text-5xl";

  return (
    <FadeUp className={cn("flex max-w-2xl flex-col gap-4", alignClass, className)}>
      {eyebrow ? <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow> : null}
      {title ? (
        <h2 className={cn("text-balance font-display font-medium leading-[1.08] text-cream", titleSize)}>
          {title}
        </h2>
      ) : null}
      {description ? (
        Array.isArray(description) ? (
          <div className="flex flex-col gap-1">
            {description.map((line) => (
              <p key={line} className="text-balance font-sans text-base leading-relaxed text-biscuit sm:text-lg">
                {line}
              </p>
            ))}
          </div>
        ) : (
          <p className="text-balance font-sans text-base leading-relaxed text-biscuit sm:text-lg">{description}</p>
        )
      ) : null}
    </FadeUp>
  );
}
