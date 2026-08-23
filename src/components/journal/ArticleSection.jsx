import FadeUp from "@/components/motion/FadeUp";
import PlaceholderArt from "@/components/ui/PlaceholderArt";

/**
 * Renders one block of a journal post's `sections` array. Text
 * blocks stay in a comfortable reading column; images and quotes
 * are allowed to breathe a little wider for editorial contrast.
 */
export default function ArticleSection({ section }) {
  switch (section.type) {
    case "heading":
      return (
        <FadeUp className="mx-auto w-full max-w-2xl">
          <h2 className="text-balance font-display text-2xl font-medium text-cream sm:text-3xl">{section.text}</h2>
        </FadeUp>
      );

    case "quote":
      return (
        <FadeUp className="mx-auto w-full max-w-3xl">
          <blockquote className="border-l-2 border-caramel/50 py-1 pl-6 sm:pl-8">
            <p className="text-balance font-display text-2xl italic leading-snug text-cream sm:text-3xl lg:text-4xl">
              {section.text}
            </p>
          </blockquote>
        </FadeUp>
      );

    case "image":
      return (
        <FadeUp className="mx-auto w-full max-w-4xl">
          <div className="aspect-[16/10] w-full overflow-hidden rounded-md border border-cream/10 sm:aspect-[21/9]">
            <PlaceholderArt src={section.src} alt={section.alt ?? ""} tone={section.tone} icon={section.icon} />
          </div>
        </FadeUp>
      );

    case "note":
      return (
        <FadeUp distance={0} className="mx-auto w-full max-w-2xl">
          <p className="font-hand text-xl leading-snug text-biscuit/60 sm:text-2xl">{section.text}</p>
        </FadeUp>
      );

    case "paragraph":
    default:
      return (
        <FadeUp className="mx-auto w-full max-w-2xl">
          <p className="font-sans text-base leading-relaxed text-biscuit sm:text-lg sm:leading-loose">
            {section.text}
          </p>
        </FadeUp>
      );
  }
}
