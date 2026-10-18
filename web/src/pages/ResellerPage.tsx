import { brand } from "@/data/content";

export function ResellerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl text-white">Become a VIP partner</h1>
      <p className="mt-4 text-muted">
        Reseller panel onboarding for numerologists, store executives, shop
        owners, telecom partners, and activation experts — as described on the
        reference site.
      </p>
      <p className="mt-6 rounded-2xl border border-gold/25 bg-bg-card p-5 text-sm text-muted">
        Our team will verify business documents manually; only then will you be
        registered in the reseller panel.
      </p>
      <a
        href={brand.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex h-12 items-center rounded-full bg-gold px-6 font-semibold text-black"
      >
        Enquire about reseller access
      </a>
      <p className="mt-4 text-xs text-muted">
        Full portal registration remains on{" "}
        <a
          href={`${brand.referenceSite}/reseller-panel`}
          className="text-gold hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          vipnumbersclub.com/reseller-panel
        </a>
        .
      </p>
    </div>
  );
}
