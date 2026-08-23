import { GRAIN_URL } from "@/utils/grain";
import { cn } from "@/utils/cn";

/**
 * A conceptual, abstract storefront-at-dusk — not a real place, and
 * deliberately not photographic. Pure SVG/CSS so there's no
 * external image dependency to break later.
 */
export default function StorefrontGlow({ className }) {
  return (
    <div className={cn("relative overflow-hidden rounded-md border border-cream/10", className)}>
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, var(--color-espresso) 0%, var(--color-chocolate) 60%, var(--color-cocoa) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 45% 55% at 34% 55%, color-mix(in oklab, var(--color-caramel) 60%, transparent) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: `url("${GRAIN_URL}")` }}
      />

      <svg
        viewBox="0 0 400 260"
        className="relative h-full w-full"
        fill="none"
        role="img"
        aria-label="An illustrated storefront at dusk, imagined rather than real"
      >
        <path
          d="M20 244 V64 L118 22 H342 L380 64 V244"
          stroke="var(--color-cream)"
          strokeOpacity="0.18"
          strokeWidth="2"
        />
        <path d="M14 64 H386" stroke="var(--color-caramel)" strokeOpacity="0.45" strokeWidth="2" />
        <rect
          x="286"
          y="150"
          width="72"
          height="94"
          rx="2"
          stroke="var(--color-cream)"
          strokeOpacity="0.18"
          strokeWidth="2"
        />
        <circle cx="348" cy="198" r="2" fill="var(--color-cream)" fillOpacity="0.3" />
        <rect
          x="56"
          y="104"
          width="192"
          height="140"
          rx="2"
          stroke="var(--color-caramel)"
          strokeOpacity="0.65"
          strokeWidth="2"
          fill="color-mix(in oklab, var(--color-caramel) 14%, transparent)"
        />
        <line x1="152" y1="104" x2="152" y2="244" stroke="var(--color-caramel)" strokeOpacity="0.35" strokeWidth="1.5" />
        <line x1="56" y1="174" x2="248" y2="174" stroke="var(--color-caramel)" strokeOpacity="0.35" strokeWidth="1.5" />
      </svg>
    </div>
  );
}
