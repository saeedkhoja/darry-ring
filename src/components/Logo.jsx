// Yagona brand logo — generatsiya qilingan SVG (uzuk + olmos)
export default function Logo({ size = 36, withText = true, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden>
        <defs>
          <linearGradient id="yg-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#e7d3ad" />
            <stop offset="1" stopColor="#c9a36a" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="39" r="17" fill="none" stroke="url(#yg-gold)" strokeWidth="3.5" />
        <path d="M32 23 L25 12 L39 12 Z" fill="url(#yg-gold)" />
        <path d="M25 12 L32 18.5 L39 12" fill="none" stroke="#9a4231" strokeWidth="1.3" />
        <path d="M25 12 L32 12 M39 12 L32 12" stroke="#fff" strokeWidth="0.6" opacity="0.5" />
      </svg>
      {withText && (
        <span className="flex flex-col leading-none">
          <span
            className="text-[1.35rem] font-semibold tracking-wide"
            style={{ fontFamily: "var(--font-serif)", color: "var(--color-ink)" }}
          >
            Yagona
          </span>
          <span className="text-[0.55rem] tracking-[0.35em] uppercase text-rose-500/80">
            true love
          </span>
        </span>
      )}
    </span>
  );
}
