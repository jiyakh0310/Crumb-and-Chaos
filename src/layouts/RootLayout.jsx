import { AnimatePresence } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/motion/PageTransition";
import { useScrollToTop } from "@/hooks/useScrollToTop";

export default function RootLayout() {
  const location = useLocation();
  useScrollToTop();

  return (
    <div className="flex min-h-dvh flex-col bg-espresso">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
