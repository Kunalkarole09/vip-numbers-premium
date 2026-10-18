# VIP Numbers Club — Redesign

Premium frontend redesign of [vipnumbersclub.com](https://www.vipnumbersclub.com/), built with React, Vite, TypeScript, Tailwind CSS, Lucide, and Framer Motion.

## Run locally

```bash
cd web
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Data honesty

- Inventory in `src/data/numbers.json` is a **verified public snapshot** of numbers, prices, sums, and totals scraped from the live homepage catalogue (83 unique numbers across the published sections).
- Enquiry / “Book” actions open **WhatsApp** (`+91 9111117777`) or deep-link to the official site search — they do **not** fake payment success.
- Cart and favorites are stored in `localStorage` on this device only.

## Live transaction integration (required for full parity)

To process real bookings like the VIP Portal you will need:

1. **Inventory API** — authenticated feed of available numbers, prices, and stock status (replace `numbers.json`).
2. **Booking / checkout API** — create order, login/session, payment gateway (Razorpay/etc. as used by the business).
3. **Optional contact form endpoint** — Formspree, Getform, or their own CRM webhook (current form opens WhatsApp intentionally).

Until those exist, keep WhatsApp + official portal links as the purchase path.
