<script setup lang="ts">
// Live tracker — embeds zerosixzero.com map
useSeoMeta({
  title: 'Live Tracker | 20,000KM',
  description: 'Follow Ria live across Asia and Europe. Real-time tracking of the 20,000km run from Vladivostok to Lisbon, powered by ZeroSixZero.'
})
</script>

<template>
  <div class="tracker-page">
    <section class="tracker-hero">
      <div class="container">
        <header class="hero-header">
          <span class="hero-eyebrow">{{ $t('tracker.eyebrow') }}</span>
          <h1 class="hero-title">{{ $t('tracker.title') }}</h1>
          <p class="hero-tagline">{{ $t('tracker.tagline') }}</p>
        </header>
      </div>

      <div class="tracker-frame-wrap">
        <iframe
          src="https://zerosixzero.com/whereisriax/20000km"
          class="tracker-frame"
          title="ZeroSixZero live tracking map"
          loading="lazy"
          allow="geolocation; fullscreen"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <div class="container">
        <p class="tracker-fallback">
          {{ $t('tracker.fallback') }}
          <a href="https://zerosixzero.com/whereisriax/20000km" target="_blank" rel="noopener">
            zerosixzero.com/whereisriax/20000km
          </a>
        </p>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

.tracker-page {
  position: relative;
}

.tracker-hero {
  padding: $space-10 0 $space-8;
  background: $sand-100;
}

.hero-header {
  text-align: center;
  margin-bottom: $space-8;
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
  font-size: clamp($text-4xl, 8vw, 5rem);
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

.tracker-frame-wrap {
  width: 100%;
  aspect-ratio: 16 / 10;
  max-height: calc(100vh - 220px);
  min-height: 520px;
  background: $warm-black;
  border-top: 3px solid $warm-black;
  border-bottom: 3px solid $warm-black;
  margin-bottom: $space-6;
}

.tracker-frame {
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
}

.tracker-fallback {
  text-align: center;
  font-family: $font-mono;
  font-size: $text-sm;
  color: $a11y-text-secondary;
  margin: 0 auto $space-12;

  a {
    color: $terracotta-700;
    text-decoration: underline;
    text-underline-offset: 2px;

    &:hover { color: $terracotta-800; }
  }
}
</style>
