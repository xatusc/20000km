<script setup lang="ts">
useSeoMeta({
  title: 'The Journey | 20,000KM',
  description: 'Follow the live progress of the 20,000km run from Vladivostok to Lisbon. Stories, podcast, and updates from the Silk Road.'
})
</script>

<template>
  <div class="container py-16">
    <h1 class="page-title">The Journey</h1>
    <p class="page-subtitle">
      Stories from the ground. Dispatches from seventeen countries
      and the communities along the ancient Silk Road.
    </p>

    <div class="grid-layout">
      <!-- Map takes 2 columns on large screens -->
      <div class="map-column">
        <InteractiveMap />
      </div>

      <!-- Sidebar with countdown and updates -->
      <aside class="sidebar">
        <!-- Countdown Timer -->
        <div class="countdown-card">
          <CountdownTimer />
        </div>

        <!-- Updates Feed Placeholder -->
        <div class="updates-card">
          <h3 class="card-title">Live Updates</h3>
          <p class="card-desc">
            Updates will appear here during the run. For now, follow
            the preparation journey.
          </p>
          <a
            href="https://substack.com/@whereisriax"
            class="card-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Subscribe to Long Run Letter
          </a>
        </div>

        <!-- Podcast Placeholder -->
        <div class="updates-card">
          <h3 class="card-title">Podcast</h3>
          <p class="card-desc">
            Conversations with runners joining for a day on the route.
            Coming soon.
          </p>
        </div>

        <!-- Social Links -->
        <div class="social-card">
          <h3 class="card-title">Follow Along</h3>
          <div class="social-links">
            <a href="https://instagram.com/whereisriax" target="_blank" rel="noopener">Instagram</a>
            <a href="https://strava.app.link/qeKK5Sw4OZb" target="_blank" rel="noopener">Strava</a>
            <a href="https://substack.com/@whereisriax" target="_blank" rel="noopener">Substack</a>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

.page-title {
  font-family: $font-serif;
  font-size: $text-4xl;
  margin-bottom: $space-4;
}

.page-subtitle {
  font-size: $text-lg;
  color: $earth-600;
  line-height: $leading-relaxed;
  margin-bottom: $space-12;
  max-width: 600px;
}

.grid-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: $space-8;
  align-items: start;

  @media (max-width: $breakpoint-xl) {
    grid-template-columns: 1fr;
  }
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: $space-6;
}

.countdown-card {
  padding: $space-6;
  background: $sand-100;
  border: $border-width solid $earth-200;
}

.updates-card,
.social-card {
  padding: $space-6;
  border: $border-width solid $earth-200;
}

.card-title {
  font-family: $font-mono;
  font-size: $text-xs;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  color: $terracotta;
  margin-bottom: $space-3;
}

.card-desc {
  font-size: $text-sm;
  color: $earth-500;
  line-height: $leading-relaxed;
  margin-bottom: $space-4;
}

.card-link {
  display: inline-block;
  font-family: $font-mono;
  font-size: $text-xs;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  color: $warm-black;
  text-decoration: none;
  padding-bottom: $space-1;
  border-bottom: 1px solid $warm-black;
  transition: color 0.2s ease, border-color 0.2s ease;

  &:hover {
    color: $terracotta;
    border-color: $terracotta;
  }
}

.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: $space-4;

  a {
    font-size: $text-sm;
    color: $earth-600;
    text-decoration: none;

    &:hover {
      color: $terracotta;
    }
  }
}
</style>
