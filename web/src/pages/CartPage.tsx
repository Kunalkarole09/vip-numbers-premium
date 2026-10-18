import { Link } from "react-router-dom";
import { MessageCircle, Trash2 } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { formatINR } from "@/lib/format";
import { enquireCartUrl } from "@/lib/whatsapp";
import { NumberDigits } from "@/components/NumberDigits";
import { brand } from "@/data/content";

export function CartPage() {
  const { cart, removeFromCart, clearCart } = useShop();
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-3xl font-semibold">Your cart is empty</h1>
        <p className="mt-2 text-muted">
          Save numbers while browsing, then enquire together on WhatsApp.
        </p>
        <Link
          to="/numbers"
          className="mt-6 inline-flex h-12 items-center rounded-full bg-gold px-6 font-semibold text-black"
        >
          Browse numbers
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-4xl text-white">Cart</h1>
      <p className="mt-2 text-sm text-muted">
        Local shortlist only — payments are completed with VIP Numbers Club via
        WhatsApp or their official portal.
      </p>

      <ul className="mt-8 space-y-4">
        {cart.map((item) => (
          <li
            key={item.id}
            className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <Link to={`/numbers/${item.id}`}>
                <NumberDigits item={item} className="text-xl" />
              </Link>
              <p className="mt-1 text-sm text-gold">{formatINR(item.price)}</p>
            </div>
            <button
              type="button"
              onClick={() => removeFromCart(item.id)}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/15 px-4 text-sm text-muted hover:text-white"
            >
              <Trash2 className="h-4 w-4" />
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-8 rounded-2xl border border-gold/25 bg-bg-elevated p-5">
        <div className="flex items-center justify-between text-lg">
          <span className="text-muted">Catalogue total</span>
          <span className="font-semibold text-gold">{formatINR(total)}</span>
        </div>
        <p className="mt-2 text-xs text-muted">
          Final payable amount is confirmed by {brand.name} at booking time.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <a
            href={enquireCartUrl(cart)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-gold font-semibold text-black"
          >
            <MessageCircle className="h-4 w-4" />
            Enquire about cart
          </a>
          <button
            type="button"
            onClick={clearCart}
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 px-5 text-sm text-muted"
          >
            Clear cart
          </button>
        </div>
      </div>
    </div>
  );
}
