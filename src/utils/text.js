export function humanizeSlug(slug = "") {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * "2025-11-02" -> "November 2, 2025", for pairing with a semantic
 * <time dateTime="2025-11-02"> element.
 */
export function formatJournalDate(isoDate) {
  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return isoDate;
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
