<script setup lang="ts">
const { motionAllowed } = useSensoryMode()
</script>

<template>
  <div class="site-wrapper min-h-screen flex flex-col">
    <!-- Skip link for accessibility -->
    <a href="#main-content" class="skip-link">
      {{ $t('accessibility.skipToContent') }}
    </a>

    <!-- Header -->
    <AppHeader />

    <!-- Main content -->
    <main id="main-content" class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <AppFooter />

    <!-- Sensory mode toggle -->
    <SensoryModeToggle />
  </div>
</template>

<style lang="scss" scoped>
.site-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
