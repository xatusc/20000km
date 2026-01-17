<script setup lang="ts">
// Static Instagram grid - curated images linking to profile
// Manual control over which images appear, no API needed

const images = [
  { src: '/Ria_lookback.webp', alt: 'Ria looking back on the trail' },
  { src: '/Ria_run_2.webp', alt: 'Ria running' },
  { src: '/sinai-run.webp', alt: 'Running in Sinai' },
  { src: '/Ria_truck.webp', alt: 'Ria with support vehicle' }
]

const instagramUrl = 'https://instagram.com/whereisriax'
</script>

<template>
  <div class="instagram-grid">
    <div class="instagram-header">
      <h3 class="instagram-title">On the Ground</h3>
      <a
        :href="instagramUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="instagram-link"
      >
        @whereisriax
      </a>
    </div>

    <div class="instagram-images">
      <a
        v-for="(image, index) in images"
        :key="index"
        :href="instagramUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="instagram-image-link"
      >
        <img
          :src="image.src"
          :alt="image.alt"
          loading="lazy"
          class="instagram-image"
        >
        <div class="instagram-image-overlay">
          <span class="instagram-icon" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </span>
        </div>
      </a>
    </div>

    <a
      :href="instagramUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="instagram-follow"
    >
      Follow the Journey
    </a>
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

.instagram-grid {
  // Component styles
}

.instagram-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: $space-4;
  flex-wrap: wrap;
  gap: $space-2;
}

.instagram-title {
  font-family: $font-serif;
  font-size: $text-xl;
  color: $warm-black;
}

.instagram-link {
  font-family: $font-mono;
  font-size: $text-sm;
  color: $terracotta;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.instagram-images {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $space-3;
  margin-bottom: $space-6;

  @media (max-width: $breakpoint-lg) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.instagram-image-link {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: $border-radius-md;

  &:hover {
    .instagram-image {
      transform: scale(1.05);
    }

    .instagram-image-overlay {
      opacity: 1;
    }
  }
}

.instagram-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.instagram-image-overlay {
  position: absolute;
  inset: 0;
  background: rgba($warm-black, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.instagram-icon {
  color: $cream;
}

.instagram-follow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: $font-mono;
  font-size: $text-sm;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  color: $warm-black;
  text-decoration: none;
  padding: $space-3 $space-6;
  border: $border-width solid $warm-black;
  background: transparent;
  transition: background 0.2s ease, color 0.2s ease;
  min-height: 44px;

  &:hover {
    background: $warm-black;
    color: $cream;
  }
}
</style>
