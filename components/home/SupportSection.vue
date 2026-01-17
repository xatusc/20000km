<script setup lang="ts">
// Simplified support section with single CTA to GoFundMe
</script>

<template>
  <section class="support-section">
    <div class="support-content">
      <h2 class="support-title">Sponsor the Road Ahead</h2>

      <p class="support-desc">
        From the Pacific to the Atlantic. 20,000 kilometers of ancient trade routes,
        mountain passes, and human stories. Your contribution funds the support vehicle,
        crew logistics, visas across 17 countries, and the documentary film capturing every step.
      </p>

      <div class="impact-grid">
        <div class="impact-item">
          <span class="impact-amount">€5</span>
          <span class="impact-label">1 kilometer</span>
        </div>
        <div class="impact-item">
          <span class="impact-amount">€50</span>
          <span class="impact-label">a morning's run</span>
        </div>
        <div class="impact-item">
          <span class="impact-amount">€250</span>
          <span class="impact-label">a full day on the road</span>
        </div>
        <div class="impact-item">
          <span class="impact-amount">€500</span>
          <span class="impact-label">a week of progress</span>
        </div>
      </div>

      <a
        href="https://gofund.me/8d624216"
        target="_blank"
        rel="noopener noreferrer"
        class="support-cta"
      >
        Support on GoFundMe
      </a>

      <p class="support-note">
        All unused funds will be returned to supporters proportionally.
      </p>
    </div>

    <figure class="support-image">
      <img src="/sinai-run.webp" alt="Running with friends in Sinai" loading="lazy">
      <figcaption>
        Photo by <a href="https://instagram.com/jack.lawes" target="_blank" rel="noopener noreferrer">Jack Lawes</a>
      </figcaption>
    </figure>
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

.support-section {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: $space-12;
  align-items: start;
  padding: $space-8 0;

  @media (max-width: $breakpoint-xl) {
    grid-template-columns: 1fr;
    gap: $space-8;
  }
}

.support-title {
  font-family: $font-serif;
  font-size: $text-3xl;
  margin-bottom: $space-4;
}

.support-desc {
  font-size: $text-base;
  line-height: $leading-loose;
  color: $earth-600;
  margin-bottom: $space-8;
  max-width: 550px;
}

.impact-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $space-4;
  margin-bottom: $space-8;

  @media (max-width: $breakpoint-lg) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.impact-item {
  text-align: center;
  padding: $space-4;
  border: $border-width solid $earth-200;
  border-radius: $border-radius-md;
}

.impact-amount {
  display: block;
  font-family: $font-mono;
  font-size: $text-xl;
  color: $terracotta;
  margin-bottom: $space-1;
}

.impact-label {
  font-size: $text-xs;
  color: $earth-500;
  text-transform: uppercase;
  letter-spacing: $tracking-wide;
}

.support-cta {
  display: inline-block;
  background: $terracotta-700;
  color: $cream;
  padding: $space-4 $space-8;
  font-family: $font-mono;
  font-size: $text-sm;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  text-decoration: none;
  border: 2px solid $terracotta-700;
  transition: background 0.2s ease, color 0.2s ease;
  min-height: 48px;

  &:hover {
    background: $terracotta-800;
    border-color: $terracotta-800;
  }
}

.support-note {
  margin-top: $space-4;
  font-size: $text-sm;
  color: $earth-400;
  font-style: italic;
}

.support-image {
  position: sticky;
  top: $space-8;

  img {
    width: 100%;
    border-radius: $border-radius-md;
  }

  figcaption {
    margin-top: $space-3;
    font-size: $text-sm;
    color: $earth-400;
    font-style: italic;

    a {
      color: $earth-500;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  @media (max-width: $breakpoint-xl) {
    position: static;
    max-width: 500px;
    margin: 0 auto;
  }
}
</style>
