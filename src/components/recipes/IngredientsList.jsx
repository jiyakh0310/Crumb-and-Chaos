import { useState } from "react";
import { Check } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import { cn } from "@/utils/cn";
import { scaleIngredient } from "@/utils/recipeFormat";

/**
 * Tickable ingredients, grouped when the recipe has more than one
 * group. Checked state is component-local only — never persisted,
 * resets on refresh by design.
 */
export default function IngredientsList({ recipe, multiplier }) {
  const [checked, setChecked] = useState(() => new Set());
  const groups = recipe.ingredientGroups;
  const showGroupLabels = groups.length > 1;

  const toggle = (id) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="flex flex-col gap-7">
      {groups.map((group) => (
        <div key={group.group} className="flex flex-col gap-3">
          {showGroupLabels ? <Eyebrow>{group.group}</Eyebrow> : null}
          <ul className="flex flex-col">
            {group.items.map((item) => {
              const id = `${group.group}__${item.name}`;
              const isChecked = checked.has(id);
              return (
                <li key={id}>
                  <label className="group -mx-2 flex cursor-pointer items-start gap-3 rounded-md px-2 py-2 transition-colors hover:bg-cream/[0.03]">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggle(id)}
                      className="sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className={cn(
                        "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border transition-colors duration-200",
                        isChecked ? "border-caramel bg-caramel" : "border-cream/30 group-hover:border-cream/50",
                      )}
                    >
                      {isChecked ? <Check size={11} strokeWidth={3} className="text-espresso" /> : null}
                    </span>
                    <span className="flex flex-1 gap-3 font-sans text-sm sm:text-base">
                      <span
                        className={cn(
                          "w-20 shrink-0 text-right tabular-nums transition-colors duration-200 sm:w-24",
                          isChecked ? "text-biscuit/30" : "text-biscuit/60",
                        )}
                      >
                        {scaleIngredient(item, multiplier)}
                      </span>
                      <span
                        className={cn(
                          "flex-1 transition-colors duration-200",
                          isChecked ? "text-biscuit/35 line-through decoration-caramel/50" : "text-cream/90",
                        )}
                      >
                        {item.name}
                      </span>
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
