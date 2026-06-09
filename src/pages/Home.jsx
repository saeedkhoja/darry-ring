import { Link } from "react-router-dom";
import RingCard from "../components/RingCard.jsx";
import HowItWorks from "../components/HowItWorks.jsx";
import RingShowcase from "../components/RingShowcase.jsx";
import Reveal from "../components/Reveal.jsx";
import {
  IconStar, IconLock, IconTruck, IconInfinity, IconSeal,
  IconShield, IconDiamond, IconPlus,
} from "../components/icons.jsx";
import { RINGS } from "../data/rings.js";

const WHY_ICONS = { infinity: IconInfinity, seal: IconSeal, shield: IconShield, diamond: IconDiamond };

export default function Home() {
  const featured = RINGS.filter((r) => r.bestseller).slice(0, 4);

  return (
    <div>
      {/* ===================== HERO ===================== */}
      <section className="aurora">
        <div className="mx-auto grid max-w-6xl items-center gap-x-10 gap-y-7 px-5 pb-16 pt-12 md:grid-cols-2 md:pb-28 md:pt-20">
          {/* 1) Sarlavha + matn + tugmalar */}
          <div className="md:col-start-1 md:row-start-1 md:self-end">
            <span className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-gold/40 bg-surface/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-rose-600 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              Umrda bir marta
            </span>

            <h1 className="animate-fade-up mt-5 text-5xl leading-[1.05] text-ink sm:text-6xl md:text-7xl" style={{ animationDelay: "0.08s" }}>
              Yagonangizga,
              <br />
              <span className="text-shimmer">faqat bir marta.</span>
            </h1>

            <p className="animate-fade-up mt-5 max-w-sm text-lg leading-relaxed text-ink-soft" style={{ animationDelay: "0.16s" }}>
              Bir umrda <strong className="text-ink">bitta</strong> uzuk. Bitta va'da. Yagonangizga.
            </p>

            {/* Tugmalar — bir qatorda */}
            <div className="animate-fade-up mt-7 flex items-center gap-3" style={{ animationDelay: "0.24s" }}>
              <Link to="/catalog" className="btn-primary flex-1 justify-center whitespace-nowrap px-4 py-3 text-sm sm:flex-none sm:px-8 sm:text-base">
                Uzuklarni ko'rish
              </Link>
              <Link to="/concept" className="btn-ink flex-1 justify-center whitespace-nowrap px-4 py-3 text-sm sm:flex-none sm:px-8 sm:text-base">
                Falsafamiz
              </Link>
            </div>
          </div>

          {/* 2) Aylanayotgan uzuk */}
          <div className="animate-fade-up md:col-start-2 md:row-span-2 md:self-center" style={{ animationDelay: "0.2s" }}>
            <RingShowcase />
          </div>

          {/* 3) Baho · OneID himoyasi · Bepul yetkazib berish */}
          <div className="animate-fade-up flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-soft md:col-start-1 md:row-start-2 md:self-start" style={{ animationDelay: "0.32s" }}>
            <span className="flex items-center gap-1.5">
              <span className="flex text-gold">
                {[0, 1, 2, 3, 4].map((i) => <IconStar key={i} size={14} />)}
              </span>
              4.9 / 5
            </span>
            <span className="flex items-center gap-1.5">
              <IconLock className="h-4 w-4 text-rose-600" /> OneID himoyasi
            </span>
            <span className="flex items-center gap-1.5">
              <IconTruck className="h-4 w-4 text-rose-600" /> Bepul yetkazib berish
            </span>
          </div>
        </div>
      </section>

      {/* ===================== STAT BAND ===================== */}
      <section className="band-dark">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-8 px-5 py-12 md:grid-cols-4">
          {[
            { v: "34+", l: "noyob uzuk modeli" },
            { v: "1 umr", l: "= atigi 1 uzuk" },
            { v: "100%", l: "OneID tasdiqi" },
            { v: "16", l: "viloyatga yetkazib berish" },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 90} className="text-center">
              <p className="text-4xl font-semibold text-onaccent" style={{ fontFamily: "var(--font-serif)" }}>
                {s.v}
              </p>
              <p className="mt-1 text-sm text-onaccent/70">{s.l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===================== FEATURED ===================== */}
      <section className="section-tint">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <Reveal className="flex items-end justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-600">Tanlangan modellar</span>
              <h2 className="mt-2 text-3xl text-ink sm:text-4xl md:text-5xl">Mashhur uzuklar</h2>
            </div>
            <Link to="/catalog" className="hidden text-sm font-medium text-rose-600 hover:underline sm:block">
              Barcha 34 ta modelni ko'rish →
            </Link>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {featured.map((r, i) => (
              <Reveal key={r.id} delay={i * 80}>
                <RingCard ring={r} />
              </Reveal>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link to="/catalog" className="btn-ink">Barcha uzuklarni ko'rish</Link>
          </div>
        </div>
      </section>

      {/* ===================== WHY YAGONA (dark luxury) ===================== */}
      <section className="band-dark">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <Reveal className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-soft">Nega Yagona</span>
            <h2 className="mt-3 text-3xl text-onaccent sm:text-4xl md:text-5xl">Lyuks emas — abadiy ma'no</h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { i: "infinity", t: "Umrlik eksklyuzivlik", d: "Bir shaxs — bir uzuk." },
              { i: "seal", t: "Raqamli passport", d: "Har uzukka noyob platformId." },
              { i: "shield", t: "OneID ishonchi", d: "Faqat rasmiy ro'yxatdan o'tish." },
              { i: "diamond", t: "Sertifikatlangan olmoslar", d: "Xalqaro sifat kafolati." },
            ].map((c, idx) => {
              const Ic = WHY_ICONS[c.i];
              return (
                <Reveal key={idx} delay={idx * 90}>
                  <div className="glass h-full p-6">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-gold-soft">
                      <Ic className="h-6 w-6" />
                    </span>
                    <h3 className="mt-4 text-xl text-onaccent">{c.t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-onaccent/75">{c.d}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== HOW IT WORKS ===================== */}
      <HowItWorks />

      {/* ===================== TESTIMONIALS ===================== */}
      <section className="section-tint">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <Reveal className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-600">Mijozlarimiz</span>
            <h2 className="mt-3 text-3xl text-ink sm:text-4xl md:text-5xl">Sevgi tarixlari</h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              { q: "Passportdagi ismimizni ko'rib, ko'zimga yosh keldi.", n: "Sardor & Malika", c: "Toshkent" },
              { q: "«Umrda bir marta» — tanlovim qadrli ekanini his qildim.", n: "Jasur & Nigora", c: "Samarqand" },
              { q: "OneID orqali hammasi 2 daqiqada bo'ldi.", n: "Aziz & Dilnoza", c: "Buxoro" },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 100}>
                <figure className="card flex h-full flex-col p-7">
                  <div className="text-3xl leading-none text-gold" style={{ fontFamily: "var(--font-serif)" }}>"</div>
                  <blockquote className="mt-2 flex-1 text-lg leading-relaxed text-ink" style={{ fontFamily: "var(--font-serif)" }}>
                    {t.q}
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-600 text-sm font-semibold text-onaccent">
                      {t.n.charAt(0)}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ink">{t.n}</p>
                      <p className="text-xs text-ink-soft">{t.c}</p>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <section className="mx-auto max-w-3xl px-5 py-20">
        <Reveal className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-600">Savol-javob</span>
          <h2 className="mt-3 text-3xl text-ink sm:text-4xl md:text-5xl">Ko'p so'raladigan savollar</h2>
        </Reveal>
        <div className="mt-10 space-y-3">
          {[
            { q: "Nega faqat bir marta?", a: "Har bir OneID egasi umrida bitta uzuk oladi — bu va'dangiz qadrini oshiradi." },
            { q: "Qanday ro'yxatdan o'tiladi?", a: "Faqat rasmiy OneID orqali — xavfsiz va ishonchli." },
            { q: "platformId nima?", a: "Uzukingizning raqamli passporti — istalgan vaqtda tekshiriladi." },
            { q: "Olmoslar sertifikatlanganmi?", a: "Ha, xalqaro 4C standarti bo'yicha." },
            { q: "Yetkazib berish?", a: "16 viloyatga bepul, 1–4 ish kunida." },
            { q: "To'lov?", a: "UZCARD/Humo, o'tkazma yoki bo'lib-bo'lib." },
          ].map((f, i) => (
            <Reveal key={i} delay={i * 50}>
              <details className="card group p-0">
                <summary className="flex items-center justify-between gap-4 p-5">
                  <span className="text-base font-medium text-ink">{f.q}</span>
                  <span className="faq-chev grid h-6 w-6 shrink-0 place-items-center rounded-full bg-rose-50 text-rose-600 transition-transform">
                    <IconPlus size={13} />
                  </span>
                </summary>
                <p className="px-5 pb-5 leading-relaxed text-ink-soft">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="mx-auto max-w-5xl px-5 pb-16">
        <Reveal>
          <div className="band-dark relative overflow-hidden rounded-[2rem] px-8 py-16 text-center">
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gold/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-rose-500/30 blur-3xl" />
            <h2 className="relative text-3xl text-onaccent sm:text-4xl md:text-5xl">Sevgingiz yagona. Uzugingiz ham.</h2>
            <p className="relative mx-auto mt-4 max-w-md text-onaccent/80">
              Bugun boshlang — yagonangizga.
            </p>
            <Link to="/login" className="btn-gold relative mt-8">
              OneID bilan boshlash
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
