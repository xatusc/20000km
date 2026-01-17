<script setup lang="ts">
// Teaser section linking to The Journey page
</script>

<template>
  <section class="journey-teaser">
    <div class="journey-content">
      <h2 class="journey-title">Follow the Journey</h2>
      <p class="journey-desc">
        Stories from the ground. Conversations with runners joining the route.
        Dispatches from seventeen countries and the communities along the way.
      </p>
      <NuxtLink to="/live-updates" class="journey-link">
        See the Route &amp; Stories
      </NuxtLink>
    </div>

    <div class="journey-visual">
      <img
        src="/route-map.webp"
        alt="Route map from Vladivostok to Lisbon"
        loading="lazy"
      >
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

.journey-teaser {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: $space-8;
  align-items: center;
  padding: $space-12 0;
  border-bottom: $border-width solid $warm-black;

  @media (max-width: $breakpoint-xl) {
    grid-template-columns: 1fr;
    text-align: center;
  }
}

.journey-title {
  font-family: $font-serif;
  font-size: $text-2xl;
  margin-bottom: $space-4;
}

.journey-desc {
  font-size: $text-base;
  line-height: $leading-relaxed;
  color: $earth-600;
  margin-bottom: $space-6;
  max-width: 400px;

  @media (max-width: $breakpoint-xl) {
    margin-inline: auto;
  }
}

.journey-link {
  display: inline-block;
  font-family: $font-mono;
  font-size: $text-sm;
  letter-spacing: $tracking-wide;
  color: $cream;
  background: $warm-black;
  text-decoration: none;
  padding: $space-3 $space-6;
  border: $border-width solid $warm-black;
  transition: background 0.2s ease, color 0.2s ease;
  min-height: 48px;

  &:hover {
    background: transparent;
    color: $warm-black;
  }
}

.journey-visual {
  img {
    width: 100%;
    border-radius: $border-radius-md;
  }

  @media (max-width: $breakpoint-xl) {
    order: -1;
  }
}
</style>
