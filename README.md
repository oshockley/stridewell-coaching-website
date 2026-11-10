# Stridewell Coaching

A single-page marketing site for **Stridewell Coaching**, the (fictional) personal training and online coaching business of Jordan Reyes in Phoenix, Arizona. It's a portfolio concept: copy, data, and interactions are written to production standard.

**Highlights**

- **Find-your-program quiz:** 4 questions, a progress bar, back/next, and a scored recommendation that pre-fills the consultation form
- **Pricing:** monthly / 3-month toggle (3-month saves 10%, computed from a single constant)
- **Results:** client results with an accessible lightbox (native `<dialog>`, arrow keys, Escape)
- **FAQ:** accessible accordion
- **Consultation form:** inline validation, loading and success states, Formspree delivery
- **Mobile:** sticky "Free Consult" bar on small screens

## Tech stack

- [Vite](https://vite.dev) + React + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) via `@tailwindcss/vite`. Design tokens live in `src/index.css` (`@theme`)
- [lucide-react](https://lucide.dev) icons, [framer-motion](https://motion.dev) (via `LazyMotion`, respects `prefers-reduced-motion`)
- [oxlint](https://oxc.rs) for linting
- No backend; the form posts to [Formspree](https://formspree.io)

## Run locally

Requires Node 20.19+ (or 22.12+).

```bash
npm install
npm run dev        # http://localhost:5173
```

Other scripts:

```bash
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
npm run lint       # oxlint
```

## Consultation form (Formspree)

1. Create a free form at [formspree.io](https://formspree.io) and copy its ID (the part after `https://formspree.io/f/`).
2. Copy `.env.example` to `.env.local` and set it:

   ```bash
   VITE_FORMSPREE_ID=abcdwxyz
   ```

3. Restart the dev server.

If `VITE_FORMSPREE_ID` is empty, the form **simulates** a successful submission after 1 second, so the demo always works. Submission logic is in `src/lib/consultForm.ts`.

## Deploy to Vercel

1. Push this repo to GitHub, GitLab or Bitbucket.
2. In Vercel, choose **Add New → Project** and import the repo. Vercel detects Vite automatically (build: `npm run build`, output: `dist`). No extra config needed.
3. Under **Settings → Environment Variables**, add `VITE_FORMSPREE_ID` and redeploy.
4. Update the absolute URLs in `index.html` (`canonical`, `og:url`, `og:image`, `twitter:image`) to your real domain. They currently assume `https://stridewell-coaching.vercel.app`.

## Project structure

```
src/
  data/          All content: site facts, programs, quiz, results, testimonials, FAQs, images
  lib/           Pure logic: quiz scoring, pricing math, form validation/submit, scroll helper
  hooks/         useFocusOnMount
  components/
    layout/      Header, Footer, MobileConsultBar
    sections/    One file per page section (quiz/ has its own folder)
    ui/          Button, Logo, SectionHeading, FormField, Lightbox, Stars, Reveal, SocialIcon
```

Every business fact (coach name, contact details, stats, rating, prices, discount, consult length) comes from `src/data/`, so changing it in one place updates the whole site.

### Quiz scoring

`src/lib/scoring.ts` documents the rules: the preferred format narrows the eligible programs, every answer adds points from small lookup tables, and ties go to the format's first-choice program.

## Swapping images

Photos are Unsplash images referenced by ID in **`src/data/images.ts`**:

| Key              | Used in                  |
| ---------------- | ------------------------ |
| `hero`           | Hero section             |
| `coach`          | About the coach (Jordan) |
| `priya` … `chris` | Client result cards     |

To use real photos, either replace the IDs with other Unsplash photo IDs, or put files in `public/images/` and change `unsplash()` / `unsplashSrcSet()` to return local paths. Keep the `width`/`height` attributes in the components roughly in line with your images' aspect ratios. Alt text for client photos lives in `src/data/results.ts`.

Other brand assets in `public/`: `favicon.svg`, `apple-touch-icon.png`, `og-image.png` (1200×630).

## Accessibility notes

- Skip link, semantic landmarks, one `h1`, logical heading order
- Visible focus rings: navy on light surfaces, lime on navy (`.on-dark`)
- Quiz uses native radio groups (arrow keys, Enter to advance); focus follows each new step
- Lightbox uses `<dialog>` (focus trap, Escape, focus restored to the opening photo)
- Form fields have labels, `aria-invalid`, `aria-describedby` errors, and focus moves to the first invalid field
- Contrast: navy on lime ≈ 13:1, muted text on white ≈ 5.9:1
