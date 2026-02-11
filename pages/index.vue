<script setup lang="ts">
// Home page structure (optimized for scroll engagement):
// 1. Hero (minimalist - just number + tagline, full-screen)
// 2. Intro Section (below fold - CTA, countdown, location stamp)
// 3. Story Section (the personal narrative)
// 4. Route Map Banner (full-width with CTA to journey page)
// 5. Instagram Gallery (social proof / engagement)
// 6. Media Coverage (social proof)
// 7. Support Section (simplified: progress bar + CTA)
// 8. Voice Notes CTA (engagement)

useHead({
  script: [
    { src: 'https://cdn.lightwidget.com/widgets/lightwidget.js', async: true }
  ]
})

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

    <!-- 6. Media Coverage (social proof) -->
    <div class="container">
      <MediaCoverage />
    </div>

    <!-- 7. Support Section -->
    <section class="support-wrapper">
      <div class="container">
        <SupportSection />
      </div>
    </section>


    <!-- 5. Instagram Gallery -->
    <InstagramGallery
      :eyebrow="$t('home.instagram.eyebrow')"
      :title="$t('home.instagram.title')"
    />

    <!-- 8. Voice Notes CTA -->
    <!-- <VoiceNotesSection /> -->
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

.support-wrapper {
  background: $cream;
  border-top: 3px solid $warm-black;
  margin-top: $space-8;
}
</style>
