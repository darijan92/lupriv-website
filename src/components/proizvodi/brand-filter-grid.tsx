"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  brandFilterChips,
  type Brand,
  type BrandCategory,
} from "@/lib/site";

export function BrandFilterGrid({ brands }: { brands: Brand[] }) {
  const searchParams = useSearchParams();
  const kat = searchParams.get("kat");
  const initial: "svi" | Exclude<BrandCategory, "ostalo"> =
    kat && brandFilterChips.some((c) => c.id === kat)
      ? (kat as "svi" | Exclude<BrandCategory, "ostalo">)
      : "svi";
  const [filter, setFilter] = useState(initial);

  const filtered = useMemo(() => {
    if (filter === "svi") return brands;
    return brands.filter((b) => b.categories.includes(filter));
  }, [brands, filter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {brandFilterChips.map((chip) => (
          <button
            key={chip.id}
            type="button"
            onClick={() => setFilter(chip.id)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
              filter === chip.id
                ? "bg-emerald-800 text-white"
                : "bg-sand-100 text-charcoal-800 hover:bg-sand-200"
            )}
          >
            {chip.label}
          </button>
        ))}
      </div>
      <p className="text-sm text-charcoal-600">
        Prikazano: <strong className="text-charcoal-900">{filtered.length}</strong> brandova
        {filter !== "svi" ? ` · ${brandFilterChips.find((c) => c.id === filter)?.label}` : ""}.
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((brand) => (
          <div
            key={brand.id}
            className="rounded-2xl border border-emerald-100 bg-white px-5 py-4 shadow-sm shadow-emerald-900/5"
          >
            <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-charcoal-900">
              {brand.name}
            </p>
            <p className="mt-1 text-sm text-charcoal-600">{brand.focus}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
