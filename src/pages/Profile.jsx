import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { orders, passport } from "../api/client.js";
import { PassportCard } from "./Passport.jsx";

export default function Profile() {
  const { user } = useAuth();
  const [eligible, setEligible] = useState(null);
  const [myPassport, setMyPassport] = useState(null);

  useEffect(() => {
    orders.eligibility(user.token).then((r) => setEligible(r.eligible)).catch(() => {});
    if (user.order?.platformId) {
      passport.lookup(user.order.platformId).then(setMyPassport).catch(() => {});
    }
  }, [user]);

  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <h1 className="text-4xl text-ink">Mening profilim</h1>
      <div className="gold-divider mt-5 w-24" />

      <div className="mt-8 rounded-2xl border border-rose-100 bg-surface/70 p-6">
        <h2 className="text-lg text-ink">OneID ma'lumotlari</h2>
        <div className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
          <Info label="F.I.Sh" value={user.fullName} />
          <Info label="JSHSHIR" value={user.pinfl} />
          <Info label="Tug'ilgan sana" value={user.birthDate} />
          <Info label="Hudud" value={user.region} />
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-rose-100 bg-surface/70 p-6">
        <h2 className="text-lg text-ink">Xarid huquqi</h2>
        {eligible === null ? (
          <p className="mt-2 text-sm text-ink-soft">Tekshirilmoqda...</p>
        ) : eligible ? (
          <div className="mt-3 flex items-center justify-between">
            <p className="text-ink-soft">Sizda <strong className="text-rose-600">yagona</strong> uzuk olish huquqi mavjud.</p>
            <Link to="/catalog" className="btn-primary px-5 py-2 text-sm">
              Uzuk tanlash
            </Link>
          </div>
        ) : (
          <p className="mt-2 text-ink-soft">✓ Siz o'z yagona uzugingizni olgansiz. Sevgingiz abadiy muhrlandi.</p>
        )}
      </div>

      {myPassport && (
        <div className="mt-8">
          <h2 className="text-lg text-ink">Mening sevgi passportim</h2>
          <PassportCard data={myPassport} />
        </div>
      )}
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-xs tracking-wide text-ink-soft uppercase">{label}</p>
      <p className="mt-0.5 font-medium text-ink">{value || "—"}</p>
    </div>
  );
}
