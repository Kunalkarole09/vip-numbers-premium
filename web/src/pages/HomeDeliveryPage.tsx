import { homeDeliveryContent, brand } from "@/data/content";

export function HomeDeliveryPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl text-white">
        {homeDeliveryContent.title}
      </h1>
      <ul className="mt-8 space-y-3">
        {homeDeliveryContent.points.map((p) => (
          <li
            key={p}
            className="rounded-xl border border-white/10 bg-bg-card px-4 py-3 text-sm text-muted"
          >
            {p}
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-muted">
        Confirm city availability with{" "}
        <a href={`tel:+${brand.phoneE164}`} className="text-gold hover:underline">
          {brand.phoneDisplay}
        </a>
        .
      </p>
    </div>
  );
}
