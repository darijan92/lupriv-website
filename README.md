# Ljekarne Lupriv Plus — website

Marketing site za LJZU Lupriv Plus Mostar, s **Payload CMS 3** za upravljanje sadržajem.

**Path:** `/Users/darijan/privateProjects/lupriv-website`

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Payload CMS 3 · **MongoDB** · pnpm

> SQLite / Turso (`@payloadcms/db-sqlite`) je zamijenjen s `@payloadcms/db-mongodb`.

## Okruženje

Kopiraj `.env.example` u `.env.local` i postavi:

| Varijabla | Opis |
|-----------|------|
| `DATABASE_URL` | **Lokalno (Docker):** `mongodb://127.0.0.1:27018/lupriv-website` (compose mapira host 27018→27017; 27017 je često zauzet) · **Produkcija (Atlas):** `mongodb+srv://USER:PASS@CLUSTER/lupriv-website?retryWrites=true&w=majority` |
| `PAYLOAD_SECRET` | Dugi nasumični string (obavezno) |
| `NEXT_PUBLIC_SERVER_URL` | npr. `http://localhost:3456` |
| `PAYLOAD_ADMIN_EMAIL` / `PAYLOAD_ADMIN_PASSWORD` | Opcionalno — seed kreira prvog admina |
| `SEED_MODE` | Opcionalno — samo label u logu (`local` / `production`) |

Seed koristi **isti** `DATABASE_URL` na koji pokazuješ (lokalni Docker ili Atlas). Ne commitaj tajne.

Netrackani `.atlas-credentials.env` (gitignored) može držati Atlas `MONGODB_URI` / username / password za referencu. Preferiraj eksplicitni `DATABASE_URL` u `.env.local` ili Vercel env vars. Hint (bez ispisivanja tajni):

```bash
pnpm exec tsx scripts/print-database-url-hint.ts
```

## Lokalni MongoDB (Docker)

Rancher Desktop / Docker:

```bash
cd ~/privateProjects/lupriv-website
docker compose up -d          # mongo:7 na host portu **27018** (container 27017), DB lupriv-website
# DATABASE_URL=mongodb://127.0.0.1:27018/lupriv-website  u .env.local
pnpm install
pnpm seed
pnpm dev                      # http://localhost:3456
```

Zaustavljanje: `docker compose down` (volume `lupriv_mongo_data` ostaje).

## Produkcija (Atlas + Vercel)

1. U MongoDB Atlas kreiraj cluster i bazu `lupriv-website`.
2. Network Access: dozvoli IP-ove deploya (ili odgovarajući range).
3. U Vercel project env postavi:
   - `DATABASE_URL` = Atlas `mongodb+srv://…` (s auth)
   - `PAYLOAD_SECRET`
   - `NEXT_PUBLIC_SERVER_URL` = produkcijski URL
4. Seed produkcijske baze (oprezno, idempotentno):

```bash
# Privremeno u .env.local (ne commitaj) ili export:
# DATABASE_URL=mongodb+srv://…@…/lupriv-website?retryWrites=true&w=majority
SEED_MODE=production pnpm seed
```

## Pokretanje

```bash
cd ~/privateProjects/lupriv-website
pnpm install
docker compose up -d
pnpm seed          # idempotentni upserti (lokacije, brandovi, stranice, postavke)
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
- `docker-compose.yml` — lokalni MongoDB 7

Sadržaj je **CMS-upravljan**. Ne spominji Pharm/Pharma na javnim stranicama. Jezik: hrvatski.

## Napomene

- Tradicija od 1994. (bez spomena Pharm)
- Kontakt forma je mailto stub
- Dev server na portu **3456**
- `.atlas-credentials.env` i `.env*` su u `.gitignore` — nikad ih ne commitaj
