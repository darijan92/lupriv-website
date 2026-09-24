import { Clock, Mail, MapPin, Phone, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatHours, mapsUrl, type Location } from "@/lib/site";

export function LocationCard({ location }: { location: Location }) {
  const hours = formatHours(location.hours);

  return (
    <Card className={location.isDuty ? "ring-2 ring-coral-500/30 border-coral-100" : undefined}>
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <CardTitle className="text-base">{location.name}</CardTitle>
            <p className="mt-1 text-sm text-charcoal-600">{location.city}</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {location.isHq && <Badge variant="secondary">Sjedište</Badge>}
            {location.isDuty && <Badge variant="duty">Dežurna · Stjepana Radića 37</Badge>}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-charcoal-700">
        <p className="flex gap-2">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
          <span>
            {location.address}, {location.city}
          </span>
        </p>
        {location.phone && (
          <p className="flex gap-2">
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
            <a href={`tel:${location.phone.replace(/\//g, "")}`} className="hover:text-emerald-800">
              {location.phone}
            </a>
          </p>
        )}
        {location.email && (
          <p className="flex gap-2">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
            <a href={`mailto:${location.email}`} className="hover:text-emerald-800 break-all">
              {location.email}
            </a>
          </p>
        )}
        <div className="flex gap-2">
          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
          <ul className="space-y-0.5">
            {hours.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
        <Button asChild variant="outline" size="sm" className="mt-2 w-full sm:w-auto">
          <a href={mapsUrl(location)} target="_blank" rel="noopener noreferrer">
            Google Maps <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
