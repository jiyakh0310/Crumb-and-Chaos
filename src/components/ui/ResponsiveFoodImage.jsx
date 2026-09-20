import { cn } from "@/utils/cn";
import { GRAIN_URL } from "@/utils/grain";
import { useImageLoaded } from "@/hooks/useImageLoaded";
import { TONES, Fallback } from "@/components/ui/ImageFallback";

/**
 * The same dish photographed once has to sit inside very different
 * frames across the site — a wide Kitchen tile, a 4:5 vault card, a
 * cinematic recipe hero, a square mobile block — and a single crop
 * forced through `object-cover` into all of them either crops the
 * subject out or leaves it looking like an afterthought.
 *
 * `images` carries pre-cropped variants for the shapes that actually
 * exist on this site (`wide` 16:9, `portrait` 4:5, `card` 4:3,
 * `mobile` 1:1). `variant` picks which one this frame wants as its
 * base/desktop source; a `mobile` variant, when present, is swapped
 * in under 640px via a real <picture><source> — no per-component
 * object-position guesswork.
 *
 * `fallbackSrc` covers dishes that have one real photo but no
 * frame-specific crops yet — it's used as-is (same single-crop
 * behavior as `PlaceholderArt`) rather than dropping straight to the
 * gradient placeholder. Only entries with no photo at all fall back
 * to `PlaceholderArt`'s gradient treatment, so callers can pass
 * `images`/`fallbackSrc` for every dish without special-casing which
 * ones have variants yet.
 */
export default function ResponsiveFoodImage({
  images,
  fallbackSrc,
  variant = "card",
  alt = "",
  tone = "caramel",
  icon: Icon,
  className,
  iconClassName,
  priority = false,
  focalPoint,
}) {
  const baseSrc =
    images?.[variant] ?? images?.wide ?? images?.card ?? images?.portrait ?? images?.mobile ?? fallbackSrc ?? null;
  const { ref, loaded, failed, onLoad, onError } = useImageLoaded(baseSrc);

  if (baseSrc && !failed) {
    return (
      <div className={cn("relative h-full w-full overflow-hidden", className)}>
        {!loaded ? (
          <div aria-hidden="true" className="absolute inset-0" style={{ background: TONES[tone] ?? TONES.caramel }} />
        ) : null}
        <picture>
          {images?.mobile ? <source media="(max-width: 639px)" srcSet={images.mobile} /> : null}
          <img
            ref={ref}
            src={baseSrc}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            decoding="async"
            onLoad={onLoad}
            onError={onError}
            style={focalPoint ? { objectPosition: focalPoint } : undefined}
            className={cn(
              "photo-treatment h-full w-full object-cover opacity-0 transition-opacity duration-700 ease-out",
              loaded && "opacity-100",
            )}
          />
        </picture>
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
