<script setup lang="ts">
// Home page structure (simplified, story-focused):
// 1. Hero (full-bleed video/image background)
// 2. Story Section (the personal narrative)
// 3. Pull Quote (visual break with impactful quote)
// 4. Route Map Banner (full-width with CTA to journey page)

useSeoMeta({
  title: '20,000KM | The First Human to Run the Silk Road',
  description: 'One woman. 20,000 kilometers. Seventeen countries. The first human to run across Asia and Europe, retracing the ancient Silk Road on foot.'
})
</script>

<template>
  <div class="home">
    <!-- 1. Hero Section -->
    <HeroSection />

    <div class="container">
      <!-- 2. Story Section -->
      <StorySection />
    </div>

    <!-- 3. Pull Quote (full-width) -->
    <PullQuote />

    <!-- 4. Route Map Banner (full-width with CTA) -->
    <RouteMapBanner />
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

.home {
  // Home page wrapper
}
</style>
