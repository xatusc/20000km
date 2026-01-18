<script setup lang="ts">
/**
 * The Journey page - Vintage expedition documentary experience
 * Structure:
 * 1. Map Hero (dramatic countdown + full-width map)
 * 2. Dispatches (Substack)
 * 3. Podcast Section
 * 4. Instagram Grid (full-bleed)
 * 5. Voice Notes CTA (after investment)
 */

useSeoMeta({
  title: 'The Journey | 20,000KM',
  description: 'Follow the live progress of the 20,000km run from Vladivostok to Lisbon. Stories, podcast, and updates from the Silk Road.'
})

</script>

<template>
  <div class="journey-page">
    <!-- Grain texture overlay -->
    <div class="grain-overlay" aria-hidden="true"></div>

    <!-- ============================================
         MAP HERO SECTION
         ============================================ -->
    <section ref="heroRef" class="map-hero">
      <div class="container">
        <!-- Page title - dramatic -->
        <header class="hero-header">
          <span class="hero-eyebrow">Expedition Log</span>
          <h1 class="hero-title">The Journey</h1>
          <p class="hero-tagline">20,000 kilometers · 17 countries · One step at a time</p>
        </header>

        <!-- Countdown -->
        <div class="hero-countdown">
          <CountdownTimer />
        </div>

        <!-- Full-width Interactive Map (milestones now on Support page) -->
        <div class="hero-map">
          <InteractiveMap :show-milestones="false" />
        </div>
      </div>
    </section>

    <!-- ============================================
         DISPATCHES (Substack)
         ============================================ -->
    <section class="dispatches-section">
      <div class="container">
        <header class="section-header">
          <span class="section-eyebrow">Field Notes</span>
          <h2 class="section-heading">Dispatches</h2>
          <p class="section-subhead">Stories from the Long Run Letters</p>
        </header>
        <div class="dispatches-content">
          <SubstackFeed />
        </div>
      </div>
    </section>

    <!-- ============================================
         PODCAST SECTION
         ============================================ -->
    <PodcastSection />

    <!-- ============================================
         INSTAGRAM GRID - FULL BLEED
         ============================================ -->
    <section class="instagram-section">
      <div class="container">
        <header class="section-header">
          <span class="section-eyebrow">From the Field</span>
          <h2 class="section-heading">Training & Prep</h2>
          <a
            href="https://instagram.com/whereisriax"
            target="_blank"
            rel="noopener noreferrer"
            class="section-link"
          >
            @whereisriax →
          </a>
        </header>
      </div>

      <!-- Full-bleed image strip -->
      <div class="instagram-strip">
        <a
          v-for="(image, index) in [
            { src: '/Ria_lookback.webp', alt: 'Ria pausing to look back at the trail' },
            { src: '/Ria_run_2.webp', alt: 'Ria in motion during a training run' },
            { src: '/sinai-run.webp', alt: 'Golden hour run through Sinai desert' },
            { src: '/Ria_truck.webp', alt: 'Ria beside the support vehicle' },
            { src: '/Ria_flash.webp', alt: 'Ria running at dusk' },
            { src: '/Ria_farawayrun_horizontal.webp', alt: 'Distant shot of Ria running on trail' },
            { src: '/Ria_teamrun_horizontal.webp', alt: 'Ria running with team' },
            { src: '/Ria_team_horizontal.webp', alt: 'Ria and team together' }
          ]"
          :key="index"
          href="https://instagram.com/whereisriax"
          target="_blank"
          rel="noopener noreferrer"
          class="instagram-item"
        >
          <img :src="image.src" :alt="image.alt" loading="lazy">
        </a>
      </div>
    </section>

    <!-- ============================================
         VOICE NOTES CTA (After content investment)
         ============================================ -->
    <VoiceNotesSection />

  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

.journey-page {
  position: relative;
}

// ============================================
// GRAIN TEXTURE OVERLAY
// ============================================
.grain-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1000;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E");
}

// ============================================
// MAP HERO SECTION
// ============================================

.map-hero {
  padding: $space-16 0 $space-20;
  background: $sand-100; // Flat, no gradient
}

.hero-header {
  text-align: center;
  margin-bottom: $space-12;
}

.hero-eyebrow {
  display: block;
  font-family: $font-mono;
  font-size: $text-xs;
  letter-spacing: $tracking-widest;
  text-transform: uppercase;
  color: $terracotta-700;
  margin-bottom: $space-4;
}

.hero-title {
  font-family: $font-serif;
  font-size: clamp($text-5xl, 10vw, 6rem);
  font-weight: 400;
  line-height: 0.9;
  color: $warm-black;
  margin: 0 0 $space-4 0;
  letter-spacing: -0.03em;
  text-transform: uppercase;
}

.hero-tagline {
  font-family: $font-mono;
  font-size: $text-sm;
  letter-spacing: $tracking-wider;
  color: $earth-500;
  margin: 0;
  text-transform: uppercase;
}

.hero-countdown {
  margin: 0 auto $space-12;
  max-width: 600px;
  background: $warm-black;
  padding: $space-8 $space-10;
  border: 2px solid $warm-black;
  text-align: center;

  // Invert countdown colors for dark background
  :deep(.countdown) {
    .countdown__label {
      color: $terracotta-400;
    }

    .countdown__number {
      color: $cream;
    }

    .countdown__unit {
      color: rgba($cream, 0.85);
    }
  }
}

// ============================================
// SECTION HEADERS - BOLD VINTAGE
// ============================================

.section-header {
  margin-bottom: $space-10;
  text-align: center;
}

.section-eyebrow {
  display: block;
  font-family: $font-mono;
  font-size: $text-xs;
  letter-spacing: $tracking-widest;
  text-transform: uppercase;
  color: $terracotta-700;
  margin-bottom: $space-3;
}

.section-heading {
  font-family: $font-serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 400;
  color: $warm-black;
  margin: 0;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.section-subhead {
  font-family: $font-serif;
  font-style: italic;
  font-size: $text-base;
  color: $earth-500;
  margin: $space-2 0 0 0;
}

.section-link {
  display: inline-block;
  margin-top: $space-4;
  font-family: $font-mono;
  font-size: $text-sm;
  letter-spacing: $tracking-wide;
  color: $terracotta-700;
  text-decoration: none;
  text-transform: uppercase;
  border-bottom: 1px solid $terracotta-700;
  padding-bottom: 2px;
  transition: color $transition-base;

  &:hover {
    color: $terracotta-800;
  }
}

// ============================================
// DISPATCHES SECTION
// ============================================

.dispatches-section {
  padding: $space-20 0;
  background: $cream; // Flat
}

.dispatches-content {
  max-width: 700px;
  margin: 0 auto;
}

// ============================================
// INSTAGRAM SECTION
// ============================================

.instagram-section {
  padding: $space-20 0;
  background: $sand-100; // Flat
}

// Full-bleed horizontal scroll strip
.instagram-strip {
  display: flex;
  gap: $space-4;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding: 0 $space-4;
  margin-bottom: $space-10;

  // Hide scrollbar
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
}

.instagram-item {
  flex-shrink: 0;
  width: 300px;
  height: 300px;
  scroll-snap-align: start;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: 3px solid $warm-black;
    transition: transform $transition-slow;
  }

  &:hover img {
    transform: scale(1.03);
  }

  @media (max-width: $breakpoint-md) {
    width: 240px;
    height: 240px;
  }
}

</style>
