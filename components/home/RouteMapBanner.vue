<script setup lang="ts">
// Route map banner - full width image
</script>

<template>
  <div class="route-map-banner">
    <img src="/route-map.webp" alt="Route from Vladivostok to Cabo da Roca" loading="lazy">
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

.route-map-banner {
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  height: 160px;
  overflow: hidden;
  position: relative;
  margin-top: $space-12;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  @media (max-width: $breakpoint-md) {
    height: 80px;
  }
}
</style>
