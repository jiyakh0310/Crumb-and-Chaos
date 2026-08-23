const FRACTIONS = [
  [0.125, "⅛"],
  [0.166, "⅙"],
  [0.2, "⅕"],
  [0.25, "¼"],
  [0.333, "⅓"],
  [0.375, "⅜"],
  [0.4, "⅖"],
  [0.5, "½"],
  [0.6, "⅗"],
  [0.625, "⅝"],
  [0.666, "⅔"],
  [0.75, "¾"],
  [0.8, "⅘"],
  [0.833, "⅚"],
  [0.875, "⅞"],
];

/**
 * Formats a scaled numeric quantity for display, preferring a
 * common cooking fraction (½, ¾, …) over an ugly decimal.
 */
export function formatQuantity(value) {
  if (typeof value !== "number" || Number.isNaN(value)) return "";

  const rounded = Math.round(value * 1000) / 1000;
  const whole = Math.floor(rounded);
  const frac = Math.round((rounded - whole) * 1000) / 1000;

  if (frac < 0.02) return String(whole === 0 && rounded > 0 ? rounded : whole);

  let closest = FRACTIONS[0];
  for (const entry of FRACTIONS) {
    if (Math.abs(entry[0] - frac) < Math.abs(closest[0] - frac)) closest = entry;
  }

  if (Math.abs(closest[0] - frac) < 0.04) {
    return whole > 0 ? `${whole}${closest[1]}` : closest[1];
  }

  return String(Math.round(rounded * 4) / 4);
}

/**
 * Renders one ingredient's amount at the given multiplier. Only
 * items with an explicit numeric `quantity` scale — free-text
 * amounts ("a pinch", "to taste") are left exactly as written.
 */
export function scaleIngredient(item, multiplier) {
  if (typeof item.quantity !== "number") {
    return item.amount ?? "";
  }
  const formatted = formatQuantity(item.quantity * multiplier);
  return item.unit ? `${formatted} ${item.unit}`.trim() : formatted;
}

function parseSimpleDuration(value) {
  const match = /^(\d+)\s*(min|hr)$/i.exec(value?.trim() ?? "");
  if (!match) return null;
  const amount = Number(match[1]);
  return match[2].toLowerCase() === "hr" ? amount * 60 : amount;
}

/**
 * Best-effort prep+cook sum, used only as a fallback — most of
 * these recipes have real waiting time a naive sum can't capture,
 * so an authored `totalTime` always wins when present.
 */
export function deriveTotalTime(prepTime, cookTime) {
  const prep = parseSimpleDuration(prepTime);
  const cook = parseSimpleDuration(cookTime);
  if (prep == null || cook == null) return null;

  const total = prep + cook;
  if (total < 60) return `${total} min`;
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  return minutes === 0 ? `${hours} hr` : `${hours} hr ${minutes} min`;
}

export function getTotalTime(recipe) {
  return recipe.totalTime || deriveTotalTime(recipe.prepTime, recipe.cookTime) || "—";
}

/**
 * Seconds -> "12:00" or "1:30:00" once past an hour.
 */
export function formatTimer(totalSeconds) {
  const safe = Math.max(0, Math.round(totalSeconds));
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const seconds = safe % 60;
  const mm = hours > 0 ? String(minutes).padStart(2, "0") : String(minutes);
  const ss = String(seconds).padStart(2, "0");
  return hours > 0 ? `${hours}:${mm}:${ss}` : `${mm}:${ss}`;
}
