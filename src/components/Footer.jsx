import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-rose-100 bg-rose-50/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 md:grid-cols-4">
        <div className="sm:col-span-2 md:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
            Umrda bir marta, yagonangizga. O'zbekiston uchun haqiqiy sevgi uzugi platformasi.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-ink">Platforma</h4>
          <ul className="space-y-2 text-sm text-ink-soft">
            <li><Link to="/catalog" className="hover:text-rose-600">Katalog</Link></li>
            <li><Link to="/concept" className="hover:text-rose-600">Falsafa</Link></li>
            <li><Link to="/passport" className="hover:text-rose-600">Passport tekshirish</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-ink">Hisob</h4>
          <ul className="space-y-2 text-sm text-ink-soft">
            <li><Link to="/login" className="hover:text-rose-600">OneID bilan kirish</Link></li>
            <li><Link to="/profile" className="hover:text-rose-600">Mening profilim</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-ink">Aloqa</h4>
          <ul className="space-y-2 text-sm text-ink-soft">
            <li>Toshkent sh., O'zbekiston</li>
            <li>info@yagona.uz</li>
            <li>+998 (78) 000-00-00</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-rose-100 py-5 text-center text-xs text-ink-soft">
        © {new Date().getFullYear()} Yagona. Barcha huquqlar himoyalangan. · OneID bilan ishonchli.
      </div>
    </footer>
  );
}
