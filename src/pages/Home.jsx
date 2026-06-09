import { Link } from "react-router-dom";
import RingCard from "../components/RingCard.jsx";
import HowItWorks from "../components/HowItWorks.jsx";
import { RINGS, ringImage } from "../data/rings.js";

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-rose-50 via-cream to-cream" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
          <div className="animate-fade-up">
            <span className="inline-block rounded-full border border-gold/40 bg-white/60 px-4 py-1.5 text-xs tracking-[0.2em] text-rose-600 uppercase">
              Umrda bir marta
            </span>
            <h1 className="mt-6 text-4xl leading-[1.1] text-ink sm:text-5xl md:text-6xl">
              Yagonangizga,
              <br />
              <span className="text-shimmer">faqat bir marta.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
              Yagona — har bir insonga umri davomida atigi bitta uzuk taqdim etadi.
              Chunki haqiqiy sevgi ham yagona bo'ladi. OneID orqali ro'yxatdan o'ting
              va o'z va'dangizni abadiy muhrlang.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link to="/catalog" className="btn-primary">
                Uzuklarni ko'rish
              </Link>
              <Link
                to="/concept"
                className="rounded-full border border-ink/15 px-7 py-3 text-ink transition-colors hover:border-rose-400 hover:text-rose-600"
              >
                Falsafamiz bilan tanishish
              </Link>
            </div>
            <p className="mt-6 text-sm text-ink-soft">
              🔒 Faqat <strong className="text-ink">OneID</strong> orqali ro'yxatdan o'tish — ishonchli va rasmiy.
            </p>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-rose-200/40 blur-2xl" />
            <img
              src={ringImage("photo-1605100804763-247f67b3557e", 800)}
              alt="Yagona uzuk"
              className="aspect-[4/5] w-full rounded-[1.75rem] object-cover shadow-2xl shadow-rose-900/20 ring-1 ring-rose-100"
            />
            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl bg-white px-5 py-3 shadow-xl ring-1 ring-rose-100 sm:block">
              <p className="text-xs text-ink-soft">Umrda</p>
              <p className="text-lg font-bold text-rose-600">bir marta</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROMISE STRIP */}
      <section className="border-y border-rose-100 bg-white/50">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-3">
          {[
            { n: "01", t: "Bir hisob — bir uzuk", d: "OneID bilan tasdiqlangan har bir shaxs umrida faqat bitta uzuk sotib oladi." },
            { n: "02", t: "Abadiy yozuv", d: "Har bir uzukka noyob platformId va raqamli sevgi passporti beriladi." },
            { n: "03", t: "O'zbekiston uchun", d: "Mahalliy bozor, mahalliy qadriyatlar va OneID integratsiyasi bilan." },
          ].map((c) => (
            <div key={c.n}>
              <span className="text-sm font-semibold text-gold">{c.n}</span>
              <h3 className="mt-2 text-xl text-ink">{c.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED RINGS */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-600">Tanlangan modellar</span>
            <h2 className="mt-2 text-3xl text-ink sm:text-4xl">Mashhur uzuklar</h2>
          </div>
          <Link to="/catalog" className="hidden text-sm text-rose-600 hover:underline sm:block">
            Barchasini ko'rish →
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {RINGS.filter((r) => r.bestseller).slice(0, 4).map((r) => (
            <RingCard key={r.id} ring={r} />
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Link to="/catalog" className="btn-ink">Barcha uzuklarni ko'rish</Link>
        </div>
      </section>

      {/* HOW IT WORKS — snake timeline */}
      <HowItWorks />

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-5 pb-8">
        <div className="rounded-3xl bg-gradient-to-br from-ink to-rose-700 px-8 py-14 text-center text-cream">
          <h2 className="text-3xl sm:text-4xl">Sevgingiz yagona. Uzugingiz ham.</h2>
          <p className="mx-auto mt-4 max-w-xl text-cream/80">
            Bugun ro'yxatdan o'ting va umringizdagi yagona uzukni yagonangizga taqdim eting.
          </p>
          <Link
            to="/login"
            className="mt-8 inline-block rounded-full bg-cream px-8 py-3 font-medium text-ink transition-transform hover:scale-[1.03]"
          >
            OneID bilan boshlash
          </Link>
        </div>
      </section>
    </div>
  );
}
