import { servicesContent } from "@/data/content";

export function ServicesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl text-white sm:text-5xl">
        VIP number services
      </h1>
      <p className="mt-4 max-w-2xl text-muted">{servicesContent.intro}</p>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {servicesContent.list.map((item) => (
          <li
            key={item}
            className="rounded-xl border border-gold/20 bg-bg-card px-4 py-3 text-sm text-white"
          >
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {servicesContent.highlights.map((h) => (
          <article
            key={h.title}
            className="rounded-2xl border border-white/10 bg-bg-elevated p-6"
          >
            <h2 className="text-lg font-semibold text-gold">{h.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{h.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
