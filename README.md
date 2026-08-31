# Kifuki Art Studio — v2.0.0

A polished Next.js + TypeScript + Tailwind art-studio storefront for Kifuki. Checkout stays on Shopier; the site never processes card payments.

## Run

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Assets

The design uses Kifuki's current visual assets by default via `NEXT_PUBLIC_ASSET_BASE_URL=https://kifuki.com`.

For self-hosted assets, put the current files here:
- `public/brand/logo.png`
- `public/character/karakter.png`
- `public/decor/burst.png`

The current source files are:
- `https://kifuki.com/logo.png`
- `https://kifuki.com/images/karakter.png`
- `https://kifuki.com/images/burst.png`

If you add local assets, replace the remote character URL in `components/ThreeCharacter.tsx` with `/character/karakter.png` and the logo already expects `/brand/logo.png`.

## Admin

`/admin/login` uses `.env.local`:

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=strong-password
ADMIN_SESSION_SECRET=long-random-secret
```

Admin can create/delete products and artworks and trigger Shopier sync.

## Shopier

Every product has a `shopierUrl`. The visible purchase CTA opens that URL in a new tab. Default store URL is `https://www.shopier.com/kifuki`.

For API sync, configure:

```env
SHOPIER_API_ENABLED=true
SHOPIER_ACCESS_TOKEN=...
SHOPIER_PRODUCTS_URL=...
```

The exact Shopier API endpoint should be the one provided for the store/account; it is intentionally not guessed in source code.

## Database

Default: SQLite. Production option: Supabase REST.

```env
DATABASE_PROVIDER=sqlite
# or
DATABASE_PROVIDER=supabase
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
```

For Supabase create `products` and `artworks` tables matching `lib/types.ts`. Enable service-role access only server-side; never expose the service role key to the browser.

## Visual system

- sketchbook / paper background
- editorial typography
- hand-drawn sticker accents
- GSAP-style motion language implemented with Framer Motion
- Three.js + React Three Fiber 2.5D character scene
- responsive mobile bottom navigation
- reduced-motion friendly animation defaults
- Shopier hover sticker tag on product cards
