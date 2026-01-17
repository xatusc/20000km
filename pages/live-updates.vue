<script setup lang="ts">
useSeoMeta({
  title: 'Live Updates | 20,000KM',
  description: 'Follow the live progress of the 20,000km run from Vladivostok to Lisbon.'
})
</script>

<template>
  <div class="container py-16">
    <h1 class="font-serif text-3xl mb-8">Live Updates</h1>

    <div class="grid-layout">
      <!-- Map takes 2 columns on large screens -->
      <div class="map-column">
        <InteractiveMap />
      </div>

      <!-- Sidebar with updates feed -->
      <aside class="sidebar">
        <div class="updates-placeholder">
          <p class="label mb-4">Coming Soon</p>
          <p class="text-muted">Live updates will appear here during the run.</p>
          <p class="mt-8">
            <a href="https://substack.com/@whereisriax" class="btn" target="_blank" rel="noopener noreferrer">
              Subscribe to Long Run Letter
            </a>
          </p>
        </div>
      </aside>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

.grid-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: $space-8;

  @media (max-width: $breakpoint-xl) {
    grid-template-columns: 1fr;
  }
}

.updates-placeholder {
  padding: $space-8;
  border: $border-width solid $warm-black;
  text-align: center;
}
</style>
