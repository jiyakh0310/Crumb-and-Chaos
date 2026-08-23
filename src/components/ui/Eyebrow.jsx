import { cn } from "@/utils/cn";

/**
 * Small tracked label used above headings, e.g. "The Archive", "Kitchen SOS".
 */
export default function Eyebrow({ children, className, tone = "caramel" }) {
  const toneClass = tone === "cherry" ? "text-cherry" : tone === "pistachio" ? "text-pistachio" : "text-caramel";

  return (
    <span className={cn("inline-flex items-center gap-2.5 font-sans text-xs font-semibold uppercase tracking-[0.28em]", toneClass, className)}>
      <span className="h-px w-6 bg-current opacity-70" aria-hidden="true" />
      {children}
    </span>
  );
}
