import { cn } from "@/utils/cn";
import { GRAIN_URL } from "@/utils/grain";
import { useImageLoaded } from "@/hooks/useImageLoaded";
import { TONES, Fallback } from "@/components/ui/ImageFallback";

/**
 * Renders a real photo when `src` is provided; otherwise falls back
 * to a tasteful gradient + grain placeholder so every creation can
 * ship today and swap in real photography later without touching
 * layout code — just add `image.src`.
 *
 * Real photos fade in once loaded (no flash of blank space), fail
 * gracefully back to the gradient placeholder if the request errors,
 * and default to lazy-loading — pass `priority` for above-the-fold
 * images (hero-adjacent shots) so they load eagerly instead.
 *
 * Single-crop only — for a photo reused across hero/portrait/card/
 * mobile layouts with different aspect ratios, use
 * `ResponsiveFoodImage` instead.
 */
export default function PlaceholderArt({
  src,
  alt = "",
  tone = "caramel",
  icon: Icon,
  className,
  iconClassName,
  priority = false,
}) {
  const { ref, loaded, failed, onLoad, onError } = useImageLoaded(src);

  if (src && !failed) {
    return (
      <div className={cn("relative h-full w-full overflow-hidden", className)}>
        {!loaded ? (
          <div aria-hidden="true" className="absolute inset-0" style={{ background: TONES[tone] ?? TONES.caramel }} />
        ) : null}
        <img
          ref={ref}
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          onLoad={onLoad}
          onError={onError}
          className={cn(
            "photo-treatment h-full w-full object-cover opacity-0 transition-opacity duration-700 ease-out",
            loaded && "opacity-100",
          )}
        />
        {loaded ? (
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.05]"
            style={{ backgroundImage: `url("${GRAIN_URL}")` }}
          />
        ) : null}
      </div>
    );
  }

  return <Fallback alt={alt} tone={tone} icon={Icon} className={className} iconClassName={iconClassName} />;
}
