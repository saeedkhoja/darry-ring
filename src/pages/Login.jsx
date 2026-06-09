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
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Kirishda xatolik yuz berdi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-5 py-20">
      <Logo size={48} />
      <h1 className="mt-8 text-center text-3xl text-ink">OneID bilan kirish</h1>
      <p className="mt-3 text-center text-ink-soft">
        Yagonaga ro'yxatdan o'tish faqat rasmiy <strong>OneID</strong> orqali amalga oshiriladi.
      </p>

      <div className="mt-10 w-full rounded-2xl border border-rose-100 bg-white/70 p-7 shadow-sm">
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
            className="w-full rounded-xl bg-rose-600 px-5 py-3 text-cream transition-transform hover:scale-[1.02] disabled:opacity-60"
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
        className="w-full rounded-lg border border-rose-100 bg-white px-3.5 py-2.5 text-ink outline-none transition-colors focus:border-rose-400"
      />
    </label>
  );
}
