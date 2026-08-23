const STORAGE_KEY = "crumb-chaos:unlocked-recipes";

/**
 * Centralized localStorage access for recipe unlocks. Every call
 * re-reads from storage rather than caching, so it's always in sync
 * across a refresh — and every read/write is wrapped so a missing,
 * disabled, or corrupted localStorage never crashes the app.
 */
function readSlugs() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((slug) => typeof slug === "string") : [];
  } catch {
    return [];
  }
}

function writeSlugs(slugs) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  } catch {
    // localStorage unavailable (private mode, disabled, quota exceeded) —
    // the unlock simply won't persist past this session.
  }
}

export function getUnlockedSlugs() {
  return readSlugs();
}

export function isRecipeUnlocked(slug) {
  return readSlugs().includes(slug);
}

export function unlockRecipe(slug) {
  const current = readSlugs();
  if (current.includes(slug)) return current;
  const next = [...current, slug];
  writeSlugs(next);
  return next;
}
