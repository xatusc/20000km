<script setup lang="ts">
// Route map banner - full width with CTA overlay
// Links to the live-updates/journey page
</script>

<template>
  <section class="route-map-section">
    <div class="route-map-wrapper">
      <img
        src="/route-map.webp"
        alt="Route from Vladivostok to Cabo da Roca"
        loading="lazy"
        class="route-map-image"
      >
      <div class="route-map-overlay">
        <div class="route-map-content">
          <p class="route-map-label">Pacific to Atlantic</p>
          <h3 class="route-map-title">The Route</h3>
          <NuxtLink to="/live-updates" class="route-map-cta">
            Follow in real-time
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

.route-map-section {
  // Full-width bleed
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-top: $space-8;
  margin-bottom: $space-8;
}

.route-map-wrapper {
  position: relative;
  height: 350px;

  @media (max-width: $breakpoint-md) {
    height: 220px;
  }
}

.route-map-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.route-map-overlay {
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
  padding-left: $space-12;

  @media (max-width: $breakpoint-lg) {
    padding-left: $space-8;
  }

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

.route-map-content {
  max-width: 400px;
}

.route-map-label {
  font-family: $font-mono;
  font-size: $text-xs;
  letter-spacing: $tracking-widest;
  text-transform: uppercase;
  color: $terracotta-300;
  margin-bottom: $space-2;
}

.route-map-title {
  font-family: $font-serif;
  font-size: clamp($text-2xl, 4vw, $text-4xl);
  color: $cream;
  margin-bottom: $space-6;

  @media (max-width: $breakpoint-md) {
    margin-bottom: $space-4;
  }
}

.route-map-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: $font-mono;
  font-size: $text-sm;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  color: $cream;
  text-decoration: none;
  padding: $space-3 $space-6;
  border: $border-width solid $cream;
  background: transparent;
  transition: background 0.2s ease, color 0.2s ease;
  min-height: 44px;

  &:hover {
    background: $cream;
    color: $warm-black;
  }

  @media (max-width: $breakpoint-md) {
    padding: $space-2 $space-4;
    font-size: $text-xs;
  }
}
</style>
