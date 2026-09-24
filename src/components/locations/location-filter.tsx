"use client";

import { useMemo, useState } from "react";
import { cities, locations } from "@/data/locations";
import { LocationCard } from "./location-card";
import { cn } from "@/lib/utils";

export function LocationFilter() {
  const [city, setCity] = useState<string>("sve");

  const filtered = useMemo(() => {
    const list = city === "sve" ? locations : locations.filter((l) => l.city === city);
    return [...list].sort((a, b) => {
      if (a.isDuty && !b.isDuty) return -1;
      if (!a.isDuty && b.isDuty) return 1;
      if (a.isHq && !b.isHq) return -1;
      if (!a.isHq && b.isHq) return 1;
      return Number(a.code) - Number(b.code);
    });
  }, [city]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCity("sve")}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium transition-colors",
            city === "sve"
              ? "bg-emerald-700 text-white"
              : "bg-sand-100 text-charcoal-800 hover:bg-sand-200"
          )}
        >
          Svi gradovi ({locations.length})
        </button>
        {cities.map((c) => {
          const count = locations.filter((l) => l.city === c).length;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setCity(c)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                city === c
                  ? "bg-emerald-700 text-white"
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
