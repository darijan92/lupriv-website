export type BrandCategory =
  | "dermokozmetika"
  | "dodaci"
  | "kosa"
  | "sunce"
  | "bebe";

export type Brand = {
  id: string;
  name: string;
  /** One-line focus for the typographic card */
  focus: string;
  categories: BrandCategory[];
};

export const brandCategoryLabels: Record<BrandCategory, string> = {
  dermokozmetika: "Dermokozmetika",
  dodaci: "Dodaci prehrani",
  kosa: "Njega kose",
  sunce: "Sunce",
  bebe: "Bebe",
};

/** Filter chips shown on /proizvodi (order matters). */
export const brandFilterChips: { id: "svi" | BrandCategory; label: string }[] = [
  { id: "svi", label: "Svi" },
  { id: "dermokozmetika", label: "Dermokozmetika" },
  { id: "dodaci", label: "Dodaci prehrani" },
  { id: "kosa", label: "Njega kose" },
  { id: "sunce", label: "Sunce" },
  { id: "bebe", label: "Bebe" },
];

/**
 * Curated brand list for marketing display (not a shop catalog).
 * Names verified on Lupriv Plus staging / IG where noted.
 */
export const brands: Brand[] = [
  {
    id: "bioderma",
    name: "Bioderma",
    focus: "Dermokozmetika · osjetljiva koža",
    categories: ["dermokozmetika"],
  },
  {
    id: "eucerin",
    name: "Eucerin",
    focus: "Dermokozmetika · medicinska njega",
    categories: ["dermokozmetika"],
  },
  {
    id: "avene",
    name: "Avène",
    focus: "Dermokozmetika · termalna voda",
    categories: ["dermokozmetika", "sunce"],
  },
  {
    id: "la-roche-posay",
    name: "La Roche-Posay",
    focus: "Dermokozmetika · dermatološka njega",
    categories: ["dermokozmetika", "sunce"],
  },
  {
    id: "cerave",
    name: "CeraVe",
    focus: "Dermokozmetika · barijera kože",
    categories: ["dermokozmetika"],
  },
  {
    id: "uriage",
    name: "Uriage",
    focus: "Dermokozmetika · hidratacija",
    categories: ["dermokozmetika", "sunce"],
  },
  {
    id: "a-derma",
    name: "A-Derma",
    focus: "Dermokozmetika · biljna njega",
    categories: ["dermokozmetika"],
  },
  {
    id: "noreva",
    name: "Noreva",
    focus: "Dermokozmetika · ciljana njega",
    categories: ["dermokozmetika"],
  },
  {
    id: "vichy",
    name: "Vichy",
    focus: "Dermokozmetika · mineralna njega",
    categories: ["dermokozmetika", "sunce"],
  },
  {
    id: "babe",
    name: "BABÉ",
    focus: "Dermokozmetika · dermatološka linija",
    categories: ["dermokozmetika", "sunce"],
  },
  {
    id: "weleda",
    name: "Weleda",
    focus: "Prirodna njega · tijelo i lice",
    categories: ["dermokozmetika"],
  },
  {
    id: "bioclinica",
    name: "Bioclinica",
    focus: "Dermokozmetika · apotekarska njega",
    categories: ["dermokozmetika"],
  },
  {
    id: "meditas",
    name: "MEDITAS",
    focus: "Dermokozmetika · apotekarski asortiman",
    categories: ["dermokozmetika"],
  },
  {
    id: "olilab",
    name: "Olilab",
    focus: "Dermokozmetika · partner u Mostaru",
    categories: ["dermokozmetika"],
  },
  {
    id: "klorane",
    name: "Klorane",
    focus: "Njega kose · biljni ekstrakti",
    categories: ["kosa"],
  },
  {
    id: "ducray",
    name: "Ducray",
    focus: "Njega kose · dermatološka linija",
    categories: ["kosa"],
  },
  {
    id: "heliocare",
    name: "Heliocare",
    focus: "Zaštita od sunca · fotoprotekcija",
    categories: ["sunce", "dermokozmetika"],
  },
  {
    id: "solgar",
    name: "Solgar",
    focus: "Dodaci prehrani · vitamini i minerali",
    categories: ["dodaci"],
  },
  {
    id: "mustela",
    name: "Mustela",
    focus: "Bebe i djeca · nježna njega",
    categories: ["bebe", "dermokozmetika"],
  },
  {
    id: "4u-pharma",
    name: "4U Pharma",
    focus: "Bebe · dodaci i pedijatrijska njega",
    categories: ["bebe", "dodaci"],
  },
];
