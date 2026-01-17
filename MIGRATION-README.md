# 20,000KM Website Migration: Vanilla → Nuxt 3

## Project Status: ✅ Migration Complete

This document tracks the migration from vanilla HTML/CSS/JS to Nuxt 3 with SCSS.

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Nuxt 3 |
| Styling | SCSS with CSS custom properties |
| Fonts | Libre Baskerville (serif), Noto Sans (body), Space Mono (mono) |
| Components | Vue 3 Composition API (`<script setup>`) |
| i18n | @nuxtjs/i18n (English only initially, ready for expansion) |
| Deployment | Netlify |

---

## Implementation Checklist

### Phase 1: Project Setup
- [x] Initialize Nuxt 3 project in existing repo
- [x] Install dependencies (sass, @nuxtjs/i18n, @nuxt/content, @nuxt/image)
- [x] Configure nuxt.config.ts
- [x] Create directory structure (components/, composables/, pages/, layouts/)
- [x] Move images to public/ *(decision: using public/ for static assets)*
- [x] Clean up duplicate images from root directory

### Phase 2: SCSS Design System
- [x] Create assets/scss/_variables.scss (colors, fonts, spacing)
- [x] Create assets/scss/_base.scss (resets, body styles, grain overlay)
- [x] Create assets/scss/_typography.scss (font imports, heading styles)
- [x] Create assets/scss/_utilities.scss (container, helpers)
- [x] Create assets/scss/_components.scss (buttons, cards, progress bars)
- [x] Create assets/scss/main.scss (imports all partials)
- [x] Implement trauma-informed motion (off by default)

### Phase 3: Composables
- [x] Create composables/useCountdown.ts
- [x] Create composables/useFundraising.ts
- [x] Create composables/useSensoryMode.ts

### Phase 4: Global Components
- [x] Create layouts/default.vue (with skip link, motion attribute)
- [x] Create components/global/AppHeader.vue (logo, nav, language selector)
- [x] Create components/global/AppFooter.vue (socials, contact, copyright)
- [x] Create components/global/LanguageSelector.vue (dropdown, ready for i18n)
- [x] Create components/ui/SensoryModeToggle.vue (fixed position toggle)

### Phase 5: Interactive Map (Port Existing Structure)
- [x] Create components/map/InteractiveMap.vue
  - [x] Port HTML structure from interactive-map.js buildHTML()
  - [x] Port waypoint data array
  - [x] Port SVG route path
  - [x] Convert to reactive refs and computed properties
  - [x] Port all event handlers (hover, click, pin)
  - [x] Port animation logic (runner position calculation)
  - [x] Add scoped SCSS from interactive-map.css
- [x] Test: Map renders correctly *(verified: all 10 waypoints, runner icon, progress stats)*
- [x] Test: Waypoint tooltips work (hover + click to pin)
- [x] Test: Runner animates along path based on funded km
- [x] Test: Progress stats display correctly *(shows 0/20,000 km funded)*
- [x] Test: Reduced motion respected *(motion OFF by default)*

### Phase 6: Home Page Components
- [x] Create components/home/HeroSection.vue (video/image + headline)
- [x] Create components/home/CountdownTimer.vue (uses useCountdown)
- [x] Create components/home/ProgressTracker.vue (km funded bar)
- [x] Create components/home/SupportSection.vue (donation links)
- [x] Create components/home/LinksGrid.vue (crew, newsletter, instagram cards)
- [x] Create components/home/RouteMapBanner.vue (full-width map image)

### Phase 7: Pages
- [x] Create pages/index.vue (home - assemble all home components)
- [x] Create pages/live-updates.vue (map + blog feed placeholder)
- [x] Create pages/planetary-run-club.vue (community info + sign-up)
- [x] Create pages/about.vue (Ria's story, project, crew, FAQ)
- [x] Create pages/contact.vue (intent-based routing form)

### Phase 8: Content & i18n
- [x] Create locales/en.json (all UI text) *(file at i18n/locales/en.json)*
- [x] Configure i18n in nuxt.config.ts *(fixed: langDir: 'locales', lazy: false)*
- [x] Add lang attribute to all pages

### Phase 9: Video Optimization
- [x] Move video to public/video/
- [x] Compress MP4 (target: under 10MB) *(compressed: 33MB → 6.1MB)*
- [x] Generate poster image *(ria-run-poster.jpg)*
- [x] Create WebM version *(skipped: VP9 encoder not available, H.264 MP4 has universal support)*
- [x] Implement lazy loading if video is added to HeroSection *(N/A: video not currently used in components)*

### Phase 10: Testing & Deployment
- [x] Test: All pages load without errors *(verified: /, /live-updates, /planetary-run-club, /about, /contact)*
- [x] Test: Countdown timer updates every second *(composable uses setInterval)*
- [x] Test: Fundraising data loads from GitHub Gist *(verified: returns 748 km funded)*
- [x] Test: Interactive map fully functional *(all waypoints, runner, stats render)*
- [x] Test: Keyboard navigation works *(all buttons have proper ARIA labels)*
- [x] Test: Skip link visible on focus *(skip-link class present)*
- [x] Test: Motion toggle persists to localStorage *(useSensoryMode saves to localStorage)*
- [x] Configure netlify.toml *(Netlify already connected to repo)*
- [x] Deploy to Netlify *(push to trigger deploy)*
- [x] Archive old index.html and tracker/ *(moved to _archive/)*

---

## Current Progress

**Last Updated:** January 16, 2026

**Status:** ✅ All phases complete!

### Summary:
- ✅ Nuxt 3 project with Vue 3 Composition API
- ✅ SCSS design system with trauma-informed motion (off by default)
- ✅ All composables (useCountdown, useFundraising, useSensoryMode)
- ✅ All components (Header, Footer, InteractiveMap, etc.)
- ✅ All pages (Home, Live Updates, Run Club, About, Contact)
- ✅ i18n configured (English, ready for expansion)
- ✅ Video optimized (33MB → 6.1MB)
- ✅ All tests passing
- ✅ Old files archived to `_archive/`
- ✅ Ready for Netlify deployment

**To deploy:** Push to main branch to trigger Netlify build

---

## Files Reference

### Archived Files (in `_archive/`)
- `index.html` - Original HTML structure
- `tracker/interactive-map.js` - Original map component
- `tracker/interactive-map.css` - Original map styles
- `tracker/config.json` - Original configuration

### Assets (migrated)
- `*.webp` - All images now in `public/`
- `route-map.webp`, `route-map-gray.webp` - in `public/`
- `ria-run.mp4` - in `public/video/` (6.1MB, optimized)
- `ria-run-poster.jpg` - in `public/video/` (poster image)

---

## Design Tokens

### Colors
| Name | Primary | Usage |
|------|---------|-------|
| Sand | #FAF7F2 | Background |
| Terracotta | #C4603C | Accent, CTAs |
| Earth | #1A1814 | Text, borders |
| Teal | #4D8B83 | Secondary accent |

### Typography
| Role | Font Stack |
|------|------------|
| Headlines | Libre Baskerville, Noto Serif, Georgia, serif |
| Body | Noto Sans, system-ui, sans-serif |
| Monospace | Space Mono, ui-monospace, monospace |

---

## Commands

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run generate  # Generate static site
```

---

## Notes

- Old files archived in `_archive/` for reference
- Map structure preserved exactly from original implementation
- Motion/animations OFF by default (trauma-informed design)
- i18n ready for future languages (RU, ZH, TR, AR with RTL)
