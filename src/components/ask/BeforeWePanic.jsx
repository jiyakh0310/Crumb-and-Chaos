import Eyebrow from "@/components/ui/Eyebrow";
import FadeUp from "@/components/motion/FadeUp";

const TIPS = [
  {
    question: "Cake sank?",
    answer: "Check whether the center was fully baked before opening the oven.",
  },
  {
    question: "Dough too sticky?",
    answer: "Chill it before adding a suspicious amount of extra flour.",
  },
  {
    question: "Cookies spreading?",
    answer: "Your butter may have been warmer than your plans.",
  },
];

/**
 * A compact troubleshooting aside, not a full FAQ — three short
 * demo tips to skim before writing in.
 */
export default function BeforeWePanic() {
  return (
    <div className="flex flex-col gap-5">
      <FadeUp>
        <Eyebrow>Before We Panic</Eyebrow>
      </FadeUp>
      <ul className="flex flex-col gap-4">
        {TIPS.map((tip, index) => (
          <FadeUp key={tip.question} delay={Math.min(index * 0.06, 0.2)} as="li">
            <div className="border-l-2 border-caramel/40 pl-4">
              <p className="font-sans text-sm font-semibold text-cream sm:text-base">{tip.question}</p>
              <p className="font-sans text-sm leading-relaxed text-biscuit sm:text-base">{tip.answer}</p>
            </div>
          </FadeUp>
        ))}
      </ul>
    </div>
  );
}
