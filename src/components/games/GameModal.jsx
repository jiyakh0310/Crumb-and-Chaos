import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Reusable overlay shell — portals to document.body, traps focus,
 * closes on Escape or backdrop click, and locks page scroll while
 * open. Used by every game; knows nothing about game rules.
 */
export default function GameModal({ open, onClose, title, children }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "Tab") {
        const focusable = panelRef.current?.querySelectorAll(FOCUSABLE_SELECTOR);
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            aria-hidden="true"
            onClick={onClose}
            className="absolute inset-0 bg-espresso/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex max-h-[calc(100dvh-2rem)] w-full max-w-lg flex-col overflow-hidden rounded-lg border border-cream/15 bg-chocolate shadow-2xl focus:outline-none sm:max-h-[calc(100dvh-3rem)]"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-colors hover:border-cream/40 hover:text-cream focus-visible:outline-2 focus-visible:outline-caramel"
            >
              <X size={16} />
            </button>

            <div className="overflow-y-auto p-6 sm:p-8">{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
