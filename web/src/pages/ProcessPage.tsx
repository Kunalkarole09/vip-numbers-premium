import { Link } from "react-router-dom";
import { processSteps, brand } from "@/data/content";

export function ProcessPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl text-white sm:text-5xl">
        How to buy & activate
      </h1>
      <p className="mt-4 text-muted">
        A clear path from choosing a number to porting it onto{" "}
        {brand.networks.join(", ")}.
      </p>
      <ol className="mt-10 space-y-4">
        {processSteps.map((step, i) => (
          <li
            key={step.title}
            className="rounded-2xl border border-white/10 bg-bg-card p-6"
          >
            <p className="text-sm text-gold">Step {i + 1}</p>
            <h2 className="mt-1 text-xl font-semibold text-white">
              {step.title}
            </h2>
            <p className="mt-2 text-sm text-muted">{step.body}</p>
          </li>
        ))}
      </ol>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to="/search"
          className="inline-flex h-12 items-center rounded-full bg-gold px-6 font-semibold text-black"
        >
          Start searching
        </Link>
        <a
          href={brand.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center rounded-full border border-white/20 px-6"
        >
          Ask on WhatsApp
        </a>
      </div>
    </div>
  );
}
