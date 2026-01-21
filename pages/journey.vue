<script setup lang="ts">
/**
 * The Journey page - Vintage expedition documentary experience
 * Structure:
 * 1. Map Hero (dramatic countdown + full-width map)
 * 2. Instagram Grid (full-bleed)
 * 3. Podcast Section
 * 4. Voice Notes CTA (after investment)
 */

useHead({
  script: [
    { src: 'https://cdn.lightwidget.com/widgets/lightwidget.js', async: true }
  ]
})

useSeoMeta({
  title: 'The Journey | 20,000KM',
  description: 'Follow the progress of the 20,000km run from Vladivostok to Lisbon. Updates from the Silk Road.'
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
          <span class="hero-eyebrow">{{ $t('journey.eyebrow') }}</span>
          <h1 class="hero-title">{{ $t('journey.title') }}</h1>
          <p class="hero-tagline">{{ $t('journey.tagline') }}</p>
        </header>

        <!-- Countdown -->
        <div class="hero-countdown">
          <CountdownTimer :show-date="false" />
        </div>

        <!-- Full-width Interactive Map (milestones now on Support page) -->
        <div class="hero-map">
          <InteractiveMap :show-milestones="false" />
        </div>
      </div>
    </section>

    <!-- ============================================
         INSTAGRAM GRID - FULL BLEED (moved to first)
         ============================================ -->
    <section class="instagram-section">
      <div class="container">
        <header class="section-header">
          <span class="section-eyebrow">{{ $t('journey.instagram.eyebrow') }}</span>
          <h2 class="section-heading">{{ $t('journey.instagram.title') }}</h2>
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

      <!-- LightWidget Instagram embed -->
      <div class="lightwidget-container">
        <iframe
          src="https://cdn.lightwidget.com/widgets/b5655f5969955de3b8508c977c21c321.html"
          scrolling="no"
          allowtransparency="true"
          class="lightwidget-widget"
          style="width:100%;border:0;overflow:hidden;"
        ></iframe>
      </div>
    </section>

    <!-- ============================================
         PODCAST SECTION
         ============================================ -->
    <PodcastSection />

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
  text-align: center;
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
// INSTAGRAM SECTION
// ============================================

.instagram-section {
  padding: $space-20 0;
  background: $sand-100; // Flat
}

// LightWidget embed - full bleed
.lightwidget-container {
  width: 100%;
}

.lightwidget-widget {
  width: 100%;
  height: 400px;
  border: 0;
  overflow: hidden;
}

</style>
