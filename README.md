# Abhiraffa Hamizan — Portfolio

Personal portfolio site built with Next.js (App Router), TypeScript, and
Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project structure

```
app/
  layout.tsx          Root layout, fonts, metadata
  page.tsx             Home page (composes all sections)
  globals.css          Design tokens (CSS variables) + Tailwind
  projects/[slug]/     Dynamic case study page
  not-found.tsx        404 page
components/
  Navbar, Hero, About, Skills, ProjectGrid, ProjectCard,
  ExperienceTimeline, Testimonial, Contact, ContactForm,
  CaseStudy, Footer, Button, SectionHeading
lib/
  data.ts              All content: profile, skills, projects, journey
public/
  projects/            Project thumbnails (add real images here)
```

## Editing content

Everything text-based — bio, skills, project descriptions, journey/timeline
entries — lives in `lib/data.ts`. Add a new project by adding an object to
the `projects` array; a case study page is generated automatically at
`/projects/<slug>`.

## Notes on content honesty

Some fields are intentionally left as placeholders rather than invented:

- Project `repoUrl` / `liveUrl` are `null` until real links exist — the UI
  shows "coming soon" instead of a fake link.
- Case study `results` and several other case-study fields say "not yet
  documented" — fill these in once there's real detail to share.
- The "Journey" section takes the place of a work-experience timeline, since
  there isn't one yet; add an `Experience` section the same way once there is.
- The Testimonials section is intentionally empty (structure only) — do not
  fill it with fabricated quotes.

## Deploying

This is a standard Next.js app — deploys as-is to Vercel, Netlify, or any
Node hosting. Run `npm run build` to verify a production build before
deploying.

## Before going live

- [ ] Add real project screenshots to `public/projects/`
- [ ] Fill in `liveUrl` / `repoUrl` once projects are public
- [ ] Set `metadataBase` in `app/layout.tsx` to the real deployed URL
- [ ] Replace placeholder case-study text with real detail per project
