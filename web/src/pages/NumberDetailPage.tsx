import { Link, useParams } from "react-router-dom";
import { ExternalLink, Heart, MessageCircle, ShoppingCart } from "lucide-react";
import { getNumberById, numbers } from "@/data/numbers";
import { NumberDigits } from "@/components/NumberDigits";
import { NumberGrid } from "@/components/NumberGrid";
import { discountPercent, formatINR } from "@/lib/format";
import { enquireUrl, referenceSearchUrl } from "@/lib/whatsapp";
import { useShop } from "@/context/ShopContext";
import { brand } from "@/data/content";

export function NumberDetailPage() {
  const { id = "" } = useParams();
  const item = getNumberById(id);
  const { addToCart, isInCart, toggleFavorite, isFavorite } = useShop();

  if (!item) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold">Number not found</h1>
        <p className="mt-2 text-muted">
          This number is not in the verified snapshot inventory.
        </p>
        <Link to="/numbers" className="mt-6 inline-block text-gold hover:underline">
          Browse numbers
        </Link>
      </div>
    );
  }

  const discount = discountPercent(item.mrp, item.price);
  const related = numbers
    .filter((n) => n.category === item.category && n.id !== item.id)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-muted" aria-label="Breadcrumb">
        <Link to="/numbers" className="hover:text-gold">
          Browse
        </Link>
        <span className="mx-2">/</span>
        <span className="text-white">{item.number}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[1.75rem] border border-gold/30 bg-bg-card p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.18em] text-gold">
            {item.section}
          </p>
          <div className="mt-4">
            <NumberDigits item={item} className="text-3xl sm:text-4xl" />
          </div>

          <div className="mt-6 flex flex-wrap items-end gap-4">
            <div>
              {item.mrp != null && item.mrp > item.price && (
                <p className="text-muted line-through">{formatINR(item.mrp)}</p>
              )}
              <p className="text-3xl font-semibold text-gold">
                {formatINR(item.price)}
              </p>
              {discount != null && (
                <p className="text-sm text-muted">{discount}% off listed MRP</p>
              )}
            </div>
            <dl className="flex gap-6 text-sm text-muted">
              <div>
                <dt>Sum</dt>
                <dd className="text-lg font-semibold text-white">{item.sum}</dd>
              </div>
              <div>
                <dt>Total</dt>
                <dd className="text-lg font-semibold text-white">{item.total}</dd>
              </div>
              {item.pattern && (
                <div>
                  <dt>Pattern</dt>
                  <dd className="text-lg font-semibold text-white">
                    {item.pattern}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-muted">
            Price and pattern details are taken from the public VIP Numbers Club
            catalogue. Availability can change — confirm with the team before
            paying. {brand.moneyBack}
          </p>
        </section>

        <aside className="rounded-[1.75rem] border border-white/10 bg-bg-elevated p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-white">Next steps</h2>
          <p className="mt-2 text-sm text-muted">
            This redesign does not process card payments. Enquiry opens WhatsApp
            with this number prefilled, or you can continue on the official VIP
            Portal.
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <a
              href={enquireUrl(item)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gold font-semibold text-black"
            >
              <MessageCircle className="h-4 w-4" />
              Enquire on WhatsApp
            </a>
            <button
              type="button"
              onClick={() => addToCart(item.id)}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 text-white"
            >
              <ShoppingCart className="h-4 w-4" />
              {isInCart(item.id) ? "Already in cart" : "Add to cart"}
            </button>
            <button
              type="button"
              onClick={() => toggleFavorite(item.id)}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 text-white"
            >
              <Heart
                className={`h-4 w-4 ${isFavorite(item.id) ? "fill-gold text-gold" : ""}`}
              />
              {isFavorite(item.id) ? "Saved" : "Save to favorites"}
            </button>
            <a
              href={referenceSearchUrl(item.number)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-gold/30 text-gold"
            >
              <ExternalLink className="h-4 w-4" />
              Open on vipnumbersclub.com
            </a>
          </div>

          <div className="mt-8 border-t border-white/10 pt-6 text-sm text-muted">
            <p>
              Call{" "}
              <a
                href={`tel:+${brand.phoneE164}`}
                className="text-gold hover:underline"
              >
                {brand.phoneDisplay}
              </a>{" "}
              · {brand.contactPerson}
            </p>
            <p className="mt-2">{brand.officeHours}</p>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-6 font-display text-3xl text-white">
            More in {item.section}
          </h2>
          <NumberGrid items={related} />
        </section>
      )}
    </div>
  );
}
