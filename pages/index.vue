<script setup lang="ts">
// Home page structure:
// 1. Hero (cream background, centered text)
// 2. Video Banner (cinematic visual break)
// 3. Progress Teaser (km funded progress bar)
// 4. Route Map Banner (full-width visual break)
// 5. Story Section (the "why")
// 6. Support Section (simplified, single CTA)
// 7. Journey Teaser (stories from the ground)
// 8. Links Grid (secondary actions)

useSeoMeta({
  title: '20,000KM | The First Human to Run the Silk Road',
  description: 'One woman. 20,000 kilometers. Seventeen countries. The first human to run across Asia and Europe, retracing the ancient Silk Road on foot.'
})
</script>

<template>
  <div class="home">
    <div class="container">
      <!-- 1. Hero Section (cream background) -->
      <HeroSection />
    </div>

    <!-- 2. Video Banner (cinematic break) -->
    <VideoBanner />

    <div class="container">
      <!-- 3. Progress Teaser (km funded) -->
      <ProgressTeaser />
    </div>

    <!-- 4. Route Map Banner (full-width) -->
    <RouteMapBanner />

    <div class="container">
      <!-- 5. Story Section (the "why") -->
      <StorySection />

      <!-- 6. Support Section (simplified, single CTA) -->
      <SupportSection />

      <!-- 7. Journey Teaser (stories from the ground) -->
      <JourneyTeaser />

      <!-- 8. Links Grid (secondary actions) -->
      <LinksGrid />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

.home {
  // Home page wrapper
}
</style>
