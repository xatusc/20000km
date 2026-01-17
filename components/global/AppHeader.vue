<script setup lang="ts">
// Header component with logo and tagline
</script>

<template>
  <header class="header">
    <div class="container header-inner">
      <NuxtLink to="/" class="logo">
        {{ $t('site.title') }}
      </NuxtLink>
      <span class="tagline">
        {{ $t('site.tagline') }}
      </span>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  border-bottom: $border-width solid $warm-black;
  padding: $space-4 0;
  margin-bottom: $space-12;
}

.header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: $breakpoint-md) {
    flex-direction: column;
    gap: $space-2;
    text-align: center;
  }
}

.logo {
  font-size: $text-sm;
  letter-spacing: $tracking-wider;
  text-transform: uppercase;
  text-decoration: none;
  color: $warm-black;
}

.tagline {
  font-family: $font-serif;
  font-style: italic;
  font-size: $text-base;
  color: $terracotta;
}
</style>
