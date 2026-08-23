import { CakeSlice, Cookie, Flame, Hourglass, Wheat } from "lucide-react";

/**
 * The Bake Journal dataset. Demo/sample entries, not real personal
 * history — written in the site's established first-person voice
 * but describing generic, archetypal kitchen moments rather than
 * claiming specific real events.
 *
 * `sections` is a small structured-content model (paragraph /
 * heading / quote / image / note) instead of one giant string, so
 * the article renderer can lay each block out intentionally.
 */
export const journalCategories = [
  "All",
  "Kitchen Notes",
  "Obsessions",
  "Failed Successfully",
  "Lessons From The Oven",
  "Slow Things",
];

export const journalPosts = [
  {
    id: "the-day-i-finally-understood-cheesecake",
    slug: "the-day-i-finally-understood-cheesecake",
    title: "The Day I Finally Understood Cheesecake",
    category: "Lessons From The Oven",
    date: "2025-11-02",
    excerpt:
      "Three cracked, one collapsed, and one finally taught me what cheesecake actually wants from a person.",
    coverImage: { src: null, tone: "caramel", icon: CakeSlice },
    readingTime: "5 min read",
    featured: true,
    relatedRecipeSlug: "burnt-basque-cheesecake",
    sections: [
      {
        type: "paragraph",
        text: "Cheesecake has a reputation for being fussy, and for a long time I agreed with it. Every attempt came out of the oven looking fine and came out of the fridge looking like a crime scene — cracked down the middle, sunk at the edges, or both.",
      },
      {
        type: "paragraph",
        text: "I tried water baths. I tried lower ovens. I tried opening the door a crack and leaving the cheesecake to cool inside like it was recovering from surgery. Some of it helped. None of it felt like understanding.",
      },
      {
        type: "quote",
        text: "Some recipes only make sense after you mess them up once.",
      },
      {
        type: "heading",
        text: "What Actually Changed",
      },
      {
        type: "paragraph",
        text: "The shift happened when I stopped trying to make a neat cheesecake and started making a burnt basque one instead — the kind that's supposed to look a little wrecked on top. Once the goal was 'deeply caramelized and slightly collapsed,' every instinct I'd built up fighting cracks suddenly worked in my favor.",
      },
      {
        type: "image",
        alt: "A dark, deeply caramelized cheesecake cooling on a wire rack",
        tone: "caramel",
        icon: CakeSlice,
      },
      {
        type: "note",
        text: "this looked much worse before it looked better.",
      },
      {
        type: "paragraph",
        text: "It turns out the fussy version and the confident version use almost the same batter. The only real difference is what you're afraid of. Once I stopped being afraid of a crack, cheesecake stopped being a fight.",
      },
    ],
  },
  {
    id: "why-browned-butter-fixes-almost-everything",
    slug: "why-browned-butter-fixes-almost-everything",
    title: "Why Browned Butter Fixes Almost Everything",
    category: "Obsessions",
    date: "2025-11-18",
    excerpt:
      "It takes four extra minutes and makes almost anything taste like it was made on purpose.",
    coverImage: { src: null, tone: "chocolate", icon: Flame },
    readingTime: "4 min read",
    featured: true,
    relatedRecipeSlug: "brown-butter-chocolate-chip-cookies",
    sections: [
      {
        type: "paragraph",
        text: "At some point I started browning butter for things that had no business being browned — vinaigrettes, popcorn, scrambled eggs on a slow morning. It has become less of a technique and more of a personality trait.",
      },
      {
        type: "paragraph",
        text: "The process is almost insultingly simple: butter, a pan, medium heat, and the patience to not walk away. The milk solids go from foam to gold to a deep, nutty brown in the space of a few minutes, and somewhere in there plain butter turns into something that tastes like a decision was made.",
      },
      {
        type: "heading",
        text: "The Part Everyone Skips",
      },
      {
        type: "paragraph",
        text: "The mistake I made for years was pulling the pan the moment it smelled good. Good is the checkpoint before great — the real flavor shows up about thirty seconds after you're nervous it's about to burn. Trusting that thirty seconds is the whole skill.",
      },
      {
        type: "quote",
        text: "It smells like a decision has been made.",
      },
      {
        type: "paragraph",
        text: "Cookies were the gateway. Once brown butter cookies ruined regular cookies for me, there was no putting it back in the tub.",
      },
    ],
  },
  {
    id: "my-first-focaccia-disaster",
    slug: "my-first-focaccia-disaster",
    title: "My First Focaccia Disaster",
    category: "Failed Successfully",
    date: "2025-12-05",
    excerpt:
      "A dough so wet it nearly escaped the bowl, and the slow realization that this was somehow correct.",
    coverImage: { src: null, tone: "biscuit", icon: Wheat },
    readingTime: "6 min read",
    featured: true,
    relatedRecipeSlug: "garlic-focaccia",
    sections: [
      {
        type: "paragraph",
        text: "My first focaccia attempt looked less like bread dough and more like a science experiment that had gotten out of hand. It stuck to my hands, the bowl, the counter, and briefly a spatula that was only trying to help.",
      },
      {
        type: "paragraph",
        text: "Every instinct said add more flour. Every instinct was wrong. I added a little anyway, because instincts are hard to ignore at eleven at night, and the result was a dense, slightly sad loaf that rose about half as much as it should have.",
      },
      {
        type: "heading",
        text: "The Second Attempt",
      },
      {
        type: "paragraph",
        text: "The next time, I left the dough exactly as wet and unreasonable as the recipe insisted, dimpled it with oiled fingers instead of fighting it into shape, and walked away for an hour instead of hovering. It rose like it had somewhere to be.",
      },
      {
        type: "image",
        alt: "A golden, deeply dimpled focaccia fresh out of the oven",
        tone: "biscuit",
        icon: Wheat,
      },
      {
        type: "note",
        text: "patience was unfortunately required.",
      },
      {
        type: "paragraph",
        text: "The crumb was open and airy in a way the first loaf never got close to. The lesson, annoyingly, was to trust the mess instead of correcting it.",
      },
    ],
  },
  {
    id: "things-i-learned-after-making-too-many-cookies",
    slug: "things-i-learned-after-making-too-many-cookies",
    title: "Things I Learned After Making Too Many Cookies",
    category: "Kitchen Notes",
    date: "2025-12-20",
    excerpt:
      "A running list of small, slightly obsessive lessons collected somewhere around batch number twelve.",
    coverImage: { src: null, tone: "caramel", icon: Cookie },
    readingTime: "4 min read",
    featured: false,
    relatedRecipeSlug: null,
    sections: [
      {
        type: "paragraph",
        text: "There is a specific kind of knowledge that only shows up after making the same thing enough times that it stops being a recipe and starts being a set of opinions. Cookies got me there faster than anything else in the kitchen.",
      },
      {
        type: "heading",
        text: "Small Things That Turned Out To Matter",
      },
      {
        type: "paragraph",
        text: "Chilled dough spreads less and tastes better — not marginally, noticeably. Slightly underbaking is not a mistake, it's the entire point. And a pinch of flaky salt on top does more work than an extra half cup of sugar in the dough.",
      },
      {
        type: "quote",
        text: "Would absolutely do this again, and did, several times, on purpose.",
      },
      {
        type: "paragraph",
        text: "None of this is complicated. It's just the kind of thing you only really learn by making a slightly excessive number of cookies over a slightly excessive number of weekends.",
      },
    ],
  },
  {
    id: "why-some-recipes-are-worth-waiting-for",
    slug: "why-some-recipes-are-worth-waiting-for",
    title: "Why Some Recipes Are Worth Waiting For",
    category: "Slow Things",
    date: "2026-01-10",
    excerpt:
      "On the recipes that ask for six hours of doing nothing, and why that's occasionally the entire appeal.",
    coverImage: { src: null, tone: "cherry", icon: Hourglass },
    readingTime: "5 min read",
    featured: false,
    relatedRecipeSlug: "tiramisu",
    sections: [
      {
        type: "paragraph",
        text: "Most weeknight cooking is optimized for speed, and most of the time that's the correct call. But there is a small category of recipes that are good specifically because they refuse to be rushed, and I've come around to genuinely liking that about them.",
      },
      {
        type: "paragraph",
        text: "Tiramisu is the clearest example. There's real active work in it — brewing coffee, whisking a cream, layering ladyfingers — but the thing that actually makes it good is six hours in the fridge doing, from the outside, nothing at all.",
      },
      {
        type: "heading",
        text: "What The Waiting Actually Does",
      },
      {
        type: "paragraph",
        text: "The layers need time to soften into each other. Rush it and you get separate components stacked in a dish; wait and you get something that tastes like it was always one thing. The chilling isn't downtime, it's the last ingredient.",
      },
      {
        type: "note",
        text: "would absolutely do this again.",
      },
      {
        type: "paragraph",
        text: "I've started treating the wait as part of the recipe instead of an obstacle before it. It's a strange kind of cooking that mostly involves closing the fridge door and finding something else to do for a while.",
      },
    ],
  },
];

export function getJournalPostBySlug(slug) {
  return journalPosts.find((post) => post.slug === slug);
}

/**
 * Newest first, for the listing page and homepage teaser.
 */
export function getJournalPostsByDate() {
  return [...journalPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getFeaturedJournalPosts(count = 3) {
  return getJournalPostsByDate()
    .filter((post) => post.featured)
    .slice(0, count);
}

/**
 * Previous/next walk the data array itself (chronological, oldest
 * first) rather than the display order, so navigation always moves
 * through the journal's own timeline.
 */
export function getAdjacentJournalPosts(slug) {
  const index = journalPosts.findIndex((post) => post.slug === slug);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: index > 0 ? journalPosts[index - 1] : null,
    next: index < journalPosts.length - 1 ? journalPosts[index + 1] : null,
  };
}
