export const pageMeta = {
  home: {
    title: "Ljekarne Lupriv Plus | Mostar i BiH od 1994.",
    description:
      "Ljekarne Lupriv Plus — recepti, farmaceutsko savjetovanje, ortopedska pomagala i dostava diljem BiH. Tradicija od 1994. Pronađite poslovnicu ili nas kontaktirajte.",
  },
  oNama: {
    title: "O nama | Ljekarne Lupriv Plus Mostar od 1994.",
    description:
      "Upoznajte LJZU Lupriv Plus Mostar — ljekarne s tradicijom od 1994. Stručnost, povjerenje i briga za pacijente u Mostaru i diljem BiH. Saznajte više o nama.",
  },
  usluge: {
    title: "Usluge | Recepti, savjetovanje i dostava | Lupriv Plus",
    description:
      "Recepti, farmaceutsko savjetovanje, ortopedska pomagala i dostava diljem BiH. Ljekarne Lupriv Plus Mostar — pouzdana podrška vašem zdravlju od 1994.",
  },
  poslovnice: {
    title: "Poslovnice | Ljekarne Lupriv Plus Mostar — adrese",
    description:
      "Pronađite poslovnicu Ljekarni Lupriv Plus u Mostaru: adrese, telefoni i radno vrijeme. Posjetite nas ili kontaktirajte najbližu ljekarnu danas.",
  },
  kontakt: {
    title: "Kontakt | Ljekarne Lupriv Plus Mostar",
    description:
      "Kontaktirajte Ljekarne Lupriv Plus u Mostaru — telefon, e-pošta i kontakt forma. Odgovaramo na upite o receptima, pomagalima i dostavi diljem BiH.",
  },
  proizvodi: {
    title: "Proizvodi i brandovi u ljekarnama | Lupriv Plus Mostar",
    description:
      "Otkrijte asortiman i svjetske brandove u Ljekarnama Lupriv Plus u Mostaru — dermokozmetika, dodaci prehrani i zdravstveni proizvodi. Posjetite naše poslovnice.",
  },
} as const;

export type PageMetaKey = keyof typeof pageMeta;
