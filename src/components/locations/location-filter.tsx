"use client";

import { useMemo, useState } from "react";
import { LocationCard } from "./location-card";
import { cn } from "@/lib/utils";
import type { Location } from "@/lib/site";

export function LocationFilter({ locations }: { locations: Location[] }) {
  const cities = useMemo(
    () => Array.from(new Set(locations.map((l) => l.city))).sort((a, b) => a.localeCompare(b, "hr")),
    [locations]
  );
  const [city, setCity] = useState<string>("sve");

  const filtered = city === "sve" ? locations : locations.filter((l) => l.city === city);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCity("sve")}
          className={cn(
            "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
            city === "sve"
              ? "bg-emerald-800 text-white"
              : "bg-sand-100 text-charcoal-800 hover:bg-sand-200"
          )}
        >
          Svi ({locations.length})
        </button>
        {cities.map((c) => {
          const count = locations.filter((l) => l.city === c).length;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setCity(c)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                city === c
                  ? "bg-emerald-800 text-white"
                  : "bg-sand-100 text-charcoal-800 hover:bg-sand-200"
              )}
            >
              {c} ({count})
            </button>
          );
        })}
      </div>
      <p className="text-sm text-charcoal-600">
        Prikazano: <strong className="text-charcoal-900">{filtered.length}</strong> poslovnica
        {city !== "sve" ? ` u gradu ${city}` : ""}.
      </p>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((loc) => (
          <LocationCard key={loc.code} location={loc} />
        ))}
      </div>
    </div>
  );
}
