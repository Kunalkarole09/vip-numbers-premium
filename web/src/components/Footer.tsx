import { Link } from "react-router-dom";
import { MapPin, Mail, Phone } from "lucide-react";
import { brand } from "@/data/content";
import { categories } from "@/data/categories";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/5 bg-black">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <img src="/logo.png" alt="" className="h-12 w-12 object-contain" />
            <div>
              <p className="font-semibold tracking-wide">VIP NUMBERS CLUB</p>
              <p className="text-[11px] uppercase tracking-[0.14em] text-gold">
                {brand.tagline}
              </p>
            </div>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            {brand.footerBlurb}
          </p>
          <ul className="mt-5 space-y-3 text-sm text-muted">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{brand.address}</span>
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <a href={`mailto:${brand.email}`} className="hover:text-gold">
                {brand.email}
              </a>
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <a href={`tel:+${brand.phoneE164}`} className="hover:text-gold">
                {brand.phoneDisplay}
              </a>
            </li>
            <li className="text-xs">GST: {brand.gst}</li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
            Quick links
          </h2>
          <ul className="space-y-2 text-sm text-muted">
            {[
              ["About Us", "/about"],
              ["Services", "/services"],
              ["Process", "/process"],
              ["Home Delivery", "/home-delivery"],
              ["Reseller", "/reseller"],
              ["FAQ", "/faq"],
              ["Contact", "/contact"],
            ].map(([label, to]) => (
              <li key={to}>
                <Link to={to} className="hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
            Collections
          </h2>
          <ul className="space-y-2 text-sm text-muted">
            {categories.slice(0, 8).map((c) => (
              <li key={c.slug}>
                <Link
                  to={`/numbers?category=${c.slug}`}
                  className="hover:text-white"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
            Policies
          </h2>
          <ul className="space-y-2 text-sm text-muted">
            <li>
              <Link to="/legal/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/legal/terms" className="hover:text-white">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/legal/refund" className="hover:text-white">
                Refund Policy
              </Link>
            </li>
          </ul>
          <p className="mt-6 text-xs leading-relaxed text-muted">
            Catalogue on this site is a verified public snapshot from{" "}
            <a
              href={brand.referenceSite}
              className="text-gold hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              vipnumbersclub.com
            </a>
            . Live checkout remains on their VIP Portal.
          </p>
        </div>
      </div>

      <div className="border-t border-white/5 px-4 py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} VIP Numbers Club. All rights reserved.
      </div>
    </footer>
  );
}
