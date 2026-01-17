<script setup lang="ts">
// Links grid - secondary actions at bottom of homepage
const links = [
  {
    href: '/live-updates',
    label: 'links.journey.label',
    title: 'links.journey.title',
    desc: 'links.journey.desc',
    internal: true
  },
  {
    href: 'https://substack.com/@whereisriax',
    label: 'links.newsletter.label',
    title: 'links.newsletter.title',
    desc: 'links.newsletter.desc',
    internal: false
  },
  {
    href: 'https://instagram.com/whereisriax',
    label: 'links.instagram.label',
    title: 'links.instagram.title',
    desc: 'links.instagram.desc',
    internal: false
  }
]
</script>

<template>
  <section class="links-section">
    <div class="links-grid">
      <template v-for="(link, index) in links" :key="index">
        <!-- Internal links use NuxtLink -->
        <NuxtLink
          v-if="link.internal"
          :to="link.href"
          class="link-card"
        >
          <span class="link-arrow">&rarr;</span>
          <p class="link-card-label">{{ $t(link.label) }}</p>
          <h3 class="link-card-title">{{ $t(link.title) }}</h3>
          <p class="link-card-desc">{{ $t(link.desc) }}</p>
        </NuxtLink>

        <!-- External links use anchor -->
        <a
          v-else
          :href="link.href"
          class="link-card"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="link-arrow">&nearr;</span>
          <p class="link-card-label">{{ $t(link.label) }}</p>
          <h3 class="link-card-title">{{ $t(link.title) }}</h3>
          <p class="link-card-desc">{{ $t(link.desc) }}</p>
        </a>
      </template>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

.links-section {
  padding: $space-16 0;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $space-6;

  @media (max-width: $breakpoint-lg) {
    grid-template-columns: 1fr;
  }
}

.link-card {
  display: block;
  padding: $space-6;
  border: $border-width solid $earth-300;
  text-decoration: none;
  color: $warm-black;
  position: relative;
  transition: border-color 0.2s ease, background 0.2s ease;

  &:hover {
    border-color: $warm-black;
    background: $sand-100;
  }
}

.link-arrow {
  position: absolute;
  top: $space-4;
  right: $space-4;
  font-size: $text-lg;
  color: $earth-400;
  transition: color 0.2s ease;

  .link-card:hover & {
    color: $terracotta;
  }
}

.link-card-label {
  font-family: $font-mono;
  font-size: $text-xs;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  color: $terracotta;
  margin-bottom: $space-2;
}

.link-card-title {
  font-family: $font-serif;
  font-size: $text-xl;
  margin-bottom: $space-2;
}

.link-card-desc {
  font-size: $text-sm;
  color: $earth-500;
  line-height: $leading-relaxed;
}
</style>
