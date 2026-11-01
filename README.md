# Genzy Creative — local website scaffold

This workspace contains a polished static implementation of the Genzy Creative agency brief. The repository did not contain an existing Laravel application, so the site is intentionally buildless and easy to preview locally.

## Run locally

From this directory:

```bash
python -m http.server 4173
```

Then open `http://127.0.0.1:4173/`.

## Included

- Responsive Indonesian-first agency landing page
- Supplied `LOGO.jpg` reused as `assets/logo.jpg`, favicon, and social image
- Real Three.js hero scene with reduced-motion/static fallback
- Scroll reveal animations and responsive mobile navigation
- Portfolio category filters
- Contact form validation and success/error feedback (frontend demo only)
- Accessible labels, semantic sections, focusable controls, SEO metadata, and Open Graph metadata

## Content notes

Portfolio and editorial cards are marked/demo content. No unsupported client names, metrics, testimonials, addresses, phone numbers, or emails are presented as verified facts. The contact page uses the supplied Instagram account only.

## Main files

- `index.html` — page structure and content
- `styles.css` — design system and responsive layout
- `app.js` — Three.js hero, interactions, filters, and form behavior
- `assets/logo.jpg` — copied from the supplied root `LOGO.jpg`; original preserved

For a production Laravel build, the next phase would be to move content into migrations/models and connect the inquiry form to server-side persistence, mail configuration, authentication, and an admin CMS.
