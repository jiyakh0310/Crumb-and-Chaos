import FadeUp from "@/components/motion/FadeUp";

/**
 * Large-numbered, substantial steps — never one wall of text.
 */
export default function MethodSteps({ instructions }) {
  return (
    <div className="flex flex-col">
      {instructions.map((step, index) => (
        <FadeUp
          key={step.id}
          delay={Math.min(index * 0.04, 0.3)}
          className="flex gap-5 border-t border-cream/10 py-8 first:border-t-0 first:pt-0 sm:gap-8"
        >
          <span className="shrink-0 font-display text-3xl leading-none text-caramel/60 sm:text-4xl">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="flex flex-col gap-2.5">
            <h3 className="font-display text-xl font-medium text-cream sm:text-2xl">{step.title}</h3>
            <p className="max-w-2xl font-sans text-sm leading-relaxed text-biscuit sm:text-base">{step.text}</p>
            {step.note ? (
              <p className="font-hand text-base leading-snug text-biscuit/50 sm:text-lg">{step.note}</p>
            ) : null}
          </div>
        </FadeUp>
      ))}
    </div>
  );
}
