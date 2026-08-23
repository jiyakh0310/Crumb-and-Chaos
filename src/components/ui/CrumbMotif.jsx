import { cn } from "@/utils/cn";

/**
 * A tiny recurring visual crumb — three irregular specks, used
 * sparingly at a couple of section edges as a quiet brand motif.
 * Not decoration-heavy: just enough to reward a second look.
 */
export default function CrumbMotif({ className }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none flex items-center gap-2.5 opacity-60", className)}>
      <span className="h-[5px] w-[6px] rounded-[40%_60%_55%_45%] bg-caramel/70" />
      <span className="h-[3px] w-[4px] rounded-[50%_50%_40%_60%] bg-biscuit/50" />
      <span className="h-[4px] w-[3px] rounded-[60%_40%_50%_50%] bg-caramel/40" />
    </div>
  );
}
