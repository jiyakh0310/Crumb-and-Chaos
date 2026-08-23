import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import FadeUp from "@/components/motion/FadeUp";
import JournalCard from "@/components/journal/JournalCard";
import { getFeaturedJournalPosts } from "@/data/journalPosts";

export default function NotesFromTheKitchenSection() {
  const featured = getFeaturedJournalPosts(3);
  const [hero, ...supporting] = featured;

  if (!hero) return null;

  return (
    <Section className="bg-espresso" padding="py-24 sm:py-32 lg:py-36" id="notes-from-the-kitchen">
      <div className="flex flex-col gap-12 sm:gap-16">
        <div className="flex flex-col gap-5">
          <SectionHeading
            eyebrow="Kitchen Ramblings"
            title="Notes From the Kitchen"
            description="Experiments, disasters and occasional good decisions."
          />
          <FadeUp delay={0.15} className="font-hand text-lg text-biscuit/50">
            mostly edible.
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:h-[480px] lg:grid-cols-5 lg:grid-rows-2">
          <JournalCard
            post={hero}
            size="large"
            index={0}
            className="aspect-[4/5] lg:col-span-3 lg:row-span-2 lg:aspect-auto"
          />
          {supporting.map((post, i) => (
            <JournalCard
              key={post.id}
              post={post}
              index={i + 1}
              className="aspect-[16/10] lg:col-span-2 lg:row-span-1 lg:aspect-auto"
            />
          ))}
        </div>

        <FadeUp className="flex justify-center pt-2 sm:pt-4">
          <Button to="/journal" variant="secondary" arrow>
            Read the Bake Journal
          </Button>
        </FadeUp>
      </div>
    </Section>
  );
}
