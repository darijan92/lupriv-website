# SEO paket — Ljekarne Lupriv Plus (Mostar, BiH)

**Za:** Lupriv Website (Next.js App Router)  
**Brand:** LJZU Lupriv Plus Mostar  
**Jezik:** hrvatski (hr)  
**Domena (plan):** `https://luprivplus.com` (trenutno prazna; deploy u pripremi)  
**Stranice:** `/` · `/o-nama` · `/usluge` · `/poslovnice` · `/kontakt`  
**Napomena:** Ne spominjati Pharm. Svi placeholderi (adresa, telefon, geo) zamijeniti stvarnim NAP podacima prije go-livea.

---

## 1. On-page SEO checklist

### Zajednička pravila (sve stranice)

| Element | Pravilo |
|---|---|
| **Title** | ~50–60 znakova (max ~60); brand + lokalni signal (Mostar / BiH) |
| **Description** | ~150–160 znakova; CTA + usluga + lokacija |
| **H1** | Jedan po stranici; uključiti primarnu ključnu frazu |
| **H2** | 2–5 po stranici; sekundarne / long-tail fraze |
| **NAP** | Isti Name · Address · Phone na Poslovnice, Kontakt, footer, JSON-LD |
| **Interni linkovi** | Svaka stranica → barem 2 druge; Home hub |
| **Lokalni SEO** | „Mostar“, „BiH“, „ljekarna/e“ u title/H1/body gdje prirodno |
| **URL** | Kratki, HR slugovi (već definirani) |
| **Canonical** | Self-canonical na produkciji |

### Home (`/`)

| Stavka | Specifikacija |
|---|---|
| **Title** | `Ljekarne Lupriv Plus \| Mostar i BiH od 1994.` (~48 zn.) — **zadržati** |
| **Description** | `Ljekarne Lupriv Plus — recepti, farmaceutsko savjetovanje, ortopedska pomagala i dostava diljem BiH. Tradicija od 1994. Pronađite poslovnicu ili nas kontaktirajte.` (~155 zn.) — **zadržati** |
| **H1** | `Ljekarne Lupriv Plus — Mostar i BiH od 1994.` |
| **H2 (prijedlozi)** | `Usluge naših ljekarni` · `Zašto Lupriv Plus` · `Poslovnice u Mostaru` · `Dostava diljem BiH` |
| **Lokalni SEO** | Mostar + BiH u title/H1; tradicija 1994. kao E-E-A-T signal |
| **Interni linkovi** | → `/usluge`, `/poslovnice`, `/kontakt`, `/o-nama` (CTA gumbi + footer) |

**Checklist Home**
- [ ] Title/description u `generateMetadata` (ili `metadata` export)
- [ ] Jedan H1; H2 ne dupliciraju H1 doslovno
- [ ] CTA „Pronađite poslovnicu“ → `/poslovnice`
- [ ] CTA „Kontaktirajte nas“ → `/kontakt`
- [ ] Footer NAP konzistentan

### O nama (`/o-nama`)

| Stavka | Specifikacija |
|---|---|
| **Title** | vidi §4 |
| **Description** | vidi §4 |
| **H1** | `O Ljekarnama Lupriv Plus` |
| **H2** | `Tradicija od 1994.` · `Naša misija` · `Tim i stručnost` · `Ljekarne u Mostaru i BiH` |
| **Lokalni SEO** | Priča brenda + Mostar; bez pretjeranog keyword stuffinga |
| **Interni linkovi** | → `/usluge`, `/poslovnice`, `/kontakt` |

**Checklist O nama**
- [ ] Godina 1994. vidljiva iznad folda
- [ ] Link na usluge i poslovnice u bodyju
- [ ] Bez spomena Pharm / trećih brendova koji nisu Lupriv Plus

### Usluge (`/usluge`)

| Stavka | Specifikacija |
|---|---|
| **Title** | vidi §4 |
| **Description** | vidi §4 |
| **H1** | `Usluge ljekarni Lupriv Plus` |
| **H2** | `Izdavanje recepata` · `Farmaceutsko savjetovanje` · `Ortopedska pomagala` · `Dostava lijekova diljem BiH` · `(opcionalno) Dežurna ljekarna — informacije` |
| **Lokalni SEO** | Svaki H2 = primarna/sekundarna fraza; kratki odlomci 80–150 riječi |
| **Interni linkovi** | → `/poslovnice` (gdje ostvariti uslugu), → `/kontakt` (upiti), → `/` |

**Checklist Usluge**
- [ ] Jedna sekcija po usluzi (H2 + paragraf + CTA)
- [ ] „Dežurna“ samo ako stvarno sudjelujete u rasporedu — inače izostaviti ili „informacije o dežurstvu u Mostaru“ bez lažnog claima
- [ ] Anchor tekst: „pogledajte poslovnice“, „pošaljite upit“

### Poslovnice (`/poslovnice`)

| Stavka | Specifikacija |
|---|---|
| **Title** | vidi §4 |
| **Description** | vidi §4 |
| **H1** | `Poslovnice Lupriv Plus u Mostaru` |
| **H2** | Po lokaciji: `Ljekarna [ulica/kvart]` · `Radno vrijeme` · `Kako do nas` |
| **Lokalni SEO** | **Ključna lokalna stranica** — puni NAP po poslovnici, Google Maps embed ili link, radno vrijeme |
| **Interni linkovi** | → `/kontakt`, `/usluge`, pojedinačne kartice → tel:/mailto: |

**Checklist Poslovnice**
- [ ] NAP identičan JSON-LD i footeru (znak po znak)
- [ ] Svaka poslovnica: adresa, telefon, email, radno vrijeme, (opcionalno) geo
- [ ] Schema `Pharmacy` / `LocalBusiness` per lokacija ili jedna Organization + `department`
- [ ] Ne koristiti „apoteka“ u H1 brenda ako brand koristi „ljekarna“ — konzistentnost preferirana; „apoteka“ može u bodyju kao sinonim jer je lokalni intent jak

### Kontakt (`/kontakt`)

| Stavka | Specifikacija |
|---|---|
| **Title** | vidi §4 |
| **Description** | vidi §4 |
| **H1** | `Kontaktirajte Ljekarne Lupriv Plus` |
| **H2** | `Pošaljite upit` · `Telefon i e-pošta` · `Poslovnice i adrese` |
| **Lokalni SEO** | Forma + NAP; link na `/poslovnice` |
| **Interni linkovi** | → `/poslovnice`, `/usluge` |

**Checklist Kontakt**
- [ ] Forma s `name`, `email`, `poruka` (+ honeypot)
- [ ] Visible NAP (ne samo u formi)
- [ ] `tel:` i `mailto:` linkovi

### NAP konzistentnost (obavezno)

Definirati **jedan izvor istine** (CMS / env / `content/nap.ts`) i koristiti ga u:

1. Footer (sve stranice)  
2. `/poslovnice`  
3. `/kontakt`  
4. JSON-LD (`Organization` + `Pharmacy`)  
5. Google Business Profile (kad se poveže)

**Placeholder format (zamijeniti):**

```
Naziv: LJZU Lupriv Plus Mostar / Ljekarne Lupriv Plus
Adresa: [ULICA I BROJ], 88000 Mostar, Bosna i Hercegovina
Telefon: +387 XX XXX XXX
Email: [info@luprivplus.com]
```

### Mapa internih linkova

```
/  ──────────────┬──► /o-nama
                 ├──► /usluge
                 ├──► /poslovnice
                 └──► /kontakt

/o-nama  ──► /usluge, /poslovnice, /kontakt
/usluge  ──► /poslovnice, /kontakt, /
/poslovnice ──► /kontakt, /usluge
/kontakt ──► /poslovnice, /usluge
```

---

## 2. Tehničke preporuke (Next.js App Router)

Pretpostavka: App Router, `app/` direktorij, produkcijski host (npr. Vercel).

### 2.1 `sitemap.ts`

Datoteka: `app/sitemap.ts`

```ts
import type { MetadataRoute } from 'next'

const BASE = 'https://luprivplus.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    {
      url: `${BASE}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE}/o-nama`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE}/usluge`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE}/poslovnice`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE}/kontakt`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
```

**Prioriteti (obrazloženje):** Home 1.0; Usluge + Poslovnice 0.9 (konverzija + lokalni SEO); Kontakt 0.8; O nama 0.7.  
Kad dodate pojedinačne URL-ove poslovnica (`/poslovnice/[slug]`), dodajte ih s `priority: 0.8`, `changeFrequency: 'weekly'`.

### 2.2 `robots.ts`

Datoteka: `app/robots.ts`

```ts
import type { MetadataRoute } from 'next'

const BASE = 'https://luprivplus.com'
const isProd = process.env.VERCEL_ENV === 'production'
// ili: process.env.NEXT_PUBLIC_SITE_ENV === 'production'

export default function robots(): MetadataRoute.Robots {
  if (!isProd) {
    // Staging / preview: zabraniti indeksiranje
    return {
      rules: { userAgent: '*', disallow: '/' },
    }
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'], // po potrebi
    },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  }
}
```

**Tip staging:** Preview deployevi (Vercel Preview) ne smiju biti indeksirani — gornji `!isProd` to rješava. Alternativa: `X-Robots-Tag: noindex` na preview domeni.

### 2.3 JSON-LD

Staviti u layout ili po stranici putem `<script type="application/ld+json">` ili Next `JSON-LD` helpera. **Placeholderi** — zamijeniti prije go-livea.

#### Organization (site-wide, npr. `app/layout.tsx`)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Ljekarne Lupriv Plus",
  "alternateName": "LJZU Lupriv Plus Mostar",
  "url": "https://luprivplus.com",
  "logo": "https://luprivplus.com/logo.png",
  "foundingDate": "1994",
  "email": "info@luprivplus.com",
  "telephone": "+387-XX-XXX-XXX",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[ULICA I BROJ]",
    "addressLocality": "Mostar",
    "postalCode": "88000",
    "addressCountry": "BA"
  },
  "sameAs": [
    "https://www.facebook.com/[PAGE]",
    "https://www.instagram.com/[HANDLE]"
  ]
}
```

#### Pharmacy / LocalBusiness (Poslovnice ili Home)

Koristiti `@type: "Pharmacy"` (podvrsta LocalBusiness) — najbolje odgovara ljekarni:

```json
{
  "@context": "https://schema.org",
  "@type": "Pharmacy",
  "name": "Ljekarna Lupriv Plus — [Kvart / Ulica]",
  "image": "https://luprivplus.com/images/poslovnica-[slug].jpg",
  "url": "https://luprivplus.com/poslovnice",
  "telephone": "+387-XX-XXX-XXX",
  "email": "info@luprivplus.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[ULICA I BROJ]",
    "addressLocality": "Mostar",
    "postalCode": "88000",
    "addressRegion": "Hercegovačko-neretvanska županija",
    "addressCountry": "BA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 43.3438,
    "longitude": 17.8078
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "20:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "08:00",
      "closes": "14:00"
    }
  ],
  "priceRange": "$$",
  "parentOrganization": {
    "@type": "Organization",
    "name": "Ljekarne Lupriv Plus"
  }
}
```

> Geo koordinate gore su **primjer za Mostar centar** — zamijeniti točnim koordinatama svake poslovnice (Google Maps → desni klik → koordinate).

Za više lokacija: niz `Pharmacy` objekata ili `Organization` s `"department": [ ... ]`.

#### BreadcrumbList (pattern za unutarnje stranice)

Primjer za `/usluge`:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Početna",
      "item": "https://luprivplus.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Usluge",
      "item": "https://luprivplus.com/usluge"
    }
  ]
}
```

Pattern za ostale:

| Stranica | Breadcrumb |
|---|---|
| `/o-nama` | Početna → O nama |
| `/usluge` | Početna → Usluge |
| `/poslovnice` | Početna → Poslovnice |
| `/kontakt` | Početna → Kontakt |
| `/poslovnice/[slug]` | Početna → Poslovnice → [Naziv] |

**Implementacija (skica):**

```tsx
// components/JsonLd.tsx
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
```

### 2.4 Metadata u App Routeru (podsjetnik)

```ts
// app/usluge/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Usluge ljekarni | Recepti, savjetovanje, dostava | Lupriv Plus',
  description:
    'Recepti, farmaceutsko savjetovanje, ortopedska pomagala i dostava diljem BiH. Ljekarne Lupriv Plus Mostar — tradicija od 1994.',
  alternates: { canonical: 'https://luprivplus.com/usluge' },
  openGraph: {
    title: 'Usluge ljekarni | Lupriv Plus Mostar',
    description:
      'Recepti, farmaceutsko savjetovanje, ortopedska pomagala i dostava diljem BiH.',
    url: 'https://luprivplus.com/usluge',
    siteName: 'Ljekarne Lupriv Plus',
    locale: 'hr_BA',
    type: 'website',
  },
}
```

Root layout: `metadataBase: new URL('https://luprivplus.com')`, `lang="hr"` na `<html>`.

---

## 3. Keyword research (HR) — Mostar + BiH

**Napomena:** Volumeni nisu jamčeni (nema javnog točnog GKP izvoza za sve lokalne fraze). Grupe su **predložene** na temelju lokalnog intenta (Mostar / BiH: ljekarna + apoteka sinonimi, dežurstva, dostava, ortopedska pomagala, recepti). Označeno kao *suggested*.

### Primarne (cilj title / H1)

| Fraza | Intent | Prioritet stranice |
|---|---|---|
| ljekarna Mostar | navigacijski / lokalni | Home, Poslovnice |
| ljekarne Mostar | lokalni | Home, Poslovnice |
| Lupriv Plus / Ljekarne Lupriv Plus | brand | sve |
| ljekarna BiH | širi brand/lokalni | Home |
| ortopedska pomagala Mostar | transakcijski / usluga | Usluge |
| dostava lijekova BiH | transakcijski | Usluge, Home |

### Sekundarne (H2 / body / meta)

| Fraza | Intent | Stranica |
|---|---|---|
| farmaceutsko savjetovanje | informacijski / usluga | Usluge |
| lijekovi na recept Mostar | transakcijski | Usluge |
| izdavanje recepata | usluga | Usluge |
| dežurna ljekarna Mostar | hitni / lokalni | Usluge / Poslovnice (*samo ako ste u rasporedu*) |
| dežurna apoteka Mostar | lokalni sinonim | isto |
| apoteka Mostar | lokalni sinonim (jači colloquial u BiH medijima) | body Poslovnice/Home |
| ortopedska pomagala BiH | usluga | Usluge |
| dostava lijekova Mostar | lokalna dostava | Usluge |
| ljekarna HNŽ / Hercegovina | regionalni | O nama / Poslovnice |

### Long-tail (*suggested*)

| Fraza | Gdje koristiti |
|---|---|
| ljekarna Mostar radno vrijeme | Poslovnice |
| gdje je najbliža ljekarna Mostar | Poslovnice |
| farmaceutsko savjetovanje Mostar | Usluge |
| ortopedska pomagala na recept Mostar | Usluge |
| dostava lijekova diljem BiH | Home / Usluge |
| ljekarne s tradicijom Mostar 1994 | O nama |
| kontakt ljekarna Lupriv Plus | Kontakt |
| Lupriv Plus Mostar adresa | Poslovnice / Kontakt |
| kupovina ortopedskih pomagala Mostar | Usluge |
| savjetovanje o lijekovima Mostar | Usluge |

### Napomene za copy (HR, ne SR)

- Koristiti **ljekarna**, **diljem**, **savjetovanje**, **poslovnica**, **e-pošta** (HR).  
- Izbjegavati srpske oblike u UI copyju (npr. *apoteka* je OK kao lokalni sinonim jer se tako traži, ali brand H1 ostaje „ljekarna“; ne koristiti *avgust*, *oktobar* u UI — već *kolovoz*, *listopad* ako spominjete mjesece).  
- „Dežurna“: lokalni mediji i ZZO HNŽ/K koriste i „dežurna apoteka“ i „dežurna ljekarna“ — pokriti oboje u bodyju **samo** ako sudjelujete u službenom rasporedu; inače ne obećavati 0–24.

### Mapiranje ključnih riječi → stranice

| Stranica | Primarni fokus | Podrška |
|---|---|---|
| Home | ljekarna Mostar + brand + 1994. | dostava BiH, usluge overview |
| O nama | Lupriv Plus tradicija 1994. | Mostar, BiH |
| Usluge | recepti, savjetovanje, ortopedska, dostava | dežurna (uvjetno) |
| Poslovnice | ljekarna Mostar + NAP + radno vrijeme | apoteka Mostar (sinonim) |
| Kontakt | kontakt Lupriv Plus Mostar | telefon, adresa |

---

## 4. Meta title + description

### Home — zadržano (blaga potvrda)

| | |
|---|---|
| **Title** | `Ljekarne Lupriv Plus \| Mostar i BiH od 1994.` |
| **Znakova** | ~48 |
| **Description** | `Ljekarne Lupriv Plus — recepti, farmaceutsko savjetovanje, ortopedska pomagala i dostava diljem BiH. Tradicija od 1994. Pronađite poslovnicu ili nas kontaktirajte.` |
| **Znakova** | ~155 |

*Nije potrebna izmjena.*

### O nama (`/o-nama`)

| | |
|---|---|
| **Title** | `O nama \| Ljekarne Lupriv Plus Mostar od 1994.` |
| **Znakova** | ~49 |
| **Description** | `Upoznajte LJZU Lupriv Plus Mostar — ljekarne s tradicijom od 1994. Stručnost, povjerenje i briga za pacijente u Mostaru i diljem BiH. Saznajte više o nama.` |
| **Znakova** | ~156 |

### Usluge (`/usluge`)

| | |
|---|---|
| **Title** | `Usluge \| Recepti, savjetovanje i dostava \| Lupriv Plus` |
| **Znakova** | ~56 |
| **Description** | `Recepti, farmaceutsko savjetovanje, ortopedska pomagala i dostava diljem BiH. Ljekarne Lupriv Plus Mostar — pouzdana podrška vašem zdravlju od 1994.` |
| **Znakova** | ~154 |

### Poslovnice (`/poslovnice`)

| | |
|---|---|
| **Title** | `Poslovnice \| Ljekarne Lupriv Plus Mostar — adrese` |
| **Znakova** | ~52 |
| **Description** | `Pronađite poslovnicu Ljekarni Lupriv Plus u Mostaru: adrese, telefoni i radno vrijeme. Posjetite nas ili kontaktirajte najbližu ljekarnu danas.` |
| **Znakova** | ~148 |

### Kontakt (`/kontakt`)

| | |
|---|---|
| **Title** | `Kontakt \| Ljekarne Lupriv Plus Mostar` |
| **Znakova** | ~42 *(kratko OK — brand + intent)* |
| **Description** | `Kontaktirajte Ljekarne Lupriv Plus u Mostaru — telefon, e-pošta i kontakt forma. Odgovaramo na upite o receptima, pomagalima i dostavi diljem BiH.` |
| **Znakova** | ~152 |

**Alternativa Kontakt title (ako želite bliže 50–60):**  
`Kontaktirajte nas \| Ljekarne Lupriv Plus Mostar` (~48)

### Copy-paste objekt za Next.js

```ts
export const pageMeta = {
  home: {
    title: 'Ljekarne Lupriv Plus | Mostar i BiH od 1994.',
    description:
      'Ljekarne Lupriv Plus — recepti, farmaceutsko savjetovanje, ortopedska pomagala i dostava diljem BiH. Tradicija od 1994. Pronađite poslovnicu ili nas kontaktirajte.',
  },
  oNama: {
    title: 'O nama | Ljekarne Lupriv Plus Mostar od 1994.',
    description:
      'Upoznajte LJZU Lupriv Plus Mostar — ljekarne s tradicijom od 1994. Stručnost, povjerenje i briga za pacijente u Mostaru i diljem BiH. Saznajte više o nama.',
  },
  usluge: {
    title: 'Usluge | Recepti, savjetovanje i dostava | Lupriv Plus',
    description:
      'Recepti, farmaceutsko savjetovanje, ortopedska pomagala i dostava diljem BiH. Ljekarne Lupriv Plus Mostar — pouzdana podrška vašem zdravlju od 1994.',
  },
  poslovnice: {
    title: 'Poslovnice | Ljekarne Lupriv Plus Mostar — adrese',
    description:
      'Pronađite poslovnicu Ljekarni Lupriv Plus u Mostaru: adrese, telefoni i radno vrijeme. Posjetite nas ili kontaktirajte najbližu ljekarnu danas.',
  },
  kontakt: {
    title: 'Kontakt | Ljekarne Lupriv Plus Mostar',
    description:
      'Kontaktirajte Ljekarne Lupriv Plus u Mostaru — telefon, e-pošta i kontakt forma. Odgovaramo na upite o receptima, pomagalima i dostavi diljem BiH.',
  },
} as const
```

---

## 5. Go-live checklist (kratko)

### Prije deploya na produkciju

- [ ] `metadataBase` = `https://luprivplus.com`
- [ ] Self-canonical na svakoj stranici (`alternates.canonical`)
- [ ] `sitemap.ts` + `robots.ts` (allow samo na production)
- [ ] Staging / preview: `Disallow: /` ili `noindex`
- [ ] `<html lang="hr">` (ili `hr-BA`)
- [ ] **hreflang:** samo HR → **preskočiti** `hreflang` alternate lanac; opcionalno jedan `hreflang="hr"` / `x-default` na isti URL ako želite eksplicitno
- [ ] Open Graph: `og:title`, `og:description`, `og:url`, `og:image` (1200×630), `og:locale=hr_BA`
- [ ] Twitter card (summary_large_image) — opcionalno ali preporučeno
- [ ] JSON-LD Organization + Pharmacy s **pravim** NAP / geo
- [ ] Favicon + Apple touch icon
- [ ] 404 stranica s linkovima na Home / Poslovnice / Kontakt
- [ ] HTTPS + HSTS (hosting default)
- [ ] Brzina: next/image, font subset, LCP &lt; 2.5 s na mobitelu

### Na dan go-livea

- [ ] DNS `luprivplus.com` → produkcija; www → apex (ili obrnuto) 301
- [ ] Provjera da prazna „parking“ stranica više nije live
- [ ] Google Search Console: dodaj property ( Domains ili URL prefix)
- [ ] Pošalji sitemap: `https://luprivplus.com/sitemap.xml`
- [ ] URL Inspection na Home + Poslovnice — zatraži indeksiranje
- [ ] Bing Webmaster Tools (opcionalno, isti sitemap)
- [ ] Google Business Profile: NAP = web NAP; link na `/poslovnice`
- [ ] Provjeri OG u [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) / opengraph.xyz
- [ ] Rich Results Test za JSON-LD (Pharmacy + BreadcrumbList)

### 7–14 dana nakon

- [ ] Coverage / Pages u GSC — nema unwanted noindex
- [ ] Core Web Vitals (CrUX / PageSpeed)
- [ ] Interni linkovi i CTA rade na mobitelu
- [ ] Forma kontakta: test spam + dostava maila

### Što ne raditi

- Ne indeksirati preview URL-ove  
- Ne mijenjati NAP između web / GBP / JSON-LD  
- Ne spominjati Pharm  
- Ne dodavati lažne „dežurna 0–24“ claimove  

---

## Brzi handover za Lupriv Website

1. Ubaci `pageMeta` u `generateMetadata` / `metadata` po ruti.  
2. Dodaj `app/sitemap.ts` i `app/robots.ts` (production gate).  
3. Ubaci `JsonLd` Organization (layout) + Pharmacy (poslovnice) + BreadcrumbList (unutarnje).  
4. Jedan NAP modul → footer, kontakt, poslovnice, schema.  
5. Po go-liveu: GSC + sitemap + GBP usklađenje.

**Datoteka:** `/workspace/lupriv-seo-pack.md`  
**Jezik copyja:** hrvatski (hr) · Brand: Ljekarne / LJZU Lupriv Plus Mostar · Bez Pharm.
