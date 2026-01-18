<script setup lang="ts">
// Text-based motion toggle for header placement
const { motionAllowed, toggleMotion } = useSensoryMode()
</script>

<template>
  <button
    class="motion-toggle"
    :aria-pressed="motionAllowed"
    :aria-label="motionAllowed ? $t('sensory.turnOffMotion') : $t('sensory.turnOnMotion')"
    @click="toggleMotion"
  >
    <span class="motion-toggle__label">Motion:</span>
    <span class="motion-toggle__state">{{ motionAllowed ? 'On' : 'Off' }}</span>
  </button>
</template>

<style lang="scss" scoped>
.motion-toggle {
  display: flex;
  align-items: center;
  gap: $space-1;
  background: none;
  border: none;
  cursor: pointer;
  font-family: $font-mono;
  font-size: $text-sm;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  color: $earth-700;
  padding: $space-1 $space-2;
  border-radius: $border-radius-sm;
  transition: color 0.2s ease, background 0.2s ease;

  &:hover {
    color: $warm-black;
    background: rgba($warm-black, 0.05);
  }

  &:focus-visible {
    outline: 2px solid $terracotta;
    outline-offset: 2px;
  }

  &__label {
    color: $earth-600;
  }

  &__state {
    font-weight: 600;
    color: inherit;
  }
}
</style>
