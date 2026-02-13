

# Luca Berger Personal Website V1

## Overview
A clean, Apple-esque single-page personal website for Luca Berger — a digital monument showcasing identity, global experience, and professional background. White background, red accents, Inter font, minimal and confident.

---

## Section 1: Navigation Bar
- Sticky top navigation with pill-style tabs: **Home, Map, Experience, Contact**
- Active tab highlighted in red with white text; hover shows light gray
- Smooth scroll to corresponding sections on click
- Auto-updates active state based on scroll position
- Mobile: hamburger menu opening a full-screen overlay with vertical nav items

## Section 2: Hero Section
- Full viewport height
- Large centered heading: **"Luca Berger"** with subheading below
- Below the text: a **continuous auto-scrolling horizontal card carousel** using Framer Motion
  - 3–5 portrait/square image cards with heavy rounded corners and subtle shadows
  - Infinite seamless loop scrolling left-to-right at constant speed
  - No manual controls (no arrows, dots, or drag)
  - Responsive: 2–3 cards visible on desktop, 1 on mobile with edges peeking
  - Placeholder images until real photos are provided

## Section 3: Map Section — "Where I've Been"
- Interactive world map using **React-Leaflet** with a clean, minimal tile style
- **Red pins** for places lived (Japan, Singapore, USA, France — placeholder cities)
- **Green pins** for places traveled (placeholder countries)
- Clicking a pin opens a popup card showing country name and cities visited
- Responsive with touch-friendly pin targets on mobile

## Section 4: Work Section — "Experience"
- Responsive logo grid (4 columns desktop → 2 tablet → 1 mobile)
- Full-color company logos in white cards with subtle shadow
- Hover lift effect on desktop
- Placeholder logos for: Ultra Super New, UFC, RIZIN Fighting Federation
- No links in V1, just visual display

## Section 5: Footer — "Find Me Elsewhere"
- Horizontal row of social icons: LinkedIn, Twitter/X, Instagram, GitHub, Email
- Icons are black by default, turn red on hover with slight scale
- Links open in new tabs (email opens mailto:)
- Copyright line: "© 2025 Luca Berger"

---

## Cross-Cutting Concerns
- **Typography**: Inter font throughout, tight letter spacing for headings
- **Color palette**: White background, black text, red (#FF0000) accent, light grays for subtle elements
- **Responsive design**: Desktop (1024+), Tablet (768–1023), Mobile (<768)
- **Accessibility**: Semantic HTML, alt text, keyboard navigation, focus states, reduced motion support
- **Performance**: Lazy loading for images, smooth 60fps animations

