import type { Metadata } from "next";
import Link from "next/link";
import {
  ClipboardList,
  HeartPulse,
  Leaf,
  Sparkles,
  Stethoscope,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SITE } from "@/data/locations";

export const metadata: Metadata = {
  title: "Usluge",
  description:
    "Recepti, farmaceutsko savjetovanje, ortopedska pomagala, dermokozmetika, dodaci prehrani i dostava diljem BiH.",
};

const services = [
  {
    id: "recepti",
    icon: Stethoscope,
    title: "Recepti i lijekovi bez recepta (OTC)",
    desc: "Izdavanje receptnih lijekova i širok izbor proizvoda bez recepta. Recite nam što vam treba — pomoći ćemo vam da odaberete sigurno i jasno.",
  },
  {
    id: "savjetovanje",
    icon: HeartPulse,
    title: "Farmaceutsko savjetovanje",
    desc: "Stručni razgovor o terapiji, doziranju, interakcijama i svakodnevnim pitanjima o zdravlju. Tu smo da objasnimo, ne da zakompliciramo.",
  },
  {
    id: "pomagala",
    icon: ClipboardList,
    title: "Medicinska i ortopedska pomagala",
    desc: "Pomagala koja olakšavaju kretanje, oporavak i svakodnevicu. Savjetujemo vas oko odabira i pravilne upotrebe.",
  },
  {
    id: "dermokozmetika",
    icon: Sparkles,
    title: "Dermokozmetika",
    desc: "Njega kože uz proizvode koje preporučujemo s povjerenjem — za osjetljivu kožu, svakodnevnu njegu i ciljane potrebe.",
  },
  {
    id: "dodaci",
    icon: Leaf,
    title: "Dodaci prehrani",
    desc: "Vitamini, minerali i dodaci prehrani prilagođeni godišnjem dobu, načinu života i preporukama farmaceuta.",
  },
  {
    id: "dostava",
    icon: Truck,
    title: "Dostava diljem BiH",
    desc: "Naručite i primite pošiljku kod kuće. Poštarina 7 KM; za narudžbe iznad 100 KM dostava je besplatna.",
  },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">Usluge</p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight">
          Što nudimo
        </h1>
        <p className="text-lg text-charcoal-600 leading-relaxed">
          Od recepta i savjeta do pomagala i dostave — sve na jednom mjestu.
        </p>
        <Badge variant="promo" className="w-fit">
          Dostava {SITE.deliveryFee} · besplatno iznad {SITE.freeDeliveryOver}
        </Badge>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <Card
            key={s.id}
            id={s.id}
            className="h-full scroll-mt-28 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <CardHeader>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                <s.icon className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg">{s.title}</CardTitle>
              <CardDescription className="text-sm leading-relaxed">{s.desc}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="mt-14 rounded-3xl border border-emerald-100 bg-sand-50 px-6 py-10 text-center sm:px-10">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
          Pronađite poslovnicu ili nam pišite
        </h2>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/poslovnice">Pronađite poslovnicu</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/kontakt">Javite nam se</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
