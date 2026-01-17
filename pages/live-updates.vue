<script setup lang="ts">
// Journey page - conversion-focused with support details
// Structure:
// 1. Interactive Map + Sidebar (existing)
// 2. Support Section (moved from homepage)
// 3. Instagram Grid + GoFundMe Card

useSeoMeta({
  title: 'The Journey | 20,000KM',
  description: 'Follow the live progress of the 20,000km run from Vladivostok to Lisbon. Stories, podcast, and updates from the Silk Road.'
})
</script>

<template>
  <div class="journey-page">
    <!-- Map Section -->
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

    <!-- Support Section -->
    <section class="support-wrapper">
      <div class="container">
        <SupportSection />
      </div>
    </section>

    <!-- Social + GoFundMe Section -->
    <section class="social-section">
      <div class="container">
        <div class="social-grid">
          <!-- Instagram Grid -->
          <div class="instagram-column">
            <InstagramGrid />
          </div>

          <!-- GoFundMe Card -->
          <div class="gofundme-column">
            <div class="gofundme-card">
              <h3 class="gofundme-title">Support the Journey</h3>
              <p class="gofundme-desc">
                Every contribution funds another kilometer on the road.
                From visas to crew logistics, your support makes this
                expedition possible.
              </p>
              <a
                href="https://gofund.me/8d624216"
                target="_blank"
                rel="noopener noreferrer"
                class="gofundme-cta"
              >
                Donate on GoFundMe
              </a>
              <p class="gofundme-note">
                All unused funds will be returned to supporters proportionally.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

.journey-page {
  // Page wrapper
}

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
  border: $border-card;
}

.updates-card,
.social-card {
  padding: $space-6;
  border: $border-card;
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

// Support Section Wrapper
.support-wrapper {
  background: $sand-100;
  padding: $space-16 0;
  margin-top: $space-8;
}

// Social + GoFundMe Section
.social-section {
  padding: $space-16 0;
}

.social-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: $space-12;
  align-items: start;

  @media (max-width: $breakpoint-xl) {
    grid-template-columns: 1fr;
    gap: $space-8;
  }
}

.gofundme-card {
  padding: $space-8;
  background: $warm-black;
  border-radius: $border-radius-md;
}

.gofundme-title {
  font-family: $font-serif;
  font-size: $text-2xl;
  color: $cream;
  margin-bottom: $space-4;
}

.gofundme-desc {
  font-size: $text-base;
  color: rgba($cream, 0.85);
  line-height: $leading-relaxed;
  margin-bottom: $space-6;
}

.gofundme-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: $terracotta-700;
  color: $cream;
  padding: $space-4 $space-8;
  font-family: $font-mono;
  font-size: $text-sm;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  text-decoration: none;
  border: 2px solid $terracotta-700;
  transition: background 0.2s ease, transform 0.2s ease;
  min-height: 52px;
  width: 100%;

  &:hover {
    background: $terracotta-800;
    border-color: $terracotta-800;
    transform: translateY(-2px);
  }
}

.gofundme-note {
  margin-top: $space-4;
  font-size: $text-sm;
  color: rgba($cream, 0.6);
  font-style: italic;
}
</style>
