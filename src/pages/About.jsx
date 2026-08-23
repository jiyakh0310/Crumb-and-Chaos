import Container from "@/components/ui/Container";
import AboutHero from "@/sections/about/AboutHero";
import StoryMoments from "@/sections/about/StoryMoments";
import BrandExplanation from "@/sections/about/BrandExplanation";
import FutureBakehouseSection from "@/sections/about/FutureBakehouseSection";

export default function About() {
  return (
    <div className="overflow-hidden bg-espresso pb-24 pt-32 sm:pb-32 sm:pt-40">
      <Container>
        <AboutHero />
      </Container>

      <Container className="mt-24 sm:mt-32">
        <StoryMoments />
      </Container>

      <div className="mt-24 border-t border-cream/10 bg-chocolate py-20 sm:mt-32 sm:py-28">
        <Container>
          <BrandExplanation />
        </Container>
      </div>

      <div className="border-t border-cream/10 bg-espresso py-20 sm:py-28">
        <Container>
          <FutureBakehouseSection />
        </Container>
      </div>
    </div>
  );
}
