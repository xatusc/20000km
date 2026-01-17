<script setup lang="ts">
// Hero section with cream background aesthetic
</script>

<template>
  <div class="hero-section">
    <p class="hero-kicker">Retracing the Silk Road on foot</p>

    <h1 class="hero-title">
      <span class="hero-number">20,000</span>
      <span class="hero-unit">kilometers</span>
    </h1>

    <p class="hero-subtitle">
      The first human to run across Asia and Europe.<br>
      One woman. Seventeen countries. Pacific to Atlantic.
    </p>

    <a
      href="https://gofund.me/8d624216"
      target="_blank"
      rel="noopener noreferrer"
      class="hero-cta"
    >
      Support the Journey
    </a>

    <p class="hero-tagline">"Only delusional until it's not"</p>
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

.hero-section {
  text-align: center;
  padding: $space-16 0 $space-12;
}

.hero-kicker {
  font-family: $font-mono;
  font-size: $text-xs;
  letter-spacing: $tracking-widest;
  text-transform: uppercase;
  color: $sage;
  margin-bottom: $space-6;
}

.hero-title {
  margin-bottom: $space-6;
}

.hero-number {
  display: block;
  font-family: $font-serif;
  font-size: clamp(4rem, 15vw, 9rem);
  font-weight: 400;
  line-height: 0.9;
  letter-spacing: $tracking-tighter;
  color: $warm-black;
}

.hero-unit {
  display: block;
  font-family: $font-mono;
  font-size: clamp($text-sm, 3vw, $text-lg);
  letter-spacing: $tracking-widest;
  text-transform: uppercase;
  color: $terracotta;
  margin-top: $space-2;
}

.hero-subtitle {
  font-size: clamp($text-base, 2.5vw, $text-lg);
  line-height: $leading-relaxed;
  color: $earth-600;
  margin-bottom: $space-8;
  max-width: 550px;
  margin-inline: auto;
}

.hero-cta {
  display: inline-block;
  background: $terracotta;
  color: $cream;
  padding: $space-4 $space-8;
  font-family: $font-mono;
  font-size: $text-sm;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  text-decoration: none;
  border: 2px solid $terracotta;
  transition: background 0.2s ease, color 0.2s ease;
  min-height: 48px;

  &:hover {
    background: $terracotta-600;
    border-color: $terracotta-600;
  }
}

.hero-tagline {
  font-family: $font-serif;
  font-style: italic;
  font-size: $text-lg;
  color: $terracotta;
  margin-top: $space-8;
}

@media (max-width: $breakpoint-md) {
  .hero-subtitle br {
    display: none;
  }
}
</style>
