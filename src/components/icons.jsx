// Yagona — premium nafis chiziqli ikonalar to'plami.
// Barchasi currentColor, 1.5 stroke, dumaloq uchlar — yagona vizual til.

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

function svg(size, children, extra = {}) {
  return (
    <svg width={size} height={size} {...base} {...extra}>
      {children}
    </svg>
  );
}

// OneID — shaxsiy guvohnoma kartasi
export function IconId({ size = 24, className = "" }) {
  return svg(
    size,
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="2.5" />
      <circle cx="8" cy="11" r="2.1" />
      <path d="M4.8 16c.4-1.6 1.7-2.4 3.2-2.4s2.8.8 3.2 2.4" />
      <path d="M14 10h4.5M14 13h4.5" />
    </>,
    { className }
  );
}

// Uzuk — olmosli halqa
export function IconRing({ size = 24, className = "" }) {
  return svg(
    size,
    <>
      <circle cx="12" cy="15.2" r="5.3" />
      <path d="M8.6 7.6 12 3.4l3.4 4.2" />
      <path d="M8.6 7.6 12 10.6l3.4-3" />
      <path d="M8.6 7.6h6.8" />
    </>,
    { className }
  );
}

// Cheksizlik — umrda bir marta / abadiy
export function IconInfinity({ size = 24, className = "" }) {
  return svg(
    size,
    <path d="M7 12c0-2 1.4-3 3-3s2.5 1.3 3.2 2.4c.8 1.2 1.6 2.6 3.3 2.6 1.6 0 2.5-1.3 2.5-3s-.9-3-2.5-3c-1.7 0-2.5 1.4-3.3 2.6C12.5 14.7 11.6 16 10 16s-3-1-3-4Z" />,
    { className }
  );
}

// Sertifikat / passport muhri
export function IconSeal({ size = 24, className = "" }) {
  return svg(
    size,
    <>
      <circle cx="12" cy="8.5" r="5" />
      <path d="m12 6 .9 1.9 2 .3-1.5 1.4.4 2-1.8-1-1.8 1 .4-2L9.1 8.2l2-.3L12 6Z" />
      <path d="M9 13.5 7.8 20.5 12 18l4.2 2.5L15 13.5" />
    </>,
    { className }
  );
}

// Sertifikatlangan olmos
export function IconDiamond({ size = 24, className = "" }) {
  return svg(
    size,
    <>
      <path d="M5 9.2h14L12 20 5 9.2Z" />
      <path d="M8 4.5h8L19 9.2H5L8 4.5Z" />
      <path d="M8 4.5 9.8 9.2 12 20l2.2-10.8L16 4.5" />
    </>,
    { className }
  );
}

// Qalqon + tasdiq — ishonch / himoya
export function IconShield({ size = 24, className = "" }) {
  return svg(
    size,
    <>
      <path d="M12 3 4.5 6v5.2c0 4.8 3.2 7.7 7.5 9 4.3-1.3 7.5-4.2 7.5-9V6L12 3Z" />
      <path d="m9 11.8 2 2 4-4.2" />
    </>,
    { className }
  );
}

// Qulf — xavfsizlik
export function IconLock({ size = 24, className = "" }) {
  return svg(
    size,
    <>
      <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
      <circle cx="12" cy="15" r="1" />
    </>,
    { className }
  );
}

// Yetkazib berish
export function IconTruck({ size = 24, className = "" }) {
  return svg(
    size,
    <>
      <path d="M2.5 6.5h11v9.5h-11z" />
      <path d="M13.5 10h3.6l3.4 3.3V16h-7z" />
      <circle cx="6.5" cy="18" r="1.7" />
      <circle cx="17.5" cy="18" r="1.7" />
    </>,
    { className }
  );
}

// Yulduz — baho (to'ldirilgan)
export function IconStar({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.5l2.7 5.9 6.3.6-4.8 4.2 1.5 6.3L12 16.9 6.3 19.5l1.5-6.3L3 9l6.3-.6L12 2.5Z" />
    </svg>
  );
}

// Plus — FAQ (45° aylanib × bo'ladi)
export function IconPlus({ size = 16, className = "" }) {
  return svg(size, <><path d="M12 5v14M5 12h14" /></>, { className });
}

// Qidiruv
export function IconSearch({ size = 18, className = "" }) {
  return svg(
    size,
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16.5 16.5 4 4" />
    </>,
    { className }
  );
}

// Sovg'a — erta kirish offeri
export function IconGift({ size = 24, className = "" }) {
  return svg(
    size,
    <>
      <rect x="3.5" y="9" width="17" height="11.5" rx="1.5" />
      <path d="M3.5 13h17M12 9v11.5" />
      <path d="M12 9S10.5 4.5 8 4.5 5.5 8 8 8.5C9.6 8.9 12 9 12 9Zm0 0s1.5-4.5 4-4.5 2.5 3.5 0 4C14.4 8.9 12 9 12 9Z" />
    </>,
    { className }
  );
}

// Uchqun — bayram / muvaffaqiyat
export function IconSparkle({ size = 24, className = "" }) {
  return svg(
    size,
    <>
      <path d="M12 3c.6 3.7 2.3 5.4 6 6-3.7.6-5.4 2.3-6 6-.6-3.7-2.3-5.4-6-6 3.7-.6 5.4-2.3 6-6Z" />
      <path d="M18.5 14.5c.3 1.5 1 2.2 2.5 2.5-1.5.3-2.2 1-2.5 2.5-.3-1.5-1-2.2-2.5-2.5 1.5-.3 2.2-1 2.5-2.5Z" />
    </>,
    { className }
  );
}

// Ogohlantirish / ma'lumot
export function IconInfo({ size = 20, className = "" }) {
  return svg(
    size,
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8h.01M11 12h1v4h1" />
    </>,
    { className }
  );
}

export function IconArrowRight({ size = 18, className = "" }) {
  return svg(size, <><path d="M4 12h15M13 6l6 6-6 6" /></>, { className });
}
