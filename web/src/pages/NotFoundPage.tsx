import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <p className="text-sm uppercase tracking-[0.2em] text-gold">404</p>
      <h1 className="mt-3 text-3xl font-semibold text-white">Page not found</h1>
      <p className="mt-2 text-muted">
        The page you requested is not part of this redesign.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex h-12 items-center rounded-full bg-gold px-6 font-semibold text-black"
      >
        Back home
      </Link>
    </div>
  );
}
