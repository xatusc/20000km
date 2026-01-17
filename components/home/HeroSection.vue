<script setup lang="ts">
// Hero left side with title and route
</script>

<template>
  <div class="hero-left">
    <h1>
      <span>{{ $t('hero.title') }}</span>
      <span class="km">{{ $t('hero.titleUnit') }}</span>
    </h1>
    <div class="route">
      <span>{{ $t('hero.routeStart') }}</span>
      <span class="route-line"></span>
      <span>{{ $t('hero.routeEnd') }}</span>
    </div>
    <p class="delusional">{{ $t('hero.delusional') }}</p>
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

.hero-left {
  h1 {
    font-family: $font-serif;
    font-size: clamp(4rem, 12vw, 9rem);
    font-weight: 400;
    line-height: 0.9;
    margin-bottom: $space-6;
    letter-spacing: $tracking-tighter;

    span {
      display: block;
    }

    .km {
      font-family: $font-mono;
      font-size: 0.35em;
      letter-spacing: $tracking-wide;
      vertical-align: middle;
      margin-left: $space-2;
      color: $terracotta;
    }
  }
}

.route {
  font-size: $text-sm;
  letter-spacing: $tracking-widest;
  text-transform: uppercase;
  margin-bottom: $space-8;
  display: flex;
  align-items: center;
  gap: $space-4;
}

.route-line {
  flex: 1;
  max-width: 80px;
  height: 1px;
  background: $warm-black;
}

.delusional {
  font-family: $font-serif;
  font-style: italic;
  font-size: $text-xl;
  color: $terracotta;
  margin-top: $space-4;
}

@media (max-width: $breakpoint-xl) {
  .hero-left {
    text-align: center;
  }

  .route {
    justify-content: center;
  }

  .delusional {
    display: block;
  }
}

@media (max-width: $breakpoint-md) {
  .hero-left h1 {
    font-size: 4.5rem;

    .km {
      display: block;
      margin-left: 0;
      margin-top: $space-2;
    }
  }
}
</style>
