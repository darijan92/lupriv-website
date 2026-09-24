import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InstagramIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { HQ, SITE } from "@/data/locations";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("kontakt", "/kontakt");

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <JsonLd data={breadcrumbJsonLd([{ name: "Kontakt", path: "/kontakt" }])} />
      <div className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">Kontakt</p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight">
          Kontaktirajte Ljekarne Lupriv Plus
        </h1>
        <p className="text-lg leading-relaxed text-charcoal-600">
          Imate pitanje o poslovnici, narudžbi ili proizvodu? Pišite nam — odgovaramo što prije
          možemo.
        </p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-5">
        <Card className="lg:col-span-2 bg-sand-50 border-sand-200 h-fit">
          <CardHeader>
            <CardTitle>Sjedište</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-charcoal-700">
            <p className="font-semibold text-charcoal-900">{SITE.brandName}</p>
            <p className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              {SITE.addressLine}
            </p>
            <p className="flex gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <a href={`tel:${SITE.phoneE164}`} className="hover:text-emerald-800">
                Tel: {SITE.phoneDisplay}
              </a>
            </p>
            <p className="flex gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <a href={`mailto:${SITE.email}`} className="hover:text-emerald-800">
                Email: {SITE.email}
              </a>
            </p>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 pt-2 font-medium text-emerald-800 hover:underline"
            >
              <InstagramIcon className="h-4 w-4" /> {SITE.instagramHandle}
            </a>
            <p className="pt-2 text-xs text-charcoal-500">
              Radno vrijeme sjedišta: Pon–Pet {HQ.hours.start}–{HQ.hours.end}
              {HQ.hours.saturday ? `, Subota ${HQ.hours.saturday}` : ""}
            </p>
          </CardContent>
        </Card>

        <div className="lg:col-span-3">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
