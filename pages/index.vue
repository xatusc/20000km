<script setup lang="ts">
// Home page
useSeoMeta({
  title: '20,000KM | Planetary Neighborhood Run',
  description: 'One woman. 20,000 kilometers. Vladivostok to Lisbon. A Planetary Neighborhood Run.'
})
</script>

<template>
  <div class="container">
    <!-- Hero Section -->
    <main class="hero">
      <div class="hero-content">
        <HeroSection />
        <CountdownTimer />
      </div>
    </main>

    <!-- Route Map Banner -->
    <RouteMapBanner />

    <!-- Support Section with Interactive Map -->
    <SupportSection />

    <!-- Links Grid -->
    <LinksGrid />
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

.hero {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: $space-8 0;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $space-16;
  align-items: center;

  @media (max-width: $breakpoint-xl) {
    grid-template-columns: 1fr;
    gap: $space-12;
    text-align: center;
  }
}
</style>
