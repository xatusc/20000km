<script setup lang="ts">
interface Props {
  eyebrow?: string
  title?: string
  showHeader?: boolean
}

withDefaults(defineProps<Props>(), {
  eyebrow: '',
  title: '',
  showHeader: true
})
</script>

<template>
  <section class="instagram-section">
    <div v-if="showHeader" class="container">
      <header class="section-header">
        <span v-if="eyebrow" class="section-eyebrow">{{ eyebrow }}</span>
        <h2 v-if="title" class="section-heading">{{ title }}</h2>
        <a
          href="https://instagram.com/whereisriax"
          target="_blank"
          rel="noopener noreferrer"
          class="section-link"
          aria-label="Follow @whereisriax on Instagram (opens in new tab)"
        >
          @whereisriax →
        </a>
      </header>
    </div>

    <!-- LightWidget Instagram embed -->
    <div class="lightwidget-container">
      <iframe
        src="https://cdn.lightwidget.com/widgets/b5655f5969955de3b8508c977c21c321.html"
        scrolling="no"
        allowtransparency="true"
        class="lightwidget-widget"
        style="width:100%;border:0;overflow:hidden;"
        title="Instagram photo gallery from @whereisriax"
      ></iframe>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

.instagram-section {
  padding: $space-20 0;
  background: $sand-100;
}

.section-header {
  margin-bottom: $space-10;
  text-align: center;
}

.section-eyebrow {
  display: block;
  font-family: $font-mono;
  font-size: $text-xs;
  letter-spacing: $tracking-widest;
  text-transform: uppercase;
  color: $terracotta-700;
  margin-bottom: $space-3;
}

.section-heading {
  font-family: $font-serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 400;
  color: $warm-black;
  margin: 0;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.section-link {
  display: inline-block;
  margin-top: $space-4;
  font-family: $font-mono;
  font-size: $text-sm;
  letter-spacing: $tracking-wide;
  color: $terracotta-700;
  text-decoration: none;
  text-transform: uppercase;
  border-bottom: 1px solid $terracotta-700;
  padding-bottom: 2px;
  transition: color $transition-base;

  &:hover {
    color: $terracotta-800;
  }
}

.lightwidget-container {
  width: 100%;
}

.lightwidget-widget {
  width: 100%;
  height: 400px;
  border: 0;
  overflow: hidden;
}
</style>
