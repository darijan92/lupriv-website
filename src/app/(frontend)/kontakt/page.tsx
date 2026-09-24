import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InstagramIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { getHq, getPageBySlug, getSiteSettings } from "@/lib/payload";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [site, page] = await Promise.all([getSiteSettings(), getPageBySlug("kontakt")]);
  if (!page) return {};
  return buildPageMetadata(page, "/kontakt", site);
}

export default async function ContactPage() {
  const [site, page, hq] = await Promise.all([
    getSiteSettings(),
    getPageBySlug("kontakt"),
    getHq(),
  ]);
  if (!page) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <JsonLd data={breadcrumbJsonLd([{ name: "Kontakt", path: "/kontakt" }], site)} />
      <div className="max-w-3xl space-y-4">
        {page.eyebrow ? (
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
            {page.eyebrow}
          </p>
        ) : null}
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight">
          {page.h1}
        </h1>
        {page.intro ? (
          <p className="text-lg leading-relaxed text-charcoal-600">{page.intro}</p>
        ) : null}
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-5">
        <Card className="lg:col-span-2 bg-sand-50 border-sand-200 h-fit">
          <CardHeader>
            <CardTitle>Sjedište</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-charcoal-700">
            <p className="font-semibold text-charcoal-900">{site.brandName}</p>
            <p className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              {site.addressLine}
            </p>
            <p className="flex gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <a href={`tel:${site.phoneE164}`} className="hover:text-emerald-800">
                Tel: {site.phoneDisplay}
              </a>
            </p>
            <p className="flex gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <a href={`mailto:${site.email}`} className="hover:text-emerald-800">
                Email: {site.email}
              </a>
            </p>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 pt-2 font-medium text-emerald-800 hover:underline"
            >
              <InstagramIcon className="h-4 w-4" /> {site.instagramHandle}
            </a>
            {hq ? (
              <p className="pt-2 text-xs text-charcoal-500">
                Radno vrijeme sjedišta: Pon–Pet {hq.hours.start}–{hq.hours.end}
                {hq.hours.saturday ? `, Subota ${hq.hours.saturday}` : ""}
              </p>
            ) : null}
          </CardContent>
        </Card>

        <div className="lg:col-span-3">
          <ContactForm email={site.email} />
        </div>
      </div>
    </div>
  );
}
