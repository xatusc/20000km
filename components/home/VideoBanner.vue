<script setup lang="ts">
// Cinematic video banner - visual break element
</script>

<template>
  <div class="video-banner">
    <video
      class="video-element"
      autoplay
      muted
      loop
      playsinline
      poster="/sinai-run.webp"
    >
      <source src="/video/ria-run.mp4" type="video/mp4">
    </video>
    <div class="video-overlay"></div>
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

.video-banner {
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  height: 300px;
  overflow: hidden;
  position: relative;
  margin-top: $space-8;

  @media (max-width: $breakpoint-md) {
    height: 200px;
  }
}

.video-element {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.video-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba($cream, 0.1) 0%,
    transparent 20%,
    transparent 80%,
    rgba($cream, 0.1) 100%
  );
  pointer-events: none;
}
</style>
