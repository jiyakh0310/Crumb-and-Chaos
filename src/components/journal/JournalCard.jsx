import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PlaceholderArt from "@/components/ui/PlaceholderArt";
import { formatJournalDate } from "@/utils/text";
import { useRevealTrigger } from "@/hooks/useRevealTrigger";
import { cn } from "@/utils/cn";

/**
 * One journal entry, used by both the homepage teaser and the full
 * /journal listing — `size` controls the typographic scale so the
 * same card can play "featured" or "supporting" depending on where
 * it's placed in the surrounding grid.
 */
export default function JournalCard({ post, size = "default", index = 0, className }) {
  const shouldReduceMotion = useReducedMotion();
  const { slug, title, category, excerpt, date, readingTime, coverImage } = post;
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
      <Link to={`/journal/${slug}`} className="absolute inset-0 z-20" aria-label={title}>
        <span className="sr-only">{title}</span>
      </Link>

      <PlaceholderArt
        src={coverImage?.src}
        alt={title}
        tone={coverImage?.tone}
        icon={coverImage?.icon}
        className="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:group-hover:scale-[1.05]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/95 via-espresso/40 to-transparent opacity-90 transition-opacity duration-500 lg:group-hover:opacity-100"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-500 lg:group-hover:border-caramel/40"
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5 sm:p-6">
        <div className="flex items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-caramel/80">
          <span>{category}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={date}>{formatJournalDate(date)}</time>
        </div>

        <h3
          className={cn(
            "font-display font-medium text-cream transition-transform duration-500 ease-out lg:group-hover:-translate-y-1",
            size === "large" ? "text-2xl sm:text-3xl lg:text-4xl" : "text-lg sm:text-xl",
          )}
        >
          {title}
        </h3>

        <p
          className={cn(
            "font-sans leading-relaxed text-biscuit/80",
            size === "large" ? "max-w-md text-sm sm:text-base" : "text-xs sm:text-sm",
            size === "compact" && "hidden sm:block",
          )}
        >
          {excerpt}
        </p>

        <div className="flex items-center gap-3 pt-1">
          <span className="whitespace-nowrap font-sans text-xs text-biscuit/50 opacity-0 transition-opacity duration-500 lg:group-hover:opacity-100">
            {readingTime}
          </span>
          <span className="hidden shrink-0 items-center gap-1 whitespace-nowrap font-sans text-xs font-semibold uppercase tracking-wide text-caramel opacity-0 transition-all duration-500 lg:flex lg:translate-x-1 lg:group-hover:translate-x-0 lg:group-hover:opacity-100">
            read note
            <ArrowRight size={12} strokeWidth={2.5} />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
