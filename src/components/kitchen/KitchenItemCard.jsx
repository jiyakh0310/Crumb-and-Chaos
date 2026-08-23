import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PlaceholderArt from "@/components/ui/PlaceholderArt";
import { getRecipeBySlug } from "@/data/recipes";
import { getCreationStatus } from "@/utils/creationStatus";
import { useRevealTrigger } from "@/hooks/useRevealTrigger";
import { cn } from "@/utils/cn";

/**
 * One archive entry. Mirrors RecipeVaultCard's proven Wrapper
 * pattern (whole card is either a real <Link> or an unlock
 * <button>), extended with a third state: creations with no recipe
 * link straight to their own /kitchen/:slug detail page.
 */
export default function KitchenItemCard({ creation, isUnlocked, onPlay, index = 0, className }) {
  const shouldReduceMotion = useReducedMotion();
  const { title, category, note, image, icon, tone, featured, recipeSlug } = creation;

  const recipe = recipeSlug ? getRecipeBySlug(recipeSlug) : null;
  const status = getCreationStatus(creation, isUnlocked);
  const StatusIcon = status.icon;
  const { ref, inView } = useRevealTrigger();

  let Wrapper = Link;
  let wrapperProps = { to: `/kitchen/${creation.slug}` };
  if (recipe) {
    if (isUnlocked(recipe.slug)) {
      wrapperProps = { to: `/recipes/${recipe.slug}` };
    } else {
      Wrapper = "button";
      wrapperProps = { type: "button", onClick: () => onPlay(recipe) };
    }
  }

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -12, transition: { duration: 0.3 } }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.6,
        delay: shouldReduceMotion ? 0 : Math.min(index * 0.04, 0.3),
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn("group relative isolate overflow-hidden rounded-md border border-cream/10 text-left", className)}
    >
      <Wrapper
        {...wrapperProps}
        className="absolute inset-0 z-20 focus-visible:outline-2 focus-visible:outline-caramel"
        aria-label={
          recipe
            ? isUnlocked(recipe.slug)
              ? `Open ${title} recipe`
              : `Play Catch the Ingredients to unlock ${title}`
            : `View ${title} in the archive`
        }
      />

      <PlaceholderArt
        src={image?.src}
        alt={title}
        tone={tone}
        icon={icon}
        className="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:group-hover:scale-[1.05]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/95 via-espresso/35 to-transparent opacity-90 transition-opacity duration-500 lg:group-hover:opacity-100"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-500 lg:group-hover:border-caramel/40"
      />

      {featured ? (
        <span className="pointer-events-none absolute left-4 top-4 z-10 font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-cream/70">
          Featured
        </span>
      ) : null}

      <div className="pointer-events-none absolute right-4 top-4 z-10 flex items-center gap-1.5 rounded-full border border-cream/20 bg-espresso/70 px-2.5 py-1 backdrop-blur-sm">
        <StatusIcon size={11} strokeWidth={1.75} className="text-biscuit/80" aria-hidden="true" />
        <span className="whitespace-nowrap font-sans text-[9px] font-semibold uppercase tracking-[0.14em] text-biscuit/80">
          {status.label}
        </span>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-5 sm:p-6">
        <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-caramel/80">
          {category}
        </span>

        <h3
          className={cn(
            "font-display font-medium text-cream transition-transform duration-500 ease-out lg:group-hover:-translate-y-1",
            featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl",
          )}
        >
          {title}
        </h3>

        <div className="flex items-end justify-between gap-3 pt-1">
          <p className="font-hand text-lg leading-snug text-biscuit/70 lg:translate-y-2 lg:opacity-0 lg:transition-all lg:duration-500 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
            {note}
          </p>
          <span className="hidden shrink-0 items-center gap-1 whitespace-nowrap pb-0.5 font-sans text-xs font-semibold uppercase tracking-wide text-caramel opacity-0 transition-all duration-500 lg:flex lg:translate-x-1 lg:group-hover:translate-x-0 lg:group-hover:opacity-100">
            {status.cta}
            <ArrowRight size={12} strokeWidth={2.5} />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
