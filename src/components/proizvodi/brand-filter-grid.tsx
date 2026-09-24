"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  brands,
  brandCategoryLabels,
  brandFilterChips,
  type BrandCategory,
} from "@/data/brands";
import { cn } from "@/lib/utils";

function isBrandCategory(value: string | null): value is BrandCategory {
  return (
    value === "dermokozmetika" ||
    value === "dodaci" ||
    value === "kosa" ||
    value === "sunce" ||
    value === "bebe"
  );
}

export function BrandFilterGrid() {
  const searchParams = useSearchParams();
  const initial = searchParams.get("kat");
  const [active, setActive] = useState<"svi" | BrandCategory>(
    isBrandCategory(initial) ? initial : "svi",
  );

  useEffect(() => {
    setActive(isBrandCategory(initial) ? initial : "svi");
  }, [initial]);

  const filtered = useMemo(() => {
    if (active === "svi") return brands;
    return brands.filter((b) => b.categories.includes(active));
  }, [active]);

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filtriraj brandove po kategoriji"
      >
        {brandFilterChips.map((chip) => (
          <button
            key={chip.id}
            type="button"
            role="tab"
            aria-selected={active === chip.id}
            onClick={() => setActive(chip.id)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
              active === chip.id
                ? "border-emerald-700 bg-emerald-700 text-white"
                : "border-emerald-100 bg-white text-charcoal-700 hover:border-emerald-200 hover:bg-sand-50",
            )}
          >
            {chip.label}
          </button>
        ))}
      </div>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((brand) => (
          <li key={brand.id}>
            <article className="flex h-full flex-col justify-between rounded-2xl border border-emerald-100/80 bg-white p-5 shadow-sm shadow-emerald-900/5 transition hover:-translate-y-0.5 hover:shadow-md">
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-charcoal-900">
                  {brand.name}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-charcoal-600">
                  {brand.focus}
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {brand.categories.map((cat) => (
                  <Badge key={cat} variant="outline" className="font-medium">
                    {brandCategoryLabels[cat]}
                  </Badge>
                ))}
              </div>
            </article>
          </li>
        ))}
      </ul>

      {filtered.length === 0 ? (
        <p className="mt-6 text-sm text-charcoal-600">
          Nema brandova u ovoj kategoriji. Pokušajte drugi filter.
        </p>
      ) : null}
    </div>
  );
}
