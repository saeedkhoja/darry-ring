import { useState } from "react";

// Haqiqiy 3D uzuk — Sketchfab orqali avtomatik aylanib turadi.
// Premium ko'rinish uchun yumshoq nur va oltin ambiyent bilan o'raladi.
const EMBED =
  "https://sketchfab.com/models/76c5820088d34eae934a23d043d1fec3/embed" +
  "?autostart=1&autospin=0.4&preload=1&transparent=1&dnt=1&scrollwheel=0" +
  "&ui_infos=0&ui_controls=0&ui_stop=0&ui_inspector=0&ui_watermark=0" +
  "&ui_watermark_link=0&ui_ar=0&ui_help=0&ui_settings=0&ui_vr=0&ui_annotations=0&ui_fullscreen=0";

export default function RingShowcase() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[17rem] sm:max-w-sm md:max-w-md">
      {/* Yumshoq premium nur */}
      <div className="absolute inset-8 -z-10 rounded-full bg-rose-300/35 blur-3xl" />
      <div className="absolute inset-16 -z-10 rounded-full bg-gold/25 blur-2xl" />

      {/* Aylanuvchi nozik oltin halqa (ramka) */}
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div
          className="h-[96%] w-[96%] animate-spin-slow rounded-full opacity-70"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, var(--c-gold) 60deg, #fff 110deg, var(--c-gold) 150deg, transparent 220deg, transparent 360deg)",
            mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))",
            WebkitMask:
              "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))",
          }}
        />
      </div>

      {/* Yuklanish holati */}
      {!loaded && (
        <div className="absolute inset-0 grid place-items-center">
          <div className="h-16 w-16 animate-spin-slow rounded-full border-2 border-gold/30 border-t-gold" />
        </div>
      )}

      {/* 3D uzuk */}
      <iframe
        title="Yagona — 3D uzuk"
        src={EMBED}
        onLoad={() => setLoaded(true)}
        loading="lazy"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        allowFullScreen
        className={`absolute inset-[6%] h-[88%] w-[88%] rounded-full border-0 transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ background: "transparent" }}
      />
    </div>
  );
}
