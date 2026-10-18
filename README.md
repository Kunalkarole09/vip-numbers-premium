# VIP Numbers Club

Premium frontend redesign for VIP Numbers Club, an India-focused marketplace for VIP, fancy, numerology, and memorable mobile numbers.

The project is a responsive catalogue and enquiry experience built around the verified public content and inventory captured from the original website. It preserves the brand's black-and-gold identity while giving number discovery, pricing, detail views, and enquiry actions a more focused luxury-commerce presentation.

## Original reference website

- [vipnumbersclub.com](https://www.vipnumbersclub.com/)

The reference site is the source for the brand messaging, verified business details, content sections, catalogue categories, and the public number snapshot included in this project. The local app does not represent itself as the live inventory or checkout system.

## Key improvements implemented

- Premium dark-and-gold visual system with restrained typography, spacing, borders, and motion.
- Responsive header with utility links, primary navigation, digit search, call, favorites, and cart actions.
- Mobile navigation with accessible touch targets and Home, Search, Browse, Cart, and Saved shortcuts.
- Hero search experience based on the site's real VIP/fancy number positioning.
- Browseable number inventory with genuine captured number data, categories, numerology totals, and listed prices.
- Working search and filters for:
  - Digit matching anywhere, at the start, or at the end of a number
  - Catalogue category
  - Numerology total
  - Minimum and maximum listed price
  - Price sorting
- Number detail pages with pattern highlighting, price hierarchy, numerology metadata, related numbers, and clear next steps.
- Favorites and shortlist cart stored locally in the browser.
- WhatsApp enquiry links prefilled with the selected number, listed price, category, and activation question.
- Verified contact, service, process, home-delivery, FAQ, policy, and trust content.
- Explicit messaging that catalogue prices and availability must be confirmed before payment.

## Tech stack

- React 19
- TypeScript 6
- Vite 8
- Tailwind CSS 4
- React Router 7
- Framer Motion
- Lucide React
- Oxlint

## Project structure

```text
.
├── AUDIT.md                 # Reference-site audit and verified content notes
├── web/
│   ├── public/              # Logo, favicon, and public assets
│   ├── src/
│   │   ├── components/      # Shared layout, navigation, cards, grids, and content UI
│   │   ├── context/         # Local cart and favorites state
│   │   ├── data/            # Verified content, categories, and inventory snapshot
│   │   ├── lib/              # Formatting, filtering, and external-link helpers
│   │   └── pages/            # Route-level screens
│   ├── INTEGRATION.md       # Live commerce integration requirements
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## Local installation

Requirements:

- Node.js compatible with the installed Vite and TypeScript versions
- npm

Install dependencies:

```bash
cd web
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will print the local URL, normally `http://localhost:5173`.

Run the linter:

```bash
npm run lint
```

Preview the production bundle locally:

```bash
npm run preview
```

## Production build

```bash
cd web
npm run build
```

The build runs the TypeScript project check and then creates the deployable Vite output in `web/dist`.

## Deployment and repository URLs

- **Live deployment URL:** Not available. No hosted deployment was configured or verified for this project.
- **GitHub repository URL:** Not available. The supplied workspace does not contain a Git repository or configured remote.

These fields should be replaced with verified URLs when the project is published.

## Environment variables and external services

No environment variables are required for the current frontend build.

The following external destinations are already wired without API keys:

- WhatsApp enquiries: `https://wa.me/9111117777`
- Phone: `tel:+919111117777`
- Email: `mailto:info@vipnumbersclub.com`
- Official catalogue deep-links: `https://www.vipnumbersclub.com/search-results?q={number}`

Cart and favorites use browser `localStorage`; they are not synchronized to an account or backend.

## Known limitations and setup instructions

### Public inventory snapshot

`web/src/data/numbers.json` contains 83 unique numbers captured from the public catalogue at audit time. It includes genuine number strings, patterns, listed prices, MRP values where available, categories, and numerology metadata.

The snapshot can become stale. Before presenting the catalogue as live stock, replace it with an authenticated inventory API that provides current availability, pricing, and product status.

### No payment or booking backend

This project intentionally does not process payments, create orders, authenticate customers, issue UPCs, or claim successful activation. Enquiry and booking-intent actions route to WhatsApp or the official VIP Numbers Club website.

For live e-commerce parity, a production integration still needs:

1. A live inventory API and refresh strategy.
2. Authentication and server-backed cart/order state, if required by the business.
3. The approved payment gateway and server-side payment verification.
4. Booking, UPC, activation-status, refund, and account-management workflows.
5. A backend or CRM endpoint if enquiries should be stored instead of opening WhatsApp.

See [`web/INTEGRATION.md`](web/INTEGRATION.md) for the integration checklist.

### Content consistency

The audit found conflicting founding-year references on the original website (2005 on homepage copy and 2009 on the About page). The redesign preserves that distinction rather than inventing a resolution. Confirm the preferred business wording before using the site as final marketing copy.

### Recommended deployment setup

After configuring a verified repository and hosting provider:

1. Set the deployment root to `web`.
2. Use `npm install` for dependency installation.
3. Use `npm run build` as the build command.
4. Publish `web/dist` as the output directory.
5. Configure SPA fallback routing to serve `index.html` for client-side routes such as `/numbers/:id` and `/search`.
6. Replace the “not available” URLs above only after the deployment and repository links have been tested.
