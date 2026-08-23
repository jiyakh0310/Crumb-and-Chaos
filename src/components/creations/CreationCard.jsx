import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PlaceholderArt from "@/components/ui/PlaceholderArt";
import { useRevealTrigger } from "@/hooks/useRevealTrigger";
import { cn } from "@/utils/cn";

/**
 * A single editorial gallery entry. Whole card is one link through
 * to its (placeholder) recipe route; hover/reveal treatment only
 * activates at lg where a real hover exists — on touch, the note is
 * simply always visible.
 */
export default function CreationCard({ creation, index = 0, className }) {
  const { id, title, category, note, image, icon, tone, featured } = creation;
  const shouldReduceMotion = useReducedMotion();
  const { ref, inView } = useRevealTrigger();

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -12, transition: { duration: 0.3 } }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.6,
        delay: shouldReduceMotion ? 0 : Math.min(index * 0.05, 0.3),
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn("group relative isolate overflow-hidden rounded-md border border-cream/10", className)}
    >
      <Link to={`/recipes/${id}`} className="absolute inset-0 z-20" aria-label={title}>
        <span className="sr-only">{title}</span>
      </Link>

      <PlaceholderArt
        src={image?.src}
        alt={title}
        tone={tone}
        icon={icon}
        className="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:group-hover:scale-[1.05]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/95 via-espresso/30 to-transparent opacity-90 transition-opacity duration-500 lg:group-hover:opacity-100"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-500 lg:group-hover:border-caramel/40"
      />

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
            taste
            <ArrowRight size={12} strokeWidth={2.5} />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
