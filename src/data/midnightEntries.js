import { CakeSlice, Coffee, Croissant, Flame, Wheat } from "lucide-react";

/**
 * The Midnight Menu archive. These are DEMO / PLACEHOLDER entries —
 * fictional late-night kitchen experiments written in the site's
 * voice, not real personal experiences. Replace freely later.
 *
 * `layoutHint` drives the irregular archive composition in
 * MidnightArchive.jsx: large (featured), tall (narrow vertical),
 * wide, note (typography-only, no image), classified (obscured
 * hold-to-peek entry), small.
 */
export const midnightEntries = [
  {
    id: "brown-butter-espresso-cookies",
    type: "EXPERIMENT",
    title: "Brown Butter Espresso Cookies",
    time: "12:43 AM",
    image: { src: null },
    tone: "caramel",
    icon: Coffee,
    shortDescription: "More coffee in dessert felt like a reasonable decision.",
    hiddenNote: "Would absolutely test again.",
    status: "promising",
    relatedRecipeSlug: "brown-butter-chocolate-chip-cookies",
    layoutHint: "large",
  },
  {
    id: "the-croissant-situation",
    type: "FAILED SUCCESSFULLY",
    title: "The Croissant Situation",
    time: "1:26 AM",
    image: { src: null },
    tone: "biscuit",
    icon: Croissant,
    shortDescription: "Technically laminated. Emotionally complicated.",
    hiddenNote: "we don't talk about batch one.",
    status: "needs therapy",
    relatedRecipeSlug: null,
    layoutHint: "tall",
  },
  {
    id: "chilli-chocolate-brownies",
    type: "QUESTIONABLE DECISION",
    title: "Chilli Chocolate Brownies",
    time: "2:04 AM",
    image: { src: null },
    tone: "cherry",
    icon: Flame,
    shortDescription: "Started as curiosity. Escalated quickly.",
    hiddenNote: "annoyingly, this might actually work.",
    status: "under investigation",
    relatedRecipeSlug: null,
    layoutHint: "wide",
  },
  {
    id: "salt-fixes-more-things",
    type: "2:17 AM NOTE",
    title: "Salt fixes more things than expected.",
    time: null,
    image: { src: null },
    tone: "chocolate",
    icon: null,
    shortDescription: "A very short kitchen thought.",
    hiddenNote: "including bad caramel decisions.",
    status: null,
    relatedRecipeSlug: null,
    layoutHint: "note",
  },
  {
    id: "tiramisu-something",
    type: "UNRELEASED",
    title: "Tiramisu Something",
    time: "11:58 PM",
    image: { src: null },
    tone: "chocolate",
    icon: CakeSlice,
    shortDescription: "Not quite tiramisu. Not quite anything else.",
    hiddenNote: "needs one more attempt.",
    status: "classified",
    relatedRecipeSlug: "tiramisu",
    layoutHint: "classified",
  },
  {
    id: "leftover-dough-situation",
    type: "ACCIDENTALLY GOOD",
    title: "Leftover Dough Situation",
    time: "12:31 AM",
    image: { src: null },
    tone: "biscuit",
    icon: Wheat,
    shortDescription: "No plan. Suspiciously successful.",
    hiddenNote: "this is how recipes become problems.",
    status: "repeat immediately",
    relatedRecipeSlug: "garlic-focaccia",
    layoutHint: "small",
  },
];

export const kitchenConfessions = [
  "I never measure vanilla with my heart. I measure it with recklessness.",
  "Every recipe saying “let cool completely” is personally attacking me.",
  "Brown butter is worth washing one extra pan.",
  "Preheating the oven is unfortunately not optional.",
];
