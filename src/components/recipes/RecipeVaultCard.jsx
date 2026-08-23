import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Lock, LockOpen } from "lucide-react";
import PlaceholderArt from "@/components/ui/PlaceholderArt";
import { useRevealTrigger } from "@/hooks/useRevealTrigger";
import { cn } from "@/utils/cn";

/**
 * One vault entry. Locked cards are a <button> that opens the
 * unlock game; unlocked cards are a <Link> straight to the recipe.
 * The lock state is signaled by icon shape, image treatment, and
 * copy — never color alone.
 */
export default function RecipeVaultCard({ recipe, unlocked, onPlay, size = "default", index = 0, className }) {
  const shouldReduceMotion = useReducedMotion();
  const { title, category, icon, tone, image, difficulty, totalTime } = recipe;
  const { ref, inView } = useRevealTrigger();

  const Wrapper = unlocked ? Link : "button";
  const wrapperProps = unlocked
    ? { to: `/recipes/${recipe.slug}` }
    : { type: "button", onClick: () => onPlay(recipe) };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.6,
        delay: shouldReduceMotion ? 0 : Math.min(index * 0.08, 0.32),
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn("group relative isolate overflow-hidden rounded-md border border-cream/10 text-left", className)}
    >
      <Wrapper
        {...wrapperProps}
        className="absolute inset-0 z-20 focus-visible:outline-2 focus-visible:outline-caramel"
        aria-label={unlocked ? `Open ${title} recipe` : `Play Catch the Ingredients to unlock ${title}`}
      />

      <PlaceholderArt
        src={image?.src}
        alt={title}
        tone={tone}
        icon={icon}
        className={cn(
          "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:group-hover:scale-[1.05]",
          !unlocked && "saturate-[0.6] brightness-[0.75]",
        )}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/95 via-espresso/35 to-transparent"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-cream/20 bg-espresso/70 backdrop-blur-sm"
      >
        {unlocked ? (
          <LockOpen size={13} strokeWidth={1.75} className="text-caramel" />
        ) : (
          <Lock size={13} strokeWidth={1.75} className="text-biscuit/70" />
        )}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col gap-2 p-5 sm:p-6">
        <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-caramel/80">
          {category}
        </span>
        <h3
          className={cn(
            "font-display font-medium text-cream",
            size === "large" ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl",
          )}
        >
          {title}
        </h3>
        <div className="flex items-center gap-2 font-sans text-xs text-biscuit/60">
          <span>{totalTime}</span>
          <span aria-hidden="true">·</span>
          <span>{difficulty}</span>
        </div>

        <span
          className={cn(
            "mt-1 inline-flex w-fit items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-wide transition-colors duration-300",
            unlocked ? "text-caramel" : "text-biscuit/70 group-hover:text-cream",
          )}
        >
          {unlocked ? "you earned this" : "want it? earn it."}
          <ArrowRight size={12} strokeWidth={2.5} />
        </span>
      </div>
    </motion.div>
  );
}
