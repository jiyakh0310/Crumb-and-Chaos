import { useEffect, useRef, useState } from "react";

/**
 * Backs every scroll-reveal primitive (Reveal, FadeUp, StaggerChildren,
 * and the various card components that animate in on mount).
 *
 * framer-motion's `whileInView`/`useInView` occasionally never
 * resolves its first observation after an SPA route change — the
 * element mounts already sitting in the viewport, but nothing ever
 * flips it to "visible", leaving it stuck at its `initial`
 * (invisible) state until a full page reload. Confirmed reproducible
 * across routes in this app with framer-motion 13 + React 19.
 *
 * Rather than depend on framer-motion's own viewport tracking, this
 * uses a plain IntersectionObserver directly, plus a short geometry
 * fallback in case even that never fires — if the element is
 * genuinely on-screen shortly after mount, reveal it regardless.
 * Below-the-fold content is untouched: the fallback only ever
 * confirms what the observer should already have reported.
 *
 * Every caller shares one IntersectionObserver per distinct
 * `rootMargin` (in practice, one observer for the whole app, since
 * every call site uses the same default margin) instead of each
 * revealing element spinning up its own — a page like /kitchen can
 * easily mount 20+ of these at once, and that many separate
 * observers is unnecessary overhead for the browser to track.
 */

const observerRegistry = new Map();

function getSharedObserver(margin) {
  let entry = observerRegistry.get(margin);
  if (entry) return entry;

  const callbacks = new Map();
  const observer = new IntersectionObserver(
    (entries) => {
      for (const observerEntry of entries) {
        if (observerEntry.isIntersecting) {
          callbacks.get(observerEntry.target)?.();
        }
      }
    },
    { rootMargin: margin },
  );

  entry = { observer, callbacks };
  observerRegistry.set(margin, entry);
  return entry;
}

export function useRevealTrigger({ once = true, margin = "-10% 0px" } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    let disposed = false;
    const reveal = () => {
      if (disposed) return;
      setInView(true);
    };

    const fallbackTimer = setTimeout(() => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) reveal();
    }, 400);

    let unsubscribe = () => {};
    if (typeof IntersectionObserver !== "undefined") {
      const { observer, callbacks } = getSharedObserver(margin);
      const onIntersect = () => {
        reveal();
        clearTimeout(fallbackTimer);
        if (once) {
          observer.unobserve(el);
          callbacks.delete(el);
        }
      };
      callbacks.set(el, onIntersect);
      observer.observe(el);
      unsubscribe = () => {
        observer.unobserve(el);
        callbacks.delete(el);
      };
    } else {
      // No IntersectionObserver support at all — just show the content.
      reveal();
    }

    return () => {
      disposed = true;
      clearTimeout(fallbackTimer);
      unsubscribe();
    };
  }, [once, margin]);

  return { ref, inView };
}
