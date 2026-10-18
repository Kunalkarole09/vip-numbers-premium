import { useState, type FormEvent } from "react";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { brand } from "@/data/content";

export function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim() || !phone.trim() || !message.trim()) {
      setError("Please fill in your name, phone, and message.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(phone.replace(/\D/g, "").slice(-10))) {
      setError("Enter a valid 10-digit Indian mobile number.");
      return;
    }
    const text = [
      `Hello VIP Numbers Club,`,
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      ``,
      message.trim(),
    ].join("\n");
    window.open(
      `${brand.whatsappUrl}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl text-white sm:text-5xl">
        Contact VIP Numbers Club
      </h1>
      <p className="mt-3 text-muted">
        Reach the team directly — no simulated “message sent” without a backend.
        The form below opens WhatsApp with your enquiry.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="rounded-[1.75rem] border border-gold/30 bg-bg-card p-6">
          <p className="text-2xl font-semibold text-gold">{brand.contactPerson}</p>
          <p className="mt-1 text-xl text-white">{brand.phoneDisplay}</p>
          <p className="mt-4 text-sm text-gold">{brand.officeHours}</p>

          <ul className="mt-8 space-y-4 text-sm text-muted">
            <li className="flex gap-3">
              <Phone className="h-5 w-5 text-gold" />
              <a href={`tel:+${brand.phoneE164}`} className="hover:text-white">
                {brand.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="h-5 w-5 text-gold" />
              <a href={`mailto:${brand.email}`} className="hover:text-white">
                {brand.email}
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin className="h-5 w-5 shrink-0 text-gold" />
              <span>{brand.address}</span>
            </li>
          </ul>
          <p className="mt-4 text-xs text-muted">GST: {brand.gst}</p>

          <a
            href={brand.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-whatsapp px-5 font-semibold text-white"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp now
          </a>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-[1.75rem] border border-white/10 bg-bg-elevated p-6"
          noValidate
        >
          <h2 className="text-lg font-semibold text-white">Send an enquiry</h2>
          <p className="mt-1 text-sm text-muted">
            Submits via WhatsApp to {brand.phoneDisplay}.
          </p>

          <label className="mt-5 block text-sm text-muted">
            Name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 h-11 w-full rounded-xl border border-white/15 bg-bg px-3 text-white"
              autoComplete="name"
              required
            />
          </label>
          <label className="mt-4 block text-sm text-muted">
            Phone
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 h-11 w-full rounded-xl border border-white/15 bg-bg px-3 text-white"
              inputMode="tel"
              autoComplete="tel"
              required
            />
          </label>
          <label className="mt-4 block text-sm text-muted">
            Message
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="mt-1 w-full rounded-xl border border-white/15 bg-bg px-3 py-2 text-white"
              required
            />
          </label>

          {error && (
            <p className="mt-3 text-sm text-red-400" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-full bg-gold font-semibold text-black"
          >
            Continue on WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}
