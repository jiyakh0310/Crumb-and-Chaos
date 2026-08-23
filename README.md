# CRUMB & CHAOS

A personal digital bakehouse — recipes, a bake journal, and a slightly unhinged kitchen. Made with butter, chaos & love.

## Stack

React · Vite · Tailwind CSS v4 · Framer Motion · Lucide React · React Router DOM

## Getting started

```
npm install
npm run dev
```

```
npm run build     # production build
npm run preview   # preview the production build
npm run lint      # oxlint
```

## EmailJS setup (Kitchen SOS)

The `/ask` page ("Send a Kitchen SOS") sends email via [EmailJS](https://www.emailjs.com/) —
a client-side email service, so no custom backend is required. Without configuration the
form still works and validates normally, it just shows a clear "not connected yet" state
instead of pretending to send anything.

1. Create a free EmailJS account at [emailjs.com](https://www.emailjs.com/).
2. Add an **Email Service** (e.g. connect a Gmail/Outlook account) and note its **Service ID**.
3. Create an **Email Template** and note its **Template ID**.
4. In the template, map these variables (the form sends all of them):

   | Variable | Contents |
   | --- | --- |
   | `from_name` | Sender's name |
   | `reply_to` | Sender's email — set the template's "Reply To" to this |
   | `recipe` | The recipe the SOS is about |
   | `message` | What went wrong |
   | `extra_details` | Optional extra context (`—` if left blank) |
   | `image_link` | Optional link to a photo (`—` if left blank) |
   | `page_url` | The page the visitor submitted from |
   | `submitted_at` | Human-readable submission time |

5. Copy `.env.example` to `.env` and fill in your own values:

   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

   Find the **Public Key** under Account → API Keys in the EmailJS dashboard. `.env` is
   git-ignored — never commit real keys.

6. Restart `npm run dev` after adding or changing `.env` (Vite only reads it on startup).

## Structure

```
src/
  assets/      static images, fonts
  components/
    ui/        Button, Container, Section, Eyebrow, SectionHeading, PagePlaceholder
    layout/    Navbar, MobileMenu, Footer
    motion/    FadeUp, Reveal, StaggerChildren, PageTransition
  data/        static content (nav links, etc.)
  hooks/       shared hooks
  layouts/     route layouts (RootLayout)
  pages/       routed pages
  sections/    homepage/page sections
  services/    external integrations (emailService.js — EmailJS)
  styles/      additional global styles (future work)
  utils/       small helpers
```

Design tokens (colour, type, easing) live in `src/index.css` under `@theme`.
