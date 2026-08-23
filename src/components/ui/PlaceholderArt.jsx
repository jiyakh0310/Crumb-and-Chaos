import { cn } from "@/utils/cn";
import { GRAIN_URL } from "@/utils/grain";

const TONES = {
  caramel:
    "radial-gradient(circle at 26% 22%, color-mix(in oklab, var(--color-caramel) 55%, transparent) 0%, transparent 50%), linear-gradient(155deg, var(--color-cocoa) 0%, var(--color-chocolate) 65%, var(--color-espresso) 100%)",
  chocolate:
    "radial-gradient(circle at 70% 18%, color-mix(in oklab, var(--color-cocoa) 60%, transparent) 0%, transparent 55%), linear-gradient(165deg, var(--color-chocolate) 0%, var(--color-espresso) 100%)",
  cherry:
    "radial-gradient(circle at 30% 28%, color-mix(in oklab, var(--color-cherry) 38%, transparent) 0%, transparent 55%), linear-gradient(155deg, var(--color-cocoa) 0%, var(--color-espresso) 100%)",
  biscuit:
    "radial-gradient(circle at 28% 20%, color-mix(in oklab, var(--color-biscuit) 32%, transparent) 0%, transparent 50%), linear-gradient(155deg, var(--color-cocoa) 0%, var(--color-chocolate) 70%, var(--color-espresso) 100%)",
};

/**
 * Renders a real photo when `src` is provided; otherwise falls back
 * to a tasteful gradient + grain placeholder so every creation can
 * ship today and swap in real photography later without touching
 * layout code — just add `image.src`.
 */
export default function PlaceholderArt({ src, alt = "", tone = "caramel", icon: Icon, className, iconClassName }) {
  if (src) {
    return <img src={src} alt={alt} loading="lazy" className={cn("h-full w-full object-cover", className)} />;
  }

  return (
    <div role="img" aria-label={alt} className={cn("relative h-full w-full overflow-hidden", className)}>
      <div className="absolute inset-0" style={{ background: TONES[tone] ?? TONES.caramel }} />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.08]"
        style={{ backgroundImage: `url("${GRAIN_URL}")` }}
      />
      {Icon ? (
        <Icon
          aria-hidden="true"
          strokeWidth={1}
          className={cn(
            "absolute left-1/2 top-1/2 h-[36%] w-[36%] -translate-x-1/2 -translate-y-1/2 text-cream/15",
            iconClassName,
          )}
        />
      ) : null}
    </div>
  );
}
