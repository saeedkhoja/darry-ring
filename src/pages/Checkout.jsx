import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { orders } from "../api/client.js";
import { getRing, METAL_LABELS, GEM_LABELS, formatSom, ringImage } from "../data/rings.js";

export default function Checkout() {
  const { id } = useParams();
  const ring = getRing(id);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [eligible, setEligible] = useState(null);
  const [reason, setReason] = useState(null);
  const [partnerName, setPartnerName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    orders.eligibility(user.token)
      .then((r) => { setEligible(r.eligible); setReason(r.reason); })
      .catch(() => setEligible(true));
  }, [user.token]);

  if (!ring) {
    return (
      <div className="px-5 py-24 text-center">
        <p className="text-ink-soft">Uzuk topilmadi.</p>
        <Link to="/catalog" className="mt-4 inline-block text-rose-600 underline">Katalogga qaytish</Link>
      </div>
    );
  }

  async function handleBuy(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const order = await orders.create(user.token, {
        ringId: ring.id,
        ringModel: `${ring.name} — ${GEM_LABELS[ring.gem]} ${ring.carat}ct`,
        price: ring.price,
        partnerName,
        message,
      });
      setDone(order);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (eligible === null) {
    return <div className="px-5 py-24 text-center text-ink-soft">Yuklanmoqda...</div>;
  }

  if (!eligible && !done) {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center">
        <div className="text-5xl">💍</div>
        <h1 className="mt-6 text-3xl text-ink">Siz yagonangizni topgansiz</h1>
        <p className="mt-4 text-ink-soft">
          {reason || "Yagona platformasida umrda faqat bir marta uzuk sotib olish mumkin."}
        </p>
        <button onClick={() => navigate("/profile")} className="btn-ink mt-8">Passportimni ko'rish</button>
      </div>
    );
  }

  if (done) {
    return (
      <div className="mx-auto max-w-lg px-5 py-20 text-center">
        <div className="text-5xl">🎉</div>
        <h1 className="mt-6 text-3xl text-ink">Tabriklaymiz!</h1>
        <p className="mt-3 text-ink-soft">Uzugingiz buyurtma qilindi va sevgi passportingiz yaratildi.</p>
        <div className="mt-8 rounded-2xl border border-gold/40 bg-rose-50/50 p-6 text-left">
          <p className="text-xs uppercase tracking-widest text-ink-soft">Sizning platformId</p>
          <p className="mt-1 text-2xl font-semibold text-rose-700">{done.platformId}</p>
          <div className="gold-divider my-4" />
          <p className="text-sm text-ink-soft">Uzuk: <span className="text-ink">{done.ringModel}</span></p>
          <p className="text-sm text-ink-soft">Yagonangiz: <span className="text-ink">{done.partnerName}</span></p>
        </div>
        <button onClick={() => navigate("/profile")} className="btn-primary mt-6">Profilimga o'tish</button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <h1 className="text-3xl text-ink">Buyurtmani rasmiylashtirish</h1>
      <p className="mt-2 text-ink-soft">Bu xarid umringizda bir marta. Ma'lumotlar passportingizga abadiy yoziladi.</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Form */}
        <form onSubmit={handleBuy} className="rounded-2xl border border-rose-100 bg-white/70 p-6">
          <h2 className="text-xl text-ink">Sevgi passporti ma'lumotlari</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs text-ink-soft">Yagonangizning ismi *</span>
              <input required value={partnerName} onChange={(e) => setPartnerName(e.target.value)}
                placeholder="Malika" className="field" />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-ink-soft">Xaridor (OneID)</span>
              <input disabled value={user.fullName} className="field bg-rose-50/40 text-ink-soft" />
            </label>
          </div>
          <label className="mt-4 block">
            <span className="mb-1 block text-xs text-ink-soft">Sevgi izhoringiz</span>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3}
              placeholder="Butun umrim davomida faqat senga..." className="field" />
          </label>
          {error && <p className="mt-3 text-sm text-rose-600">{error}</p>}
          <button type="submit" disabled={submitting} className="btn-primary mt-6 w-full py-3.5">
            {submitting ? "Tasdiqlanmoqda..." : `${formatSom(ring.price)} — Tasdiqlash`}
          </button>
          <p className="mt-3 text-center text-xs text-ink-soft">
            ⚠️ Tasdiqlangach o'zgartirib bo'lmaydi.
          </p>
        </form>

        {/* Order summary */}
        <aside className="h-fit rounded-2xl border border-rose-100 bg-white/70 p-6">
          <h2 className="text-lg text-ink">Buyurtma</h2>
          <div className="mt-4 flex gap-4">
            <img
              src={ringImage(ring.image, 200)}
              alt={ring.name}
              className="h-20 w-20 rounded-xl object-cover"
            />
            <div>
              <p className="font-medium text-ink">{ring.name}</p>
              <p className="text-xs text-ink-soft">{METAL_LABELS[ring.metal]} · {GEM_LABELS[ring.gem]}</p>
              <p className="text-xs text-ink-soft">{ring.carat} ct · {ring.collection}</p>
            </div>
          </div>
          <div className="gold-divider my-5" />
          <Row label="Uzuk narxi" value={formatSom(ring.price)} />
          <Row label="Yetkazib berish" value="Bepul" />
          <div className="gold-divider my-4" />
          <Row label="Jami" value={formatSom(ring.price)} big />
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value, big }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className={big ? "font-medium text-ink" : "text-sm text-ink-soft"}>{label}</span>
      <span className={big ? "text-lg font-semibold text-ink" : "text-sm text-ink"}>{value}</span>
    </div>
  );
}
