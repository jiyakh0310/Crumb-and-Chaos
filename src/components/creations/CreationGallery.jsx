import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import CreationCard from "./CreationCard";
import CategoryFilters from "./CategoryFilters";
import { categories, creations, HOMEPAGE_CREATIONS_COUNT } from "@/data/creations";
import { cn } from "@/utils/cn";

const LAYOUT_SPAN = {
  large: "lg:col-span-4 lg:row-span-2",
  tall: "lg:col-span-2 lg:row-span-2",
  wide: "lg:col-span-3 lg:row-span-1",
};

// The homepage teaser only ever shows the original "survivors" set —
// full-archive demo creations added later live on /kitchen instead.
const homepageCreations = creations.slice(0, HOMEPAGE_CREATIONS_COUNT);

export default function CreationGallery() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? homepageCreations
        : homepageCreations.filter((c) => c.category === activeCategory),
    [activeCategory],
  );

  return (
    <div className="flex flex-col gap-10 sm:gap-12">
      <CategoryFilters categories={categories} active={activeCategory} onChange={setActiveCategory} />

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-flow-row-dense lg:grid-cols-6 lg:auto-rows-[13rem] lg:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((creation, index) => (
              <CreationCard
                key={creation.id}
                creation={creation}
                index={index}
                className={cn(
                  creation.aspectRatio,
                  "lg:aspect-auto",
                  creation.featured && "sm:col-span-2",
                  LAYOUT_SPAN[creation.layoutHint],
                )}
              />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 border border-dashed border-cream/15 py-16 text-center">
          <p className="font-display text-2xl text-cream">nothing here yet.</p>
          <p className="font-sans text-sm text-biscuit/70">still experimenting — check back soon.</p>
        </div>
      )}
    </div>
  );
}
