# UNEVENT

UNEVENT is a risk advisory website covering cyber, legal, compliance and technology risk. The tagline is "Make Risk a Non-Event." The site presents four connected practices, the approach behind them, industries served, insights, scenarios, and ways to get in touch or book a consultation.

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS 4 (via `@tailwindcss/vite`)
- Framer Motion (loaded lazily through `LazyMotion`)
- React Router 7
- ESLint 10 with the React Hooks and React Refresh plugins
- React Compiler (via Babel)

## Getting Started

Requirements: Node.js 20 or later and npm.

```bash
npm install
npm run dev
```

The dev server starts on `http://localhost:5173` by default.

## Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite development server    |
| `npm run build`   | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint on the project            |

## Pages and Routes

| Route                | Page                                  |
| -------------------- | ------------------------------------- |
| `/`                  | Home                                  |
| `/practice/protect`  | Protect (cyber risk)                  |
| `/practice/counsel`  | Counsel (legal and commercial risk)   |
| `/practice/govern`   | Govern (compliance and controls)      |
| `/practice/labs`     | Labs (technology and automation)      |
| `/industries`        | Industries                            |
| `/insights`          | Insights                              |
| `/case-studies`      | Scenarios                             |
| `/about`             | About                                 |
| `/contact`           | Contact                               |
| `/book`              | Book a Consultation                   |

Practice pages are discovered automatically: any file in `src/pages/` that matches `*Page.jsx` is registered as `/practice/<name>`.

The home page is made of these sections, in navbar order: Hero, Marquee, Our Practices, Our Approach, Industries, Insights, About, Contact.

## Project Structure

```
src/
  App.jsx                Routes, lazy loading and layout
  Home.jsx               Home page sections
  main.jsx               App entry point
  index.css              Tailwind theme, fonts and animations
  components/
    Navbar.jsx           Desktop mega menu, mobile drawer, scroll progress
    Hero.jsx             Hero with the animated shield visual
    Marquee.jsx          Scrolling "become a non-event" strip
    ServicesSection.jsx  Our Practices cards
    ApproachSection.jsx  Our Approach timeline
    Footer.jsx           Site footer
    service/             Shared layout for the four practice pages
    ui/                  Reusable UI pieces (logo, charts, buttons, skeletons)
  data/                  Site content (services, about, contact, hero, booking)
  hooks/                 usePageMeta for titles and descriptions
  lib/                   Motion presets, pointer helpers, form helpers
  pages/                 Practice, industries, insights, scenarios and careers pages
public/                  Favicon, icons and robots.txt
```

## Content

Most of the copy lives in `src/data/`. Update those files to change page content without touching the components.

## Design Notes

- Theme colors: navy `#0B1730`, blue `#1473E6`, yellow `#F5B82E`
- Fonts: Manrope for body text and Sora for display headings
- Heavy sections are lazy-loaded and only fetched when they approach the viewport
- Animations respect the user's reduced-motion setting
- The layout is responsive from mobile to large desktop screens

## Deployment

The project includes a `vercel.json` that rewrites all routes to `index.html`, so client-side routing works on Vercel. Run `npm run build` and deploy the `dist/` folder to any static host, making sure unknown paths fall back to `index.html`.
