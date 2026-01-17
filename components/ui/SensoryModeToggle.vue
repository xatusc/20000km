<script setup lang="ts">
const { motionAllowed, toggleMotion } = useSensoryMode()
</script>

<template>
  <button
    class="sensory-toggle transition-essential"
    :class="{ 'motion-on': motionAllowed }"
    :aria-pressed="motionAllowed"
    :aria-label="motionAllowed ? $t('sensory.disableMotion') : $t('sensory.enableMotion')"
    @click="toggleMotion"
  >
    <span v-if="motionAllowed" class="icon" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M5 12h14"/>
        <path d="m12 5 7 7-7 7"/>
      </svg>
    </span>
    <span v-else class="icon" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M9 9h6v6H9z"/>
      </svg>
    </span>
  </button>
</template>

<style lang="scss" scoped>
.sensory-toggle {
  position: fixed;
  bottom: $space-4;
  right: $space-4;
  z-index: $z-fixed;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $warm-black;
  color: $cream;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: $shadow-lg;

  &:hover {
    background: $earth-800;
  }

  &:focus-visible {
    outline: 2px solid $terracotta;
    outline-offset: 2px;
  }

  &.motion-on {
    background: $terracotta;

    &:hover {
      background: $terracotta-600;
    }
  }
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
