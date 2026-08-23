import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/motion/Reveal";
import FadeUp from "@/components/motion/FadeUp";
import BeforeWePanic from "@/components/ask/BeforeWePanic";
import KitchenSOSForm from "@/components/ask/KitchenSOSForm";

export default function AskTheBaker() {
  return (
    <div className="relative overflow-hidden pb-24 pt-32 sm:pb-32 sm:pt-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-cherry/10 blur-3xl"
      />

      <Container className="relative flex flex-col gap-14 sm:gap-20">
        <div className="flex max-w-2xl flex-col gap-5">
          <FadeUp>
            <Eyebrow tone="cherry">Culinary Emergency?</Eyebrow>
          </FadeUp>
          <Reveal>
            <h1 className="text-balance font-display text-5xl font-medium leading-[1.02] text-cream sm:text-7xl lg:text-8xl">
              Something
              <br />
              went wrong?
            </h1>
          </Reveal>
          <FadeUp delay={0.1} className="flex flex-col gap-0.5 font-sans text-base leading-relaxed text-biscuit sm:text-lg">
            <p>Cake sank?</p>
            <p>Dough fighting back?</p>
            <p>Sauce acting suspicious?</p>
          </FadeUp>
          <FadeUp delay={0.16}>
            <p className="font-display text-xl italic text-caramel sm:text-2xl">Send a Kitchen SOS.</p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-8 lg:col-span-5">
            <BeforeWePanic />
            <FadeUp delay={0.1} className="font-hand text-lg text-biscuit/40">
              judgement-free zone. mostly.
            </FadeUp>
          </div>
          <div className="lg:col-span-7">
            <KitchenSOSForm />
          </div>
        </div>
      </Container>
    </div>
  );
}
