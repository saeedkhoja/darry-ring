import { Link } from "react-router-dom";
import { METAL_LABELS, GEM_LABELS, formatSom, ringImage } from "../data/rings.js";

export default function RingCard({ ring }) {
  return (
    <Link to={`/ring/${ring.id}`} className="card group flex flex-col overflow-hidden">
      <div className="relative aspect-square overflow-hidden bg-rose-50">
        <div className="absolute left-2.5 top-2.5 z-10 flex gap-1.5">
          {ring.bestseller && <span className="chip bg-rose-600 text-white">Xit</span>}
          {ring.isNew && <span className="chip bg-gold text-white">Yangi</span>}
        </div>
        <img
          src={ringImage(ring.image, 600)}
          alt={ring.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <span className="text-[0.66rem] font-semibold uppercase tracking-[0.15em] text-rose-600">
          {ring.collection}
        </span>
        <h3 className="mt-1 text-lg font-semibold leading-tight text-ink">{ring.name}</h3>
        <p className="mt-1 text-xs text-ink-soft">
          {METAL_LABELS[ring.metal]} · {GEM_LABELS[ring.gem]} · {ring.carat} ct
        </p>
        <div className="mt-auto pt-4">
          <p className="text-base font-bold text-ink">{formatSom(ring.price)}</p>
        </div>
      </div>
    </Link>
  );
}
