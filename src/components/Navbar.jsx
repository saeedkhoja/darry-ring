import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "./Logo.jsx";
import ThemeToggle from "./ThemeToggle.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const links = [
  { to: "/catalog", label: "Katalog" },
  { to: "/concept", label: "Falsafa" },
  { to: "/passport", label: "Passport tekshirish" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-rose-100/70 bg-cream/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <Link to="/" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm transition-colors hover:text-rose-600 ${
                  isActive ? "text-rose-600" : "text-ink-soft"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/profile" className="text-sm text-ink hover:text-rose-600">
                Profil
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="text-sm text-ink-soft hover:text-rose-600"
              >
                Chiqish
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-onyx px-5 py-2 text-sm text-onaccent transition-transform hover:scale-[1.03]"
            >
              OneID bilan kirish
            </Link>
          )}
          <ThemeToggle />
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menyu"
          >
          <span className={`h-0.5 w-6 bg-ink transition ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-ink transition ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-6 bg-ink transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-rose-100 bg-cream px-5 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `text-base ${isActive ? "text-rose-600" : "text-ink"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <div className="gold-divider my-1" />
            {user ? (
              <>
                <Link to="/profile" onClick={() => setOpen(false)} className="text-base text-ink">
                  Profil
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                    navigate("/");
                  }}
                  className="text-left text-base text-ink-soft"
                >
                  Chiqish
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="rounded-full bg-onyx px-5 py-2.5 text-center text-base text-onaccent"
              >
                OneID bilan kirish
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
