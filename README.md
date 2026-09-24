# Ljekarne Lupriv Plus — website

Marketing site za LJZU Lupriv Plus Mostar.

**Path:** `/Users/darijan/privateProjects/lupriv-website`

## Stack
Next.js (App Router) · TypeScript · Tailwind CSS · pnpm

## Pokretanje

```bash
cd ~/privateProjects/lupriv-website
pnpm install
pnpm dev
```

Otvori [http://localhost:3000](http://localhost:3000).

```bash
pnpm build   # produkcijski build
pnpm start   # pokreni build
```

## Stranice
| Ruta | Opis |
|------|------|
| `/` | Home |
| `/o-nama` | O nama |
| `/usluge` | Usluge (+ dostava) |
| `/poslovnice` | 19 lokacija, filter po gradu |
| `/kontakt` | Kontakt + mailto forma |

## Podaci
- `locations.json` / `src/data/locations.ts` — poslovnice
- `website-copy.md` — hrvatski copy (Copywriter)
- `brand-brief.md` + `brand-refs/` — Instagram brand cues

## Napomene
- Jezik: hrvatski (`lang="hr"`)
- Tradicija od 1994. (bez spomena Pharm)
- Kontakt forma je mailto stub (nema backend)
- Dev server može biti na portu 3456 ako je već pokrenut

## Slike
Fotografije u `public/images/` su iz Unsplash-a (besplatna licenca).
