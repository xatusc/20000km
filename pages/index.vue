<script setup lang="ts">
// Home page structure (optimized for scroll engagement):
// 1. Hero (minimalist - just number + tagline, full-screen)
// 2. Intro Section (below fold - CTA, countdown, location stamp)
// 3. Story Section (the personal narrative)
// 4. Pull Quote (full-screen visual break)
// 5. Route Map Banner (full-width with CTA to journey page)
// 6. Editorial Gallery (dramatic imagery, asymmetrical layout)
// 7. Media Coverage (social proof)
// 8. Support Section (simplified: progress bar + CTA)

useSeoMeta({
  title: '20,000KM | The First Human to Run the Silk Road',
  description: 'One woman. 20,000 kilometers. Seventeen countries. The first human to run across Asia and Europe, retracing the ancient Silk Road on foot.'
})
</script>

<template>
  <div class="home">
    <!-- 1. Hero Section (minimalist, full-screen) -->
    <HeroSection />

    <!-- 2. Intro Section (below the fold) -->
    <IntroSection />

    <div class="container">
      <!-- 3. Story Section -->
      <StorySection />
    </div>

    <!-- 4. Pull Quote (full-screen) -->
    <PullQuote />

    <!-- 5. Route Map Banner (full-width with CTA) -->
    <RouteMapBanner />

    <!-- 6. Editorial Gallery (full-width, asymmetrical) -->
    <EditorialGallery />

    <!-- 7. Media Coverage (social proof) -->
    <div class="container">
      <MediaCoverage />
    </div>

    <!-- 8. Support Section (simplified) -->
    <section class="support-wrapper">
      <div class="container">
        <SupportSection />
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

.home {
  // Home page wrapper
}

.support-wrapper {
  background: $cream;
  border-top: 3px solid $warm-black;
  margin-top: $space-8;
}
</style>
