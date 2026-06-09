import { useNavigate, useParams, Link } from "react-router-dom";
import RingCard from "../components/RingCard.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { getRing, RINGS, METAL_LABELS, GEM_LABELS, formatSom, ringImage } from "../data/rings.js";

export default function RingDetail() {
  const { id } = useParams();
  const ring = getRing(id);
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!ring) {
    return (
      <div className="px-5 py-24 text-center">
        <p className="text-ink-soft">Uzuk topilmadi.</p>
        <Link to="/catalog" className="mt-4 inline-block text-rose-600 underline">Katalogga qaytish</Link>
      </div>
    );
  }

  // "Sotib olish" — agar tizimga kirmagan bo'lsa, OneID'ga yo'naltiramiz.
  function handleBuy() {
    if (!user) {
      navigate("/login", { state: { from: `/checkout/${ring.id}` } });
    } else {
      navigate(`/checkout/${ring.id}`);
    }
  }

  const related = RINGS.filter((r) => r.collection === ring.collection && r.id !== ring.id).slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <nav className="mb-6 text-sm text-ink-soft">
        <Link to="/catalog" className="hover:text-rose-600">Katalog</Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{ring.name}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        {/* Image */}
        <div className="relative overflow-hidden rounded-3xl border border-rose-100 bg-rose-50">
          <div className="absolute left-4 top-4 z-10 flex gap-2">
            {ring.bestseller && <span className="chip bg-rose-600 text-white">Xit savdo</span>}
            {ring.isNew && <span className="chip bg-gold text-white">Yangi</span>}
          </div>
          <img
            src={ringImage(ring.image, 1000)}
            alt={ring.name}
            className="aspect-square w-full object-cover"
          />
        </div>

        {/* Info */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            {ring.collection} to'plami
          </span>
          <h1 className="mt-2 text-4xl text-ink">{ring.name}</h1>
          <p className="mt-3 text-lg text-ink-soft">{ring.tagline}</p>

          <p className="mt-6 text-3xl font-semibold text-ink">{formatSom(ring.price)}</p>
          <p className="mt-1 text-sm text-ink-soft">Soliqlar kiritilgan · Bepul yetkazib berish</p>

          <div className="mt-7 grid grid-cols-2 gap-4 rounded-2xl border border-rose-100 bg-surface/60 p-5">
            <Spec label="Metall" value={METAL_LABELS[ring.metal]} />
            <Spec label="Asosiy tosh" value={GEM_LABELS[ring.gem]} />
            <Spec label="Kesim" value={ring.cutLabel} />
            <Spec label="Karat" value={`${ring.carat} ct`} />
          </div>

          <button onClick={handleBuy} className="btn-primary mt-7 w-full py-3.5 text-base">
            💍 Sotib olish
          </button>
          {!user && (
            <p className="mt-3 text-center text-sm text-ink-soft">
              Sotib olish uchun <strong className="text-ink">OneID</strong> orqali ro'yxatdan o'tasiz.
            </p>
          )}
          <div className="mt-5 flex items-center gap-2 rounded-xl bg-rose-50/60 px-4 py-3 text-sm text-rose-700">
            <span>⚠️</span>
            <span>Yagona qoidasi: har bir foydalanuvchi umrida faqat <strong>bitta</strong> uzuk sotib oladi.</span>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="text-2xl text-ink">{ring.collection} to'plamidan yana</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {related.map((r) => <RingCard key={r.id} ring={r} />)}
          </div>
        </section>
      )}
    </div>
  );
}

function Spec({ label, value }) {
  return (
    <div>
      <p className="text-[0.66rem] uppercase tracking-wide text-ink-soft">{label}</p>
      <p className="mt-0.5 font-medium text-ink">{value}</p>
    </div>
  );
}
