import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@/components/ui/Container";
import GameModal from "@/components/games/GameModal";
import IngredientCatchGame from "@/components/games/IngredientCatchGame";
import KitchenHero from "@/components/kitchen/KitchenHero";
import KitchenControls from "@/components/kitchen/KitchenControls";
import KitchenGallery from "@/components/kitchen/KitchenGallery";
import KitchenEmptyState from "@/components/kitchen/KitchenEmptyState";
import { categories, creations } from "@/data/creations";
import { getRecipeBySlug } from "@/data/recipes";
import { useRecipeVault } from "@/hooks/useRecipeVault";

function matchesSearch(creation, query) {
  if (!query) return true;
  const haystack = [creation.title, creation.category, ...(creation.tags ?? [])].join(" ").toLowerCase();
  return haystack.includes(query.toLowerCase());
}

function matchesAvailability(creation, availability) {
  if (availability === "Recipes Available") return Boolean(creation.recipeSlug);
  if (availability === "Just Browsing") return !creation.recipeSlug;
  return true;
}

export default function Kitchen() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [availability, setAvailability] = useState("Everything");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Latest");

  const { isUnlocked, activeRecipe, modalOpen, sessionKey, openGame, closeGame, handleWin } = useRecipeVault();

  const filtered = useMemo(() => {
    const matched = creations.filter(
      (creation) =>
        (activeCategory === "All" || creation.category === activeCategory) &&
        matchesAvailability(creation, availability) &&
        matchesSearch(creation, search),
    );

    const sorted = [...matched].sort((a, b) => {
      if (sort === "A–Z") return a.title.localeCompare(b.title);
      return new Date(b.dateAdded) - new Date(a.dateAdded);
    });

    return sorted;
  }, [activeCategory, availability, search, sort]);

  const stats = useMemo(
    () => ({
      things: creations.length,
      recipesUnlockable: creations.filter((c) => c.recipeSlug).length,
      questionable: creations.filter((c) => c.status === "experiment").length,
    }),
    [],
  );

  const heroImages = useMemo(() => {
    const featured = creations.filter((c) => c.featured);
    const [imageA, imageB] = featured.length >= 2 ? featured : creations;
    return { imageA, imageB };
  }, []);

  function handleClearFilters() {
    setActiveCategory("All");
    setAvailability("Everything");
    setSearch("");
  }

  function goToCreation(creation) {
    if (creation.recipeSlug) {
      const recipe = getRecipeBySlug(creation.recipeSlug);
      if (recipe) {
        if (isUnlocked(recipe.slug)) {
          navigate(`/recipes/${recipe.slug}`);
        } else {
          openGame(recipe);
        }
        return;
      }
    }
    navigate(`/kitchen/${creation.slug}`);
  }

  function handlePickOne() {
    if (filtered.length === 0) return;
    const pick = filtered[Math.floor(Math.random() * filtered.length)];
    goToCreation(pick);
  }

  return (
    <div className="relative pb-24 pt-32 sm:pb-32 sm:pt-40">
      <Container className="relative flex flex-col gap-14 sm:gap-16">
        <KitchenHero
          things={stats.things}
          recipesUnlockable={stats.recipesUnlockable}
          questionable={stats.questionable}
          imageA={heroImages.imageA}
          imageB={heroImages.imageB}
        />

        <div className="flex flex-col gap-10 sm:gap-12">
          <KitchenControls
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            search={search}
            onSearchChange={setSearch}
            availability={availability}
            onAvailabilityChange={setAvailability}
            sort={sort}
            onSortChange={setSort}
            resultCount={filtered.length}
            onPickOne={handlePickOne}
            canPickOne={filtered.length > 0}
          />

          {filtered.length > 0 ? (
            <KitchenGallery creations={filtered} isUnlocked={isUnlocked} onPlay={openGame} />
          ) : (
            <KitchenEmptyState onClear={handleClearFilters} />
          )}
        </div>
      </Container>

      <GameModal
        open={modalOpen}
        onClose={closeGame}
        title={activeRecipe ? `Catch the Ingredients — ${activeRecipe.title}` : "Catch the Ingredients"}
      >
        {activeRecipe ? (
          <IngredientCatchGame key={sessionKey} recipe={activeRecipe} onWin={handleWin} onClose={closeGame} />
        ) : null}
      </GameModal>
    </div>
  );
}
