# Ljekarne Lupriv Plus — website

Marketing site za LJZU Lupriv Plus Mostar, s **Payload CMS 3** za upravljanje sadržajem.

**Path:** `/Users/darijan/privateProjects/lupriv-website`

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Payload CMS 3 · SQLite (libSQL) · pnpm

## Okruženje

Kopiraj `.env.example` u `.env.local` i postavi:

| Varijabla | Opis |
|-----------|------|
| `DATABASE_URL` | Lokalno: `file:./payload.db` |
| `PAYLOAD_SECRET` | Dugi nasumični string (obavezno) |
| `NEXT_PUBLIC_SERVER_URL` | npr. `http://localhost:3456` |
| `PAYLOAD_ADMIN_EMAIL` / `PAYLOAD_ADMIN_PASSWORD` | Opcionalno — seed kreira prvog admina |

> Za produkciju na Vercelu razmisli o **Turso** (isti `@payloadcms/db-sqlite` + `DATABASE_AUTH_TOKEN`) ili Postgres (`@payloadcms/db-postgres`). Lokalni SQLite file ne radi na serverlessu.

## Pokretanje

```bash
cd ~/privateProjects/lupriv-website
pnpm install
pnpm seed          # upisuje lokacije, brandove, stranice, postavke
pnpm dev           # http://localhost:3456
```

### Admin

- URL: [http://localhost:3456/admin](http://localhost:3456/admin)
- Prvi put: ako nisi postavio `PAYLOAD_ADMIN_*`, otvori `/admin` i kreiraj korisnika (Payload first-user flow).
- Sadržaj: **Poslovnice**, **Brandovi**, **Usluge**, **Kategorije proizvoda**, **Stranice**, global **Postavke stranice**.

```bash
pnpm build
pnpm start
pnpm generate:types
pnpm generate:importmap
```

## Stranice (frontend)

| Ruta | Opis |
|------|------|
| `/` | Početna |
| `/o-nama` | O nama |
| `/usluge` | Usluge (+ dostava) |
| `/proizvodi` | Asortiman i brandovi |
| `/poslovnice` | 19 lokacija, filter po gradu |
| `/kontakt` | Kontakt + mailto forma |
| `/admin` | Payload CMS |

## Arhitektura

- `src/app/(frontend)/` — javni site
- `src/app/(payload)/` — admin + REST/GraphQL API
- `src/lib/payload.ts` — Local API helperi (`unstable_cache`, revalidate ~60s)
- `scripts/seed.ts` — idempotentni seed (`pnpm seed`)

Sadržaj je **CMS-upravljan**. Ne spominji Pharm/Pharma na javnim stranicama. Jezik: hrvatski.

## Napomene

- Tradicija od 1994. (bez spomena Pharm)
- Kontakt forma je mailto stub
- Dev server na portu **3456**
