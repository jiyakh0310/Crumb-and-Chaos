import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets scroll position on every route change so navigating
 * never leaves the visitor stranded halfway down the last page.
 */
export function useScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // The site enables `scroll-behavior: smooth` globally so intentional
    // in-page/anchor scrolls feel nice — but that also makes a plain
    // scrollTo(0, 0) here animate over ~1s on every route change. During
    // that window the new page's whileInView elements mount and start
    // observing mid-scroll, and can end up stuck at their initial
    // (invisible) state. Route changes should land instantly.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
}
