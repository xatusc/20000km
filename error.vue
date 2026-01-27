<script setup lang="ts">
// Global error page - handles 404 and other errors
// Matches desert minimalist aesthetic of main site

const props = defineProps({
  error: Object
})

const errorCode = computed(() => props.error?.statusCode || 500)
const errorMessage = computed(() => props.error?.message || 'Unknown error')

// User-friendly error messages
const errorTitle = computed(() => {
  switch (errorCode.value) {
    case 404:
      return 'Lost on the Road'
    case 500:
      return 'Unexpected Detour'
    default:
      return 'Something Went Wrong'
  }
})

const errorDescription = computed(() => {
  switch (errorCode.value) {
    case 404:
      return 'This path doesn\'t exist. Like running off-route, sometimes we take a wrong turn.'
    case 500:
      return 'Our server encountered an issue. Even marathons have rest stops.'
    default:
      return 'We hit an unexpected obstacle on this journey.'
  }
})

const handleError = () => {
  clearError({ redirect: '/' })
}

// Only show technical details in development
const isDev = import.meta.dev
</script>

<template>
  <div class="error-page">
    <!-- Film grain overlay for consistency -->
    <div class="grain-overlay" aria-hidden="true"></div>

    <div class="error-content">
      <!-- Error code with monospace font -->
      <div class="error-code">{{ errorCode }}</div>

      <!-- Error title -->
      <h1 class="error-title">{{ errorTitle }}</h1>

      <!-- Error description -->
      <p class="error-description">{{ errorDescription }}</p>

      <!-- Action buttons -->
      <div class="error-actions">
        <button @click="handleError" class="btn-primary">
          Return Home
        </button>
        <NuxtLink to="/journey" class="btn-secondary">
          View the Journey
        </NuxtLink>
      </div>

      <!-- Technical details (dev only) -->
      <details v-if="isDev && errorMessage !== 'Unknown error'" class="error-details">
        <summary>Technical Details</summary>
        <pre>{{ errorMessage }}</pre>
      </details>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $cream;
  position: relative;
  padding: $space-6;
}

// Film grain overlay (matching main site)
.grain-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  animation: grain 8s steps(10) infinite;
}

@keyframes grain {
  0%, 100% { transform: translate(0, 0); }
  10% { transform: translate(-5%, -5%); }
  20% { transform: translate(-10%, 5%); }
  30% { transform: translate(5%, -10%); }
  40% { transform: translate(-5%, 15%); }
  50% { transform: translate(-10%, 5%); }
  60% { transform: translate(15%, 0); }
  70% { transform: translate(0, 10%); }
  80% { transform: translate(-15%, 0); }
  90% { transform: translate(10%, 5%); }
}

// Respect reduced motion preference
@media (prefers-reduced-motion: reduce) {
  .grain-overlay {
    animation: none;
  }
}

.error-content {
  text-align: center;
  max-width: 600px;
  position: relative;
  z-index: 2;
}

.error-code {
  font-family: $font-mono;
  font-size: $text-5xl;
  font-weight: 700;
  color: $terracotta;
  margin-bottom: $space-4;
  line-height: $leading-none;

  @media (min-width: 768px) {
    font-size: 6rem;
  }
}

.error-title {
  font-family: $font-serif;
  font-size: $text-3xl;
  font-weight: 700;
  color: $warm-black;
  margin-bottom: $space-3;
  line-height: $leading-tight;

  @media (min-width: 768px) {
    font-size: $text-4xl;
  }
}

.error-description {
  font-family: $font-sans;
  font-size: $text-lg;
  color: $earth-700;
  line-height: $leading-relaxed;
  margin-bottom: $space-6;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.error-actions {
  display: flex;
  gap: $space-3;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: $space-8;
}

.btn-primary,
.btn-secondary {
  display: inline-block;
  padding: $space-3 $space-5;
  font-family: $font-mono;
  font-size: $text-sm;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 2px;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
}

.btn-primary {
  background: $terracotta-600; // Darker for WCAG AA contrast (4.5:1+)
  color: $cream;

  &:hover {
    background: $terracotta-700;
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 3px solid $terracotta-300;
    outline-offset: 2px;
  }
}

.btn-secondary {
  background: transparent;
  color: $earth-800;
  border: 2px solid $earth-800;

  &:hover {
    background: $earth-800;
    color: $cream;
  }

  &:focus-visible {
    outline: 3px solid $earth-600;
    outline-offset: 2px;
  }
}

.error-details {
  margin-top: $space-6;
  text-align: left;
  background: $sand-100;
  padding: $space-4;
  border-radius: 4px;
  border: 1px solid $sand-300;

  summary {
    font-family: $font-mono;
    font-size: $text-sm;
    color: $earth-700;
    cursor: pointer;
    user-select: none;

    &:hover {
      color: $terracotta;
    }
  }

  pre {
    margin-top: $space-3;
    font-family: $font-mono;
    font-size: $text-xs;
    color: $earth-800;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
}
</style>
