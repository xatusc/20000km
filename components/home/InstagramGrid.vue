<script setup lang="ts">
const instagramUrl = 'https://instagram.com/whereisriax'
</script>

<template>
  <div class="instagram-grid">
    <div class="instagram-header">
      <div class="instagram-header-text">
        <p class="instagram-label">From the Field</p>
        <h3 class="instagram-title">Training & Prep</h3>
      </div>
      <a
        :href="instagramUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="instagram-link"
      >
        @whereisriax →
      </a>
    </div>

    <div class="lightwidget-container">
      <iframe
        src="https://lightwidget.com/widgets/b5655f5969955de3b8508c977c21c321.html"
        scrolling="no"
        allowtransparency="true"
        class="lightwidget-widget"
        style="width: 100%; border: 0; overflow: hidden; height: 400px;"
      />
    </div>

    <a
      :href="instagramUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="instagram-follow"
    >
      Follow the Journey
    </a>
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

.instagram-grid {
  padding: $space-8 0;
}

.instagram-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: $space-4;
  flex-wrap: wrap;
  gap: $space-2;
}

.instagram-header-text {
  display: flex;
  flex-direction: column;
}

.instagram-label {
  font-family: $font-mono;
  font-size: $text-xs;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  color: $terracotta-700;
  margin-bottom: $space-1;
}

.instagram-title {
  font-family: $font-serif;
  font-size: $text-xl;
  color: $warm-black;
}

.instagram-link {
  font-family: $font-mono;
  font-size: $text-sm;
  color: $terracotta-700;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.lightwidget-container {
  margin-bottom: $space-6;
}

.lightwidget-widget {
  width: 100%;
  border: 0;
  overflow: hidden;
}

.instagram-follow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: $font-mono;
  font-size: $text-sm;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  color: $warm-black;
  text-decoration: none;
  padding: $space-3 $space-6;
  border: $border-width solid $warm-black;
  background: transparent;
  transition: background 0.2s ease, color 0.2s ease;
  min-height: 44px;

  &:hover {
    background: $warm-black;
    color: $cream;
  }
}
</style>
