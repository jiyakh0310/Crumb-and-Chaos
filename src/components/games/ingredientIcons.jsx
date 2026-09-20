import {
  Candy,
  Carrot,
  Coffee,
  Cookie,
  Droplet,
  Egg,
  Flame,
  IceCreamCone,
  Leaf,
  Milk,
  Salad,
  UtensilsCrossed,
} from "lucide-react";

/**
 * Small flat glyphs for the ingredients lucide doesn't cover (butter,
 * flour, bottled things, bulb vegetables, etc). Single-stroke,
 * currentColor, no faces/limbs — just enough shape to read at a
 * glance next to the ingredient name.
 */
function BlockGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 8h16v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
      <path d="M4 8l3-3h10l3 3" />
    </svg>
  );
}

function BagGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M8 6l1-3h6l1 3" />
      <path d="M6 6h12l1 14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z" />
      <path d="M9 11h6" />
    </svg>
  );
}

function BowlGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 11h16a8 6 0 0 1-16 0z" />
      <path d="M8 11c0-2 .5-4 1-5M16 11c0-2-.5-4-1-5" />
    </svg>
  );
}

function BottleGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M10 3h4v3.2c1.2.8 2 2.2 2 3.8v9a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-9c0-1.6.8-3 2-3.8z" />
      <path d="M9 13h6" />
    </svg>
  );
}

function BulbGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 4c-1 1.5-1.5 2.4-1.5 3.4" />
      <path d="M12 8a6 6 0 0 1 6 6c0 3.6-2.7 6-6 6s-6-2.4-6-6a6 6 0 0 1 6-6z" />
      <path d="M9 10.5c1 1 4 1 6 0" />
    </svg>
  );
}

function OvalGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <ellipse cx="12" cy="12" rx="5" ry="8" />
      <path d="M9 8.5c1.2.6 4.8.6 6 0M9 12c1.2.6 4.8.6 6 0M9 15.5c1.2.6 4.8.6 6 0" />
    </svg>
  );
}

function PepperGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M11 5c.5-1.5 2-2 3-1.3" />
      <path d="M9 6c-3 0-5 2.5-5 6 0 5 3.5 8 7 8s7-3 7-8c0-2.8-1.3-4.8-3-5.7" />
    </svg>
  );
}

function PastaGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="4" y="6" width="6" height="14" rx="3" />
      <rect x="13" y="4" width="6" height="16" rx="3" />
    </svg>
  );
}

function RoundStemGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="14" r="7" />
      <path d="M12 7V4M9.5 5.5c1 .8 3.5.8 4.5 0" />
    </svg>
  );
}

function SaltShakerGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 4h6l1 2-1 2H9L8 6z" />
      <path d="M8 8h8l-.8 11a1.5 1.5 0 0 1-1.5 1.4H10.3A1.5 1.5 0 0 1 8.8 19z" />
      <path d="M11 11.5h.01M13 13h.01M11 14.5h.01" />
    </svg>
  );
}

const ICON_MAP = {
  butter: BlockGlyph,
  "brown sugar": BowlGlyph,
  sugar: BowlGlyph,
  egg: Egg,
  eggs: Egg,
  flour: BagGlyph,
  "dark chocolate": BlockGlyph,
  chocolate: BlockGlyph,
  vanilla: BottleGlyph,
  "cream cheese": BowlGlyph,
  "heavy cream": Milk,
  "whipped cream": Milk,
  milk: Milk,
  salt: SaltShakerGlyph,
  mascarpone: BowlGlyph,
  espresso: Coffee,
  ladyfingers: Cookie,
  "cocoa powder": BowlGlyph,
  yeast: BagGlyph,
  "olive oil": Droplet,
  "vegetable oil": Droplet,
  garlic: BulbGlyph,
  rosemary: Leaf,
  herbs: Leaf,
  flatbread: OvalGlyph,
  "pizza sauce": BottleGlyph,
  mozzarella: BlockGlyph,
  capsicum: PepperGlyph,
  onion: BulbGlyph,
  penne: PastaGlyph,
  tomato: RoundStemGlyph,
  "chilli flakes": Flame,
  "chilli sauce": BottleGlyph,
  cabbage: BulbGlyph,
  carrot: Carrot,
  ginger: BulbGlyph,
  "soy sauce": BottleGlyph,
  wrappers: OvalGlyph,
  broccoli: Salad,
  ketchup: BottleGlyph,
  lettuce: Salad,
  mustard: BottleGlyph,
  pickle: OvalGlyph,
  "ketchup packets": BottleGlyph,
  "ice cream": IceCreamCone,
  candy: Candy,
  syrup: BottleGlyph,
  cereal: BowlGlyph,
};

/**
 * Resolves an ingredient word (as written in recipes.js) to a small
 * flat icon component. Falls back to a generic utensils glyph for
 * anything not in the map, so a new recipe's ingredient list never
 * ships with a blank icon.
 */
export function getIngredientIcon(word) {
  return ICON_MAP[word.trim().toLowerCase()] ?? UtensilsCrossed;
}
