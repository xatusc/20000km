<script setup lang="ts">
// Default layout with grain overlay and skip link
</script>

<template>
  <div class="site-wrapper min-h-screen flex flex-col">
    <!-- Film grain overlay for vintage aesthetic -->
    <div class="grain-overlay" aria-hidden="true"></div>

    <!-- Skip link for accessibility -->
    <a href="#main-content" class="skip-link">
      {{ $t('accessibility.skipToContent') }}
    </a>

    <!-- Header -->
    <AppHeader />

    <!-- Main content -->
    <main id="main-content" class="site-main">
      <slot />
    </main>

    <!-- Footer -->
    <AppFooter />

    <!-- Sticky mobile support bar -->
    <MobileSupportBar />
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

.site-wrapper {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.site-main {
  flex: 1;
  overflow-x: clip;
}

// Film grain overlay - subtle vintage texture
// NOTE: This is the primary grain overlay. Duplicate in _base.scss has been removed.
.grain-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: $z-grain;
  opacity: 0.035;
  mix-blend-mode: multiply;

  // CSS noise pattern using SVG filter
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 200px 200px;

  // Reduce intensity on mobile for performance
  @media (max-width: $breakpoint-md) {
    opacity: 0.025;
  }

  // Respect reduced motion preference
  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
}

// Skip link styles - uses global .skip-link from _base.scss
// No duplicate styles needed here
</style>
