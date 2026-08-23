import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CakeSlice } from "lucide-react";
import Container from "@/components/ui/Container";
import PlaceholderArt from "@/components/ui/PlaceholderArt";
import FadeUp from "@/components/motion/FadeUp";

/**
 * A short, live-feeling bridge between the cinematic hero and the
 * full gallery below — deliberately not a card.
 */
export default function CurrentlyBaking() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative border-t border-cream/10 bg-chocolate py-12 sm:py-16">
      <Container>
        <FadeUp className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
          <Link
            to="/recipes/burnt-basque-cheesecake"
            className="group relative h-32 w-full shrink-0 overflow-hidden rounded-md border border-cream/10 sm:h-24 sm:w-24"
          >
            <PlaceholderArt
              tone="caramel"
              icon={CakeSlice}
              alt="Burnt Basque Cheesecake"
              className="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            />
          </Link>

          <div className="flex flex-1 flex-col gap-2">
            <span className="inline-flex w-fit items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.28em] text-caramel">
              <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                {shouldReduceMotion ? null : (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-caramel/70" />
                )}
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-caramel" />
              </span>
              Currently Baking
              <motion.span
                aria-hidden="true"
                animate={shouldReduceMotion ? {} : { x: [0, 4, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight size={12} strokeWidth={2.5} />
              </motion.span>
            </span>

            <Link to="/recipes/burnt-basque-cheesecake" className="group w-fit">
              <h3 className="font-display text-3xl font-medium text-cream transition-colors duration-300 group-hover:text-caramel sm:text-4xl">
                Burnt Basque Cheesecake
              </h3>
            </Link>

            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <p className="font-sans text-sm text-biscuit/70">current kitchen obsession</p>
              <p className="font-hand text-lg text-biscuit/50">yes, I'm making it again.</p>
            </div>
          </div>
        </FadeUp>
      </Container>
    </section>
  );
}
