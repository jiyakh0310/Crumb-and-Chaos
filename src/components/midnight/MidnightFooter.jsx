/**
 * A stripped-down footer for the Midnight Menu — not the full site
 * footer, on purpose.
 */
export default function MidnightFooter() {
  return (
    <footer className="border-t border-cream/10 py-10 text-center">
      <p className="font-display text-sm font-medium uppercase tracking-[0.22em] text-cream/70">
        Crumb &amp; Chaos <span className="text-cherry/70">— After Hours</span>
      </p>
      <p className="mt-2 font-hand text-base text-biscuit/40">nothing happened here.</p>
      <p className="mt-1 font-sans text-xs text-biscuit/30">&copy; {new Date().getFullYear()}</p>
    </footer>
  );
}
