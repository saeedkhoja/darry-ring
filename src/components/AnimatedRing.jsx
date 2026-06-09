// Premium jonli uzuk sahnasi: aylanuvchi oltin halqa, suzuvchi uzuk,
// uchquvchi olmoslar (sparkle) va ko'tarilувchi zarrachalar.
const SPARKLES = [
  { top: "6%", left: "20%", size: 18, delay: 0 },
  { top: "14%", left: "82%", size: 14, delay: 0.6 },
  { top: "44%", left: "94%", size: 20, delay: 1.1 },
  { top: "82%", left: "78%", size: 15, delay: 0.3 },
  { top: "88%", left: "26%", size: 18, delay: 0.9 },
  { top: "50%", left: "2%", size: 13, delay: 1.4 },
  { top: "26%", left: "50%", size: 11, delay: 1.8 },
];

const PARTICLES = [
  { left: "15%", dur: 7, delay: 0 },
  { left: "35%", dur: 9, delay: 1.5 },
  { left: "55%", dur: 8, delay: 0.8 },
  { left: "72%", dur: 10, delay: 2.2 },
  { left: "88%", dur: 7.5, delay: 1.1 },
];

function Sparkle({ top, left, size, delay }) {
  return (
    <svg
      className="sparkle"
      style={{ top, left, width: size, height: size, animationDelay: `${delay}s` }}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 0 L14 9 L24 12 L14 15 L12 24 L10 15 L0 12 L10 9 Z" />
    </svg>
  );
}

export default function AnimatedRing() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      {/* Yumshoq nur */}
      <div className="absolute inset-6 -z-10 rounded-full bg-rose-300/30 blur-3xl" />
      <div className="absolute inset-12 -z-10 rounded-full bg-gold/20 blur-2xl animate-floaty" />

      {/* Aylanuvchi oltin halqa (konus gradient) */}
      <div className="absolute inset-0 grid place-items-center">
        <div
          className="h-[88%] w-[88%] animate-spin-slow rounded-full opacity-80"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, var(--c-gold) 70deg, #fff 120deg, var(--c-gold) 160deg, transparent 230deg, transparent 360deg)",
            mask: "radial-gradient(farthest-side, transparent calc(100% - 7px), #000 calc(100% - 6px))",
            WebkitMask:
              "radial-gradient(farthest-side, transparent calc(100% - 7px), #000 calc(100% - 6px))",
          }}
        />
      </div>
      <div className="absolute inset-0 grid place-items-center">
        <div
          className="h-[70%] w-[70%] rounded-full border border-gold/30"
          style={{ animation: "haloPulse 5s ease-in-out infinite" }}
        />
      </div>

      {/* Suzuvchi uzuk (SVG) */}
      <div className="absolute inset-0 grid place-items-center">
        <svg
          viewBox="0 0 200 200"
          className="h-[58%] w-[58%] animate-floaty"
          style={{ filter: "drop-shadow(0 18px 30px rgba(0,0,0,0.22))" }}
          aria-hidden
        >
          <defs>
            <linearGradient id="ar-band" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f4e3b6" />
              <stop offset="0.5" stopColor="#cda85a" />
              <stop offset="1" stopColor="#9c7a32" />
            </linearGradient>
            <radialGradient id="ar-dia" cx="0.4" cy="0.3" r="0.85">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="0.45" stopColor="#e7f3ff" />
              <stop offset="1" stopColor="#9cc2e8" />
            </radialGradient>
          </defs>
          <ellipse cx="100" cy="185" rx="42" ry="6" fill="#000" opacity="0.12" />
          <circle cx="100" cy="122" r="50" fill="none" stroke="url(#ar-band)" strokeWidth="11" />
          <g transform="translate(100 56)">
            <path d="M0 -26 L26 0 L0 28 L-26 0 Z" fill="url(#ar-dia)" />
            <path d="M-26 0 L0 -11 L26 0" fill="none" stroke="#fff" strokeWidth="1.4" opacity="0.85" />
            <path d="M0 -11 L0 28" stroke="#fff" strokeWidth="1" opacity="0.5" />
            <path d="M-26 0 L0 28 L26 0" fill="#fff" opacity="0.14" />
          </g>
        </svg>
      </div>

      {/* Uchquvchi olmoslar */}
      {SPARKLES.map((s, i) => (
        <Sparkle key={i} {...s} />
      ))}

      {/* Ko'tariluvchi zarrachalar */}
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="particle"
          style={{ left: p.left, bottom: "8%", animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s` }}
        />
      ))}
    </div>
  );
}
