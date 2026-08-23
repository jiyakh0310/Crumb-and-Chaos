export default function KitchenEmptyState({ onClear }) {
  return (
    <div className="flex flex-col items-center gap-3 border border-dashed border-cream/15 py-16 text-center">
      <p className="font-display text-2xl text-cream">Nothing in the oven.</p>
      <p className="font-sans text-sm text-biscuit/70">Try searching for something less specific.</p>
      <button
        type="button"
        onClick={onClear}
        className="mt-2 inline-flex items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-caramel transition-colors hover:text-cream"
      >
        Clear the Chaos →
      </button>
    </div>
  );
}
