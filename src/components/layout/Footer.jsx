import { NavLink } from "react-router-dom";
import { Camera, Croissant, Mail, Pin } from "lucide-react";
import Container from "@/components/ui/Container";
import { footerLinks } from "@/data/nav";

const socials = [
  { label: "Instagram", href: "https://instagram.com", icon: Camera },
  { label: "Pinterest", href: "https://pinterest.com", icon: Pin },
  { label: "Email", href: "mailto:hello@crumbandchaos.com", icon: Mail },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-cream/10 bg-chocolate">
      <Container className="flex flex-col gap-14 py-16 sm:py-20">
        <div className="flex flex-col justify-between gap-12 lg:flex-row">
          <div className="max-w-sm">
            <NavLink to="/" className="flex items-center gap-2 font-display text-2xl font-medium text-cream">
              <Croissant size={24} strokeWidth={1.75} className="text-caramel" />
              CRUMB <span className="text-caramel">&amp;</span> CHAOS
            </NavLink>
            <p className="mt-4 font-sans text-sm leading-relaxed text-biscuit/80">
              Made with butter, chaos &amp; love.
            </p>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-20">
            <div className="flex flex-col gap-3">
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-biscuit/50">
                Explore
              </span>
              <nav className="flex flex-col gap-2.5">
                {footerLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className="w-fit font-sans text-sm text-cream/80 transition-colors hover:text-caramel"
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-3">
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-biscuit/50">
                Find Me
              </span>
              <div className="flex flex-col gap-2.5">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-fit items-center gap-2 font-sans text-sm text-cream/80 transition-colors hover:text-caramel"
                  >
                    <social.icon size={15} strokeWidth={1.75} />
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse items-start justify-between gap-6 border-t border-cream/10 pt-8 sm:flex-row sm:items-center">
          <p className="font-hand text-lg text-biscuit/60">
            Baked somewhere between hunger and curiosity.
          </p>

          <div className="flex items-center gap-6">
            <NavLink
              to="/midnight"
              aria-label="psst — a secret, if you're curious"
              className="group grid h-4 items-center font-sans text-xs uppercase tracking-[0.16em] text-biscuit/40 transition-colors hover:text-cherry focus-visible:text-cherry"
            >
              <span
                aria-hidden="true"
                className="col-start-1 row-start-1 whitespace-nowrap transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0"
              >
                psst...
              </span>
              <span
                aria-hidden="true"
                className="col-start-1 row-start-1 whitespace-nowrap opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                you saw nothing.
              </span>
            </NavLink>
            <span className="font-sans text-xs text-biscuit/40">
              &copy; {new Date().getFullYear()} CRUMB &amp; CHAOS
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
