<script setup lang="ts">
// Intro section - appears below the fold
// Contains the hook, CTA, and countdown with scroll reveals
const { formatted } = useCountdown('2026-05-01')

const sectionRef = ref<HTMLElement | null>(null)
const { observeAll } = useScrollReveal({ threshold: 0.2 })

onMounted(() => {
  if (sectionRef.value) {
    observeAll('.reveal', sectionRef.value)
  }
})
</script>

<template>
  <section ref="sectionRef" class="intro">
    <!-- All content fades in together, slowly -->
    <div class="intro__content reveal">
      <!-- Location stamps - expedition journal style -->
      <div class="intro__stamp">
        <span class="intro__stamp-from">{{ $t('intro.from') }}</span>
        <span class="intro__stamp-arrow">→</span>
        <span class="intro__stamp-to">{{ $t('intro.to') }}</span>
      </div>

      <p class="intro__hook">
        {{ $t('intro.hook1') }}<br>{{ $t('intro.hook2') }}<br>
        <span class="intro__hook-silk-road">{{ $t('intro.hookSilkRoad') }}</span>
      </p>
      <p class="intro__subhook">{{ $t('intro.subhook') }}</p>

      <!-- Countdown -->
      <div class="intro__countdown-wrapper">
        <div class="intro__countdown" role="timer" :aria-label="`${formatted.days} ${$t('accessibility.daysUntilDeparture')}`">
          <div class="intro__countdown-item">
            <span class="intro__countdown-number">{{ formatted.days }}</span>
            <span class="intro__countdown-label">{{ $t('intro.days') }}</span>
          </div>
          <div class="intro__countdown-item">
            <span class="intro__countdown-number">{{ formatted.hours }}</span>
            <span class="intro__countdown-label">{{ $t('intro.hours') }}</span>
          </div>
          <div class="intro__countdown-item">
            <span class="intro__countdown-number">{{ formatted.minutes }}</span>
            <span class="intro__countdown-label">{{ $t('intro.min') }}</span>
          </div>
          <div class="intro__countdown-item">
            <span class="intro__countdown-number">{{ formatted.seconds }}</span>
            <span class="intro__countdown-label">{{ $t('intro.sec') }}</span>
          </div>
        </div>
        <span class="intro__countdown-text">{{ $t('intro.untilDeparture') }}</span>
      </div>

      <!-- CTA -->
      <NuxtLink to="/support" class="intro__cta">
        {{ $t('intro.cta') }}
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
  font-size: clamp($text-xl, 4vw, $text-3xl);
  line-height: $leading-snug;
  color: $warm-black;
  max-width: 700px;
  margin: 0 auto $space-4;
}

.intro__hook-silk-road {
  display: block;
  font-style: italic;
  color: $terracotta-700;
}

.intro__subhook {
  font-family: $font-mono;
  font-size: $text-sm;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  color: $a11y-text-secondary; // WCAG AAA compliant
  margin: 0 auto $space-10;
}

// Countdown
.intro__countdown-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $space-6;
  margin-bottom: $space-10;
}

.intro__countdown {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $space-4;
  flex-wrap: wrap;

  @media (max-width: $breakpoint-sm) {
    gap: $space-3;
  }
}

.intro__countdown-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: $warm-black;
  color: $cream;
  padding: 1.5rem 1rem;
  min-width: 80px;
  box-shadow: 6px 6px 0 $terracotta;

  @media (max-width: $breakpoint-md) {
    padding: 1.25rem 0.875rem;
    min-width: 70px;
    box-shadow: 5px 5px 0 $terracotta;
  }
}

.intro__countdown-number {
  display: block;
  font-family: $font-mono;
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1;
  text-align: center;

  @media (max-width: $breakpoint-md) {
    font-size: 2rem;
  }

  @media (max-width: $breakpoint-sm) {
    font-size: 1.5rem;
  }
}

.intro__countdown-label {
  font-family: $font-mono;
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-top: 0.5rem;
  opacity: 0.7;

  @media (max-width: $breakpoint-sm) {
    font-size: 0.55rem;
    margin-top: 0.375rem;
  }
}

.intro__countdown-text {
  font-family: $font-mono;
  font-size: $text-xs;
  font-weight: 400;
  letter-spacing: $tracking-label;
  text-transform: uppercase;
  color: $a11y-text-secondary; // WCAG AAA compliant
}

// CTA
.intro__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: $terracotta-700;
  color: $cream;
  padding: $space-4 $space-12;
  font-family: $font-mono;
  font-size: $text-sm;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  text-decoration: none;
  border: 2px solid $terracotta-700;
  transition: all 0.2s ease;
  min-height: 56px;

  &:hover {
    background: $terracotta-800;
    border-color: $terracotta-800;
    transform: translateY(-1px);
  }
}
</style>
