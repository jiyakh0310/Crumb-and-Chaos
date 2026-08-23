import { AnimatePresence } from "framer-motion";
import KitchenItemCard from "./KitchenItemCard";
import { cn } from "@/utils/cn";

const LAYOUT_SPAN = {
  hero: "lg:col-span-4 lg:row-span-2",
  portrait: "lg:col-span-2 lg:row-span-2",
  standard: "lg:col-span-3 lg:row-span-1",
  wide: "lg:col-span-6 lg:row-span-1",
};

const ASPECT_RATIO = {
  hero: "aspect-[4/5]",
  portrait: "aspect-[3/4]",
  standard: "aspect-[4/3]",
  wide: "aspect-[21/9]",
};

// large + narrow, two medium, full-width feature, three varied — a
// fixed 8-item rhythm keyed off position, so it never reshuffles on
// its own and stays intentional however the filtered list changes.
const RHYTHM = ["hero", "portrait", "standard", "standard", "wide", "standard", "standard", "standard"];

function getLayoutHint(index) {
  return RHYTHM[index % RHYTHM.length];
}

export default function KitchenGallery({ creations, isUnlocked, onPlay }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-flow-row-dense lg:grid-cols-6 lg:auto-rows-[13rem] lg:gap-6">
      <AnimatePresence mode="popLayout">
        {creations.map((creation, index) => {
          const hint = getLayoutHint(index);
          return (
            <KitchenItemCard
              key={creation.id}
              creation={creation}
              isUnlocked={isUnlocked}
              onPlay={onPlay}
              index={index}
              className={cn(
                creation.aspectRatio ?? ASPECT_RATIO[hint],
                "lg:aspect-auto",
                hint === "hero" && "sm:col-span-2",
                LAYOUT_SPAN[hint],
              )}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}
