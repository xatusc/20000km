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
    <h2 id="countdown-label" class="countdown__label">{{ $t('countdown.label') }}</h2>
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
    margin: $space-8 0 0 0;
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

    @media (max-width: $breakpoint-sm) {
      padding: 1rem 0.75rem;
      min-width: 60px;
      box-shadow: 4px 4px 0 $terracotta;
    }
  }

  &__number {
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

  &__unit {
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
