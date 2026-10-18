import { Heart, MessageCircle, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import type { VipNumber } from "@/data/types";
import { discountPercent, formatINR } from "@/lib/format";
import { enquireUrl } from "@/lib/whatsapp";
import { useShop } from "@/context/ShopContext";
import { NumberDigits } from "./NumberDigits";

type Props = {
  item: VipNumber;
  index?: number;
};

export function NumberCard({ item, index = 0 }: Props) {
  const { addToCart, isInCart, toggleFavorite, isFavorite } = useShop();
  const reduceMotion = useReducedMotion();
  const discount = discountPercent(item.mrp, item.price);
  const inCart = isInCart(item.id);
  const fav = isFavorite(item.id);

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.24) }}
      className="group flex flex-col rounded-2xl border border-gold/25 bg-bg-card/90 p-4 shadow-[0_0_0_1px_rgba(236,174,1,0.04)] transition hover:border-gold/50 hover:bg-bg-elevated"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <span className="rounded-full border border-gold/30 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-gold">
            {item.section.replace(/\s+/g, " ")}
          </span>
          <p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-muted">
            Catalogue price
          </p>
        </div>
        <button
          type="button"
          onClick={() => toggleFavorite(item.id)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted transition hover:border-gold/40 hover:text-gold"
          aria-label={fav ? "Remove from favorites" : "Add to favorites"}
          aria-pressed={fav}
        >
          <Heart
            className={`h-4 w-4 ${fav ? "fill-gold text-gold" : ""}`}
          />
        </button>
      </div>

      <Link to={`/numbers/${item.id}`} className="mb-3 block">
        <NumberDigits item={item} className="text-2xl sm:text-[1.65rem]" />
      </Link>

      <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
        <div>
          {item.mrp != null && item.mrp > item.price && (
            <p className="text-sm text-muted line-through">
              {formatINR(item.mrp)}
            </p>
          )}
          <p className="text-xl font-semibold text-gold">
            {formatINR(item.price)}
            {discount != null && (
              <span className="ml-2 text-xs font-medium text-muted">
                {discount}% off
              </span>
            )}
          </p>
        </div>
        <div className="flex gap-3 text-xs text-muted">
          <span>
            Sum: <strong className="text-white">{item.sum}</strong>
          </span>
          <span>
            Total: <strong className="text-white">{item.total}</strong>
          </span>
        </div>
      </div>

      <div className="mt-auto grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => addToCart(item.id)}
          className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full border border-white/20 text-sm font-medium transition hover:border-gold/50 hover:text-gold"
        >
          <ShoppingCart className="h-4 w-4" />
          {inCart ? "In cart" : "Add to cart"}
        </button>
        <a
          href={enquireUrl(item)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-gold text-sm font-semibold text-black transition hover:bg-gold-bright"
        >
          <MessageCircle className="h-4 w-4" />
          Enquire
        </a>
      </div>

      <Link
        to={`/numbers/${item.id}`}
        className="mt-2 text-center text-xs text-muted underline-offset-4 hover:text-gold hover:underline"
      >
        View details
      </Link>
    </motion.article>
  );
}
