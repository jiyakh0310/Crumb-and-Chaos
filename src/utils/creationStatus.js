import { Clock, Eye, FlaskConical, Lock, LockOpen } from "lucide-react";

/**
 * The one place that turns a creation + the live unlock state into a
 * display status. Recipe availability is never stored in data — it's
 * derived from `isUnlocked` every time, so it can never drift out of
 * sync with the Recipe Vault's own localStorage-backed state.
 */
export function getCreationStatus(creation, isUnlocked) {
  if (creation.recipeSlug) {
    return isUnlocked(creation.recipeSlug)
      ? { key: "recipe-available", label: "Recipe Available", cta: "Get the Recipe", icon: LockOpen }
      : { key: "recipe-locked", label: "Locked Recipe", cta: "Get the Recipe", icon: Lock };
  }

  if (creation.status === "experiment") {
    return { key: "experiment", label: "Experiment", cta: "Under Investigation", icon: FlaskConical };
  }

  if (creation.status === "coming-soon") {
    return { key: "coming-soon", label: "Recipe Coming Later", cta: "Peek Anyway", icon: Clock };
  }

  return { key: "showcase-only", label: "Just Here to Look Pretty", cta: "Just Admire It", icon: Eye };
}
