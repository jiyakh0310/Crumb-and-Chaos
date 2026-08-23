import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link2, Printer } from "lucide-react";
import { cn } from "@/utils/cn";

const MESSAGES = {
  success: "copied. go enable someone else's baking problem.",
  error: "couldn't copy — grab the URL from the address bar.",
};

/**
 * Print + copy-link controls. Both are irrelevant on paper, so the
 * whole row is print:hidden.
 */
export default function ShareControls() {
  const [status, setStatus] = useState("idle"); // idle | success | error

  const handlePrint = () => window.print();

  const handleCopy = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("clipboard unavailable");
      await navigator.clipboard.writeText(window.location.href);
      setStatus("success");
    } catch {
      setStatus("error");
    }
    window.setTimeout(() => setStatus("idle"), 2600);
  };

  const buttonClass =
    "inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-wide text-biscuit/70 transition-colors duration-200 hover:text-cream focus-visible:outline-2 focus-visible:outline-caramel";

  return (
    <div className="flex flex-wrap items-center gap-6 print:hidden">
      <button type="button" onClick={handlePrint} className={buttonClass}>
        <Printer size={14} strokeWidth={1.75} />
        Print Recipe
      </button>
      <button type="button" onClick={handleCopy} className={buttonClass}>
        <Link2 size={14} strokeWidth={1.75} />
        Copy Link
      </button>

      <AnimatePresence>
        {status !== "idle" ? (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            role="status"
            className={cn(
              "font-hand text-lg",
              status === "success" ? "text-pistachio" : "text-cherry",
            )}
          >
            {MESSAGES[status]}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
