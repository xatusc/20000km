<script setup lang="ts">
/**
 * LoadingSkeleton - Animated loading placeholder
 * Matches desert minimalist aesthetic
 */

interface Props {
  type?: 'text' | 'title' | 'card' | 'circle' | 'image' | 'podcast' | 'substack'
  lines?: number
  width?: string
  height?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  lines: 1,
  width: '100%',
  height: 'auto'
})
</script>

<template>
  <div class="skeleton-wrapper" :class="`skeleton--${type}`">
    <!-- Text skeleton -->
    <div v-if="type === 'text'" class="skeleton-text" :style="{ width }">
      <div v-for="i in lines" :key="i" class="skeleton-line" />
    </div>

    <!-- Title skeleton -->
    <div v-else-if="type === 'title'" class="skeleton-title" :style="{ width }" />

    <!-- Card skeleton -->
    <div v-else-if="type === 'card'" class="skeleton-card">
      <div class="skeleton-card__image" />
      <div class="skeleton-card__content">
        <div class="skeleton-line skeleton-line--title" />
        <div class="skeleton-line" />
        <div class="skeleton-line skeleton-line--short" />
      </div>
    </div>

    <!-- Circle skeleton -->
    <div v-else-if="type === 'circle'" class="skeleton-circle" :style="{ width, height }" />

    <!-- Image skeleton -->
    <div v-else-if="type === 'image'" class="skeleton-image" :style="{ width, height }" />

    <!-- Podcast skeleton -->
    <div v-else-if="type === 'podcast'" class="skeleton-podcast">
      <div class="skeleton-podcast__cover" />
      <div class="skeleton-podcast__details">
        <div class="skeleton-line skeleton-line--title" />
        <div class="skeleton-line" />
        <div class="skeleton-line skeleton-line--short" />
      </div>
    </div>

    <!-- Substack skeleton -->
    <div v-else-if="type === 'substack'" class="skeleton-substack">
      <div class="skeleton-line skeleton-line--date" />
      <div class="skeleton-line skeleton-line--title" />
      <div class="skeleton-line" />
      <div class="skeleton-line skeleton-line--short" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

// Base skeleton styles
@mixin skeleton-base {
  background: linear-gradient(
    90deg,
    $sand-200 0%,
    $sand-100 50%,
    $sand-200 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: 4px;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.skeleton-wrapper {
  width: 100%;
}

// Text skeleton
.skeleton-text {
  display: flex;
  flex-direction: column;
  gap: $space-2;
}

.skeleton-line {
  @include skeleton-base;
  height: 16px;
  width: 100%;

  &--short {
    width: 60%;
  }

  &--title {
    height: 24px;
    margin-bottom: $space-1;
  }

  &--date {
    height: 12px;
    width: 120px;
    margin-bottom: $space-2;
  }
}

// Title skeleton
.skeleton-title {
  @include skeleton-base;
  height: 32px;
  width: 60%;
  max-width: 400px;
}

// Card skeleton
.skeleton-card {
  display: flex;
  flex-direction: column;
  gap: $space-3;
  padding: $space-4;
  background: $sand-50;
  border-radius: $border-radius-md;
}

.skeleton-card__image {
  @include skeleton-base;
  width: 100%;
  height: 200px;
}

.skeleton-card__content {
  display: flex;
  flex-direction: column;
  gap: $space-2;
}

// Circle skeleton
.skeleton-circle {
  @include skeleton-base;
  border-radius: 50%;
  width: 64px;
  height: 64px;
}

// Image skeleton
.skeleton-image {
  @include skeleton-base;
  width: 100%;
  min-height: 200px;
}

// Podcast skeleton
.skeleton-podcast {
  display: flex;
  gap: $space-4;
  padding: $space-6;
  background: $earth-900;
  border-radius: $border-radius-md;
}

.skeleton-podcast__cover {
  @include skeleton-base;
  flex-shrink: 0;
  width: 120px;
  height: 120px;
  border-radius: $border-radius-sm;

  @media (min-width: 768px) {
    width: 180px;
    height: 180px;
  }
}

.skeleton-podcast__details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: $space-2;
  justify-content: center;
}

// Substack skeleton
.skeleton-substack {
  padding: $space-4 0;
  border-bottom: 1px solid $earth-200;
  display: flex;
  flex-direction: column;
  gap: $space-2;
}

// Accessibility - respect reduced motion
@media (prefers-reduced-motion: reduce) {
  .skeleton-line,
  .skeleton-title,
  .skeleton-card__image,
  .skeleton-circle,
  .skeleton-image,
  .skeleton-podcast__cover {
    animation: none;
    background: $sand-200;
  }
}
</style>
