import { privacySummary, brand } from "@/data/content";
import { useParams, Link } from "react-router-dom";

const termsSummary = `By using VIP Numbers Club services and this website, you agree to follow applicable laws and the booking terms communicated at the time of purchase on the official VIP Portal. Numbers remain subject to availability, KYC, and telecom operator rules for porting and activation. For the authoritative legal text, refer to the policies published on ${brand.referenceSite}/page/terms-and-conditions.`;

const refundSummary = `VIP Numbers Club states a 100% money-back guarantee until activation. Refund eligibility and timelines follow the official refund policy on the live VIP Portal. This redesign does not process payments; any refund must be handled through VIP Numbers Club after a completed booking. See ${brand.referenceSite}/page/refund-policy.`;

export function LegalPage() {
  const { slug } = useParams();

  const map: Record<string, { title: string; body: string }> = {
    privacy: { title: "Privacy Policy", body: privacySummary },
    terms: { title: "Terms & Conditions", body: termsSummary },
    refund: { title: "Refund Policy", body: refundSummary },
  };

  const page = slug ? map[slug] : undefined;

  if (!page) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold">Page not found</h1>
        <Link to="/" className="mt-4 inline-block text-gold">
          Home
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl text-white">{page.title}</h1>
      <div className="mt-6 whitespace-pre-wrap text-sm leading-relaxed text-muted">
        {page.body}
      </div>
      <p className="mt-8 text-xs text-muted">
        Full policy pages:{" "}
        <a
          href={`${brand.referenceSite}/page/privacy-policy`}
          className="text-gold hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy
        </a>
        ,{" "}
        <a
          href={`${brand.referenceSite}/page/terms-and-conditions`}
          className="text-gold hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms
        </a>
        ,{" "}
        <a
          href={`${brand.referenceSite}/page/refund-policy`}
          className="text-gold hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Refund
        </a>
        .
      </p>
    </div>
  );
}
