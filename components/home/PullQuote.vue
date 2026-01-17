<script setup lang="ts">
// Full-width pull quote section
// Creates visual break between story and route map
</script>

<template>
  <section class="pull-quote">
    <blockquote class="pull-quote__text">
      <span class="pull-quote__mark" aria-hidden="true">"</span>
      At human speed, strangers become hosts.<br>
      Headlines become handshakes.
      <span class="pull-quote__mark" aria-hidden="true">"</span>
    </blockquote>
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

.pull-quote {
  // Full-width bleed
  width: 100vw;
  margin-left: calc(-50vw + 50%);

  background: $warm-black;
  padding: $space-20 $space-8;

  @media (max-width: $breakpoint-md) {
    padding: $space-12 $space-6;
  }
}

.pull-quote__text {
  max-width: $max-width-narrow;
  margin: 0 auto;

  font-family: $font-serif;
  font-style: italic;
  font-size: clamp($text-2xl, 4vw, $text-4xl);
  line-height: $leading-relaxed;
  text-align: center;
  color: $cream;

  br {
    @media (max-width: $breakpoint-md) {
      display: none;
    }
  }
}

.pull-quote__mark {
  color: $terracotta;
  font-size: 1.4em;
  line-height: 0;
  vertical-align: -0.15em;
}
</style>
