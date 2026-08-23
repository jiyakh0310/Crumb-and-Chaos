import { CakeSlice, Coffee, Cookie, Wheat } from "lucide-react";

/**
 * The Recipe Vault dataset. `ingredients` stays a short flat word
 * list — it's the "correct" pool for the Catch the Ingredients game
 * and is deliberately untouched by the richer `ingredientGroups`
 * structure below, so the tested game never has to change.
 *
 * These are demo/sample recipes, not personal originals.
 */
export const recipes = [
  {
    id: "brown-butter-chocolate-chip-cookies",
    slug: "brown-butter-chocolate-chip-cookies",
    title: "Brown Butter Chocolate Chip Cookies",
    category: "Bakes",
    icon: Cookie,
    tone: "caramel",
    image: { src: null },
    description: "Crisp edges, soft middle, too much chocolate. Exactly as intended.",
    personalNote: "yes, waiting for the dough to chill is unfortunately necessary.",
    difficulty: "dangerously easy",
    prepTime: "15 min",
    cookTime: "12 min",
    totalTime: "45 min",
    servings: "makes 14",
    yieldAmount: 14,
    yieldUnit: "cookies",
    ingredientGroups: [
      {
        group: "For the Dough",
        items: [
          { name: "Unsalted butter", quantity: 226, unit: "g", note: "browned and cooled slightly" },
          { name: "Light brown sugar", quantity: 220, unit: "g" },
          { name: "Granulated sugar", quantity: 50, unit: "g" },
          { name: "Egg", quantity: 1, unit: "large" },
          { name: "Vanilla extract", quantity: 1, unit: "tsp" },
          { name: "All-purpose flour", quantity: 280, unit: "g" },
          { name: "Baking soda", quantity: 0.5, unit: "tsp" },
          { name: "Fine sea salt", quantity: 0.75, unit: "tsp" },
          { name: "Dark chocolate, chopped", quantity: 200, unit: "g" },
        ],
      },
      {
        group: "For Finishing",
        items: [{ name: "Flaky sea salt", amount: "a pinch" }],
      },
    ],
    ingredients: ["Butter", "Brown sugar", "Egg", "Flour", "Dark chocolate", "Vanilla"],
    wrongIngredients: ["Broccoli", "Ketchup", "Lettuce", "Mustard", "Chilli sauce", "Pickle"],
    instructions: [
      {
        id: "brown-butter",
        title: "Brown the Butter",
        text: "Melt the butter in a light-colored pan over medium heat, swirling often, until the milk solids turn golden brown and it smells nutty and toasted.",
        note: "This is where your kitchen starts smelling suspiciously good.",
      },
      {
        id: "mix-wet",
        title: "Mix the Wet Ingredients",
        text: "Whisk the brown sugar and granulated sugar into the warm brown butter, then add the egg and vanilla. Whisk until glossy and slightly thickened.",
      },
      {
        id: "add-dry",
        title: "Add the Dry Ingredients",
        text: "Fold in the flour, baking soda and salt just until no streaks remain, then stir in the chopped chocolate.",
        note: "Overmixing is how cookies turn into hockey pucks. Stop early.",
      },
      {
        id: "chill",
        title: "Chill the Dough",
        text: "Cover the bowl and refrigerate for at least 30 minutes — overnight is better, and genuinely worth it.",
        note: "Yes, waiting for the dough to chill is unfortunately necessary.",
        timerSeconds: 1800,
      },
      {
        id: "bake",
        title: "Bake",
        text: "Scoop onto a lined tray, leaving space to spread, and bake at 190°C (375°F) until the edges are set and the centers still look slightly underdone.",
        note: "They'll finish cooking on the hot tray. Trust the process.",
        timerSeconds: 720,
      },
      {
        id: "cool",
        title: "Cool (Briefly)",
        text: "Let the cookies rest on the tray for 5 minutes before moving them — they're fragile straight out of the oven.",
        timerSeconds: 300,
      },
    ],
    tips: [
      "Chilling the dough overnight makes them better. This is not optional, it's a threat.",
      "Slightly underbaked is the goal — they firm up as they cool.",
      "Dough straight from the fridge takes an extra minute or two in the oven.",
    ],
    moods: ["comfort", "3am craving", "showing off", "chocolate", "easy"],
    featured: true,
    spotlight: false,
  },
  {
    id: "burnt-basque-cheesecake",
    slug: "burnt-basque-cheesecake",
    title: "Burnt Basque Cheesecake",
    category: "Desserts",
    icon: CakeSlice,
    tone: "caramel",
    image: { src: null },
    description: "No crust, no apologies. It's supposed to look burnt.",
    personalNote: "it's supposed to look like a mistake.",
    difficulty: "a little dramatic",
    prepTime: "15 min",
    cookTime: "50 min",
    totalTime: "6 hr (mostly waiting)",
    servings: "serves 10",
    yieldAmount: 10,
    yieldUnit: "slices",
    ingredientGroups: [
      {
        group: "For the Cheesecake",
        items: [
          { name: "Cream cheese, room temperature", quantity: 900, unit: "g" },
          { name: "Granulated sugar", quantity: 300, unit: "g" },
          { name: "Eggs", quantity: 6, unit: "large" },
          { name: "Heavy cream", quantity: 360, unit: "ml" },
          { name: "All-purpose flour", quantity: 25, unit: "g" },
          { name: "Fine sea salt", quantity: 1, unit: "tsp" },
        ],
      },
    ],
    ingredients: ["Cream cheese", "Sugar", "Eggs", "Heavy cream", "Flour", "Salt"],
    wrongIngredients: ["Ketchup", "Broccoli", "Pickle", "Chilli sauce", "Mustard", "Lettuce"],
    instructions: [
      {
        id: "prep-pan",
        title: "Prep the Pan",
        text: "Line a 9-inch springform pan with two overlapping sheets of parchment, letting the excess hang well over the edges.",
        note: "This isn't sloppy, it's the whole aesthetic.",
      },
      {
        id: "beat-cream-cheese",
        title: "Beat the Cream Cheese",
        text: "Beat cream cheese and sugar on medium speed until completely smooth, scraping the bowl often. No lumps allowed.",
      },
      {
        id: "add-eggs",
        title: "Add Eggs and Cream",
        text: "Add the eggs one at a time, mixing just until combined, then blend in the heavy cream, flour and salt.",
      },
      {
        id: "bake-hot",
        title: "Bake Hot and Fast",
        text: "Pour into the pan and bake at 200°C (400°F) until the top is deeply, almost alarmingly burnished-black and the center still wobbles like jelly.",
        note: "If it doesn't look slightly burnt, it isn't done. Trust the char.",
        timerSeconds: 3000,
      },
      {
        id: "cool-collapse",
        title: "Cool and Collapse",
        text: "Let it cool at room temperature, then chill for at least 4 hours. It will sink dramatically in the middle — that's correct.",
        timerSeconds: 14400,
      },
      {
        id: "serve",
        title: "Serve",
        text: "Slice with a hot, clean knife for neat pieces — or don't, and serve it rustic. Both are correct.",
      },
    ],
    tips: [
      "If it doesn't look slightly burnt, it isn't done. Trust the char.",
      "Room-temperature cream cheese is non-negotiable — cold lumps never fully disappear.",
      "Leftovers keep in the fridge for up to 4 days, if it survives that long.",
    ],
    moods: ["showing off", "dinner party", "I have a whisk and I'm not afraid to use it", "fancy", "cooking-for-someone"],
    featured: true,
    spotlight: true,
  },
  {
    id: "tiramisu",
    slug: "tiramisu",
    title: "Tiramisu",
    category: "Desserts",
    icon: Coffee,
    tone: "chocolate",
    image: { src: null },
    description: "Coffee, mascarpone, and a nap disguised as a dessert.",
    personalNote: "there is a lot of espresso in this. that's the point.",
    difficulty: "requires patience",
    prepTime: "30 min",
    cookTime: "0 min",
    totalTime: "6 hr (mostly waiting, again)",
    servings: "serves 8",
    yieldAmount: 8,
    yieldUnit: "servings",
    ingredientGroups: [
      {
        group: "For the Cream",
        items: [
          { name: "Egg yolks", quantity: 6, unit: "large" },
          { name: "Granulated sugar", quantity: 150, unit: "g" },
          { name: "Mascarpone", quantity: 500, unit: "g" },
          { name: "Heavy cream, whipped", quantity: 240, unit: "ml" },
        ],
      },
      {
        group: "For Assembly",
        items: [
          { name: "Strong espresso, cooled", quantity: 350, unit: "ml" },
          { name: "Ladyfinger biscuits", quantity: 24, unit: "" },
          { name: "Cocoa powder", amount: "for dusting" },
        ],
      },
    ],
    ingredients: ["Mascarpone", "Eggs", "Sugar", "Espresso", "Ladyfingers", "Cocoa powder"],
    wrongIngredients: ["Ketchup", "Broccoli", "Mustard", "Pickle", "Lettuce", "Chilli sauce"],
    instructions: [
      {
        id: "brew-espresso",
        title: "Brew the Espresso",
        text: "Brew strong espresso and let it cool completely to room temperature.",
        note: "Weak coffee is a personal attack on this dessert.",
      },
      {
        id: "whisk-yolks",
        title: "Whisk Yolks and Sugar",
        text: "Whisk egg yolks and sugar over a double boiler until pale, thick, and doubled in volume.",
        timerSeconds: 300,
      },
      {
        id: "fold-mascarpone",
        title: "Fold in Mascarpone",
        text: "Off the heat, whisk in the mascarpone until smooth, then gently fold in the whipped cream to keep it airy.",
      },
      {
        id: "dip-layer",
        title: "Dip and Layer",
        text: "Quickly dip each ladyfinger in the cooled espresso — a fast dunk, not a swim — and layer in a dish. Spread half the mascarpone cream on top. Repeat.",
        note: "A soggy ladyfinger is a sad ladyfinger. In and out.",
      },
      {
        id: "chill-tiramisu",
        title: "Chill",
        text: "Cover and refrigerate for at least 6 hours, ideally overnight, to let the layers set.",
        timerSeconds: 21600,
      },
      {
        id: "dust-serve",
        title: "Dust and Serve",
        text: "Dust generously with cocoa powder right before serving, not before.",
        note: "Dust the cocoa at the very end or it goes soggy and sad.",
      },
    ],
    tips: [
      "Dust the cocoa at the very end or it goes soggy and sad.",
      "Use egg yolks only — whole eggs make the cream too loose.",
      "Tastes even better the next day, if you can wait.",
    ],
    moods: ["dinner party", "I peaked in Italy once", "comfort", "fancy", "cooking-for-someone", "chocolate"],
    featured: true,
    spotlight: false,
  },
  {
    id: "garlic-focaccia",
    slug: "garlic-focaccia",
    title: "Garlic Focaccia",
    category: "Bakes",
    icon: Wheat,
    tone: "biscuit",
    image: { src: null },
    description: "Olive oil, flaky salt, and enough garlic to keep everyone away.",
    personalNote: "your kitchen will smell like a bakery for hours. you're welcome.",
    difficulty: "weekend behavior",
    prepTime: "20 min",
    cookTime: "25 min",
    totalTime: "3 hr (mostly rising)",
    servings: "serves 8",
    yieldAmount: 8,
    yieldUnit: "slices",
    ingredientGroups: [
      {
        group: "For the Dough",
        items: [
          { name: "Bread flour", quantity: 500, unit: "g" },
          { name: "Instant yeast", quantity: 7, unit: "g" },
          { name: "Fine sea salt", quantity: 10, unit: "g" },
          { name: "Warm water", quantity: 375, unit: "ml" },
          { name: "Olive oil", quantity: 60, unit: "ml" },
        ],
      },
      {
        group: "For the Topping",
        items: [
          { name: "Garlic cloves, thinly sliced", quantity: 6, unit: "" },
          { name: "Olive oil, extra for topping", quantity: 60, unit: "ml" },
          { name: "Flaky sea salt", amount: "to taste" },
          { name: "Fresh rosemary", quantity: 2, unit: "sprigs" },
        ],
      },
    ],
    ingredients: ["Flour", "Yeast", "Olive oil", "Garlic", "Salt", "Rosemary"],
    wrongIngredients: ["Ketchup", "Broccoli", "Lettuce", "Mustard", "Pickle", "Chilli sauce"],
    instructions: [
      {
        id: "mix-dough",
        title: "Mix the Dough",
        text: "Combine flour, yeast and salt, then stir in warm water and olive oil until you get a shaggy, sticky dough.",
        note: "It should look wrong. That's correct.",
      },
      {
        id: "first-rise",
        title: "First Rise",
        text: "Cover and let rise somewhere warm until doubled in size.",
        timerSeconds: 4500,
      },
      {
        id: "dimple",
        title: "Dimple the Dough",
        text: "Turn the dough into an oiled pan and dimple it all over with oiled fingers like you mean it.",
        note: "This is the most satisfying part. Don't rush it.",
      },
      {
        id: "second-rise",
        title: "Second Rise",
        text: "Let it rise again, uncovered, until puffy.",
        timerSeconds: 1800,
      },
      {
        id: "top-bake",
        title: "Top and Bake",
        text: "Press garlic, rosemary and flaky salt into the dimples, drizzle generously with olive oil, and bake at 220°C (425°F) until deeply golden.",
        note: "Do not skimp on the olive oil. This is the one time more is correct.",
        timerSeconds: 1500,
      },
      {
        id: "cool-slice",
        title: "Cool Slightly",
        text: "Let it cool for a few minutes in the pan before slicing — it's structurally better than it looks straight out of the oven.",
        timerSeconds: 300,
      },
    ],
    tips: [
      "Do not skimp on the olive oil. This is the one time more is correct.",
      "The wetter the dough feels, the better the crumb — resist the urge to add more flour.",
      "Best eaten the day it's baked, but reheats well wrapped in foil.",
    ],
    moods: ["worth the wait", "comfort", "showing off"],
    featured: true,
    spotlight: false,
  },
];

export function getRecipeBySlug(slug) {
  return recipes.find((recipe) => recipe.slug === slug);
}

/**
 * Ranks the other recipes by shared moods (weighted) and matching
 * category, so "related" stays meaningful even as the dataset grows.
 */
export function getRelatedRecipes(recipe, count = 3) {
  return recipes
    .filter((candidate) => candidate.id !== recipe.id)
    .map((candidate) => {
      const sharedMoods = candidate.moods.filter((mood) => recipe.moods.includes(mood)).length;
      const sameCategory = candidate.category === recipe.category ? 1 : 0;
      return { candidate, score: sharedMoods * 2 + sameCategory };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((entry) => entry.candidate);
}

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * One random recipe, excluding `excludeId` when there's more than
 * one to choose from — used by Chaos Mode so "spin again" doesn't
 * hand back the same result.
 */
export function getRandomRecipe(excludeId = null) {
  const pool = excludeId ? recipes.filter((recipe) => recipe.id !== excludeId) : recipes;
  const source = pool.length > 0 ? pool : recipes;
  return source[Math.floor(Math.random() * source.length)];
}

/**
 * Recipes tagged with `mood`, shuffled so revisiting the same mood
 * can surface a different subset once there are more than `count`.
 */
export function getRecipesByMood(mood, count = 3) {
  const matches = recipes.filter((recipe) => recipe.moods.includes(mood));
  return shuffle(matches).slice(0, count);
}

/**
 * "Surprise me" — no mood tag involved, just a random handful.
 */
export function getSurpriseRecipes(count = 3) {
  return shuffle(recipes).slice(0, count);
}
