import SectionHeading from "@/components/ui/SectionHeading";

/**
 * Left-border callouts rather than a wall of boxed cards.
 */
export default function RecipeTips({ tips }) {
  if (!tips?.length) return null;

  return (
    <div className="flex flex-col gap-6">
      <SectionHeading eyebrow="Notes From the Kitchen" title="Before You Start" size="md" />
      <ul className="flex flex-col gap-4">
        {tips.map((tip) => (
          <li
            key={tip}
            className="border-l-2 border-caramel/40 pl-4 font-sans text-sm leading-relaxed text-biscuit sm:text-base"
          >
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
}
