# Technical Design Document (TDD) — Forest Ad Land Landing Page

## 1. Overview

This document covers the technical architecture and design decisions for the **Forest Ad Land landing page** — a static, informational website that introduces the project to visitors, communicates the vision, displays the public roadmap, and directs users to community channels.

This is **not** a dApp, dashboard, or interactive Web3 product. It is a marketing/informational site.

---

## 2. Tech Stack

| Layer       | Technology                        | Rationale                                          |
|-------------|-----------------------------------|----------------------------------------------------|
| Structure   | HTML5 (semantic)                  | Simple, fast, SEO-friendly, no framework overhead  |
| Styling     | Vanilla CSS                       | Full control, no dependencies, performant          |
| Logic       | Vanilla JavaScript                | Minimal interactivity needed (animations, scroll)  |
| Fonts       | Google Fonts (e.g., Inter/Outfit) | Modern, premium typography                         |
| Hosting     | GitHub Pages / Vercel / Netlify   | Free, fast CDN, simple deployment                  |
| Assets      | Local / generated                 | No external dependencies for critical assets       |

### Why No Framework?
- The landing page is a single-page, informational site.
- No routing, state management, or complex interactivity required.
- Vanilla HTML/CSS/JS ensures maximum performance and zero build overhead.
- Easier to maintain and deploy.

---

## 3. Architecture

```
Forest Ad Land/
├── index.html          # Main landing page
├── index.css           # Global styles & design system
├── index.js            # Scroll animations, interactions, copy-to-clipboard
├── assets/
│   ├── images/         # Hero images, icons, property visuals
│   ├── logo/           # Brand logo(s)
│   └── fonts/          # (if self-hosting fonts)
├── PRD.md              # Product Requirements Document
├── TDD.md              # Technical Design Document (this file)
├── AGENT.md            # Agent guidelines
└── README.md           # Project readme (optional)
```

---

## 4. Design Philosophy

### Visual Direction
- **Web3-native aesthetic**: Dark mode, glassmorphism, neon/gradient accents, depth.
- **Forest / nature motifs**: Subtle green tones, organic shapes, particle effects or ambient visuals to connect with the "Forest" branding.
- **Premium & trustworthy**: Clean layout, generous spacing, modern typography. Should feel like a serious project, not a pump-and-dump.
- **Responsive**: Fully responsive across desktop, tablet, and mobile.

### Motion & Interactivity
- Scroll-triggered reveal animations (fade-in, slide-up).
- Hover effects on interactive elements (buttons, cards, links).
- Smooth scrolling navigation.
- Copy-to-clipboard for the contract address (CA).
- Potential: ambient particle/canvas animation in the hero section.

### Color Palette (Preliminary — pending client assets)
- **Primary**: Deep forest green (#0A1F0D or similar)
- **Accent**: Vibrant green / emerald glow (#00FF88 or similar)
- **Background**: Near-black (#0A0A0A to #111111)
- **Text**: White / light gray
- **Glass**: Semi-transparent white/green with backdrop blur

---

## 5. Page Sections (Technical Breakdown)

| #  | Section              | HTML Element     | Key Features                                       |
|----|----------------------|------------------|----------------------------------------------------|
| 1  | Navigation           | `<nav>`          | Fixed, transparent, logo + links, mobile hamburger  |
| 2  | Hero                 | `<section>`      | Full viewport, headline, tagline, CTA buttons       |
| 3  | About / Vision       | `<section>`      | Two-column or centered text block                   |
| 4  | How It Works         | `<section>`      | Icon/card grid (3-4 cards)                          |
| 5  | Token Utility        | `<section>`      | Feature list + CA with copy button                  |
| 6  | Property Types       | `<section>`      | Card grid showing land categories                   |
| 7  | Roadmap              | `<section>`      | Vertical timeline with phase markers                |
| 8  | Early Benefits       | `<section>`      | Highlight cards or list                             |
| 9  | Community / CTA      | `<section>`      | Social links, join buttons, email                   |
| 10 | Footer               | `<footer>`       | CA, disclaimer, copyright, social icons             |

---

## 6. SEO Strategy

- Semantic HTML5 elements (`<header>`, `<main>`, `<section>`, `<footer>`).
- Single `<h1>` with proper heading hierarchy.
- `<meta>` tags: title, description, Open Graph, Twitter Card.
- Alt text on all images.
- Descriptive, unique IDs on all interactive elements.
- Fast load times (no heavy frameworks, optimized images).

---

## 7. Performance Targets

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Total page weight**: < 2MB (target)
- **Lighthouse score**: 90+ across all categories

---

## 8. Deployment

- Static site — no server required.
- Can be deployed to GitHub Pages, Vercel, or Netlify with zero configuration.
- No build step required (vanilla HTML/CSS/JS).

---

## 9. Dependencies

**None.** The site has zero external JavaScript or CSS dependencies. Google Fonts loaded via `<link>` tag.

---

## 10. Open Items (Pending Client Input)

- [ ] Brand logo / wordmark
- [ ] Preferred color palette or brand guidelines
- [ ] Hero image or visual direction
- [ ] Any specific reference websites to draw inspiration from
- [ ] Exact roadmap phases and milestones
- [ ] Any legal disclaimers required
- [ ] Preferred hosting platform
