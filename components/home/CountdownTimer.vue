<script setup lang="ts">
/**
 * CountdownTimer - Retro style with offset border
 */
const props = withDefaults(defineProps<{
  targetDate?: string
  showDate?: boolean
}>(), {
  targetDate: 'May 1, 2026 00:00:00',
  showDate: true
})

const { formatted } = useCountdown(props.targetDate)

const units = [
  { key: 'days', label: 'countdown.days' },
  { key: 'hours', label: 'countdown.hours' },
  { key: 'minutes', label: 'countdown.minutes' },
  { key: 'seconds', label: 'countdown.seconds' },
] as const
</script>

<template>
  <div class="countdown" role="region" aria-labelledby="countdown-label">
    <h2 id="countdown-label" class="countdown__label">{{ $t('countdown.label') }}</h2>
    <div
      class="countdown__grid"
      role="timer"
      :aria-label="`${formatted.days} days, ${formatted.hours} hours, ${formatted.minutes} minutes, ${formatted.seconds} seconds until departure`"
    >
      <div v-for="unit in units" :key="unit.key" class="countdown__item">
        <span class="countdown__number">{{ formatted[unit.key] }}</span>
        <span class="countdown__unit">{{ $t(unit.label) }}</span>
      </div>
    </div>
    <p v-if="showDate" class="countdown__date">{{ $t('countdown.startDate') }}</p>
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

.countdown {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__label {
    font-family: $font-mono;
    font-size: $text-xs;
    font-weight: 400;
    letter-spacing: $tracking-label;
    text-transform: uppercase;
    margin: 0 0 $space-8 0;
    color: $earth-600;
  }

  &__grid {
    display: flex;
    justify-content: center;
    gap: $space-4;

    @media (max-width: $breakpoint-sm) {
      gap: $space-3;
    }
  }

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__number {
    display: block;
    position: relative;
    isolation: isolate; // Creates stacking context for ::after
    background: $warm-black;
    color: $cream;
    font-family: $font-mono;
    font-size: 2.5rem;
    font-weight: 400;
    line-height: 1;
    padding: 1rem 0.75rem;
    min-width: 70px;
    text-align: center;

    // Terracotta border offset (surround box, shifted to bottom-right)
    &::after {
      content: '';
      position: absolute;
      top: -8px;
      left: -8px;
      right: -8px;
      bottom: -8px;
      border: 1px solid $terracotta;
      z-index: -1;
      transform: translate(6px, 6px);
      pointer-events: none;
      box-sizing: border-box;
    }

    @media (max-width: $breakpoint-md) {
      font-size: 2rem;
      padding: 0.875rem 0.625rem;
      min-width: 60px;

      &::after {
        top: -6px;
        left: -6px;
        right: -6px;
        bottom: -6px;
        transform: translate(4px, 4px);
      }
    }

    @media (max-width: $breakpoint-sm) {
      font-size: 1.5rem;
      padding: 0.75rem 0.5rem;
      min-width: 50px;
    }
  }

  &__unit {
    font-family: $font-mono;
    font-size: $text-sm;
    letter-spacing: $tracking-widest;
    text-transform: uppercase;
    color: $earth-600;
    margin-top: $space-3;

    @media (max-width: $breakpoint-sm) {
      font-size: $text-xs;
      margin-top: $space-2;
    }
  }

  &__date {
    font-family: $font-serif;
    font-style: italic;
    font-size: $text-2xl;
    color: $terracotta-700;
    margin-top: $space-12;

    @media (max-width: $breakpoint-sm) {
      font-size: $text-xl;
      margin-top: $space-8;
    }
  }
}
</style>
