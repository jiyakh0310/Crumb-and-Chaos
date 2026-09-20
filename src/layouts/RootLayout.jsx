import { Outlet } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useScrollToTop } from "@/hooks/useScrollToTop";

export default function RootLayout() {
  useScrollToTop();

  return (
    <div className="flex min-h-dvh flex-col bg-espresso">
      <Navbar />
      <main className="flex-1"><Outlet /></main>
      <Footer />
    </div>
  );
}
