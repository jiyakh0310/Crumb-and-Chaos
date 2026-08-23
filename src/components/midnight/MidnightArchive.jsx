import GameModal from "@/components/games/GameModal";
import IngredientCatchGame from "@/components/games/IngredientCatchGame";
import MidnightEntryCard from "./MidnightEntryCard";
import ClassifiedEntry from "./ClassifiedEntry";
import { midnightEntries } from "@/data/midnightEntries";
import { getRecipeBySlug } from "@/data/recipes";
import { useRecipeVault } from "@/hooks/useRecipeVault";
import { cn } from "@/utils/cn";

const LAYOUT_SPAN = {
  large: "lg:col-span-4 lg:row-span-2",
  tall: "lg:col-span-2 lg:row-span-2",
  wide: "lg:col-span-3 lg:row-span-1",
  note: "lg:col-span-3 lg:row-span-1",
  classified: "lg:col-span-3 lg:row-span-1",
  small: "lg:col-span-3 lg:row-span-1",
};

const ASPECT_RATIO = {
  large: "aspect-[4/5]",
  tall: "aspect-[4/5]",
  wide: "aspect-[16/10]",
  note: "aspect-square sm:aspect-[16/10]",
  classified: "aspect-[16/10]",
  small: "aspect-[16/10]",
};

/**
 * The irregular archive grid — same proven grid-flow-dense
 * technique used by From the Kitchen and the Bake Journal listing,
 * with entry-type-specific rendering layered on top.
 */
export default function MidnightArchive() {
  const { isUnlocked, activeRecipe, modalOpen, sessionKey, openGame, closeGame, handleWin } = useRecipeVault();

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-flow-row-dense lg:grid-cols-6 lg:auto-rows-[13rem] lg:gap-6">
        {midnightEntries.map((entry, index) => {
          const relatedRecipe = entry.relatedRecipeSlug ? getRecipeBySlug(entry.relatedRecipeSlug) : null;
          const unlocked = relatedRecipe ? isUnlocked(relatedRecipe.slug) : false;
          const spanClass = cn(ASPECT_RATIO[entry.layoutHint], "lg:aspect-auto", LAYOUT_SPAN[entry.layoutHint]);

          if (entry.layoutHint === "classified") {
            return (
              <ClassifiedEntry
                key={entry.id}
                entry={entry}
                relatedRecipe={relatedRecipe}
                unlocked={unlocked}
                onPlayRecipe={openGame}
                index={index}
                className={spanClass}
              />
            );
          }

          return (
            <MidnightEntryCard
              key={entry.id}
              entry={entry}
              relatedRecipe={relatedRecipe}
              unlocked={unlocked}
              onPlayRecipe={openGame}
              index={index}
              className={spanClass}
            />
          );
        })}
      </div>

      <GameModal
        open={modalOpen}
        onClose={closeGame}
        title={activeRecipe ? `Catch the Ingredients — ${activeRecipe.title}` : "Catch the Ingredients"}
      >
        {activeRecipe ? (
          <IngredientCatchGame key={sessionKey} recipe={activeRecipe} onWin={handleWin} onClose={closeGame} />
        ) : null}
      </GameModal>
    </>
  );
}
