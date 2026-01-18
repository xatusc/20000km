<script setup lang="ts">
/**
 * CountdownTimer - Bold, dramatic countdown display
 */
const props = withDefaults(defineProps<{
  targetDate?: string
}>(), {
  targetDate: 'May 1, 2026 00:00:00'
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
  <div class="countdown">
    <p class="countdown__label">{{ $t('countdown.label') }}</p>
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
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

.countdown {
  text-align: center;
  flex-direction: column;

  &__label {
    font-family: $font-mono;
    font-size: $text-xs;
    letter-spacing: $tracking-widest;
    text-transform: uppercase;
    margin-bottom: $space-6;
    color: $terracotta-700;
  }

  &__grid {
    display: flex;
    justify-content: center;
    gap: $space-6;

    @media (max-width: $breakpoint-md) {
      gap: $space-4;
    }
  }

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 80px;

    @media (max-width: $breakpoint-md) {
      min-width: 60px;
    }
  }

  &__number {
    font-family: $font-serif;
    font-size: $text-5xl;
    font-weight: 400;
    line-height: 1;
    color: $warm-black;

    @media (max-width: $breakpoint-md) {
      font-size: $text-4xl;
    }

    @media (max-width: $breakpoint-sm) {
      font-size: $text-3xl;
    }
  }

  &__unit {
    font-family: $font-mono;
    font-size: $text-xs;
    letter-spacing: $tracking-wide;
    text-transform: uppercase;
    color: $earth-500;
    margin-top: $space-2;
  }
}

.support-page .countdown {
  flex-direction: row;
}
</style>
