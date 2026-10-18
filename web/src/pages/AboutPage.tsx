import { aboutContent, brand } from "@/data/content";

export function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs uppercase tracking-[0.18em] text-gold">About us</p>
      <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl">
        {aboutContent.title}
      </h1>
      <div className="mt-8 space-y-5 text-base leading-relaxed text-muted">
        {aboutContent.paragraphs.map((p) => (
          <p key={p.slice(0, 40)}>{p}</p>
        ))}
      </div>
      <h2 className="mt-12 text-xl font-semibold text-white">Why trust us</h2>
      <ul className="mt-4 space-y-3">
        {aboutContent.whyTrust.map((item) => (
          <li
            key={item}
            className="rounded-xl border border-white/10 bg-bg-card px-4 py-3 text-sm text-muted"
          >
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-8 text-xs text-muted">
        Note: Homepage marketing copy also references “since 2005”. We preserve
        both statements for accuracy rather than inventing a single year.{" "}
        {brand.sinceNote}.
      </p>
    </div>
  );
}
