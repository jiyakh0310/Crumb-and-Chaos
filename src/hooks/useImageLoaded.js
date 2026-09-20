import { useEffect, useRef, useState } from "react";

/**
 * Tracks an <img>'s load state for a fade-in, and defends against the
 * classic cached-image race: a browser-cached image can finish loading
 * (and never fire React's onLoad) before this effect even attaches,
 * since the request may have already resolved. Checking `.complete`
 * directly, plus a short safety timeout, means a photo is never left
 * stuck invisible.
 */
export function useImageLoaded(src) {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setFailed(false);
  }, [src]);

  useEffect(() => {
    if (!src || loaded || failed) return undefined;

    if (ref.current?.complete && ref.current.naturalWidth > 0) {
      setLoaded(true);
      return undefined;
    }

    const timer = setTimeout(() => {
      if (ref.current?.complete && ref.current.naturalWidth > 0) setLoaded(true);
    }, 600);
    return () => clearTimeout(timer);
  }, [src, loaded, failed]);

  return {
    ref,
    loaded,
    failed,
    onLoad: () => setLoaded(true),
    onError: () => setFailed(true),
  };
}
