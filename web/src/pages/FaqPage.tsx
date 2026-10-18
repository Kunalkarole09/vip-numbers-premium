import { FaqList } from "@/components/FaqList";

export function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl text-white">
        Frequently asked questions
      </h1>
      <p className="mt-3 text-muted">
        Answers published on the VIP Numbers Club website.
      </p>
      <div className="mt-8">
        <FaqList />
      </div>
    </div>
  );
}
