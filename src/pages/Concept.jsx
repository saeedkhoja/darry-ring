export default function Concept() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <span className="text-xs tracking-[0.25em] text-rose-600 uppercase">Falsafa</span>
      <h1 className="mt-3 text-4xl text-ink sm:text-5xl">Yagona bo'lish san'ati</h1>
      <div className="gold-divider mt-6 w-24" />

      <p className="mt-8 text-lg leading-relaxed text-ink-soft">
        Yagona — bu shunchaki zargarlik do'koni emas. Bu — va'da. Biz ishonamizki,
        haqiqiy sevgi insonning butun umrida bir marta uchraydi. Shu sababli biz har
        bir foydalanuvchiga umri davomida <strong className="text-ink">faqat bitta</strong> uzuk
        sotib olish huquqini beramiz.
      </p>

      <div className="mt-12 space-y-8">
        {[
          {
            t: "Bir hisob, bir umr, bir uzuk",
            d: "OneID orqali tasdiqlangan har bir shaxs faqat bir marta xarid qila oladi. Bu cheklov emas — bu sizning va'dangizning qadrini oshiradi.",
          },
          {
            t: "Raqamli sevgi passporti",
            d: "Har bir uzuk bilan birga biz noyob platformId va siz va yagonangiz ismi yozilgan raqamli passport beramiz. Bu yozuv abadiy saqlanadi.",
          },
          {
            t: "OneID — ishonch kafolati",
            d: "Faqat OneID orqali ro'yxatdan o'tish bir kishining ko'p hisob ochishining oldini oladi va platformaning halolligini ta'minlaydi.",
          },
          {
            t: "O'zbekiston uchun yaratilgan",
            d: "Bizning qadriyatlarimiz, tilimiz va rasmiy raqamli identifikatsiya tizimimiz asosida — mahalliy bozor uchun maxsus.",
          },
        ].map((b, i) => (
          <div key={i} className="flex gap-5">
            <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-50 text-sm font-semibold text-rose-600">
              {i + 1}
            </div>
            <div>
              <h3 className="text-xl text-ink">{b.t}</h3>
              <p className="mt-1.5 leading-relaxed text-ink-soft">{b.d}</p>
            </div>
          </div>
        ))}
      </div>

      <blockquote className="mt-14 rounded-2xl border-l-4 border-gold bg-rose-50/50 p-8">
        <p className="text-2xl leading-snug text-ink" style={{ fontFamily: "var(--font-serif)" }}>
          "Butun hayotimda men faqat senga bir marta uzuk taqdim etaman."
        </p>
        <p className="mt-3 text-sm text-ink-soft">— Yagona va'dasi</p>
      </blockquote>
    </div>
  );
}
