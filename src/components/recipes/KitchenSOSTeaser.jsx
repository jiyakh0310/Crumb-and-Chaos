import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import FadeUp from "@/components/motion/FadeUp";

export default function KitchenSOSTeaser({ recipeTitle }) {
  return (
    <FadeUp className="flex flex-col items-start gap-4 rounded-md border border-cherry/20 bg-cherry/[0.04] p-6 print:hidden sm:p-8">
      <Eyebrow tone="cherry">Something Went Wrong?</Eyebrow>
      <p className="max-w-md font-sans text-base leading-relaxed text-biscuit sm:text-lg">
        Cake sank? Dough fighting back? Something looks suspicious?
      </p>
      <Button to={`/ask?recipe=${encodeURIComponent(recipeTitle)}`} variant="secondary" arrow>
        Send a Kitchen SOS
      </Button>
    </FadeUp>
  );
}
