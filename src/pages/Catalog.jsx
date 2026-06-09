import { useMemo, useState } from "react";
import RingCard from "../components/RingCard.jsx";
import { RINGS, COLLECTIONS, METAL_LABELS, GEM_LABELS, formatSom } from "../data/rings.js";

const SORTS = {
  popular: "Ommabop",
  "price-asc": "Narx: arzondan",
  "price-desc": "Narx: qimmatdan",
  carat: "Karat: kattadan",
};

export default function Catalog() {
  const [q, setQ] = useState("");
  const [collection, setCollection] = useState("all");
  const [metal, setMetal] = useState("all");
  const [gem, setGem] = useState("all");
  const [sort, setSort] = useState("popular");

  const filtered = useMemo(() => {
    let list = RINGS.filter((r) => {
      if (collection !== "all" && r.collection !== collection) return false;
      if (metal !== "all" && r.metal !== metal) return false;
      if (gem !== "all" && r.gem !== gem) return false;
      if (q.trim()) {
        const hay = `${r.name} ${r.collection}`.toLowerCase();
        if (!hay.includes(q.trim().toLowerCase())) return false;
      }
      return true;
    });
    switch (sort) {
      case "price-asc": list = [...list].sort((a, b) => a.price - b.price); break;
      case "price-desc": list = [...list].sort((a, b) => b.price - a.price); break;
      case "carat": list = [...list].sort((a, b) => b.carat - a.carat); break;
      default: list = [...list].sort((a, b) => Number(b.bestseller) - Number(a.bestseller));
    }
    return list;
  }, [q, collection, metal, gem, sort]);

  const prices = RINGS.map((r) => r.price);

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      {/* Header */}
      <div className="text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-600">
          Marketplace
        </span>
        <h1 className="mt-3 text-4xl text-ink sm:text-5xl">Yagona uzuklar to'plami</h1>
        <p className="mx-auto mt-3 max-w-xl text-ink-soft">
          {RINGS.length} ta noyob model · {formatSom(Math.min(...prices))} dan boshlab.
          Yuragingizga mos kelganini tanlang — umringizda bir marta.
        </p>
      </div>

      {/* Toolbar */}
      <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-rose-100 bg-white/70 p-4 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Uzuk nomi bo'yicha qidirish..."
            className="field pl-10"
          />
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft">⌕</span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Select value={collection} onChange={setCollection} label="To'plam"
            options={[["all", "Barchasi"], ...COLLECTIONS.map((c) => [c, c])]} />
          <Select value={metal} onChange={setMetal} label="Metall"
            options={[["all", "Barchasi"], ...Object.entries(METAL_LABELS)]} />
          <Select value={gem} onChange={setGem} label="Tosh"
            options={[["all", "Barchasi"], ...Object.entries(GEM_LABELS)]} />
          <Select value={sort} onChange={setSort} label="Saralash"
            options={Object.entries(SORTS)} />
        </div>
      </div>

      {/* Results count */}
      <p className="mt-6 text-sm text-ink-soft">{filtered.length} ta natija topildi</p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="py-24 text-center text-ink-soft">
          Filtrlarga mos uzuk topilmadi. Filtrlarni o'zgartiring.
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((r) => (
            <RingCard key={r.id} ring={r} />
          ))}
        </div>
      )}
    </div>
  );
}

function Select({ value, onChange, label, options }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[0.66rem] uppercase tracking-wide text-ink-soft">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="field cursor-pointer appearance-none bg-white"
      >
        {options.map(([v, l]) => (
          <option key={v} value={v}>{l}</option>
        ))}
      </select>
    </label>
  );
}
