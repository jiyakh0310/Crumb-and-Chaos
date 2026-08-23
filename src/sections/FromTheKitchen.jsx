import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import FadeUp from "@/components/motion/FadeUp";
import CreationGallery from "@/components/creations/CreationGallery";

export default function FromTheKitchen() {
  return (
    <Section
      className="bg-espresso"
      padding="pt-20 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20"
      id="from-the-kitchen"
    >
      <div className="flex flex-col gap-12 sm:gap-16">
        <SectionHeading
          eyebrow="A Few Survivors"
          title="From the Kitchen"
          description="A few things that survived long enough to be photographed."
        />

        <CreationGallery />

        <FadeUp className="flex justify-center pt-2 sm:pt-4">
          <Button to="/kitchen" variant="secondary" arrow>
            see everything I've made
          </Button>
        </FadeUp>
      </div>
    </Section>
  );
}
