import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Logo from "../components/Logo.jsx";

export default function Login() {
  const { loginWithOneId } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [registered, setRegistered] = useState(false);
  const from = location.state?.from || "/catalog";

  // MOCK OneID oynasi maydonlari (backend ulanganda bu olib tashlanadi —
  // o'rniga haqiqiy OneID redirect ishlaydi).
  const [form, setForm] = useState({ fullName: "", pinfl: "", birthDate: "" });

  async function handleOneId(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await loginWithOneId(form);
      setRegistered(true); // "tez kunda" offer ekranini ko'rsatamiz
    } catch (err) {
      setError(err.message || "Kirishda xatolik yuz berdi.");
    } finally {
      setLoading(false);
    }
  }

  // ===== Ro'yxatdan o'tgandan keyin — "Tez kunda" offeri =====
  if (registered) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-5 py-20 text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-rose-50 text-4xl">
          🎉
        </span>
        <span className="mt-6 chip bg-gold text-white">Tez kunda</span>
        <h1 className="mt-4 text-3xl text-ink sm:text-4xl">Siz ro'yxatdan o'tdingiz!</h1>
        <p className="mt-4 leading-relaxed text-ink-soft">
          Yagona <strong className="text-ink">tez kunda ishga tushadi</strong>. Siz erta kirish
          ro'yxatidasiz — birinchilardan bo'lib xabardor bo'lasiz.
        </p>

        <div className="mt-8 w-full rounded-2xl border border-gold/40 bg-surface/70 p-6 text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-rose-600">
            Erta kirish sovg'asi
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            🎁 Ishga tushganda birinchi xaridingizga maxsus taklif va shaxsiy maslahatchi.
          </p>
        </div>

        <button onClick={() => navigate("/catalog")} className="btn-primary mt-8 w-full py-3">
          Uzuklar bilan tanishish
        </button>
        <button onClick={() => navigate("/")} className="mt-3 text-sm text-ink-soft hover:text-rose-600">
          Bosh sahifaga qaytish
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-5 py-20">
      <Logo size={48} />
      <span className="mt-6 chip bg-gold text-white">Tez kunda ishga tushamiz</span>
      <h1 className="mt-4 text-center text-3xl text-ink">OneID bilan ro'yxatdan o'ting</h1>
      <p className="mt-3 text-center text-ink-soft">
        Erta kirish ro'yxatiga qo'shiling — birinchilardan bo'ling.
      </p>

      <div className="mt-8 w-full rounded-2xl border border-rose-100 bg-surface/70 p-7 shadow-sm">
        {/* Haqiqiy OneID tugmasi — backend redirectiga ulanadi */}
        <button
          onClick={handleOneId}
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#0a3d62] px-5 py-3.5 text-white transition-opacity hover:opacity-95 disabled:opacity-60"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded bg-white text-xs font-bold text-[#0a3d62]">
            ID
          </span>
          {loading ? "Yo'naltirilmoqda..." : "OneID bilan davom etish"}
        </button>

        <div className="my-6 flex items-center gap-3 text-xs text-ink-soft">
          <div className="h-px flex-1 bg-rose-100" />
          DEMO rejim
          <div className="h-px flex-1 bg-rose-100" />
        </div>

        {/* DEMO: backend yo'qligida OneID ma'lumotlarini qo'lda kiritish */}
        <form onSubmit={handleOneId} className="space-y-3">
          <Field label="F.I.Sh" value={form.fullName}
            onChange={(v) => setForm({ ...form, fullName: v })}
            placeholder="Aliyev Sardor Akmalovich" />
          <Field label="JSHSHIR (PINFL)" value={form.pinfl}
            onChange={(v) => setForm({ ...form, pinfl: v })}
            placeholder="14 raqam" />
          <Field label="Tug'ilgan sana" type="date" value={form.birthDate}
            onChange={(v) => setForm({ ...form, birthDate: v })} />
          {error && <p className="text-sm text-rose-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3"
          >
            Demo sifatida kirish
          </button>
        </form>
      </div>

      <p className="mt-6 text-center text-xs leading-relaxed text-ink-soft">
        Kirish orqali siz Yagona platformasi shartlariga rozilik bildirasiz.
        Ma'lumotlaringiz OneID orqali himoyalanadi.
      </p>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", placeholder }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs text-ink-soft">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="field"
      />
    </label>
  );
}
