# External services still required

This frontend is production-ready as a **catalogue + enquiry** experience. It does **not** complete paid bookings by itself.

## Already wired (no keys needed)

| Action | Destination |
|---|---|
| Enquire / Book intent | WhatsApp `https://wa.me/9111117777` with prefilled number details |
| Call | `tel:+919111117777` |
| Email | `mailto:info@vipnumbersclub.com` |
| Official catalogue deep-link | `https://www.vipnumbersclub.com/search-results?q={number}` |
| Cart / favorites | Browser `localStorage` only |

## Required for live e-commerce parity

1. **Inventory API**  
   Replace `src/data/numbers.json` with a live feed (availability, price, MRP, sum, total, category). Refresh on interval or via SSR/ISR.

2. **Auth + cart sync**  
   Mirror VIP Portal login if customers must check out on-account.

3. **Payment gateway**  
   Integrate the provider already used by VIP Numbers Club (or a new one) and never show “payment successful” until the gateway confirms.

4. **Booking / UPC workflow**  
   Backend to create orders, assign account managers, and track activation status.

5. **Optional form backend**  
   If WhatsApp is not enough: Formspree, Getform, or a custom webhook. The contact form currently opens WhatsApp on purpose so success is not faked.

## Content notes

- Inventory snapshot: 83 unique numbers from the public homepage at audit time.
- Founding year copy: homepage says 2005; About says 2009 — both disclosed on the About page.
