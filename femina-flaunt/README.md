# Femina Flaunt By Sabina — Website (React)

Premium, animated marketing site for Femina Flaunt By Sabina (luxury beauty · skin · wellness · bridal, Gulshan-2, Dhaka).

## Stack

- **React 19 + Vite** (SPA, react-router)
- **Framer Motion** for animations: page transitions, word-by-word headline reveals, scroll parallax hero, staggered sections, animated Dubai→Dhaka location reveal, gallery lightbox
- Reduced-motion aware (`prefers-reduced-motion` disables marquee, transitions, parallax)

## Run

```bash
npm install
npm run dev        # local dev at http://localhost:5173
npm run build      # production build to dist/
npm run preview    # serve the production build at http://localhost:4173
```

## Managing contact details (no code changes needed)

Everything — phone, WhatsApp number & prefilled messages, email, address, hours, Google rating/review count, social links, directions URL, and the booking-form service list — lives in **`public/contacts.json`**.

- Edit that file, redeploy (or just refresh in dev) — done.
- Values set to `""` hide their UI slots automatically (e.g. email/social until confirmed).
- `bookingServices.services` feeds the booking form dropdown.

## Photography

Drop owner-approved images into `public/images/` using the names referenced in the code:
`hero-bridal.jpg`, `bridal-feature.jpg`, `gallery-1.jpg` … `gallery-6.jpg`.
Missing images degrade gracefully (hero shows a dark ivory backdrop; gallery slots stay).

## Notes / TODO before launch

- Booking form is a client-side validated **request** (MVP) — no backend yet. To go live, POST the form data from `src/pages/Booking.jsx#onSubmit` to a booking endpoint/notification service, and replace the honeypot with server-side rate limiting.
- Review excerpts intentionally NOT fabricated — add approved Google review quotes to the reviews section once the owner supplies them.
- Privacy Policy & Terms pages are marked **DRAFT** — require owner approval.
- Address floor/unit, exact services, prices, and founder credentials each require owner validation per the requirements document.
