<script setup lang="ts">
const links = [
  {
    href: 'https://forms.gle/4hi4gMRhXii32uax5',
    label: 'links.crew.label',
    title: 'links.crew.title',
    desc: 'links.crew.desc'
  },
  {
    href: 'https://substack.com/@whereisriax',
    label: 'links.newsletter.label',
    title: 'links.newsletter.title',
    desc: 'links.newsletter.desc'
  },
  {
    href: 'https://instagram.com/whereisriax',
    label: 'links.instagram.label',
    title: 'links.instagram.title',
    desc: 'links.instagram.desc'
  }
]
</script>

<template>
  <section class="links-section">
    <div class="links-grid">
      <a
        v-for="(link, index) in links"
        :key="index"
        :href="link.href"
        class="link-card"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="link-arrow">↗</span>
        <p class="link-card-label">{{ $t(link.label) }}</p>
        <h3 class="link-card-title">{{ $t(link.title) }}</h3>
        <p class="link-card-desc">{{ $t(link.desc) }}</p>
      </a>
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
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: $space-6;
}
</style>
