import Eyebrow from "@/components/ui/Eyebrow";
import PlaceholderArt from "@/components/ui/PlaceholderArt";
import Reveal from "@/components/motion/Reveal";
import FadeUp from "@/components/motion/FadeUp";

/**
 * Full-bleed image with the title overlaid bottom-left and a small
 * floating annotation card overlapping the bottom-right corner —
 * deliberately not an image-left/content-right split.
 */
export default function RecipeHero({ recipe }) {
  return (
    <div className="relative">
      <FadeUp>
        <Eyebrow>{recipe.category}</Eyebrow>
      </FadeUp>

      {/* print keeps the title as plain text — the overlaid version below is print:hidden */}
      <h1 className="hidden font-display text-3xl font-medium text-[#1c130f] print:mt-3 print:block">
        {recipe.title}
      </h1>

      <div className="relative mt-5 aspect-[4/3] overflow-hidden rounded-md border border-cream/10 sm:aspect-[16/9] lg:aspect-[21/9] print:hidden">
        <PlaceholderArt src={recipe.image?.src} alt={recipe.title} tone={recipe.tone} icon={recipe.icon} />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/95 via-espresso/20 to-transparent"
        />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:max-w-3xl">
          <Reveal>
            <h1 className="text-balance font-display text-4xl font-medium leading-[1.03] text-cream [text-shadow:0_4px_24px_rgba(0,0,0,0.4)] sm:text-6xl lg:text-7xl">
              {recipe.title}
            </h1>
          </Reveal>
        </div>
      </div>

      {recipe.personalNote ? (
        <FadeUp
          delay={0.25}
          distance={0}
          className="relative z-10 mx-4 -mt-8 max-w-xs rotate-[-1.5deg] rounded-md border border-cream/15 bg-chocolate px-5 py-4 shadow-xl sm:ml-auto sm:mr-10 sm:-mt-10 print:hidden"
        >
          <p className="font-hand text-lg leading-snug text-biscuit/70">{recipe.personalNote}</p>
        </FadeUp>
      ) : null}
    </div>
  );
}
