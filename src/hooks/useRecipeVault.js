import { useCallback, useState } from "react";
import { getUnlockedSlugs, unlockRecipe } from "@/utils/recipeUnlocks";

/**
 * Shared "which recipe is being played" + "what's unlocked" state,
 * reused by both the homepage teaser and the full /recipes listing
 * so neither has to duplicate the game-open/close/win wiring.
 */
export function useRecipeVault() {
  const [unlockedSlugs, setUnlockedSlugs] = useState(() => getUnlockedSlugs());
  const [activeRecipe, setActiveRecipe] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [sessionKey, setSessionKey] = useState(0);

  const isUnlocked = useCallback((slug) => unlockedSlugs.includes(slug), [unlockedSlugs]);

  const openGame = useCallback((recipe) => {
    setActiveRecipe(recipe);
    setSessionKey((key) => key + 1);
    setModalOpen(true);
  }, []);

  const closeGame = useCallback(() => setModalOpen(false), []);

  const handleWin = useCallback((slug) => {
    unlockRecipe(slug);
    setUnlockedSlugs((prev) => (prev.includes(slug) ? prev : [...prev, slug]));
  }, []);

  return {
    unlockedSlugs,
    isUnlocked,
    activeRecipe,
    modalOpen,
    sessionKey,
    openGame,
    closeGame,
    handleWin,
  };
}
