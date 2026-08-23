import { LayoutGroup } from "framer-motion";
import { Search, Shuffle } from "lucide-react";
import CategoryFilters from "@/components/creations/CategoryFilters";
import { cn } from "@/utils/cn";

const AVAILABILITY_OPTIONS = ["Everything", "Recipes Available", "Just Browsing"];
const SORT_OPTIONS = ["Latest", "A–Z"];

/**
 * Search + category tabs + recipe-availability tabs + sort + the
 * "pick one for me" action, all in one controlled cluster. Kept
 * sticky from md up only — on mobile it stays in normal flow so a
 * software keyboard opening never fights a pinned bar for space.
 */
export default function KitchenControls({
  categories,
  activeCategory,
  onCategoryChange,
  search,
  onSearchChange,
  availability,
  onAvailabilityChange,
  sort,
  onSortChange,
  resultCount,
  onPickOne,
  canPickOne,
}) {
  return (
    <div className="md:sticky md:top-24 md:z-30 md:border-b md:border-cream/10 md:bg-espresso/92 md:backdrop-blur-md">
      <div className="flex flex-col gap-5 py-4 sm:py-5 md:gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div className="relative w-full sm:max-w-xs">
            <label htmlFor="kitchen-search" className="sr-only">
              Search creations
            </label>
            <Search
              size={15}
              strokeWidth={2}
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-biscuit/40"
            />
            <input
              id="kitchen-search"
              type="search"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="find something delicious..."
              className="w-full border-b border-cream/15 bg-transparent py-2 pl-6 font-sans text-sm text-cream placeholder:text-biscuit/40 focus:border-caramel focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-5 sm:gap-6">
            <div className="flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-biscuit/50">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => onSortChange(option)}
                  aria-pressed={sort === option}
                  className={cn(
                    "transition-colors duration-300",
                    sort === option ? "text-caramel" : "hover:text-cream",
                  )}
                >
                  {option}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={onPickOne}
              disabled={!canPickOne}
              className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap font-sans text-xs font-semibold uppercase tracking-[0.16em] text-cream/80 transition-colors duration-300 hover:text-caramel disabled:pointer-events-none disabled:opacity-40"
            >
              <Shuffle size={13} strokeWidth={2} aria-hidden="true" />
              Pick One For Me
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <LayoutGroup id="kitchen-category-filters">
            <CategoryFilters categories={categories} active={activeCategory} onChange={onCategoryChange} />
          </LayoutGroup>
          <div className="shrink-0">
            <LayoutGroup id="kitchen-availability-filters">
              <CategoryFilters
                categories={AVAILABILITY_OPTIONS}
                active={availability}
                onChange={onAvailabilityChange}
              />
            </LayoutGroup>
          </div>
        </div>

        <p className="font-sans text-xs uppercase tracking-[0.14em] text-biscuit/40">
          Showing {resultCount} {resultCount === 1 ? "thing" : "things"}
          {resultCount > 0 ? " that survived the filter." : "."}
        </p>
      </div>
    </div>
  );
}
