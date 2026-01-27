<script setup lang="ts">
// Route map banner - full width with CTA overlay
// Links to the live-updates/journey page
</script>

<template>
  <section class="route-map">
    <div class="route-map__wrapper">
      <img
        src="/images/route-map.webp"
        :alt="$t('routeMap.alt')"
        loading="lazy"
        class="route-map__image"
      >
      <div class="route-map__overlay">
        <div class="route-map__content">
          <p class="route-map__label">{{ $t('routeMap.label') }}</p>
          <h3 class="route-map__title">{{ $t('routeMap.title') }}</h3>
          <NuxtLink to="/journey" class="route-map__cta">
            {{ $t('routeMap.cta') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

.route-map {
  width: 100%;

  &__wrapper {
    position: relative;
    width: 100%;
    min-height: 400px;
    max-height: 60vh;
    aspect-ratio: 16 / 7;
    overflow: hidden;

    @media (max-width: $breakpoint-md) {
      min-height: 280px;
      max-height: 50vh;
      aspect-ratio: 16 / 9;
    }

    @media (max-width: $breakpoint-sm) {
      min-height: 240px;
      aspect-ratio: 4 / 3;
    }
  }

  &__image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to right,
      rgba($warm-black, 0.75) 0%,
      rgba($warm-black, 0.5) 35%,
      rgba($warm-black, 0.2) 60%,
      transparent 100%
    );
    display: flex;
    align-items: center;
    // Align with .container: calc((100vw - 1200px) / 2 + padding)
    padding-left: max($space-8, calc((100vw - $max-width-content) / 2 + $space-8));

    @media (max-width: $breakpoint-md) {
      background: linear-gradient(
        to right,
        rgba($warm-black, 0.8) 0%,
        rgba($warm-black, 0.5) 50%,
        rgba($warm-black, 0.3) 100%
      );
      padding-left: $space-6;
    }
  }

  &__content {
    max-width: 400px;
  }

  &__label {
    font-family: $font-mono;
    font-size: $text-xs;
    letter-spacing: $tracking-widest;
    text-transform: uppercase;
    color: $terracotta-300;
    margin-bottom: $space-2;
  }

  &__title {
    font-family: $font-serif;
    font-size: clamp($text-3xl, 6vw, $text-5xl);
    text-transform: uppercase;
    letter-spacing: -0.02em;
    color: $cream;
    margin-bottom: $space-6;

    @media (max-width: $breakpoint-md) {
      margin-bottom: $space-4;
    }
  }

  &__cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: $font-mono;
    font-size: $text-sm;
    letter-spacing: $tracking-wide;
    text-transform: uppercase;
    color: $cream;
    text-decoration: none;
    padding: $space-3 $space-8;
    border: 2px solid $cream;
    background: transparent;
    transition: background 0.2s ease, color 0.2s ease;
    min-height: 48px;

    &:hover {
      background: $cream;
      color: $warm-black;
    }

    @media (max-width: $breakpoint-md) {
      padding: $space-3 $space-6;
      font-size: $text-xs;
    }
  }
}
</style>
