// Parametrlar asosida turli xil uzuk SVG'sini generatsiya qiladi.
// Tashqi rasm kerak emas — har bir uzuk noyob ko'rinadi.

const METALS = {
  gold: { a: "#f0dcb4", b: "#c9a36a", c: "#9a7838" },
  rose: { a: "#f6d2c4", b: "#e0a08a", c: "#b8533a" },
  white: { a: "#f4f4f6", b: "#cfd2da", c: "#9aa0ad" },
  platinum: { a: "#eef0f3", b: "#c2c8d0", c: "#878e99" },
};

const GEMS = {
  diamond: { a: "#ffffff", b: "#dbe7f5", c: "#a9c5e6" },
  pink: { a: "#ffffff", b: "#f8d0dd", c: "#e98aa6" },
  blue: { a: "#ffffff", b: "#c6dcf5", c: "#5b8fd6" },
  emerald: { a: "#ffffff", b: "#bfe8cf", c: "#3fae73" },
  ruby: { a: "#ffffff", b: "#f3bcc0", c: "#d4445a" },
  champagne: { a: "#ffffff", b: "#f3e3c2", c: "#d6b878" },
  purple: { a: "#ffffff", b: "#ddc9f0", c: "#9d6fd1" },
  black: { a: "#9aa0ad", b: "#5a5e68", c: "#26282e" },
};

// Olmos kesimi shakllari
function gemShape(cut, g, id) {
  switch (cut) {
    case "round":
      return (
        <g>
          <circle cx="0" cy="0" r="20" fill={`url(#${id})`} />
          <circle cx="0" cy="0" r="20" fill="none" stroke="#fff" strokeWidth="1" opacity="0.5" />
          <path d="M-20 0 L0 -8 L20 0 L0 8 Z" fill="#fff" opacity="0.25" />
        </g>
      );
    case "emerald":
      return (
        <g>
          <rect x="-15" y="-21" width="30" height="42" rx="3" fill={`url(#${id})`} />
          <rect x="-15" y="-21" width="30" height="42" rx="3" fill="none" stroke="#fff" strokeWidth="1" opacity="0.5" />
          <path d="M-15 -8 L15 -8 M-15 8 L15 8" stroke="#fff" strokeWidth="0.8" opacity="0.4" />
        </g>
      );
    case "oval":
      return (
        <g>
          <ellipse cx="0" cy="0" rx="15" ry="22" fill={`url(#${id})`} />
          <ellipse cx="0" cy="0" rx="15" ry="22" fill="none" stroke="#fff" strokeWidth="1" opacity="0.5" />
          <path d="M-15 0 L0 -10 L15 0 L0 10 Z" fill="#fff" opacity="0.2" />
        </g>
      );
    case "pear":
      return (
        <g>
          <path d="M0 -26 C16 -10 16 8 0 24 C-16 8 -16 -10 0 -26 Z" fill={`url(#${id})`} />
          <path d="M0 -26 C16 -10 16 8 0 24 C-16 8 -16 -10 0 -26 Z" fill="none" stroke="#fff" strokeWidth="1" opacity="0.5" />
        </g>
      );
    case "heart":
      return (
        <g>
          <path d="M0 22 C-22 4 -20 -18 0 -10 C20 -18 22 4 0 22 Z" fill={`url(#${id})`} />
          <path d="M0 22 C-22 4 -20 -18 0 -10 C20 -18 22 4 0 22 Z" fill="none" stroke="#fff" strokeWidth="1" opacity="0.5" />
        </g>
      );
    case "princess":
    default:
      return (
        <g>
          <path d="M0 -24 L24 0 L0 24 L-24 0 Z" fill={`url(#${id})`} />
          <path d="M-24 0 L0 -10 L24 0" fill="none" stroke="#fff" strokeWidth="1" opacity="0.6" />
          <path d="M0 -10 L0 24" stroke="#fff" strokeWidth="0.8" opacity="0.4" />
          <path d="M-24 0 L0 24 L24 0" fill="#fff" opacity="0.12" />
        </g>
      );
  }
}

export default function RingArt({ metal = "gold", gem = "diamond", cut = "princess", className = "" }) {
  const m = METALS[metal] || METALS.gold;
  const g = GEMS[gem] || GEMS.diamond;
  const uid = `${metal}-${gem}-${cut}`;

  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <defs>
        <linearGradient id={`band-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={m.a} />
          <stop offset="0.5" stopColor={m.b} />
          <stop offset="1" stopColor={m.c} />
        </linearGradient>
        <radialGradient id={`gem-${uid}`} cx="0.4" cy="0.3" r="0.8">
          <stop offset="0" stopColor={g.a} />
          <stop offset="0.5" stopColor={g.b} />
          <stop offset="1" stopColor={g.c} />
        </radialGradient>
      </defs>
      <ellipse cx="100" cy="180" rx="46" ry="7" fill={m.c} opacity="0.12" />
      <circle cx="100" cy="120" r="48" fill="none" stroke={`url(#band-${uid})`} strokeWidth="10" />
      <g transform="translate(100 58)">{gemShape(cut, g, `gem-${uid}`)}</g>
    </svg>
  );
}
