import { useState } from "react";
import { passport } from "../api/client.js";

export default function Passport() {
  const [id, setId] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleLookup(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const res = await passport.lookup(id);
      setData(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <div className="text-center">
        <span className="text-xs tracking-[0.25em] text-rose-600 uppercase">Passport tekshirish</span>
        <h1 className="mt-3 text-4xl text-ink">Sevgi passportini tekshiring</h1>
        <p className="mt-3 text-ink-soft">
          Biz uzuk sotgan har bir juftlikka noyob <strong>platformId</strong> beriladi.
          ID'ni kiriting va passport ma'lumotlarini ko'ring.
        </p>
      </div>

      <form onSubmit={handleLookup} className="mt-10 flex flex-col gap-3 sm:flex-row">
        <input
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Masalan: YGN-DEMO-0001"
          className="flex-1 rounded-xl border border-rose-100 bg-white px-4 py-3 outline-none focus:border-rose-400"
        />
        <button
          type="submit"
          disabled={loading || !id.trim()}
          className="rounded-xl bg-ink px-7 py-3 text-cream transition-transform hover:scale-[1.02] disabled:opacity-60"
        >
          {loading ? "Tekshirilmoqda..." : "Tekshirish"}
        </button>
      </form>

      <p className="mt-3 text-center text-xs text-ink-soft">
        Sinab ko'rish uchun: <button onClick={() => setId("YGN-DEMO-0001")} className="text-rose-600 underline">YGN-DEMO-0001</button>
      </p>

      {error && (
        <div className="mt-8 rounded-xl border border-rose-200 bg-rose-50/60 p-5 text-center text-rose-700">
          {error}
        </div>
      )}

      {data && <PassportCard data={data} />}
    </div>
  );
}

export function PassportCard({ data }) {
  return (
    <div className="mt-10 overflow-hidden rounded-3xl border border-gold/40 bg-gradient-to-br from-white to-rose-50/60 shadow-xl">
      <div className="flex items-center justify-between bg-gradient-to-r from-ink to-rose-700 px-7 py-5 text-cream">
        <div>
          <p className="text-xs tracking-[0.2em] uppercase opacity-80">Yagona · Sevgi passporti</p>
          <p className="mt-1 text-lg font-semibold">{data.platformId}</p>
        </div>
        <div className="text-3xl">💍</div>
      </div>
      <div className="grid gap-x-8 gap-y-4 px-7 py-7 sm:grid-cols-2">
        <Row label="Xaridor" value={data.buyer} />
        <Row label="Yagonasi" value={data.partnerName} />
        <Row label="Uzuk modeli" value={data.ringModel} />
        <Row label="JSHSHIR" value={maskPinfl(data.pinfl)} />
        <Row label="Berilgan sana" value={fmtDate(data.issuedAt)} />
        <Row label="Holat" value="✓ Tasdiqlangan" valueClass="text-emerald-600" />
      </div>
      {data.message && (
        <div className="border-t border-rose-100 px-7 py-6">
          <p className="text-xs tracking-widest text-ink-soft uppercase">Sevgi izhori</p>
          <p className="mt-2 text-xl leading-snug text-ink" style={{ fontFamily: "var(--font-serif)" }}>
            "{data.message}"
          </p>
        </div>
      )}
    </div>
  );
}

function Row({ label, value, valueClass = "text-ink" }) {
  return (
    <div>
      <p className="text-xs tracking-wide text-ink-soft uppercase">{label}</p>
      <p className={`mt-0.5 font-medium ${valueClass}`}>{value || "—"}</p>
    </div>
  );
}

function maskPinfl(p) {
  if (!p) return "—";
  const s = String(p);
  return s.length > 6 ? s.slice(0, 4) + "•••••" + s.slice(-2) : s;
}

function fmtDate(iso) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("uz-UZ", { year: "numeric", month: "long", day: "numeric" });
  } catch {
    return iso;
  }
}
