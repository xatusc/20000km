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
         INSTAGRAM GRID - FULL BLEED
         ============================================ -->
    <InstagramGallery
      :eyebrow="$t('journey.instagram.eyebrow')"
      :title="$t('journey.instagram.title')"
    />

    <!-- ============================================
         PODCAST SECTION
         ============================================ -->
    <!-- <PodcastSection /> -->

    <!-- ============================================
         VOICE NOTES CTA (After content investment)
         ============================================ -->
    <!-- <VoiceNotesSection /> -->

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

</style>
