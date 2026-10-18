import { useState, type FormEvent } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Heart,
  Menu,
  Search,
  ShoppingCart,
  X,
  Phone,
  ArrowUpRight,
} from "lucide-react";
import { brand } from "@/data/content";
import { useShop } from "@/context/ShopContext";

const nav = [
  { to: "/numbers", label: "Browse" },
  { to: "/search", label: "Search" },
  { to: "/numbers?category=vvip", label: "VVIP" },
  { to: "/about", label: "About" },
  { to: "/process", label: "Process" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const { cart, favorites } = useShop();

  function onSearch(e: FormEvent) {
    e.preventDefault();
    const digits = q.replace(/\D/g, "");
    navigate(digits ? `/search?q=${encodeURIComponent(digits)}` : "/search");
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-bg/90 backdrop-blur-md">
      <div className="hidden border-b border-gold/10 bg-black/60 sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-[11px] uppercase tracking-[0.12em] text-muted sm:px-6">
          <p>
            <span className="text-gold">VIP Numbers Club</span>
            {" · "}Jaipur-based, pan-India service
          </p>
          <div className="flex items-center gap-4">
            <Link to="/home-delivery" className="transition hover:text-gold">
              Home delivery
            </Link>
            <Link to="/process" className="transition hover:text-gold">
              Activation process
            </Link>
            <a
              href={brand.referenceSite}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-gold transition hover:text-gold-bright"
            >
              Official site <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-gold lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <Link to="/" className="flex min-w-0 items-center gap-3">
          <img
            src="/logo.png"
            alt="VIP Numbers Club logo"
            className="h-10 w-10 shrink-0 object-contain"
            width={40}
            height={40}
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-wide text-white sm:text-base">
              VIP NUMBERS CLUB
            </p>
            <p className="hidden truncate text-[10px] uppercase tracking-[0.14em] text-gold sm:block">
              {brand.tagline}
            </p>
          </div>
        </Link>

        <nav className="ml-4 hidden items-center gap-1 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-3 py-2 text-sm transition ${
                  isActive
                    ? "bg-gold/15 text-gold"
                    : "text-muted hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <form
          onSubmit={onSearch}
          className="ml-auto hidden max-w-xs flex-1 md:flex"
          role="search"
        >
          <label htmlFor="header-search" className="sr-only">
            Search VIP numbers
          </label>
          <div className="relative w-full">
            <input
              id="header-search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search digits…"
              inputMode="numeric"
              className="h-11 w-full rounded-full border border-white/10 bg-bg-elevated py-2 pl-4 pr-11 text-sm text-white placeholder:text-muted focus:border-gold/50"
            />
            <button
              type="submit"
              className="absolute right-1 top-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-gold text-black"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>
        </form>

        <div className="ml-auto flex items-center gap-1 md:ml-2">
          <a
            href={`tel:+${brand.phoneE164}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-gold"
            aria-label="Call VIP Numbers Club"
          >
            <Phone className="h-4 w-4" />
          </a>
          <Link
            to="/favorites"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-muted hover:text-gold"
            aria-label={`Favorites, ${favorites.length} items`}
          >
            <Heart className="h-4 w-4" />
            {favorites.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-black">
                {favorites.length}
              </span>
            )}
          </Link>
          <Link
            to="/cart"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-muted hover:text-gold"
            aria-label={`Cart, ${cart.length} items`}
          >
            <ShoppingCart className="h-4 w-4" />
            {cart.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-black">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/5 bg-bg px-4 py-4 lg:hidden">
          <form onSubmit={onSearch} className="mb-4" role="search">
            <label htmlFor="mobile-search" className="sr-only">
              Search VIP numbers
            </label>
            <div className="relative">
              <input
                id="mobile-search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search your number"
                inputMode="numeric"
                className="h-12 w-full rounded-full border border-gold/30 bg-white py-2 pl-4 pr-12 text-sm text-black placeholder:text-neutral-500"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black text-gold"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-base text-white hover:bg-white/5"
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
              to="/services"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-base text-white hover:bg-white/5"
            >
              Services
            </NavLink>
            <NavLink
              to="/faq"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-base text-white hover:bg-white/5"
            >
              FAQ
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
}
