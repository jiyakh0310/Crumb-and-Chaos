import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/motion/Reveal";
import FadeUp from "@/components/motion/FadeUp";
import JournalCard from "@/components/journal/JournalCard";
import CategoryFilters from "@/components/creations/CategoryFilters";
import { getJournalPostsByDate, journalCategories } from "@/data/journalPosts";
import { cn } from "@/utils/cn";

const LAYOUT_SPAN = {
  large: "lg:col-span-4 lg:row-span-2",
  tall: "lg:col-span-2 lg:row-span-2",
  wide: "lg:col-span-4 lg:row-span-1",
  small: "lg:col-span-2 lg:row-span-1",
};

const ASPECT_RATIO = {
  large: "aspect-[4/5]",
  tall: "aspect-[4/5]",
  wide: "aspect-[16/10]",
  small: "aspect-[16/10]",
};

/**
 * The editorial rhythm (large hero, then a tall companion, then
 * wide/wide/small) is derived from position in the sorted/filtered
 * list rather than stored per-post — that way "newest first" always
 * wins as the real sort order, and the hero treatment always lands
 * on whichever post is actually first instead of drifting to
 * wherever a hardcoded slug happens to sort.
 */
function getLayoutHint(index) {
  if (index === 0) return "large";
  if (index === 1) return "tall";
  return (index - 2) % 3 === 2 ? "small" : "wide";
}

export default function BakeJournal() {
  const [activeCategory, setActiveCategory] = useState("All");
  const posts = getJournalPostsByDate();
  const filtered = activeCategory === "All" ? posts : posts.filter((post) => post.category === activeCategory);

  return (
    <div className="relative overflow-hidden pb-24 pt-32 sm:pb-32 sm:pt-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-caramel/10 blur-3xl"
      />

      <Container className="relative flex flex-col gap-12 sm:gap-16">
        <div className="flex max-w-2xl flex-col gap-5">
          <FadeUp>
            <Eyebrow>The Bake Journal</Eyebrow>
          </FadeUp>
          <Reveal>
            <h1 className="text-balance font-display text-5xl font-medium leading-[1.05] text-cream sm:text-6xl lg:text-7xl">
              Notes, messes &amp; things I learned.
            </h1>
          </Reveal>
          <FadeUp delay={0.1} className="font-sans text-base leading-relaxed text-biscuit sm:text-lg">
            A running record of what happened in the kitchen.
          </FadeUp>
        </div>

        <CategoryFilters categories={journalCategories} active={activeCategory} onChange={setActiveCategory} />

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-flow-row-dense lg:grid-cols-6 lg:auto-rows-[14rem] lg:gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((post, index) => {
                const hint = getLayoutHint(index);
                return (
                  <JournalCard
                    key={post.id}
                    post={post}
                    size={hint === "large" ? "large" : hint === "small" ? "compact" : "default"}
                    index={index}
                    className={cn(
                      ASPECT_RATIO[hint],
                      "lg:aspect-auto",
                      hint === "large" && "sm:col-span-2",
                      LAYOUT_SPAN[hint],
                    )}
                  />
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 border border-dashed border-cream/15 py-16 text-center">
            <p className="font-display text-2xl text-cream">nothing filed under this yet.</p>
            <p className="font-sans text-sm text-biscuit/70">check back after the next kitchen incident.</p>
          </div>
        )}
      </Container>
    </div>
  );
}
