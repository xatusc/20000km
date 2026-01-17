<script setup lang="ts">
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
  <div class="hero-right">
    <p class="countdown-label">{{ $t('countdown.label') }}</p>
    <div class="countdown" role="timer" :aria-label="`${formatted.days} days, ${formatted.hours} hours, ${formatted.minutes} minutes, ${formatted.seconds} seconds until departure`">
      <div v-for="unit in units" :key="unit.key" class="countdown-item">
        <span class="countdown-number">{{ formatted[unit.key] }}</span>
        <span class="countdown-unit">{{ $t(unit.label) }}</span>
      </div>
    </div>
    <p class="start-date">{{ $t('countdown.startDate') }}</p>

    <div class="badge">
      <p class="badge-title">{{ $t('badge.title') }}</p>
      <p class="badge-text" v-html="$t('badge.text').replace(',—', ',—<br>')"></p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

.hero-right {
  text-align: center;
}

.countdown-label {
  font-size: $text-sm;
  letter-spacing: $tracking-label;
  text-transform: uppercase;
  margin-bottom: $space-6;
  color: $sage;
}

.start-date {
  font-family: $font-serif;
  font-size: $text-lg;
  color: $faded-red;
}
</style>
