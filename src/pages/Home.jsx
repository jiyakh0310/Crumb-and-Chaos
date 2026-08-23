import Hero from "@/sections/Hero";
import CurrentlyBaking from "@/sections/CurrentlyBaking";
import FromTheKitchen from "@/sections/FromTheKitchen";
import RecipeVaultSection from "@/sections/RecipeVaultSection";
import ChaosModeSection from "@/sections/ChaosModeSection";
import HowAreWeFeelingSection from "@/sections/HowAreWeFeelingSection";
import NotesFromTheKitchenSection from "@/sections/NotesFromTheKitchenSection";
import FutureBakehouseTeaser from "@/sections/FutureBakehouseTeaser";
import SectionDivider from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <>
      <Hero />
      <CurrentlyBaking />
      <FromTheKitchen />
      <SectionDivider label="No. 02 — The Vault" className="bg-espresso" />
      <RecipeVaultSection />
      <ChaosModeSection />
      <HowAreWeFeelingSection />
      <NotesFromTheKitchenSection />
      <FutureBakehouseTeaser />
    </>
  );
}
