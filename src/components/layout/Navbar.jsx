import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Croissant, Menu, X } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import MobileMenu from "./MobileMenu";
import { navLinks } from "@/data/nav";
import { cn } from "@/utils/cn";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(() => window.scrollY > 32);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled || menuOpen
            ? "border-b border-cream/10 bg-espresso/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <Container className="flex h-20 items-center justify-between sm:h-24">
          <NavLink to="/" className="group flex items-center gap-2.5 font-display text-xl font-medium tracking-tight text-cream sm:text-2xl">
            <Croissant size={26} strokeWidth={1.75} className="text-caramel transition-transform duration-500 group-hover:-rotate-12" />
            <span>
              CRUMB <span className="text-caramel">&amp;</span> CHAOS
            </span>
          </NavLink>

          <nav className="hidden items-center gap-9 lg:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "relative py-2 font-sans text-[13px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300",
                    isActive ? "text-caramel" : "text-cream/75 hover:text-cream",
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      className={cn(
                        "absolute -bottom-0.5 left-0 h-px bg-caramel transition-all duration-300",
                        isActive ? "w-full" : "w-0",
                      )}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button to="/ask" variant="primary" size="sm" arrow>
              Ask the Baker
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full border border-cream/15 text-cream transition-colors hover:border-cream/40 lg:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? "close" : "open"}
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </Container>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
