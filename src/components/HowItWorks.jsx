import { Link } from "react-router-dom";

const STEPS = [
  {
    n: "01",
    icon: "🪪",
    title: "OneID bilan ro'yxatdan o'ting",
    text: "Rasmiy OneID hisobingiz orqali tizimga kirasiz. Bir shaxs — bitta hisob. Bu sizning shaxsingizni tasdiqlaydi va platformani halol saqlaydi.",
    tone: "soft",
  },
  {
    n: "02",
    icon: "💍",
    title: "Yagona uzukni tanlang",
    text: "34 ta noyob model orasidan yuragingizga eng yaqinini tanlaysiz. Shoshilmang — bu tanlov umringizda bir marta bo'ladi.",
    tone: "soft",
  },
  {
    n: "03",
    icon: "♾️",
    title: "Umrda bir marta sotib olasiz",
    text: "Xaridingiz tasdiqlangan lahzadan boshlab hisobingiz abadiy «band» bo'ladi. Siz boshqa hech qachon — umringizning oxirigacha — ikkinchi uzuk sotib ololmaysiz. Aynan shu narsa sizning va'dangizni betakror qiladi.",
    tone: "highlight",
  },
  {
    n: "04",
    icon: "📜",
    title: "Uzukingizga passport beramiz",
    text: "Yakunida biz sizning uzugingizga rasmiy raqamli passport — noyob platformId beramiz. Unda siz va yagonangizning ismi, sevgi izhoringiz va sana abadiy muhrlanadi.",
    tone: "passport",
  },
];

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
            Sayohatni boshlash →
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
      <div className="rounded-2xl bg-gradient-to-br from-rose-700 to-ink p-7 text-cream shadow-2xl shadow-rose-900/30">
        <div className={`mb-3 flex items-center gap-3 ${alignRight ? "md:flex-row-reverse" : ""}`}>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-2xl">
            {step.icon}
          </span>
          <span className="chip bg-gold text-ink">Eng muhim qadam</span>
        </div>
        <h3 className="text-2xl text-cream">{step.title}</h3>
        <p className="mt-2 leading-relaxed text-cream/85">{step.text}</p>
        <p className={`mt-4 text-sm font-semibold text-gold-soft ${alignRight ? "md:text-right" : ""}`}>
          ⚠️ Boshqa hech qachon — bu chinakam yagona.
        </p>
      </div>
    );
  }

  if (step.tone === "passport") {
    return (
      <div className="overflow-hidden rounded-2xl border border-gold/40 bg-white shadow-lg">
        <div className={`flex items-center gap-3 bg-gradient-to-r from-ink to-rose-700 px-6 py-4 text-cream ${alignRight ? "md:flex-row-reverse md:text-right" : ""}`}>
          <span className="text-2xl">{step.icon}</span>
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
    <div className="rounded-2xl border border-rose-100 bg-white p-7 shadow-sm">
      <span
        className={`mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-2xl ${
          alignRight ? "md:ml-auto" : ""
        }`}
      >
        {step.icon}
      </span>
      <h3 className="text-2xl text-ink">{step.title}</h3>
      <p className="mt-2 leading-relaxed text-ink-soft">{step.text}</p>
    </div>
  );
}
