<script setup lang="ts">
// Home page structure (optimized for scroll engagement):
// 1. Hero (minimalist - just number + tagline, full-screen)
// 2. Intro Section (below fold - CTA, countdown, location stamp)
// 3. Story Section (the personal narrative)
// 4. Route Map Banner (full-width with CTA to journey page)
// 5. Media Coverage (social proof)
// 6. Support Section (simplified: progress bar + CTA)
// 7. Voice Notes CTA (engagement)

useSeoMeta({
  title: '20,000KM | The First Human to Run the Silk Road',
  description: 'One woman. 20,000 kilometers. 17 countries. The first human to run across Asia and Europe on the silk road.'
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

    <!-- 4. Route Map Banner (full-width with CTA) -->
    <RouteMapBanner />

    <!-- 5. Media Coverage (social proof) -->
    <div class="container">
      <MediaCoverage />
    </div>

    <!-- 6. Support Section (simplified) -->
    <section class="support-wrapper">
      <div class="container">
        <SupportSection />
      </div>
    </section>

    <!-- 7. Voice Notes CTA -->
    <VoiceNotesSection />
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
