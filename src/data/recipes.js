import { Cake, CakeSlice, CookingPot, Cookie, Coffee, Grid2x2, Pizza, UtensilsCrossed, Wheat } from "lucide-react";
import chocolateChipCookiesImg from "@/assets/food/chocolate-chip-cookies.jpg";
import homemadePizzaAltImg from "@/assets/food/homemade-pizza-alt.jpg";
import redSaucePastaImg from "@/assets/food/red-sauce-pasta.jpg";
import chocolateCakeImg from "@/assets/food/chocolate-cake.jpg";
import momosWithDipImg from "@/assets/food/momos-with-dip.jpg";
import browniesImg from "@/assets/food/brownies.jpg";
import chocolateCupcakesImg from "@/assets/food/chocolate-cupcakes.jpg";

// Frame-specific crops for dishes that get reused across the hero,
// vault card, mood-recommendation and Kitchen contexts — each a real
// crop for that aspect ratio, not the same photo squeezed with
// object-fit. See `ResponsiveFoodImage`.
import chocolateChipCookiesWide from "@/assets/food/chocolate-chip-cookies-wide.webp";
import chocolateChipCookiesPortrait from "@/assets/food/chocolate-chip-cookies-portrait.webp";
import chocolateChipCookiesCard from "@/assets/food/chocolate-chip-cookies-card.webp";
import chocolateChipCookiesMobile from "@/assets/food/chocolate-chip-cookies-mobile.webp";
import homemadePizzaWide from "@/assets/food/homemade-pizza-wide.webp";
import homemadePizzaPortrait from "@/assets/food/homemade-pizza-portrait.webp";
import homemadePizzaCard from "@/assets/food/homemade-pizza-card.webp";
import homemadePizzaMobile from "@/assets/food/homemade-pizza-mobile.webp";
import redSaucePastaWide from "@/assets/food/red-sauce-pasta-wide.webp";
import redSaucePastaPortrait from "@/assets/food/red-sauce-pasta-portrait.webp";
import redSaucePastaCard from "@/assets/food/red-sauce-pasta-card.webp";
import redSaucePastaMobile from "@/assets/food/red-sauce-pasta-mobile.webp";
import chocolateCakeWide from "@/assets/food/chocolate-cake-wide.webp";
import chocolateCakePortrait from "@/assets/food/chocolate-cake-portrait.webp";
import chocolateCakeCard from "@/assets/food/chocolate-cake-card.webp";
import chocolateCakeMobile from "@/assets/food/chocolate-cake-mobile.webp";
import momosWithDipWide from "@/assets/food/momos-with-dip-wide.webp";
import momosWithDipPortrait from "@/assets/food/momos-with-dip-portrait.webp";
import momosWithDipCard from "@/assets/food/momos-with-dip-card.webp";
import momosWithDipMobile from "@/assets/food/momos-with-dip-mobile.webp";
import browniesWide from "@/assets/food/brownies-wide.webp";
import browniesPortrait from "@/assets/food/brownies-portrait.webp";
import browniesCard from "@/assets/food/brownies-card.webp";
import browniesMobile from "@/assets/food/brownies-mobile.webp";
import chocolateCupcakesWide from "@/assets/food/chocolate-cupcakes-wide.webp";
import chocolateCupcakesPortrait from "@/assets/food/chocolate-cupcakes-portrait.webp";
import chocolateCupcakesCard from "@/assets/food/chocolate-cupcakes-card.webp";
import chocolateCupcakesMobile from "@/assets/food/chocolate-cupcakes-mobile.webp";

export const RESPONSIVE_IMAGES = {
  "chocolate-chip-cookies": {
    wide: chocolateChipCookiesWide,
    portrait: chocolateChipCookiesPortrait,
    card: chocolateChipCookiesCard,
    mobile: chocolateChipCookiesMobile,
  },
  "homemade-pizza": {
    wide: homemadePizzaWide,
    portrait: homemadePizzaPortrait,
    card: homemadePizzaCard,
    mobile: homemadePizzaMobile,
  },
  "red-sauce-pasta": {
    wide: redSaucePastaWide,
    portrait: redSaucePastaPortrait,
    card: redSaucePastaCard,
    mobile: redSaucePastaMobile,
  },
  "chocolate-cake": {
    wide: chocolateCakeWide,
    portrait: chocolateCakePortrait,
    card: chocolateCakeCard,
    mobile: chocolateCakeMobile,
  },
  momos: {
    wide: momosWithDipWide,
    portrait: momosWithDipPortrait,
    card: momosWithDipCard,
    mobile: momosWithDipMobile,
  },
  brownies: {
    wide: browniesWide,
    portrait: browniesPortrait,
    card: browniesCard,
    mobile: browniesMobile,
  },
  "chocolate-cupcakes": {
    wide: chocolateCupcakesWide,
    portrait: chocolateCupcakesPortrait,
    card: chocolateCupcakesCard,
    mobile: chocolateCupcakesMobile,
  },
};

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
    spotlight: false,
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

  // --- simple starter recipes for real creations. These are
  // deliberately basic first drafts, not finished personal recipes —
  // see each `personalNote` for the disclaimer that goes with that. ---
  {
    id: "chocolate-chip-cookies",
    slug: "chocolate-chip-cookies",
    title: "Chocolate Chip Cookies",
    category: "Bakes",
    icon: Cookie,
    tone: "caramel",
    image: { src: chocolateChipCookiesImg },
    images: RESPONSIVE_IMAGES["chocolate-chip-cookies"],
    description: "Dark, crackly-topped cookies loaded with chocolate chunks.",
    personalNote: "a simple starting version for the vault — I'll probably tweak this one again.",
    difficulty: "easy",
    prepTime: "15 min",
    cookTime: "12 min",
    totalTime: "45 min (with chilling)",
    servings: "makes 12",
    yieldAmount: 12,
    yieldUnit: "cookies",
    ingredientGroups: [
      {
        group: "For the Dough",
        items: [
          { name: "Unsalted butter, softened", quantity: 115, unit: "g" },
          { name: "Brown sugar", quantity: 100, unit: "g" },
          { name: "Granulated sugar", quantity: 50, unit: "g" },
          { name: "Egg", quantity: 1, unit: "large" },
          { name: "Vanilla extract", quantity: 1, unit: "tsp" },
          { name: "All-purpose flour", quantity: 190, unit: "g" },
          { name: "Cocoa powder", quantity: 20, unit: "g" },
          { name: "Baking soda", quantity: 0.5, unit: "tsp" },
          { name: "Salt", quantity: 0.5, unit: "tsp" },
          { name: "Dark chocolate, roughly chopped", quantity: 150, unit: "g" },
        ],
      },
    ],
    ingredients: ["Butter", "Brown sugar", "Egg", "Flour", "Cocoa powder", "Dark chocolate"],
    wrongIngredients: ["Ketchup", "Broccoli", "Lettuce", "Mustard", "Chilli sauce", "Pickle"],
    instructions: [
      {
        id: "cream",
        title: "Cream Butter and Sugar",
        text: "Beat the softened butter with both sugars until light and fluffy, then mix in the egg and vanilla.",
      },
      {
        id: "dry",
        title: "Add the Dry Ingredients",
        text: "Whisk together the flour, cocoa, baking soda and salt, then fold into the wet mixture until just combined.",
      },
      {
        id: "chocolate",
        title: "Fold in the Chocolate",
        text: "Stir in the chopped chocolate, scooping a few extra pieces onto the tops for looks.",
      },
      {
        id: "chill",
        title: "Chill",
        text: "Chill the dough for at least 20 minutes so the cookies hold their shape.",
        timerSeconds: 1200,
      },
      {
        id: "bake",
        title: "Bake",
        text: "Scoop onto a lined tray and bake at 180°C (350°F) until the edges look set but the centers are still soft.",
        timerSeconds: 660,
      },
      {
        id: "cool",
        title: "Cool",
        text: "Let the cookies firm up on the tray for a few minutes before moving them.",
        timerSeconds: 240,
      },
    ],
    tips: [
      "Slightly underbaked is the goal — they firm up as they cool.",
      "This is a first-draft recipe — quantities may get adjusted later.",
    ],
    moods: ["comfort", "chocolate", "easy"],
    featured: false,
    spotlight: false,
  },
  {
    id: "brownies",
    slug: "brownies",
    title: "Brownies",
    category: "Desserts",
    icon: Grid2x2,
    tone: "chocolate",
    image: { src: browniesImg },
    images: RESPONSIVE_IMAGES.brownies,
    description: "Dense, fudgy brownies with a glossy top.",
    personalNote: "a simple starting version for the vault — I'll probably tweak this one again.",
    difficulty: "easy",
    prepTime: "10 min",
    cookTime: "30 min",
    totalTime: "45 min",
    servings: "makes 9 squares",
    yieldAmount: 9,
    yieldUnit: "squares",
    ingredientGroups: [
      {
        group: "For the Batter",
        items: [
          { name: "Unsalted butter", quantity: 115, unit: "g" },
          { name: "Dark chocolate, chopped", quantity: 150, unit: "g" },
          { name: "Granulated sugar", quantity: 150, unit: "g" },
          { name: "Eggs", quantity: 2, unit: "large" },
          { name: "Vanilla extract", quantity: 1, unit: "tsp" },
          { name: "All-purpose flour", quantity: 80, unit: "g" },
          { name: "Cocoa powder", quantity: 20, unit: "g" },
          { name: "Salt", quantity: 0.25, unit: "tsp" },
        ],
      },
    ],
    ingredients: ["Butter", "Dark chocolate", "Sugar", "Eggs", "Flour", "Cocoa powder"],
    wrongIngredients: ["Ketchup", "Broccoli", "Lettuce", "Mustard", "Chilli sauce", "Pickle"],
    instructions: [
      {
        id: "melt",
        title: "Melt Butter and Chocolate",
        text: "Melt the butter and chocolate together, either over a double boiler or in short microwave bursts.",
      },
      {
        id: "whisk",
        title: "Whisk in Sugar and Eggs",
        text: "Whisk the sugar into the melted chocolate, then add the eggs one at a time, followed by the vanilla.",
      },
      {
        id: "fold",
        title: "Fold in Dry Ingredients",
        text: "Sift in the flour, cocoa and salt, folding just until no streaks remain.",
        note: "Overmixing loses the fudgy texture — stop as soon as it's combined.",
      },
      {
        id: "bake-brownies",
        title: "Bake",
        text: "Pour into a lined 8-inch square tin and bake at 180°C (350°F) until a skewer comes out with a few moist crumbs.",
        timerSeconds: 1800,
      },
      {
        id: "cool-brownies",
        title: "Cool Before Cutting",
        text: "Let the brownies cool completely in the tin before slicing into squares.",
        timerSeconds: 900,
      },
    ],
    tips: [
      "Pull them out slightly before you think they're done — they firm up as they cool.",
      "This is a first-draft recipe — quantities may get adjusted later.",
    ],
    moods: ["chocolate", "comfort", "easy"],
    featured: false,
    spotlight: false,
  },
  {
    id: "chocolate-cupcakes",
    slug: "chocolate-cupcakes",
    title: "Chocolate Cupcakes",
    category: "Desserts",
    icon: CakeSlice,
    tone: "chocolate",
    image: { src: chocolateCupcakesImg },
    images: RESPONSIVE_IMAGES["chocolate-cupcakes"],
    description: "Simple one-bowl chocolate cupcakes, iced individually.",
    personalNote: "a simple starting version for the vault — I'll probably tweak this one again.",
    difficulty: "easy",
    prepTime: "15 min",
    cookTime: "18 min",
    totalTime: "45 min",
    servings: "makes 10",
    yieldAmount: 10,
    yieldUnit: "cupcakes",
    ingredientGroups: [
      {
        group: "For the Batter",
        items: [
          { name: "All-purpose flour", quantity: 150, unit: "g" },
          { name: "Cocoa powder", quantity: 30, unit: "g" },
          { name: "Granulated sugar", quantity: 150, unit: "g" },
          { name: "Baking powder", quantity: 1, unit: "tsp" },
          { name: "Eggs", quantity: 2, unit: "large" },
          { name: "Milk", quantity: 120, unit: "ml" },
          { name: "Vegetable oil", quantity: 80, unit: "ml" },
        ],
      },
      {
        group: "For the Topping",
        items: [{ name: "Chocolate ganache or icing", amount: "for topping" }, { name: "Sprinkles", amount: "to decorate" }],
      },
    ],
    ingredients: ["Flour", "Cocoa powder", "Sugar", "Eggs", "Milk", "Vegetable oil"],
    wrongIngredients: ["Ketchup", "Broccoli", "Lettuce", "Mustard", "Chilli sauce", "Pickle"],
    instructions: [
      {
        id: "mix-dry-cupcakes",
        title: "Mix the Dry Ingredients",
        text: "Whisk together the flour, cocoa, sugar and baking powder in a large bowl.",
      },
      {
        id: "mix-wet-cupcakes",
        title: "Add the Wet Ingredients",
        text: "Whisk in the eggs, milk and oil until you have a smooth, pourable batter.",
      },
      {
        id: "bake-cupcakes",
        title: "Bake",
        text: "Divide between lined cupcake liners and bake at 180°C (350°F) until a skewer comes out clean.",
        timerSeconds: 1080,
      },
      {
        id: "cool-cupcakes",
        title: "Cool Completely",
        text: "Let the cupcakes cool fully before icing, or the topping will just slide off.",
        timerSeconds: 900,
      },
      {
        id: "decorate-cupcakes",
        title: "Decorate",
        text: "Top with ganache or icing and finish with sprinkles, one cupcake at a time.",
      },
    ],
    tips: [
      "A skewer with a few moist crumbs (not wet batter) means they're done.",
      "This is a first-draft recipe — quantities may get adjusted later.",
    ],
    moods: ["chocolate", "easy", "showing off"],
    featured: false,
    spotlight: false,
  },
  {
    id: "chocolate-cake",
    slug: "chocolate-cake",
    title: "Chocolate Cake",
    category: "Desserts",
    icon: Cake,
    tone: "chocolate",
    image: { src: chocolateCakeImg },
    images: RESPONSIVE_IMAGES["chocolate-cake"],
    description: "A straightforward dark chocolate layer cake, finished with cream.",
    personalNote: "a simple starting version for the vault — I'll probably tweak this one again.",
    difficulty: "a little involved",
    prepTime: "25 min",
    cookTime: "35 min",
    totalTime: "1 hr 30 min",
    servings: "serves 10",
    yieldAmount: 10,
    yieldUnit: "slices",
    ingredientGroups: [
      {
        group: "For the Cake",
        items: [
          { name: "All-purpose flour", quantity: 250, unit: "g" },
          { name: "Cocoa powder", quantity: 50, unit: "g" },
          { name: "Granulated sugar", quantity: 300, unit: "g" },
          { name: "Baking powder", quantity: 2, unit: "tsp" },
          { name: "Eggs", quantity: 3, unit: "large" },
          { name: "Milk", quantity: 240, unit: "ml" },
          { name: "Vegetable oil", quantity: 120, unit: "ml" },
        ],
      },
      {
        group: "For Finishing",
        items: [{ name: "Whipped cream", amount: "for frosting" }, { name: "Sprinkles or gold pearls", amount: "to decorate" }],
      },
    ],
    ingredients: ["Flour", "Cocoa powder", "Sugar", "Eggs", "Milk", "Whipped cream"],
    wrongIngredients: ["Ketchup", "Broccoli", "Lettuce", "Mustard", "Chilli sauce", "Pickle"],
    instructions: [
      {
        id: "mix-batter",
        title: "Mix the Batter",
        text: "Whisk the dry ingredients together, then beat in the eggs, milk and oil until smooth.",
      },
      {
        id: "bake-cake",
        title: "Bake",
        text: "Pour into a greased round tin and bake at 180°C (350°F) until a skewer comes out clean.",
        timerSeconds: 2100,
      },
      {
        id: "cool-cake",
        title: "Cool Completely",
        text: "Let the cake cool fully in the tin, then turn it out onto a rack.",
        timerSeconds: 1800,
      },
      {
        id: "frost",
        title: "Frost and Decorate",
        text: "Cover with whipped cream and pipe rosettes around the top, finishing with sprinkles or gold pearls.",
      },
    ],
    tips: [
      "A fully cooled cake is much easier to frost without crumbs mixing into the cream.",
      "This is a first-draft recipe — quantities may get adjusted later.",
    ],
    moods: ["chocolate", "showing off", "dinner party"],
    featured: true,
    spotlight: true,
  },
  {
    id: "homemade-pizza",
    slug: "homemade-pizza",
    title: "Homemade Pizza",
    category: "Savory",
    icon: Pizza,
    tone: "cherry",
    image: { src: homemadePizzaAltImg },
    images: RESPONSIVE_IMAGES["homemade-pizza"],
    description: "A quick flatbread-base pizza loaded with cheese and vegetables.",
    personalNote: "a simple starting version for the vault — I'll probably tweak this one again.",
    difficulty: "easy",
    prepTime: "10 min",
    cookTime: "10 min",
    totalTime: "20 min",
    servings: "serves 2",
    yieldAmount: 2,
    yieldUnit: "personal pizzas",
    ingredientGroups: [
      {
        group: "For the Base",
        items: [
          { name: "Flatbread or pita base", quantity: 2, unit: "" },
          { name: "Pizza or pasta sauce", quantity: 4, unit: "tbsp" },
          { name: "Mozzarella, shredded", quantity: 150, unit: "g" },
        ],
      },
      {
        group: "For the Toppings",
        items: [
          { name: "Capsicum, sliced", quantity: 0.5, unit: "" },
          { name: "Red onion, sliced", quantity: 0.5, unit: "" },
          { name: "Mixed herbs and chilli flakes", amount: "to taste" },
        ],
      },
    ],
    ingredients: ["Flatbread", "Pizza sauce", "Mozzarella", "Capsicum", "Onion", "Herbs"],
    wrongIngredients: ["Chocolate", "Ketchup packets", "Ice cream", "Candy", "Syrup", "Cereal"],
    instructions: [
      {
        id: "spread-sauce",
        title: "Spread the Sauce",
        text: "Spread pizza or pasta sauce evenly over each flatbread base.",
      },
      {
        id: "top",
        title: "Add Cheese and Toppings",
        text: "Scatter over the mozzarella, then the capsicum and onion.",
      },
      {
        id: "bake-pizza",
        title: "Bake or Grill",
        text: "Bake at 200°C (400°F), or grill, until the cheese is fully melted and starting to brown in spots.",
        timerSeconds: 480,
      },
      {
        id: "finish-pizza",
        title: "Finish and Serve",
        text: "Sprinkle with mixed herbs and chilli flakes, then slice and serve immediately.",
      },
    ],
    tips: [
      "A hot oven/grill matters more than time here — watch it rather than trusting the clock.",
      "This is a first-draft recipe — quantities may get adjusted later.",
    ],
    moods: ["easy", "comfort", "cooking-for-someone"],
    featured: false,
    spotlight: false,
  },
  {
    id: "red-sauce-pasta",
    slug: "red-sauce-pasta",
    title: "Red Sauce Pasta",
    category: "Savory",
    icon: UtensilsCrossed,
    tone: "cherry",
    image: { src: redSaucePastaImg },
    images: RESPONSIVE_IMAGES["red-sauce-pasta"],
    description: "Penne in a spiced tomato sauce, finished with a heavy hand on the chilli flakes.",
    personalNote: "a simple starting version for the vault — I'll probably tweak this one again.",
    difficulty: "easy",
    prepTime: "10 min",
    cookTime: "20 min",
    totalTime: "30 min",
    servings: "serves 2",
    yieldAmount: 2,
    yieldUnit: "servings",
    ingredientGroups: [
      {
        group: "For the Pasta",
        items: [
          { name: "Penne pasta", quantity: 200, unit: "g" },
          { name: "Tomato puree or crushed tomatoes", quantity: 300, unit: "g" },
          { name: "Garlic, chopped", quantity: 3, unit: "cloves" },
          { name: "Onion, chopped", quantity: 1, unit: "small" },
          { name: "Olive oil", quantity: 2, unit: "tbsp" },
          { name: "Mixed herbs and chilli flakes", amount: "to taste" },
        ],
      },
    ],
    ingredients: ["Penne", "Tomato", "Garlic", "Onion", "Olive oil", "Chilli flakes"],
    wrongIngredients: ["Chocolate", "Candy", "Ice cream", "Syrup", "Cereal", "Ketchup packets"],
    instructions: [
      {
        id: "boil-pasta",
        title: "Boil the Pasta",
        text: "Cook the penne in salted water until al dente, then drain, reserving a little pasta water.",
        timerSeconds: 600,
      },
      {
        id: "make-sauce",
        title: "Make the Sauce",
        text: "Sauté the onion and garlic in olive oil until soft, then stir in the tomato puree and simmer.",
        timerSeconds: 600,
      },
      {
        id: "combine",
        title: "Combine",
        text: "Toss the drained pasta through the sauce, loosening with a splash of pasta water if needed.",
      },
      {
        id: "season",
        title: "Season and Serve",
        text: "Finish with mixed herbs and a generous amount of chilli flakes.",
      },
    ],
    tips: [
      "Reserved pasta water helps the sauce cling instead of sitting separately.",
      "This is a first-draft recipe — quantities may get adjusted later.",
    ],
    moods: ["easy", "comfort", "3am craving"],
    featured: false,
    spotlight: false,
  },
  {
    id: "momos",
    slug: "momos",
    title: "Momos",
    category: "Comfort Food",
    icon: CookingPot,
    tone: "biscuit",
    image: { src: momosWithDipImg },
    images: RESPONSIVE_IMAGES.momos,
    description: "Pan-fried dumplings served with a spiced tomato-chilli dip.",
    personalNote: "a simple starting version for the vault — I'll probably tweak this one again.",
    difficulty: "a little fiddly",
    prepTime: "40 min",
    cookTime: "15 min",
    totalTime: "1 hr",
    servings: "makes about 15",
    yieldAmount: 15,
    yieldUnit: "momos",
    ingredientGroups: [
      {
        group: "For the Filling",
        items: [
          { name: "Cabbage, finely chopped", quantity: 1, unit: "cup" },
          { name: "Carrot, grated", quantity: 0.5, unit: "cup" },
          { name: "Spring onion, chopped", quantity: 2, unit: "tbsp" },
          { name: "Garlic and ginger, minced", quantity: 1, unit: "tbsp" },
          { name: "Soy sauce", quantity: 1, unit: "tbsp" },
        ],
      },
      {
        group: "For Assembly",
        items: [
          { name: "Store-bought or homemade momo wrappers", quantity: 15, unit: "" },
          { name: "Oil, for pan-frying", amount: "as needed" },
        ],
      },
    ],
    ingredients: ["Cabbage", "Carrot", "Garlic", "Ginger", "Soy sauce", "Wrappers"],
    wrongIngredients: ["Chocolate", "Candy", "Ice cream", "Syrup", "Cereal", "Ketchup packets"],
    instructions: [
      {
        id: "mix-filling",
        title: "Mix the Filling",
        text: "Combine the cabbage, carrot, spring onion, garlic, ginger and soy sauce in a bowl.",
      },
      {
        id: "fill-fold",
        title: "Fill and Fold",
        text: "Place a spoonful of filling in each wrapper and pleat closed into a pouch shape.",
      },
      {
        id: "steam-or-fry",
        title: "Steam, Then Pan-Fry",
        text: "Steam until the wrappers turn translucent, then pan-fry briefly for a crisp base.",
        timerSeconds: 600,
      },
      {
        id: "make-dip",
        title: "Make the Dip",
        text: "Blend tomatoes, chilli and a little garlic into a quick, spiced dipping sauce.",
      },
    ],
    tips: [
      "Don't overfill — they're harder to seal and more likely to burst.",
      "This is a first-draft recipe — quantities may get adjusted later.",
    ],
    moods: ["comfort", "cooking-for-someone", "easy"],
    featured: false,
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
