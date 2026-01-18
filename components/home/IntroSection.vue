<script setup lang="ts">
// Intro section - appears below the fold
// Contains the hook, CTA, and countdown with scroll reveals
const { formatted } = useCountdown('2026-05-01')

const sectionRef = ref<HTMLElement | null>(null)
const { observeAll } = useScrollReveal({ threshold: 0.2 })

onMounted(() => {
  if (sectionRef.value) {
    observeAll('.reveal', sectionRef.value)
    observeAll('.draw-line-center', sectionRef.value)
  }
})
</script>

<template>
  <section ref="sectionRef" class="intro">
    <!-- Decorative line that draws in -->
    <hr class="intro__divider draw-line-center" aria-hidden="true">

    <!-- All content fades in together, slowly -->
    <div class="intro__content reveal">
      <!-- Location stamp - expedition journal style -->
      <div class="intro__stamp">
        <span class="intro__stamp-from">Vladivostok, Russia</span>
        <span class="intro__stamp-arrow">→</span>
        <span class="intro__stamp-to">Cabo da Roca, Portugal</span>
      </div>

      <p class="intro__hook">
        The first human to run across Asia and Europe.<br>
        One woman. Seventeen countries. Pacific to Atlantic.
      </p>

      <!-- Countdown -->
      <div class="intro__countdown" role="timer" :aria-label="`${formatted.days} days until departure`">
        <div class="intro__countdown-item">
          <span class="intro__countdown-number">{{ formatted.days }}</span>
          <span class="intro__countdown-label">Days</span>
        </div>
        <div class="intro__countdown-item">
          <span class="intro__countdown-number">{{ formatted.hours }}</span>
          <span class="intro__countdown-label">Hours</span>
        </div>
        <div class="intro__countdown-item">
          <span class="intro__countdown-number">{{ formatted.minutes }}</span>
          <span class="intro__countdown-label">Min</span>
        </div>
        <span class="intro__countdown-text">until departure</span>
      </div>

      <!-- CTA -->
      <NuxtLink to="/support" class="intro__cta">
        Fund the Road
      </NuxtLink>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;
@use '~/assets/scss/_decorative' as *;

.intro {
  text-align: center;
  padding: $space-16 $space-4;
  background: $cream;
  border-bottom: 3px solid $warm-black;
}

// Decorative divider that draws in from center
.intro__divider {
  width: 200px;
  height: 3px;
  background: $warm-black;
  border: none;
  margin: 0 auto $space-12;
}

// Content wrapper for single reveal
.intro__content {
  // inherits reveal animation
}

// Location stamp - typewriter/expedition style
.intro__stamp {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $space-3;
  margin-bottom: $space-8;
  flex-wrap: wrap;
}

.intro__stamp-from,
.intro__stamp-to {
  font-family: $font-mono;
  font-size: $text-sm;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  padding: $space-2 $space-4;
  @include hand-drawn-border-subtle($warm-black, 2px);
  background: $cream;
}

.intro__stamp-arrow {
  font-family: $font-mono;
  font-size: $text-xl;
  color: $terracotta;
}

.intro__hook {
  font-family: $font-serif;
  font-size: clamp($text-lg, 3vw, $text-2xl);
  line-height: $leading-relaxed;
  color: $earth-700;
  max-width: 600px;
  margin: 0 auto $space-10;

  @media (max-width: $breakpoint-md) {
    br {
      display: none;
    }
  }
}

// Countdown
.intro__countdown {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: $space-4;
  margin-bottom: $space-10;
  flex-wrap: wrap;
}

.intro__countdown-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 60px;
}

.intro__countdown-number {
  font-family: $font-serif;
  font-size: $text-4xl;
  font-weight: 400;
  line-height: 1;
  color: $warm-black;

  @media (max-width: $breakpoint-md) {
    font-size: $text-3xl;
  }
}

.intro__countdown-label {
  font-family: $font-mono;
  font-size: $text-xs;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  color: $earth-400;
  margin-top: $space-1;
}

.intro__countdown-text {
  font-family: $font-mono;
  font-size: $text-sm;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  color: $terracotta;
  margin-left: $space-2;

  @media (max-width: $breakpoint-md) {
    width: 100%;
    margin-left: 0;
    margin-top: $space-2;
  }
}

// CTA
.intro__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: $terracotta-600;
  color: #fff;
  padding: $space-4 $space-12;
  font-family: $font-mono;
  font-size: $text-sm;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  text-decoration: none;
  border: 2px solid $terracotta-600;
  transition: background 0.2s ease, transform 0.2s ease;
  min-height: 56px;

  &:hover {
    background: $terracotta-700;
    border-color: $terracotta-700;
    transform: translateY(-2px);
  }
}
</style>
