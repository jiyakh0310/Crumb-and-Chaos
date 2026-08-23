import Container from "./Container";
import CrumbMotif from "./CrumbMotif";
import { cn } from "@/utils/cn";

/**
 * A thin editorial rule used at a couple of section boundaries where
 * two visually similar sections (e.g. back-to-back galleries) need a
 * quiet seam rather than just bleeding into each other. Not meant to
 * appear between every section — variety is the point.
 */
export default function SectionDivider({ label, className }) {
  return (
    <Container className={cn("flex items-center gap-4 py-2", className)}>
      <span className="h-px flex-1 bg-cream/10" />
      {label ? (
        <span className="shrink-0 font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-biscuit/40">
          {label}
        </span>
      ) : null}
      <CrumbMotif />
      <span className="h-px flex-1 bg-cream/10" />
    </Container>
  );
}
