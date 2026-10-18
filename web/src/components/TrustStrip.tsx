import { ShieldCheck, Smartphone, Headphones } from "lucide-react";
import { brand } from "@/data/content";

const items = [
  {
    icon: ShieldCheck,
    title: brand.moneyBack,
    body: "Your payment is protected until the number is successfully activated.",
  },
  {
    icon: Smartphone,
    title: "All major networks",
    body: `${brand.networks.join(", ")} — prepaid or postpaid, your choice.`,
  },
  {
    icon: Headphones,
    title: "Expert support",
    body: "Jaipur-based team assisting pan India through UPC and porting.",
  },
];

export function TrustStrip() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="grid gap-4 md:grid-cols-3">
        {items.map(({ icon: Icon, title, body }) => (
          <div
            key={title}
            className="rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/10 to-transparent px-5 py-6"
          >
            <Icon className="mb-3 h-6 w-6 text-gold" aria-hidden />
            <h3 className="text-base font-semibold text-white">{title}</h3>
            <p className="mt-2 text-sm text-muted">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
