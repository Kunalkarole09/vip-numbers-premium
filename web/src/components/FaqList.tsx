import { faqs } from "@/data/content";

export function FaqList({ items = faqs }: { items?: typeof faqs }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details
          key={item.q}
          className="group rounded-2xl border border-white/10 bg-bg-card px-5 py-4 open:border-gold/30"
        >
          <summary className="cursor-pointer list-none text-base font-medium text-white marker:content-none [&::-webkit-details-marker]:hidden">
            <span className="flex items-center justify-between gap-4">
              {item.q}
              <span className="text-gold transition group-open:rotate-45">+</span>
            </span>
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
