import { Link, useNavigate } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { brand } from "@/data/content";
import { categories, budgetBands, numerologyTotals } from "@/data/categories";
import { numbers } from "@/data/numbers";
import { SectionHeading } from "@/components/SectionHeading";
import { NumberGrid } from "@/components/NumberGrid";
import { TrustStrip } from "@/components/TrustStrip";
import { FaqList } from "@/components/FaqList";
import { formatINR } from "@/lib/format";

export function HomePage() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  const vvip = numbers.filter((n) => n.category === "vvip").slice(0, 6);
  const featured = numbers.slice(0, 9);
  const budgetFriendly = numbers
    .filter((n) => n.category === "budget")
    .slice(0, 6);

  function onSearch(e: FormEvent) {
    e.preventDefault();
    const digits = q.replace(/\D/g, "");
    navigate(digits ? `/search?q=${encodeURIComponent(digits)}` : "/search");
  }

  return (
    <div>
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(236,174,1,0.16),transparent_55%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
          <div>
            <div className="mb-5 flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.18em]">
              <p className="text-gold">{brand.name}</p>
              <span className="h-1 w-1 rounded-full bg-gold/60" aria-hidden />
              <p className="text-muted">Premium mobile identities</p>
            </div>
            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="max-w-xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-[3.25rem]"
            >
              {brand.headline}
            </motion.h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
              {brand.subheadline}
            </p>

            <form
              onSubmit={onSearch}
              className="mt-8"
              role="search"
              aria-label="Hero number search"
            >
              <label htmlFor="hero-search" className="sr-only">
                Search your number here
              </label>
              <div className="glow-gold flex items-center rounded-full bg-white p-1.5">
                <input
                  id="hero-search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search your number here"
                  inputMode="numeric"
                  className="h-12 w-full flex-1 rounded-full bg-transparent px-4 text-base text-black placeholder:text-neutral-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-black px-5 text-sm font-semibold text-gold"
                >
                  <Search className="h-4 w-4" />
                  Search
                </button>
              </div>
            </form>

            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <Link
                to="/numbers?category=vvip"
                className="inline-flex h-11 items-center rounded-full bg-gold px-5 font-semibold text-black"
              >
                Explore VVIP
              </Link>
              <Link
                to="/search"
                className="inline-flex h-11 items-center rounded-full border border-white/20 px-5 text-white hover:border-gold/50"
              >
                Advanced search
              </Link>
            </div>
            <p className="mt-5 text-xs leading-relaxed text-muted">
              <span className="text-white">Browse the public catalogue snapshot.</span>{" "}
              Prices and patterns are shown as captured; confirm current
              availability with the VIP Numbers Club team before paying.
            </p>
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="absolute -inset-6 rounded-[2rem] bg-gold/15 blur-2xl" />
            <div className="relative rounded-[1.75rem] border border-gold/40 bg-bg-elevated p-5 shadow-2xl">
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-wider text-black">
                  Super Sale Zone
                </p>
                <span className="text-[10px] uppercase tracking-[0.14em] text-muted">
                  Public listing
                </span>
              </div>
              <ul className="space-y-3">
                {vvip.slice(0, 3).map((item) => (
                  <li
                    key={item.id}
                    className="rounded-xl border border-white/10 bg-black/40 px-4 py-3"
                  >
                    <Link to={`/numbers/${item.id}`} className="block">
                      <p className="text-lg font-semibold tracking-wider text-white">
                        {item.display}
                      </p>
                      <p className="mt-1 text-sm">
                        {item.mrp != null && (
                          <span className="mr-2 text-muted line-through">
                            {formatINR(item.mrp)}
                          </span>
                        )}
                        <span className="font-semibold text-gold">
                          {formatINR(item.price)}
                        </span>
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-center text-xs text-muted">
                {brand.moneyBack}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="py-14">
        <TrustStrip />
      </div>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <SectionHeading
          eyebrow="Collections"
          title="Browse by pattern"
          description="Categories taken from the live catalogue sections on VIP Numbers Club."
          action={
            <Link
              to="/numbers"
              className="inline-flex items-center gap-1 text-sm text-gold hover:underline"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((cat) => {
            const count = numbers.filter((n) => n.category === cat.slug).length;
            return (
              <Link
                key={cat.slug}
                to={`/numbers?category=${cat.slug}`}
                className="rounded-2xl border border-white/10 bg-bg-card px-4 py-5 transition hover:border-gold/40"
              >
                <p className="font-medium text-white">{cat.name}</p>
                <p className="mt-1 text-xs text-muted">{count} numbers</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <SectionHeading
          eyebrow="Featured"
          title="VVIP high-end numbers"
          description="Genuine prices from the public VVIP listing."
          action={
            <Link
              to="/numbers?category=vvip"
              className="text-sm text-gold hover:underline"
            >
              View VVIP
            </Link>
          }
        />
        <NumberGrid items={vvip} />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <SectionHeading
          eyebrow="Numerology"
          title="Lucky totals"
          description="Filter the snapshot inventory by digital root totals featured on the reference site."
        />
        <div className="flex flex-wrap gap-3">
          {numerologyTotals.map((total) => (
            <Link
              key={total}
              to={`/search?total=${total}`}
              className="inline-flex h-12 min-w-12 items-center justify-center rounded-full border border-gold/35 px-5 text-sm font-semibold text-gold hover:bg-gold hover:text-black"
            >
              Total {total}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <SectionHeading
          eyebrow="Budget"
          title="Search by budget"
          description="Price bands matching the reference site. Results filter this site’s verified snapshot."
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {budgetBands.map((band) => (
            <Link
              key={band.label}
              to={`/search?min=${band.min}&max=${band.max}`}
              className="rounded-2xl border border-white/10 bg-bg-card px-4 py-4 text-sm text-white transition hover:border-gold/40"
            >
              {band.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <SectionHeading
          title="Fresh from the catalogue"
          description={`${numbers.length} unique numbers captured from the public homepage inventory.`}
        />
        <NumberGrid items={featured} />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <SectionHeading title="Budget friendly picks" />
        <NumberGrid items={budgetFriendly} />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <SectionHeading
          eyebrow="How it works"
          title="Simple path to your VIP number"
        />
        <ol className="grid gap-4 md:grid-cols-3">
          {[
            "Choose a memorable number from search or collections.",
            "Enquire on WhatsApp or call — our team confirms availability.",
            "Complete booking & activation with UPC support until your SIM is live.",
          ].map((step, i) => (
            <li
              key={step}
              className="rounded-2xl border border-white/10 bg-bg-card p-6"
            >
              <span className="font-display text-3xl text-gold">{i + 1}</span>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <SectionHeading title="Frequently asked questions" />
        <FaqList />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="rounded-[1.75rem] border border-gold/30 bg-gradient-to-br from-gold/15 via-bg-elevated to-bg px-6 py-10 text-center sm:px-10">
          <h2 className="font-display text-3xl text-white sm:text-4xl">
            Ready to claim your number?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted">
            Talk to {brand.contactPerson} on {brand.phoneDisplay}.{" "}
            {brand.officeHours}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={brand.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center rounded-full bg-whatsapp px-6 font-semibold text-white"
            >
              WhatsApp us
            </a>
            <Link
              to="/contact"
              className="inline-flex h-12 items-center rounded-full border border-white/20 px-6 text-white"
            >
              Contact details
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
