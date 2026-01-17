<script setup lang="ts">
// Progress teaser - shows km funded with mini progress bar
const { fundedKm, formattedFunded, progress } = useFundraising()
</script>

<template>
  <section class="progress-teaser">
    <div class="progress-content">
      <div class="progress-stats">
        <span class="progress-funded">{{ formattedFunded }}</span>
        <span class="progress-label">of 20,000 km funded</span>
      </div>

      <div class="progress-bar-container">
        <div class="progress-bar" :style="{ width: `${progress}%` }"></div>
      </div>

      <p class="progress-date">Starting May 1, 2026. Follow in real-time.</p>

      <NuxtLink to="/live-updates" class="progress-link">
        See the Route
      </NuxtLink>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

.progress-teaser {
  padding: $space-12 0;
  text-align: center;
  border-top: $border-width solid $earth-200;
  border-bottom: $border-width solid $earth-200;
}

.progress-stats {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: $space-2;
  margin-bottom: $space-4;
}

.progress-funded {
  font-family: $font-mono;
  font-size: $text-4xl;
  font-weight: 600;
  color: $terracotta;
}

.progress-label {
  font-size: $text-sm;
  color: $earth-500;
  letter-spacing: $tracking-wide;
}

.progress-bar-container {
  width: 100%;
  max-width: 400px;
  height: 8px;
  background: $earth-200;
  border-radius: 4px;
  margin: 0 auto $space-6;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: $terracotta;
  border-radius: 4px;
  transition: width 0.5s ease;
  min-width: 2px; // Always show a sliver even at 0%
}

.progress-date {
  font-size: $text-sm;
  color: $earth-500;
  margin-bottom: $space-6;
}

.progress-link {
  display: inline-block;
  font-family: $font-mono;
  font-size: $text-sm;
  letter-spacing: $tracking-wide;
  color: $warm-black;
  text-decoration: none;
  padding: $space-3 $space-6;
  border: $border-width solid $warm-black;
  transition: background 0.2s ease, color 0.2s ease;
  min-height: 48px;

  &:hover {
    background: $warm-black;
    color: $cream;
  }
}
</style>
