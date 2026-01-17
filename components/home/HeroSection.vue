<script setup lang="ts">
// Hero section with full-bleed video/image background
// Video only plays when motion is enabled (respects sensory preferences)
// Text directly on overlay - no floating card
const { motionAllowed } = useSensoryMode()
</script>

<template>
  <section class="hero-section" :class="{ 'hero-section--motion': motionAllowed }">
    <!-- Background -->
    <div class="hero-background">
      <!-- Video mode (motion enabled) -->
      <template v-if="motionAllowed">
        <video
          class="hero-media"
          autoplay
          muted
          loop
          playsinline
          poster="/Ria_farawayrun_horizontal.webp"
        >
          <source src="/video/ria-run.mp4" type="video/mp4">
        </video>
        <div class="hero-overlay hero-overlay--dark"></div>
      </template>

      <!-- Static mode (motion disabled) -->
      <template v-else>
        <img
          src="/Ria_farawayrun_horizontal.webp"
          alt=""
          class="hero-media"
          loading="eager"
        >
        <div class="hero-overlay hero-overlay--light"></div>
      </template>
    </div>

    <!-- Hero Content - directly on overlay, no card -->
    <div class="hero-content">
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
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

.hero-section {
  position: relative;
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  // Break out of container
  margin: (-$space-12) calc(-50vw + 50%) 0;
  width: 100vw;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-media {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
}

.hero-overlay {
  position: absolute;
  inset: 0;

  // Dark overlay for video - light text
  &--dark {
    background: linear-gradient(
      to bottom,
      rgba($warm-black, 0.5) 0%,
      rgba($warm-black, 0.35) 40%,
      rgba($warm-black, 0.4) 70%,
      rgba($warm-black, 0.6) 100%
    );
  }

  // Light overlay for static image - dark text
  &--light {
    background: linear-gradient(
      to bottom,
      rgba($cream, 0.75) 0%,
      rgba($cream, 0.6) 40%,
      rgba($cream, 0.65) 70%,
      rgba($cream, 0.8) 100%
    );
  }
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: $space-16 $space-8;
  max-width: 700px;
}

// Default: dark text for static/light overlay
.hero-kicker {
  font-family: $font-mono;
  font-size: $text-xs;
  letter-spacing: $tracking-widest;
  text-transform: uppercase;
  color: $earth-600;
  margin-bottom: $space-6;
}

.hero-title {
  margin-bottom: $space-6;
}

.hero-number {
  display: block;
  font-family: $font-serif;
  font-size: clamp(4rem, 15vw, 8rem);
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
  color: $earth-700;
  margin-bottom: $space-8;
  max-width: 550px;
  margin-inline: auto;
}

.hero-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: $terracotta-700;
  color: $cream;
  padding: $space-4 $space-10;
  font-family: $font-mono;
  font-size: $text-sm;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  text-decoration: none;
  border: 2px solid $terracotta-700;
  transition: background 0.2s ease, transform 0.2s ease;
  min-height: 52px;

  &:hover {
    background: $terracotta-800;
    border-color: $terracotta-800;
    transform: translateY(-2px);
  }
}

.hero-tagline {
  font-family: $font-serif;
  font-style: italic;
  font-size: $text-lg;
  color: $terracotta;
  margin-top: $space-8;
}

// Motion mode: light text on dark overlay
.hero-section--motion {
  .hero-kicker {
    color: rgba($cream, 0.85);
  }

  .hero-number {
    color: $cream;
    text-shadow: 0 2px 20px rgba($warm-black, 0.3);
  }

  .hero-unit {
    color: $terracotta-300;
  }

  .hero-subtitle {
    color: rgba($cream, 0.9);
  }

  .hero-tagline {
    color: $terracotta-300;
  }
}

// Mobile adjustments
@media (max-width: $breakpoint-md) {
  .hero-section {
    min-height: 60vh;
  }

  .hero-content {
    padding: $space-10 $space-4;
  }

  .hero-cta {
    width: 100%;
    max-width: 280px;
  }

  .hero-subtitle br {
    display: none;
  }

  .hero-tagline {
    font-size: $text-base;
  }
}
</style>
