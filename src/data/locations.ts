export type WorkingHours = {
  start: string;
  end: string;
  sunday: boolean;
  saturday?: string;
};

export type Location = {
  code: string;
  name: string;
  address: string;
  city: string;
  canton: string;
  hours: WorkingHours;
  phone: string | null;
  email: string | null;
  isHq?: boolean;
  isDuty?: boolean;
};

export const locations: Location[] = [
  { code: "1", name: "Lupriv Plus 1", address: "Kralja Tomislava 4", city: "Mostar", canton: "HNŽ", hours: { start: "07:30", end: "21:00", sunday: false, saturday: "08:00–19:00" }, phone: "036/332-636", email: "oj1@luprivplus.com", isHq: true },
  { code: "2", name: "Lupriv Plus 2", address: "Kneza Višeslava 152", city: "Mostar", canton: "HNŽ", hours: { start: "07:30", end: "20:30", sunday: false }, phone: "036/348-687", email: "oj2@luprivplus.com" },
  { code: "3", name: "Lupriv Plus 3", address: "Kruševo bb", city: "Mostar", canton: "HNŽ", hours: { start: "07:30", end: "20:30", sunday: false }, phone: "036/486-040", email: "oj3@luprivplus.com" },
  { code: "4", name: "Lupriv Plus 4", address: "Kardinala Stepinca 17", city: "Mostar", canton: "HNŽ", hours: { start: "07:30", end: "20:30", sunday: false }, phone: "036/328-268", email: "oj4@luprivplus.com" },
  { code: "5", name: "Lupriv Plus 5", address: "Splitska 5", city: "Mostar", canton: "HNŽ", hours: { start: "07:30", end: "21:00", sunday: false }, phone: "036/326-292", email: "oj5@luprivplus.com" },
  { code: "6", name: "Lupriv Plus 6", address: "Dubrovačka bb", city: "Mostar", canton: "HNŽ", hours: { start: "07:30", end: "21:00", sunday: false }, phone: "036/319-110", email: "oj6@luprivplus.com" },
  { code: "7", name: "Lupriv Plus 7", address: "Kralja Tomislava bb", city: "Prozor - Rama", canton: "HNŽ", hours: { start: "08:00", end: "20:00", sunday: false }, phone: "036/771-411", email: "oj7@luprivplus.com" },
  { code: "8", name: "Lupriv Plus 8", address: "Pere Bilića 56A", city: "Jablanica", canton: "HNŽ", hours: { start: "08:00", end: "18:00", sunday: false }, phone: "036/753-973", email: "oj8@luprivplus.com" },
  { code: "9", name: "Lupriv Plus 9", address: "Mate Bobana bb", city: "Čapljina", canton: "HNŽ", hours: { start: "08:00", end: "20:30", sunday: false }, phone: "036/807-668", email: "oj9@luprivplus.com" },
  { code: "10", name: "Lupriv Plus 10", address: "Aladinići bb", city: "Stolac", canton: "HNŽ", hours: { start: "08:00", end: "20:00", sunday: false }, phone: "036/862-811", email: "oj10@luprivplus.com" },
  { code: "11", name: "Lupriv Plus 11", address: "Skenderija bb", city: "Sarajevo", canton: "SŽ", hours: { start: "08:00", end: "20:00", sunday: false }, phone: "033/216-505", email: "oj11@luprivplus.com" },
  { code: "12", name: "Lupriv Plus 12", address: "Splitska bb", city: "Livno", canton: "HBŽ", hours: { start: "08:00", end: "20:00", sunday: false }, phone: null, email: null },
  { code: "13", name: "Lupriv Plus 13", address: "Stjepana Radića 37", city: "Mostar", canton: "HNŽ", hours: { start: "08:00", end: "23:00", sunday: true }, phone: "036/323-312", email: "oj13@luprivplus.com", isDuty: true },
  { code: "14", name: "Lupriv Plus 14", address: "Obala Isa-bega Ishakovića 7", city: "Sarajevo", canton: "SŽ", hours: { start: "08:00", end: "20:00", sunday: false }, phone: "033/237-410", email: "oj14@luprivplus.com" },
  { code: "15", name: "Lupriv Plus 15", address: "Milana Preloga 2A", city: "Sarajevo", canton: "SŽ", hours: { start: "08:00", end: "20:00", sunday: false }, phone: "033/616-980", email: null },
  { code: "16", name: "Lupriv Plus 16", address: "Igmanskih bataljona 3", city: "Hrasnica, Ilidža", canton: "SŽ", hours: { start: "08:00", end: "20:00", sunday: false }, phone: null, email: null },
  { code: "17", name: "Lupriv Plus 17", address: "Vukovarska 43", city: "Posušje", canton: "ŽZH", hours: { start: "08:00", end: "20:30", sunday: false }, phone: null, email: null },
  { code: "18", name: "Lupriv Plus 18", address: "Adema Buće 206", city: "Sarajevo", canton: "SŽ", hours: { start: "08:00", end: "20:00", sunday: false }, phone: null, email: null },
  { code: "19", name: "Lupriv Plus 19", address: "Knešpolje bb", city: "Široki Brijeg", canton: "ŽZH", hours: { start: "08:00", end: "20:00", sunday: false }, phone: null, email: null },
];

export const cities = Array.from(new Set(locations.map((l) => l.city))).sort((a, b) => a.localeCompare(b, "hr"));

export function formatHours(hours: WorkingHours): string[] {
  const lines: string[] = [`Pon–Pet: ${hours.start}–${hours.end}`];
  if (hours.saturday) lines.push(`Subota: ${hours.saturday}`);
  if (hours.sunday) lines.push(`Nedjelja: ${hours.start}–${hours.end}`);
  return lines;
}

export function mapsUrl(loc: Location): string {
  const q = encodeURIComponent(`${loc.address}, ${loc.city}`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

export const HQ = locations.find((l) => l.isHq) ?? locations[0];

export const SITE = {
  name: "Lupriv Plus",
  brandName: "Ljekarne Lupriv Plus",
  legalName: "LJZU Lupriv Plus Mostar",
  url: "https://luprivplus.com",
  email: "luprivplus@luprivplus.com",
  /** Display phone (HQ) — single NAP source */
  phoneDisplay: "036/332-636",
  /** E.164 for schema / tel: links */
  phoneE164: "+387-36-332-636",
  streetAddress: "Kralja Tomislava 4",
  addressLocality: "Mostar",
  postalCode: "88000",
  addressCountry: "BA",
  /** Human-readable one-liner for footer / kontakt */
  addressLine: "Kralja Tomislava 4, Mostar",
  instagram: "https://www.instagram.com/lupriv_plus",
  instagramHandle: "@lupriv_plus",
  deliveryFee: "7 KM",
  freeDeliveryOver: "100 KM",
  since: 1994,
  citiesBio: ["Sarajevo", "Mostar", "Rama", "Jablanica", "Čapljina", "Livno", "Posušje"] as const,
} as const;
