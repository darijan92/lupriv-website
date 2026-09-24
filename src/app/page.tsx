import Link from "next/link";
import {
  ArrowRight,
  Clock,
  HeartPulse,
  MapPin,
  Package,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InstagramIcon } from "@/components/icons";
import { SITE } from "@/data/locations";

const services = [
  {
    icon: Stethoscope,
    title: "Recepti i lijekovi bez recepta (OTC)",
    desc: "Izdavanje receptnih lijekova i širok izbor proizvoda bez recepta. Recite nam što vam treba — pomoći ćemo vam da odaberete sigurno i jasno.",
  },
  {
    icon: HeartPulse,
    title: "Farmaceutsko savjetovanje",
    desc: "Stručni razgovor o terapiji, doziranju, interakcijama i svakodnevnim pitanjima o zdravlju. Tu smo da objasnimo, ne da zakompliciramo.",
  },
  {
    icon: Package,
    title: "Medicinska i ortopedska pomagala",
    desc: "Pomagala koja olakšavaju kretanje, oporavak i svakodnevicu. Savjetujemo vas oko odabira i pravilne upotrebe.",
  },
  {
    icon: Sparkles,
    title: "Dermokozmetika",
    desc: "Njega kože uz proizvode koje preporučujemo s povjerenjem — za osjetljivu kožu, svakodnevnu njegu i ciljane potrebe.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-sand-50 via-white to-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-100/60 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-sage-100/80 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
          <div className="space-y-6">
            <Badge variant="secondary" className="w-fit">
              Tradicija od 1994.
            </Badge>
            <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-charcoal-900 sm:text-5xl lg:text-[3.25rem] leading-[1.1]">
              Vaša ljekarna u Mostaru i BiH
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-charcoal-600 sm:text-lg">
              Od 1994. uz vas — recepti, savjeti, ortopedska pomagala i briga o zdravlju cijele
              obitelji.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/poslovnice">
                  Pronađite poslovnicu <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/usluge#dostava">Naručite dostavu</Link>
              </Button>
            </div>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-emerald-800 hover:text-emerald-950"
            >
              <InstagramIcon className="h-4 w-4" /> {SITE.instagramHandle}
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="bg-emerald-800 text-white border-0 shadow-lg shadow-emerald-900/20 sm:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-xl font-[family-name:var(--font-display)]">
                  Zašto Lupriv Plus
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-3 text-sm text-emerald-50/95">
                <p className="flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    <strong className="block text-white">Tradicija od 1994.</strong>
                    pouzdano iskustvo i kontinuitet skrbi
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <Stethoscope className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    <strong className="block text-white">Ugovorna ZZO ljekarna</strong>
                    recepti i savjetovanje koje možete očekivati
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    <strong className="block text-white">Dežurna poslovnica</strong>
                    Stjepana Radića 37, Mostar
                  </span>
                </p>
              </CardContent>
            </Card>
            <Card className="bg-sand-50 border-sand-200">
              <CardHeader>
                <MapPin className="mb-2 h-8 w-8 text-emerald-700" />
                <CardTitle className="text-base">Mreža poslovnica</CardTitle>
                <CardDescription>Mostar, Sarajevo, Rama, Jablanica, Čapljina, Livno, Posušje i šire.</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-white">
              <CardHeader>
                <Truck className="mb-2 h-8 w-8 text-emerald-700" />
                <CardTitle className="text-base">Dostava diljem BiH</CardTitle>
                <CardDescription>
                  Poštarina {SITE.deliveryFee}; besplatno iznad {SITE.freeDeliveryOver}.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">O nama</p>
          <p className="text-lg leading-relaxed text-charcoal-700">
            Lupriv Plus mjesto je gdje zdravlje nije samo recept na papiru. U našim poslovnicama
            dobivate lijekove, stručni farmaceutski savjet i proizvode za svakodnevnu brigu o sebi i
            obitelji. Radimo s povjerenjem koje se gradi godinama — jasno, topla i dostupno.
          </p>
          <Button asChild variant="outline">
            <Link href="/o-nama">Više o nama</Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">Usluge</p>
            <h2 className="mt-1 font-[family-name:var(--font-display)] text-3xl font-semibold text-charcoal-900">
              Što nudimo
            </h2>
            <p className="mt-2 text-charcoal-600">
              Od recepta i savjeta do pomagala i dostave — sve na jednom mjestu.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/usluge">Sve usluge</Link>
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <Card key={s.title} className="transition hover:-translate-y-0.5 hover:shadow-md">
              <CardHeader>
                <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                  <s.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-base">{s.title}</CardTitle>
                <CardDescription>{s.desc}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-br from-emerald-700 to-emerald-900 px-6 py-12 text-center text-white sm:px-12">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold">
            Pronađite poslovnicu ili nas kontaktirajte
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-emerald-100">
            Adrese, telefoni i radno vrijeme na jednom mjestu — ili nam pišite.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="secondary" className="bg-white text-emerald-900 hover:bg-sand-50">
              <Link href="/poslovnice">Pronađite poslovnicu</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10">
              <Link href="/kontakt">Javite nam se</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
