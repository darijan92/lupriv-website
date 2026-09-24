import { config as loadEnv } from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

/** Load env files without printing values. Existing process.env keys win (no override). */
function loadEnvFiles() {
  // Prefer explicit local overrides first, then .env, then optional Atlas helper file.
  loadEnv({ path: path.join(root, '.env.local') , quiet: true })
  loadEnv({ path: path.join(root, '.env') , quiet: true })
  // Merge missing keys only. Prefer explicit DATABASE_URL in .env.local — never log secret values.
  loadEnv({ path: path.join(root, '.atlas-credentials.env'), override: false , quiet: true })

  // If DATABASE_URL unset but Atlas MONGODB_URI is present, use it (production convenience).
  if (!process.env.DATABASE_URL?.trim() && process.env.MONGODB_URI?.trim()) {
    process.env.DATABASE_URL = process.env.MONGODB_URI.trim()
  }
}

function assertMongoDatabaseUrl(): string {
  const raw = process.env.DATABASE_URL?.trim()
  if (!raw) {
    console.error(
      'DATABASE_URL is missing. Set it in .env.local (local Docker) or point it at Atlas. See .env.example and README.',
    )
    process.exit(1)
  }
  if (!/^mongodb(\+srv)?:\/\//i.test(raw)) {
    console.error(
      'DATABASE_URL must be a MongoDB URL (mongodb:// or mongodb+srv://). Got a non-Mongo scheme — SQLite/file: is no longer supported.',
    )
    process.exit(1)
  }
  return raw
}

function redactMongoUrl(url: string): string {
  return url.replace(/^(mongodb(?:\+srv)?:\/\/)([^@\/]+)@/i, '$1***@')
}

const locationsSeed = [
  { code: '1', name: 'Lupriv Plus 1', address: 'Kralja Tomislava 4', city: 'Mostar', canton: 'HNŽ', hours: { start: '07:30', end: '21:00', sunday: false, saturday: '08:00–19:00' }, phone: '036/332-636', email: 'oj1@luprivplus.com', isHq: true, isDuty: false, sort: 1 },
  { code: '2', name: 'Lupriv Plus 2', address: 'Kneza Višeslava 152', city: 'Mostar', canton: 'HNŽ', hours: { start: '07:30', end: '20:30', sunday: false }, phone: '036/348-687', email: 'oj2@luprivplus.com', isHq: false, isDuty: false, sort: 2 },
  { code: '3', name: 'Lupriv Plus 3', address: 'Kruševo bb', city: 'Mostar', canton: 'HNŽ', hours: { start: '07:30', end: '20:30', sunday: false }, phone: '036/486-040', email: 'oj3@luprivplus.com', isHq: false, isDuty: false, sort: 3 },
  { code: '4', name: 'Lupriv Plus 4', address: 'Kardinala Stepinca 17', city: 'Mostar', canton: 'HNŽ', hours: { start: '07:30', end: '20:30', sunday: false }, phone: '036/328-268', email: 'oj4@luprivplus.com', isHq: false, isDuty: false, sort: 4 },
  { code: '5', name: 'Lupriv Plus 5', address: 'Splitska 5', city: 'Mostar', canton: 'HNŽ', hours: { start: '07:30', end: '21:00', sunday: false }, phone: '036/326-292', email: 'oj5@luprivplus.com', isHq: false, isDuty: false, sort: 5 },
  { code: '6', name: 'Lupriv Plus 6', address: 'Dubrovačka bb', city: 'Mostar', canton: 'HNŽ', hours: { start: '07:30', end: '21:00', sunday: false }, phone: '036/319-110', email: 'oj6@luprivplus.com', isHq: false, isDuty: false, sort: 6 },
  { code: '7', name: 'Lupriv Plus 7', address: 'Kralja Tomislava bb', city: 'Prozor - Rama', canton: 'HNŽ', hours: { start: '08:00', end: '20:00', sunday: false }, phone: '036/771-411', email: 'oj7@luprivplus.com', isHq: false, isDuty: false, sort: 7 },
  { code: '8', name: 'Lupriv Plus 8', address: 'Pere Bilića 56A', city: 'Jablanica', canton: 'HNŽ', hours: { start: '08:00', end: '18:00', sunday: false }, phone: '036/753-973', email: 'oj8@luprivplus.com', isHq: false, isDuty: false, sort: 8 },
  { code: '9', name: 'Lupriv Plus 9', address: 'Mate Bobana bb', city: 'Čapljina', canton: 'HNŽ', hours: { start: '08:00', end: '20:30', sunday: false }, phone: '036/807-668', email: 'oj9@luprivplus.com', isHq: false, isDuty: false, sort: 9 },
  { code: '10', name: 'Lupriv Plus 10', address: 'Aladinići bb', city: 'Stolac', canton: 'HNŽ', hours: { start: '08:00', end: '20:00', sunday: false }, phone: '036/862-811', email: 'oj10@luprivplus.com', isHq: false, isDuty: false, sort: 10 },
  { code: '11', name: 'Lupriv Plus 11', address: 'Skenderija bb', city: 'Sarajevo', canton: 'SŽ', hours: { start: '08:00', end: '20:00', sunday: false }, phone: '033/216-505', email: 'oj11@luprivplus.com', isHq: false, isDuty: false, sort: 11 },
  { code: '12', name: 'Lupriv Plus 12', address: 'Splitska bb', city: 'Livno', canton: 'HBŽ', hours: { start: '08:00', end: '20:00', sunday: false }, phone: null, email: null, isHq: false, isDuty: false, sort: 12 },
  { code: '13', name: 'Lupriv Plus 13', address: 'Stjepana Radića 37', city: 'Mostar', canton: 'HNŽ', hours: { start: '08:00', end: '23:00', sunday: true }, phone: '036/323-312', email: 'oj13@luprivplus.com', isHq: false, isDuty: true, sort: 13 },
  { code: '14', name: 'Lupriv Plus 14', address: 'Obala Isa-bega Ishakovića 7', city: 'Sarajevo', canton: 'SŽ', hours: { start: '08:00', end: '20:00', sunday: false }, phone: '033/237-410', email: 'oj14@luprivplus.com', isHq: false, isDuty: false, sort: 14 },
  { code: '15', name: 'Lupriv Plus 15', address: 'Milana Preloga 2A', city: 'Sarajevo', canton: 'SŽ', hours: { start: '08:00', end: '20:00', sunday: false }, phone: '033/616-980', email: null, isHq: false, isDuty: false, sort: 15 },
  { code: '16', name: 'Lupriv Plus 16', address: 'Igmanskih bataljona 3', city: 'Hrasnica, Ilidža', canton: 'SŽ', hours: { start: '08:00', end: '20:00', sunday: false }, phone: null, email: null, isHq: false, isDuty: false, sort: 16 },
  { code: '17', name: 'Lupriv Plus 17', address: 'Vukovarska 43', city: 'Posušje', canton: 'ŽZH', hours: { start: '08:00', end: '20:30', sunday: false }, phone: null, email: null, isHq: false, isDuty: false, sort: 17 },
  { code: '18', name: 'Lupriv Plus 18', address: 'Adema Buće 206', city: 'Sarajevo', canton: 'SŽ', hours: { start: '08:00', end: '20:00', sunday: false }, phone: null, email: null, isHq: false, isDuty: false, sort: 18 },
  { code: '19', name: 'Lupriv Plus 19', address: 'Knešpolje bb', city: 'Široki Brijeg', canton: 'ŽZH', hours: { start: '08:00', end: '20:00', sunday: false }, phone: null, email: null, isHq: false, isDuty: false, sort: 19 },
]

const brandsSeed = [
  { slug: 'bioderma', name: 'Bioderma', focus: 'Dermokozmetika · osjetljiva koža', categories: ['dermokozmetika'], sort: 1 },
  { slug: 'eucerin', name: 'Eucerin', focus: 'Dermokozmetika · medicinska njega', categories: ['dermokozmetika'], sort: 2 },
  { slug: 'avene', name: 'Avène', focus: 'Dermokozmetika · termalna voda', categories: ['dermokozmetika', 'sunce'], sort: 3 },
  { slug: 'la-roche-posay', name: 'La Roche-Posay', focus: 'Dermokozmetika · dermatološka njega', categories: ['dermokozmetika', 'sunce'], sort: 4 },
  { slug: 'cerave', name: 'CeraVe', focus: 'Dermokozmetika · barijera kože', categories: ['dermokozmetika'], sort: 5 },
  { slug: 'uriage', name: 'Uriage', focus: 'Dermokozmetika · hidratacija', categories: ['dermokozmetika', 'sunce'], sort: 6 },
  { slug: 'a-derma', name: 'A-Derma', focus: 'Dermokozmetika · biljna njega', categories: ['dermokozmetika'], sort: 7 },
  { slug: 'noreva', name: 'Noreva', focus: 'Dermokozmetika · ciljana njega', categories: ['dermokozmetika'], sort: 8 },
  { slug: 'vichy', name: 'Vichy', focus: 'Dermokozmetika · mineralna njega', categories: ['dermokozmetika', 'sunce'], sort: 9 },
  { slug: 'babe', name: 'BABÉ', focus: 'Dermokozmetika · dermatološka linija', categories: ['dermokozmetika', 'sunce'], sort: 10 },
  { slug: 'weleda', name: 'Weleda', focus: 'Prirodna njega · tijelo i lice', categories: ['dermokozmetika'], sort: 11 },
  { slug: 'bioclinica', name: 'Bioclinica', focus: 'Dermokozmetika · apotekarska njega', categories: ['dermokozmetika'], sort: 12 },
  { slug: 'meditas', name: 'MEDITAS', focus: 'Dermokozmetika · apotekarski asortiman', categories: ['dermokozmetika'], sort: 13 },
  { slug: 'olilab', name: 'Olilab', focus: 'Dermokozmetika · partner u Mostaru', categories: ['dermokozmetika'], sort: 14 },
  { slug: 'klorane', name: 'Klorane', focus: 'Njega kose · biljni ekstrakti', categories: ['kosa'], sort: 15 },
  { slug: 'ducray', name: 'Ducray', focus: 'Njega kose · dermatološka linija', categories: ['kosa'], sort: 16 },
  { slug: 'heliocare', name: 'Heliocare', focus: 'Zaštita od sunca · fotoprotekcija', categories: ['sunce', 'dermokozmetika'], sort: 17 },
  { slug: 'solgar', name: 'Solgar', focus: 'Dodaci prehrani · vitamini i minerali', categories: ['dodaci'], sort: 18 },
  { slug: 'mustela', name: 'Mustela', focus: 'Bebe i djeca · nježna njega', categories: ['bebe', 'dermokozmetika'], sort: 19 },
  { slug: '4u-pharma', name: '4U Pharma', focus: 'Bebe · dodaci i pedijatrijska njega', categories: ['bebe', 'dodaci'], sort: 20 },
]

const servicesSeed = [
  { slug: 'recepti', title: 'Recepti i lijekovi bez recepta (OTC)', description: 'Izdavanje receptnih lijekova i širok izbor proizvoda bez recepta. Recite nam što vam treba — pomoći ćemo vam da odaberete sigurno i jasno.', icon: 'Stethoscope', showOnHome: true, sort: 1 },
  { slug: 'savjetovanje', title: 'Farmaceutsko savjetovanje', description: 'Stručni razgovor o terapiji, doziranju, interakcijama i svakodnevnim pitanjima o zdravlju. Tu smo da objasnimo, ne da zakompliciramo.', icon: 'HeartPulse', showOnHome: true, sort: 2 },
  { slug: 'pomagala', title: 'Medicinska i ortopedska pomagala', description: 'Pomagala koja olakšavaju kretanje, oporavak i svakodnevicu. Savjetujemo vas oko odabira i pravilne upotrebe.', icon: 'Package', showOnHome: true, sort: 3, imagePath: null },
  { slug: 'dermokozmetika', title: 'Dermokozmetika', description: 'Njega kože uz proizvode koje preporučujemo s povjerenjem — za osjetljivu kožu, svakodnevnu njegu i ciljane potrebe.', icon: 'Sparkles', showOnHome: true, sort: 4, imagePath: '/images/skincare.jpg', imageAlt: 'Proizvodi za njegu kože' },
  { slug: 'dodaci', title: 'Dodaci prehrani', description: 'Vitamini, minerali i dodaci prehrani prilagođeni godišnjem dobu, načinu života i preporukama farmaceuta.', icon: 'Leaf', showOnHome: false, sort: 5 },
  { slug: 'dostava', title: 'Dostava diljem BiH', description: 'Naručite i primite pošiljku kod kuće. Poštarina 7 KM; za narudžbe iznad 100 KM dostava je besplatna.', icon: 'Truck', showOnHome: false, sort: 6 },
]

// Fix pomagala icon - home used Package, usluge used ClipboardList. Prefer ClipboardList for usluge; for home card without image use Package for first 3 and Sparkles for 4th.
// Home showed: Stethoscope, HeartPulse, Package, Sparkles. Services page: Stethoscope, HeartPulse, ClipboardList, Sparkles, Leaf, Truck.
// Adjust: pomagala uses ClipboardList (usluge), but for home show Package via imagePath null and... actually home mapped from showOnHome. Let's set pomagala icon to Package for visual match to old home, usluge also fine with Package OR ClipboardList. Old usluge used ClipboardList. Keep ClipboardList.

const productCategoriesSeed = [
  { slug: 'dermokozmetika', title: 'Dermokozmetika', description: 'Njega lica i tijela za osjetljivu i normalnu kožu.', icon: 'Sparkles', href: '/proizvodi?kat=dermokozmetika#brandovi', sort: 1 },
  { slug: 'dodaci', title: 'Dodaci prehrani', description: 'Vitamini, minerali i pripravci uz savjet farmaceuta.', icon: 'Leaf', href: '/proizvodi?kat=dodaci#brandovi', sort: 2 },
  { slug: 'kosa', title: 'Njega kose', description: 'Dermatološke linije za svakodnevnu i ciljanu njegu.', icon: 'Waves', href: '/proizvodi?kat=kosa#brandovi', sort: 3 },
  { slug: 'sunce', title: 'Zaštita od sunca', description: 'Fotoprotekcija za lice i tijelo kroz cijelu godinu.', icon: 'Sun', href: '/proizvodi?kat=sunce#brandovi', sort: 4 },
  { slug: 'bebe', title: 'Bebe i djeca', description: 'Nježna njega i dodaci prilagođeni najmlađima.', icon: 'Baby', href: '/proizvodi?kat=bebe#brandovi', sort: 5 },
  { slug: 'sezonska', title: 'Sezonska ponuda', description: 'Asortiman koji prati godišnje doba i tipične tegobe.', icon: 'Flower2', href: '#kolekcija', sort: 6 },
]

const pagesSeed = [
  {
    slug: 'home',
    title: 'Ljekarne Lupriv Plus | Mostar i BiH od 1994.',
    metaDescription:
      'Ljekarne Lupriv Plus — recepti, farmaceutsko savjetovanje, ortopedska pomagala i dostava diljem BiH. Tradicija od 1994. Pronađite poslovnicu ili nas kontaktirajte.',
    eyebrow: null,
    h1: 'Ljekarne Lupriv Plus — Mostar i BiH od 1994.',
    intro: 'Od 1994. uz vas — recepti, savjeti, ortopedska pomagala i briga o zdravlju cijele obitelji.',
    heroBadge: 'Tradicija od 1994.',
    dutyBadgeText: 'Dežurna · Radića 37',
    aboutTeaser:
      'Lupriv Plus mjesto je gdje zdravlje nije samo recept na papiru. U našim poslovnicama dobivate lijekove, stručni farmaceutski savjet i proizvode za svakodnevnu brigu o sebi i obitelji. Radimo s povjerenjem koje se gradi godinama — jasno, topla i dostupno.',
    servicesSectionHeading: 'Što nudimo',
    servicesSectionIntro: 'Od recepta i savjeta do pomagala i dostave — sve na jednom mjestu.',
    productsTeaserHeading: 'Asortiman i brandovi u našim ljekarnama',
    productsTeaserIntro:
      'Pregled dermokozmetike, dodataka prehrani i brandova koje držimo u poslovnicama — uz savjet farmaceuta.',
    ctaHeading: 'Pronađite poslovnicu ili nas kontaktirajte',
    ctaBody: 'Adrese, telefoni i radno vrijeme na jednom mjestu — ili nam pišite.',
  },
  {
    slug: 'o-nama',
    title: 'O nama | Ljekarne Lupriv Plus Mostar od 1994.',
    metaDescription:
      'Upoznajte LJZU Lupriv Plus Mostar — ljekarne s tradicijom od 1994. Stručnost, povjerenje i briga za pacijente u Mostaru i diljem BiH. Saznajte više o nama.',
    eyebrow: 'O nama',
    h1: 'O Ljekarnama Lupriv Plus',
    intro:
      'Ljekarne Lupriv Plus nastavljaju tradiciju koja u Mostaru traje od 1994. Godinama smo uz pacijente, obitelji i susjede: od prvog savjeta do redovite terapije, od dječjeg sirupa do pomagala koja olakšavaju svakodnevicu.',
    paragraphs: [
      {
        text: 'Sjedište nam je na Kralja Tomislava 4 u Mostaru. Iz tog središta vodimo mrežu poslovnica diljem BiH, uz ugovorni odnos sa Zavodima zdravstvenog osiguranja. Dežurna poslovnica na Stjepana Radića 37 tu je kad vam treba izvan uobičajenog ritma.',
      },
      {
        text: 'Naš cilj jednostavan je: da se u ljekarni osjećate sigurno i dobrodošli. Slušamo, savjetujemo i pomažemo vam da odaberete ono što vam stvarno treba — bez žurbe i bez hladnog žargona.',
      },
    ],
    highlightCards: [
      { title: 'Tradicija od 1994.', description: 'Pouzdano iskustvo i kontinuitet skrbi u Mostaru i BiH.' },
      { title: 'Ugovorna ZZO ljekarna', description: 'Recepti i savjetovanje koje možete očekivati.' },
      {
        title: 'Dežurna poslovnica',
        description: 'Stjepana Radića 37, Mostar — kad vam treba izvan uobičajenog ritma.',
      },
    ],
  },
  {
    slug: 'usluge',
    title: 'Usluge | Recepti, savjetovanje i dostava | Lupriv Plus',
    metaDescription:
      'Recepti, farmaceutsko savjetovanje, ortopedska pomagala i dostava diljem BiH. Ljekarne Lupriv Plus Mostar — pouzdana podrška vašem zdravlju od 1994.',
    eyebrow: 'Usluge',
    h1: 'Usluge ljekarni Lupriv Plus',
    intro: 'Od recepta i savjeta do pomagala i dostave — sve na jednom mjestu.',
    ctaHeading: 'Pronađite poslovnicu ili nam pišite',
  },
  {
    slug: 'proizvodi',
    title: 'Proizvodi i brandovi u ljekarnama | Lupriv Plus Mostar',
    metaDescription:
      'Otkrijte asortiman i svjetske brandove u Ljekarnama Lupriv Plus u Mostaru — dermokozmetika, dodaci prehrani i zdravstveni proizvodi. Posjetite naše poslovnice.',
    eyebrow: 'Proizvodi',
    h1: 'Proizvodi i brandovi u Ljekarnama Lupriv Plus',
    intro:
      'U našim ljekarnama u Mostaru i diljem BiH nalazite širok asortiman lijekova, dermatološke njege, dodataka prehrani i proizvoda za svakodnevnu zdravstvenu njegu. Dio ponude čini i vlastita kolekcija Lupriv Plus, koju biramo i razvijamo uz iste standarde koje njegujemo od 1994.',
    paragraphs: [
      {
        text: 'Ova stranica je pregled asortimana u poslovnicama — ne online trgovina. Za dostupnost pitajte farmaceuta; ponuda se može razlikovati po poslovnici.',
      },
    ],
    categoriesSectionHeading: 'Kategorije asortimana',
    categoriesSectionIntro:
      'Odaberite kategoriju i pogledajte brandove koje najčešće držimo u našim ljekarnama.',
    collectionSectionHeading: 'Što nudimo u našim ljekarnama',
    collectionSectionIntro:
      'Vlastita kolekcija Lupriv Plus i sezonski odabiri koje kuriraju naši farmaceuti. Aktualne akcije pratite na Instagramu @lupriv_plus.',
    highlightCards: [
      {
        title: 'Njega kože i tijela',
        description:
          'Krema, losioni i proizvodi za svakodnevnu njegu koje biramo za osjetljivu i normalnu kožu. Fokus je na jednostavnoj uporabi i sastojcima koje ljekarnici mogu objasniti bez marketinga.',
      },
      {
        title: 'Dodaci prehrani',
        description:
          'Vitamini, minerali i pripravci za podršku organizmu, u skladu s potrebama koje najčešće čujemo od naših kupaca. Savjet o dozi i prikladnosti uvijek možete zatražiti u ljekarni.',
      },
      {
        title: 'Sezonska podrška',
        description:
          'U hladnijim mjesecima i u sezoni alergija širimo ponudu proizvodima koji pomažu kod tipičnih tegoba (imunitet, vlažnost zraka, blaga njega). Asortiman se mijenja kroz godinu, pa pitajte što je trenutačno dostupno u vašoj poslovnici.',
      },
    ],
    brandsSectionHeading: 'Svjetski brandovi koje možete pronaći',
    brandsSectionIntro:
      'Uz vlastitu kolekciju, u ljekarnama Lupriv Plus držimo poznate i pouzdane brendove iz farmacije, dermatologije i zdravstvene njege. Cilj nam je da na jednom mjestu nađete ono što vam treba, uz stručni savjet farmaceutskog osoblja.',
    disclaimer:
      'Točan asortiman može se razlikovati po poslovnici, ovisno o prostoru, potražnji i dostupnosti dobavljača. Za konkretan proizvod najbolje je pitati u najbližoj ljekarni ili nas kontaktirati.',
    ctaHeading: 'Posjetite poslovnice u Mostaru',
    ctaBody: 'Pronađite najbližu ljekarnu, javite nam se ili pratite aktualne ponude na Instagramu.',
  },
  {
    slug: 'poslovnice',
    title: 'Poslovnice | Ljekarne Lupriv Plus Mostar — adrese',
    metaDescription:
      'Pronađite poslovnicu Ljekarni Lupriv Plus u Mostaru: adrese, telefoni i radno vrijeme. Posjetite nas ili kontaktirajte najbližu ljekarnu danas.',
    eyebrow: 'Poslovnice',
    h1: 'Poslovnice Lupriv Plus u Mostaru',
    intro:
      'Pronađite najbližu Lupriv Plus ljekarnu — adresa, telefon i radno vrijeme na jednom mjestu.',
    dutyBadgeText: 'Dežurna · Stjepana Radića 37',
  },
  {
    slug: 'kontakt',
    title: 'Kontakt | Ljekarne Lupriv Plus Mostar',
    metaDescription:
      'Kontaktirajte Ljekarne Lupriv Plus u Mostaru — telefon, e-pošta i kontakt forma. Odgovaramo na upite o receptima, pomagalima i dostavi diljem BiH.',
    eyebrow: 'Kontakt',
    h1: 'Kontaktirajte Ljekarne Lupriv Plus',
    intro:
      'Imate pitanje o poslovnici, narudžbi ili proizvodu? Pišite nam — odgovaramo što prije možemo.',
  },
]

async function upsertByField(
  payload: Awaited<ReturnType<typeof getPayload>>,
  collection: 'locations' | 'brands' | 'services' | 'product-categories' | 'pages',
  field: string,
  value: string,
  data: Record<string, unknown>,
) {
  const existing = await payload.find({
    collection,
    where: { [field]: { equals: value } },
    limit: 1,
    pagination: false,
  })
  if (existing.docs[0]) {
    await payload.update({
      collection,
      id: existing.docs[0].id,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: data as any,
      overrideAccess: true,
    })
    return 'updated'
  }
  await payload.create({
    collection,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: { ...data, [field]: value } as any,
    overrideAccess: true,
  })
  return 'created'
}

async function run() {
  loadEnvFiles()
  const databaseUrl = assertMongoDatabaseUrl()
  const seedMode = process.env.SEED_MODE?.trim() || 'local'
  console.log(`Seed mode: ${seedMode}`)
  console.log(`Database: ${redactMongoUrl(databaseUrl)}`)

  // Dynamic import so payload.config reads env after loadEnvFiles()
  const { default: config } = await import('../src/payload.config')
  const payload = await getPayload({ config })

  console.log('Seeding site-settings…')
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      brandName: 'Ljekarne Lupriv Plus',
      legalName: 'LJZU Lupriv Plus Mostar',
      name: 'Lupriv Plus',
      url: 'https://luprivplus.com',
      email: 'luprivplus@luprivplus.com',
      phoneDisplay: '036/332-636',
      phoneE164: '+387-36-332-636',
      streetAddress: 'Kralja Tomislava 4',
      addressLocality: 'Mostar',
      postalCode: '88000',
      addressCountry: 'BA',
      addressLine: 'Kralja Tomislava 4, Mostar',
      instagram: 'https://www.instagram.com/lupriv_plus',
      instagramHandle: '@lupriv_plus',
      deliveryFee: '7 KM',
      freeDeliveryOver: '100 KM',
      since: 1994,
      citiesBio: [
        { city: 'Sarajevo' },
        { city: 'Mostar' },
        { city: 'Rama' },
        { city: 'Jablanica' },
        { city: 'Čapljina' },
        { city: 'Livno' },
        { city: 'Posušje' },
      ],
      footerTagline: 'Ljekarne Lupriv Plus — uz vas od 1994.',
    },
    overrideAccess: true,
  })

  console.log('Seeding locations…')
  for (const loc of locationsSeed) {
    const { code, ...rest } = loc
    const status = await upsertByField(payload, 'locations', 'code', code, {
      ...rest,
      code,
      phone: loc.phone ?? undefined,
      email: loc.email ?? undefined,
      hours: {
        start: loc.hours.start,
        end: loc.hours.end,
        sunday: loc.hours.sunday,
        saturday: 'saturday' in loc.hours ? loc.hours.saturday : undefined,
      },
    })
    console.log(`  location ${code}: ${status}`)
  }

  console.log('Seeding brands…')
  for (const brand of brandsSeed) {
    const status = await upsertByField(payload, 'brands', 'slug', brand.slug, {
      ...brand,
      active: true,
    })
    console.log(`  brand ${brand.slug}: ${status}`)
  }

  console.log('Seeding services…')
  for (const service of servicesSeed) {
    const status = await upsertByField(payload, 'services', 'slug', service.slug, service)
    console.log(`  service ${service.slug}: ${status}`)
  }

  console.log('Seeding product-categories…')
  for (const cat of productCategoriesSeed) {
    const status = await upsertByField(payload, 'product-categories', 'slug', cat.slug, cat)
    console.log(`  category ${cat.slug}: ${status}`)
  }

  console.log('Seeding pages…')
  for (const page of pagesSeed) {
    const status = await upsertByField(payload, 'pages', 'slug', page.slug, page)
    console.log(`  page ${page.slug}: ${status}`)
  }

  const adminEmail = process.env.PAYLOAD_ADMIN_EMAIL
  const adminPassword = process.env.PAYLOAD_ADMIN_PASSWORD
  if (adminEmail && adminPassword) {
    const users = await payload.find({
      collection: 'users',
      where: { email: { equals: adminEmail } },
      limit: 1,
    })
    if (!users.docs[0]) {
      await payload.create({
        collection: 'users',
        data: {
          email: adminEmail,
          password: adminPassword,
          name: 'Admin',
        },
        overrideAccess: true,
      })
      console.log(`Created admin user ${adminEmail}`)
    } else {
      console.log(`Admin user ${adminEmail} already exists`)
    }
  } else {
    console.log('No PAYLOAD_ADMIN_EMAIL/PASSWORD — create first user at /admin')
  }

  console.log('Seed complete.')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
