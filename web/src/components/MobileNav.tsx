import { NavLink } from "react-router-dom";
import {
  Grid3X3,
  Heart,
  Home,
  MessageCircle,
  Search,
  ShoppingCart,
} from "lucide-react";
import { brand } from "@/data/content";
import { useShop } from "@/context/ShopContext";

const items = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/search", label: "Search", icon: Search },
  { to: "/numbers", label: "Browse", icon: Grid3X3 },
  { to: "/cart", label: "Cart", icon: ShoppingCart },
  { to: "/favorites", label: "Saved", icon: Heart },
];

export function MobileNav() {
  const { cart, favorites } = useShop();

  return (
    <>
      <a
        href={brand.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-4 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg shadow-black/40 md:bottom-8"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>

      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-bg/95 backdrop-blur-md md:hidden"
        aria-label="Mobile shortcuts"
      >
        <ul className="mx-auto flex max-w-lg items-stretch justify-around px-2 pb-[env(safe-area-inset-bottom)]">
          {items.map(({ to, label, icon: Icon, end }) => (
            <li key={to} className="flex-1">
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  `relative flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px] ${
                    isActive ? "text-gold" : "text-muted"
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
                {to === "/favorites" && favorites.length > 0 && (
                  <span className="absolute right-[calc(50%-18px)] top-1.5 h-1.5 w-1.5 rounded-full bg-gold" />
                )}
                {to === "/cart" && cart.length > 0 && (
                  <span className="absolute right-[calc(50%-18px)] top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[9px] font-bold text-black">
                    {cart.length}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
