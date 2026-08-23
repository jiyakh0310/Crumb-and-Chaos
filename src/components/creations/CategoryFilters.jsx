import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

/**
 * Editorial tab-style filters (not SaaS filter chips) — same
 * underline language as the navbar's active-route state, just
 * animated between selections via layoutId.
 */
export default function CategoryFilters({ categories, active, onChange }) {
  return (
    <div
      className="flex gap-6 overflow-x-auto border-b border-cream/10 [&::-webkit-scrollbar]:hidden sm:gap-8"
      style={{ scrollbarWidth: "none" }}
    >
      {categories.map((category) => {
        const isActive = category === active;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            aria-pressed={isActive}
            className={cn(
              "relative shrink-0 whitespace-nowrap pb-4 font-sans text-xs font-semibold uppercase tracking-[0.18em] transition-colors duration-300",
              isActive ? "text-caramel" : "text-biscuit/60 hover:text-cream",
            )}
          >
            {category}
            {isActive ? (
              <motion.span
                layoutId="category-underline"
                className="absolute inset-x-0 bottom-0 h-px bg-caramel"
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
