// Yagona uzuklar katalogi — haqiqiy rasmlar (Unsplash) bilan.
// Narxlar so'mda.

export const COLLECTIONS = ["Classic", "Eternal", "Royal", "Aurora", "Heritage", "Lumière"];
export const METAL_LABELS = {
  gold: "Sariq oltin",
  rose: "Pushti oltin",
  white: "Oq oltin",
  platinum: "Platina",
};
export const GEM_LABELS = {
  diamond: "Olmos",
  pink: "Pushti olmos",
  blue: "Safir",
  emerald: "Zumrad",
  ruby: "Yoqut",
  champagne: "Shampan olmos",
  purple: "Ametist",
  black: "Qora olmos",
};

// Unsplash rasm yo'llari (tasdiqlangan uzuk fotosuratlari).
const IMAGES = [
  "photo-1605100804763-247f67b3557e",
  "photo-1603561591411-07134e71a2a9",
  "photo-1512163143273-bde0e3cc7407",
  "photo-1529519195486-16945f0fb37f",
  "photo-1518370265276-f22b706aeac8",
  "photo-1598560917807-1bae44bd2be8",
  "photo-1605100804567-1ffe942b5cd6",
  "photo-1529634806980-85c3dd6d34ac",
  "photo-1639078007551-b14a57d62c8d",
  "photo-1648564585735-19491888545c",
  "photo-1499899833954-5ecd9439d17f",
  "photo-1588814096146-e7c56156f9f8",
  "photo-1559006864-38a01f201f95",
  "photo-1633934542430-0905ccb5f050",
  "photo-1543294001-f7cd5d7fb516",
  "photo-1719924998065-0c60e329ef58",
  "photo-1607703829739-c05b7beddf60",
  "photo-1589674668791-4889d2bba4c6",
  "photo-1613945407943-59cd755fd69e",
  "photo-1481980235850-66e47651e431",
  "photo-1677045419454-e8b201856472",
  "photo-1589674781759-c21c37956a44",
  "photo-1606800052052-a08af7148866",
  "photo-1520854221256-17451cc331bf",
  "photo-1515934751635-c81c6bc9a2d8",
  "photo-1465495976277-4387d4b0b4c6",
  "photo-1622398925373-3f91b1e275f5",
  "photo-1553915632-175f60dd8e36",
  "photo-1529634597503-139d3726fed5",
  "photo-1562249004-1f7289c19c49",
  "photo-1627293509201-cd0c780043e6",
  "photo-1550368566-f9cc32d7392d",
  "photo-1554047310-ab6170fc7b10",
  "flagged/photo-1566755395267-86735b23d097",
];

export function ringImage(path, w = 800) {
  return `https://images.unsplash.com/${path}?w=${w}&q=80&auto=format&fit=crop`;
}

const NAMES = [
  "Sevgi", "Vafo", "Umid", "Yulduz", "Nur", "Lola", "Gulnoz", "Sadoqat",
  "Bahor", "Shafaq", "Oydin", "Malika", "Dilbar", "Nafosat", "Saodat", "Iqbol",
  "Munis", "Charos", "Zarrin", "Marvarid", "Gavhar", "Yoqut", "Firuza", "Dur",
  "Sevinch", "Visol", "Hilol", "Sabo", "Nigina", "Zumrad", "Shahzoda", "Sulton",
  "Abadiy",
];

const METALS = ["gold", "rose", "white", "platinum"];
const GEMS = ["diamond", "pink", "blue", "emerald", "ruby", "champagne", "purple", "black"];
const CUTS = ["round", "princess", "emerald", "oval", "pear", "heart"];
const CUT_LABELS = {
  round: "Dumaloq", princess: "Princess", emerald: "Emerald",
  oval: "Oval", pear: "Nok", heart: "Yurak",
};

const TAGLINES = [
  "Nafis va abadiy klassika.",
  "Yorqin olmos, abadiy va'da.",
  "Noyob kesim, betakror nur.",
  "Sevgingiz kabi takrorlanmas.",
  "Qo'lda yig'ilgan zargarlik durdonasi.",
  "Yumshoq porlash, kuchli his.",
  "Eng nodir tanlov.",
  "Romantik va zamonaviy uyg'unlik.",
];

function build() {
  return IMAGES.map((img, i) => {
    const collection = COLLECTIONS[i % COLLECTIONS.length];
    const metal = METALS[i % METALS.length];
    const gem = GEMS[i % GEMS.length];
    const cut = CUTS[i % CUTS.length];
    const carat = [0.2, 0.3, 0.4, 0.5, 0.7, 1.0, 1.5, 2.0][i % 8];

    const base = 8_500_000;
    const caratPart = carat * 26_000_000;
    const metalBonus = { gold: 2_000_000, rose: 2_500_000, white: 3_000_000, platinum: 5_000_000 }[metal];
    const gemBonus = { diamond: 6_000_000, pink: 14_000_000, blue: 4_500_000, emerald: 7_000_000, ruby: 6_500_000, champagne: 5_000_000, purple: 3_500_000, black: 5_500_000 }[gem];
    let price = base + caratPart + metalBonus + gemBonus;
    price = Math.round(price / 100_000) * 100_000;

    return {
      id: `ygn-${String(i + 1).padStart(3, "0")}`,
      name: `Yagona ${NAMES[i % NAMES.length]}`,
      collection, metal, gem, cut,
      cutLabel: CUT_LABELS[cut],
      carat, price,
      image: img,
      tagline: TAGLINES[i % TAGLINES.length],
      bestseller: i % 6 === 0,
      isNew: i % 5 === 0,
    };
  });
}

export const RINGS = build();
export function getRing(id) {
  return RINGS.find((r) => r.id === id) || null;
}
export function formatSom(n) {
  return new Intl.NumberFormat("uz-UZ").format(n) + " so'm";
}
