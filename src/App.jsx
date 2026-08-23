import { Route, Routes } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import Home from "@/pages/Home";
import Kitchen from "@/pages/Kitchen";
import CreationDetail from "@/pages/CreationDetail";
import RecipeVault from "@/pages/RecipeVault";
import RecipeDetail from "@/pages/RecipeDetail";
import BakeJournal from "@/pages/BakeJournal";
import JournalPost from "@/pages/JournalPost";
import About from "@/pages/About";
import AskTheBaker from "@/pages/AskTheBaker";
import MidnightMenu from "@/pages/MidnightMenu";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <Routes>
      {/* /midnight intentionally sits outside RootLayout — it brings
          its own minimal top bar and footer instead of the public
          site's navbar/footer. */}
      <Route path="midnight" element={<MidnightMenu />} />

      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="kitchen" element={<Kitchen />} />
        <Route path="kitchen/:slug" element={<CreationDetail />} />
        <Route path="recipes" element={<RecipeVault />} />
        <Route path="recipes/:slug" element={<RecipeDetail />} />
        <Route path="journal" element={<BakeJournal />} />
        <Route path="journal/:slug" element={<JournalPost />} />
        <Route path="about" element={<About />} />
        <Route path="ask" element={<AskTheBaker />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
