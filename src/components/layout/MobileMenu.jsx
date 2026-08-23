import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import Button from "@/components/ui/Button";
import { navLinks } from "@/data/nav";
import { cn } from "@/utils/cn";

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.16 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * Fullscreen overlay menu for small screens. Deliberately not a
 * tiny hamburger dropdown — this should feel like an event.
 */
export default function MobileMenu({ open, onClose }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-40 flex flex-col justify-between overflow-hidden bg-espresso lg:hidden"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-cherry/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-pistachio/10 blur-3xl"
          />

          <motion.nav
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="flex flex-1 flex-col items-start justify-center gap-3 px-8 pt-24"
          >
            {navLinks.map((link, i) => (
              <motion.div key={link.to} variants={itemVariants} className="overflow-hidden">
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      "font-display text-[13vw] leading-[1.05] font-medium transition-colors sm:text-6xl",
                      isActive ? "text-caramel" : "text-cream hover:text-caramel",
                    )
                  }
                >
                  <span className="mr-3 align-top font-sans text-xs font-semibold text-biscuit/50">
                    0{i + 1}
                  </span>
                  {link.label}
                </NavLink>
              </motion.div>
            ))}
          </motion.nav>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="flex flex-col gap-6 border-t border-cream/10 px-8 py-8"
          >
            <Button to="/ask" variant="primary" arrow onClick={onClose} className="w-fit">
              Ask the Baker
            </Button>
            <p className="font-hand text-xl text-biscuit/70">
              made with butter, chaos &amp; a little bit of flour on the ceiling.
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
