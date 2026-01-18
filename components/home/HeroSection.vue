<script setup lang="ts">
// Minimalist hero - full-screen video with just the number
// Everything else below the fold to encourage scrolling
const { motionAllowed } = useSensoryMode()
</script>

<template>
  <section class="hero" :class="{ 'hero--motion': motionAllowed }">
    <!-- Background -->
    <div class="hero__background">
      <template v-if="motionAllowed">
        <video
          class="hero__media"
          autoplay
          muted
          loop
          playsinline
          poster="/Ria_farawayrun_horizontal.webp"
          aria-label="Ria running across a vast open landscape at sunset, silhouetted against the horizon"
        >
          <source src="/video/ria-run.mp4" type="video/mp4">
          <track kind="descriptions" src="/video/ria-run-descriptions.vtt" srclang="en" label="English descriptions">
        </video>
        <div class="hero__overlay hero__overlay--dark"></div>
      </template>

      <template v-else>
        <img
          src="/Ria_farawayrun_horizontal.webp"
          alt="Ria running alone across a vast open landscape, silhouetted against the horizon"
          class="hero__media"
          loading="eager"
        >
        <div class="hero__overlay hero__overlay--light"></div>
      </template>
    </div>

    <!-- Minimal Content -->
    <div class="hero__content">
      <h1 class="hero__title">
        <span class="hero__number">20<span class="hero__comma">,</span>000</span>
        <span class="hero__unit">kilometers</span>
      </h1>

      <p class="hero__tagline">"Only delusional until it's not"</p>
    </div>

    <!-- Scroll indicator -->
    <div class="hero__scroll" aria-hidden="true">
      <span class="hero__scroll-text">Scroll</span>
      <span class="hero__scroll-line"></span>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

.hero {
  position: relative;
  // Account for sticky header (approx 70px)
  height: calc(100vh - 70px);
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  // Full-width bleed
  margin: (-$space-12) calc(-50vw + 50%) 0;
  width: 100vw;
  overflow: hidden;
}

.hero__background {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero__media {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
}

.hero__overlay {
  position: absolute;
  inset: 0;

  &--dark {
    background: linear-gradient(
      to bottom,
      rgba($warm-black, 0.55) 0%,
      rgba($warm-black, 0.4) 50%,
      rgba($warm-black, 0.6) 100%
    );
  }

  &--light {
    background: linear-gradient(
      to bottom,
      rgba($cream, 0.6) 0%,
      rgba($cream, 0.4) 50%,
      rgba($cream, 0.7) 100%
    );
  }
}

.hero__content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: $space-8;
}

.hero__title {
  margin: 0;
}

.hero__number {
  display: block;
  font-family: $font-serif;
  font-size: clamp(5rem, 20vw, 14rem);
  font-weight: 400;
  line-height: 0.85;
  letter-spacing: -0.04em;
  color: $warm-black;
}

.hero__comma {
  font-size: 0.6em;
}

.hero__unit {
  display: block;
  font-family: $font-mono;
  font-size: clamp($text-base, 4vw, $text-2xl);
  letter-spacing: $tracking-widest;
  text-transform: uppercase;
  color: $terracotta-700;
  margin-top: $space-4;
}

.hero__tagline {
  font-family: $font-serif;
  font-style: italic;
  font-size: clamp($text-lg, 3vw, $text-2xl);
  color: $earth-600;
  margin-top: $space-8;
}

// Scroll indicator
.hero__scroll {
  position: absolute;
  bottom: $space-8;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $space-2;
  z-index: 1;
}

.hero__scroll-text {
  font-family: $font-mono;
  font-size: $text-xs;
  letter-spacing: $tracking-widest;
  text-transform: uppercase;
  color: $earth-500;
}

.hero__scroll-line {
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, $earth-300, transparent);
}

// Motion mode: light text
.hero--motion {
  .hero__number {
    color: $cream;
    text-shadow: 0 4px 40px rgba($warm-black, 0.3);
  }

  .hero__unit {
    color: $terracotta-300;
  }

  .hero__tagline {
    color: rgba($cream, 0.9);
  }

  .hero__scroll-text {
    color: rgba($cream, 0.7);
  }

  .hero__scroll-line {
    background: linear-gradient(to bottom, rgba($cream, 0.5), transparent);
  }
}

// Mobile
@media (max-width: $breakpoint-md) {
  .hero {
    height: calc(100vh - 60px);
    height: calc(100svh - 60px); // Modern browsers with svh support
    min-height: 450px;
  }

  .hero__tagline {
    margin-top: $space-6;
  }

  .hero__scroll {
    bottom: $space-6;
  }
}
</style>
