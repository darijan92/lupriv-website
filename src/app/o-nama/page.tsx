import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JsonLd } from "@/components/json-ld";
import { SITE } from "@/data/locations";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("oNama", "/o-nama");

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <JsonLd data={breadcrumbJsonLd([{ name: "O nama", path: "/o-nama" }])} />
      <div className="max-w-3xl space-y-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">O nama</p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-charcoal-900">
          O Ljekarnama Lupriv Plus
        </h1>
        <div className="space-y-4 text-lg leading-relaxed text-charcoal-700">
          <p>
            Ljekarne Lupriv Plus nastavljaju tradiciju koja u Mostaru traje od{" "}
            <strong className="font-semibold text-charcoal-900">1994.</strong> Godinama smo uz
            pacijente, obitelji i susjede: od prvog savjeta do redovite terapije, od dječjeg sirupa
            do pomagala koja olakšavaju svakodnevicu.
          </p>
          <p>
            Sjedište nam je na{" "}
            <strong className="font-semibold text-charcoal-900">{SITE.streetAddress}</strong> u
            Mostaru. Iz tog središta vodimo mrežu poslovnica diljem BiH, uz ugovorni odnos sa
            Zavodima zdravstvenog osiguranja. Dežurna poslovnica na{" "}
            <strong className="font-semibold text-charcoal-900">Stjepana Radića 37</strong> tu je
            kad vam treba izvan uobičajenog ritma.
          </p>
          <p>
            Naš cilj jednostavan je: da se u ljekarni osjećate sigurno i dobrodošli. Slušamo,
            savjetujemo i pomažemo vam da odaberete ono što vam stvarno treba — bez žurbe i bez
            hladnog žargona.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button asChild>
            <Link href="/poslovnice">Pronađite poslovnicu</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/kontakt">Javite nam se</Link>
          </Button>
        </div>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-3">
        <Card className="bg-sand-50 border-sand-200">
          <CardHeader>
            <CardTitle className="text-base">Tradicija od 1994.</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-charcoal-600">
            Pouzdano iskustvo i kontinuitet skrbi u Mostaru i BiH.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Ugovorna ZZO ljekarna</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-charcoal-600">
            Recepti i savjetovanje koje možete očekivati.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Dežurna poslovnica</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-charcoal-600">
            Stjepana Radića 37, Mostar — kad vam treba izvan uobičajenog ritma.
          </CardContent>
        </Card>
      </div>

      <p className="mt-10 text-sm text-charcoal-600">
        Pratite nas na Instagramu{" "}
        <a
          href={SITE.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-emerald-800 hover:underline"
        >
          {SITE.instagramHandle}
        </a>
        .
      </p>
    </div>
  );
}
