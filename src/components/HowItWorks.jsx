import { Link } from "react-router-dom";
import { IconId, IconRing, IconInfinity, IconSeal, IconArrowRight } from "./icons.jsx";

const ICONS = { id: IconId, ring: IconRing, infinity: IconInfinity, seal: IconSeal };

const STEPS = [
  {
    n: "01",
    icon: "id",
    title: "OneID bilan ro'yxatdan o'ting",
    text: "Rasmiy OneID orqali kirasiz. Bir shaxs — bitta hisob.",
    tone: "soft",
  },
  {
    n: "02",
    icon: "ring",
    title: "Yagona uzukni tanlang",
    text: "34 ta noyob model orasidan yuragingizga yaqinini tanlang.",
    tone: "soft",
  },
  {
    n: "03",
    icon: "infinity",
    title: "Umrda bir marta sotib olasiz",
    text: "Xariddan so'ng hisobingiz abadiy band bo'ladi — boshqa hech qachon. Aynan shu sizning va'dangizni betakror qiladi.",
    tone: "highlight",
  },
  {
    n: "04",
    icon: "seal",
    title: "Uzukingizga passport beramiz",
    text: "Uzugingizga noyob platformId — siz va yagonangiz ismi abadiy muhrlanadi.",
    tone: "passport",
  },
];

function StepIcon({ name, className }) {
  const C = ICONS[name];
  return C ? <C className={className} /> : null;
}

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream via-rose-50/40 to-cream py-20">
      <div className="mx-auto max-w-5xl px-5">
        {/* Header */}
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-600">
            Sizning sayohatingiz
          </span>
          <h2 className="mt-3 text-3xl text-ink sm:text-4xl md:text-5xl">
            Bir umrlik va'da, to'rt qadamda
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-soft">
            Yagona shunchaki uzuk sotmaydi — u sizning bir umrlik qaroringizni qadrlaydi.
            Mana, qanday ishlaydi:
          </p>
        </div>

        {/* Snake timeline */}
        <ol className="relative mt-16">
          {/* Vertical spine (mobile chap, desktop markaz) */}
          <span
            className="pointer-events-none absolute top-0 bottom-0 w-1 rounded-full bg-gradient-to-b from-rose-200 via-rose-400 to-gold left-6 md:left-1/2 md:-translate-x-1/2"
            aria-hidden
          />
          {STEPS.map((s, i) => (
            <Step key={s.n} step={s} index={i} />
          ))}
        </ol>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link to="/catalog" className="btn-primary px-8 py-3.5 text-base">
            Sayohatni boshlash
            <IconArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-3 text-sm text-ink-soft">OneID orqali — bir necha soniyada</p>
        </div>
      </div>
    </section>
  );
}

function Step({ step, index }) {
  const left = index % 2 === 0; // desktop: juft -> chap, toq -> o'ng

  return (
    <li className="relative mb-12 last:mb-0 md:mb-20">
      <div
        className={`flex items-stretch gap-5 md:gap-0 ${
          left ? "md:flex-row" : "md:flex-row-reverse"
        }`}
      >
        {/* Node (raqamli doira) — markazda */}
        <span
          className="absolute left-6 top-7 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-4 border-cream bg-rose-600 text-sm font-bold text-white shadow-lg md:left-1/2"
          aria-hidden
        >
          {step.n}
        </span>

        {/* Bo'sh tomon (desktop muvozanati uchun) */}
        <div className="hidden md:block md:w-1/2" />

        {/* Karta */}
        <div className={`w-full pl-16 md:w-1/2 md:pl-0 ${left ? "md:pr-14 md:text-right" : "md:pl-14"}`}>
          <Card step={step} alignRight={left} />
        </div>
      </div>
    </li>
  );
}

function Card({ step, alignRight }) {
  if (step.tone === "highlight") {
    return (
      <div className="rounded-2xl bg-gradient-to-br from-rose-700 to-onyx p-7 text-onaccent shadow-2xl shadow-rose-900/30">
        <div className={`mb-3 flex items-center gap-3 ${alignRight ? "md:flex-row-reverse" : ""}`}>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-gold-soft">
            <StepIcon name={step.icon} className="h-6 w-6" />
          </span>
          <span className="chip bg-gold text-ink">Eng muhim qadam</span>
        </div>
        <h3 className="text-2xl text-onaccent">{step.title}</h3>
        <p className="mt-2 leading-relaxed text-onaccent/85">{step.text}</p>
        <p className={`mt-4 text-sm font-semibold text-gold-soft ${alignRight ? "md:text-right" : ""}`}>
          Boshqa hech qachon — bu chinakam yagona.
        </p>
      </div>
    );
  }

  if (step.tone === "passport") {
    return (
      <div className="overflow-hidden rounded-2xl border border-gold/40 bg-surface shadow-lg">
        <div className={`flex items-center gap-3 bg-gradient-to-r from-onyx to-rose-700 px-6 py-4 text-onaccent ${alignRight ? "md:flex-row-reverse md:text-right" : ""}`}>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
            <StepIcon name={step.icon} className="h-5 w-5" />
          </span>
          <div className={alignRight ? "md:ml-auto" : ""}>
            <p className="text-[0.6rem] uppercase tracking-[0.2em] opacity-80">Yagona · Sevgi passporti</p>
            <p className="font-semibold">YGN-2026-•••••</p>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-2xl text-ink">{step.title}</h3>
          <p className="mt-2 leading-relaxed text-ink-soft">{step.text}</p>
        </div>
      </div>
    );
  }

  // soft (default)
  return (
    <div className="card p-7">
      <span
        className={`mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-600 ${
          alignRight ? "md:ml-auto" : ""
        }`}
      >
        <StepIcon name={step.icon} className="h-6 w-6" />
      </span>
      <h3 className="text-2xl text-ink">{step.title}</h3>
      <p className="mt-2 leading-relaxed text-ink-soft">{step.text}</p>
    </div>
  );
}
