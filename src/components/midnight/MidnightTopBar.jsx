import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";

/**
 * A deliberately minimal top bar — no full site navigation here.
 * The page should feel a little disconnected from the public site
 * while still clearly wearing the same brand.
 */
export default function MidnightTopBar() {
  return (
    <header className="relative z-10 border-b border-cream/10">
      <Container className="flex items-center justify-between py-5 sm:py-6">
        <div className="flex items-center gap-3">
          <span className="font-display text-lg font-medium text-cream sm:text-xl">
            CRUMB &amp; CHAOS
          </span>
          <span className="hidden font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-cherry/70 sm:inline">
            After Hours
          </span>
        </div>
        <Link
          to="/"
          className="group inline-flex items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-wide text-biscuit/70 transition-colors hover:text-cherry focus-visible:outline-2 focus-visible:outline-cherry"
        >
          Leave Quietly
          <ArrowRight
            size={13}
            strokeWidth={2.5}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </Container>
    </header>
  );
}
