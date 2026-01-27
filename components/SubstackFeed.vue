<script setup lang="ts">
/**
 * SubstackFeed - Displays recent posts from Long Run Letters
 * Auto-fetches and caches RSS feed
 */
const { posts, isLoading, error, substackUrl } = useSubstackFeed()
</script>

<template>
  <section class="substack-feed">
    <div class="substack-feed__header">
      <span class="substack-feed__label">Dispatches</span>
      <h3 class="substack-feed__title">Long Run Letters</h3>
      <p class="substack-feed__desc">
        Stories and lessons from spending the end of my twenties running across countries and continents.
      </p>
    </div>

    <!-- Loading state -->
    <div v-if="isLoading" class="substack-feed__loading">
      <LoadingSkeleton type="substack" />
      <LoadingSkeleton type="substack" />
      <LoadingSkeleton type="substack" />
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="substack-feed__error">
      <a :href="substackUrl" target="_blank" rel="noopener noreferrer" class="substack-feed__cta">
        Read on Substack
      </a>
    </div>

    <!-- Posts -->
    <div v-else class="substack-feed__posts">
      <article v-for="post in posts" :key="post.link" class="substack-feed__post">
        <a :href="post.link" target="_blank" rel="noopener noreferrer" class="substack-feed__post-link">
          <span class="substack-feed__post-date">{{ post.formattedDate }}</span>
          <h4 class="substack-feed__post-title">{{ post.title }}</h4>
          <p class="substack-feed__post-excerpt">{{ post.description }}</p>
        </a>
      </article>
    </div>

    <a :href="substackUrl" target="_blank" rel="noopener noreferrer" class="substack-feed__cta">
      Subscribe to Long Run Letters
    </a>
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

.substack-feed {
  padding: $space-8;
  background: $sand-100;
  border-radius: $border-radius-md;
}

.substack-feed__header {
  margin-bottom: $space-6;
}

.substack-feed__label {
  font-family: $font-mono;
  font-size: $text-xs;
  letter-spacing: $tracking-widest;
  text-transform: uppercase;
  color: $terracotta-700;
  display: block;
  margin-bottom: $space-2;
}

.substack-feed__title {
  font-family: $font-serif;
  font-size: $text-xl;
  margin-bottom: $space-2;
}

.substack-feed__desc {
  font-size: $text-sm;
  color: $earth-500;
  font-style: italic;
}

.substack-feed__loading {
  display: flex;
  flex-direction: column;
  gap: $space-4;
  margin-bottom: $space-6;
}

.substack-feed__error {
  padding: $space-6 0;
  text-align: center;
  color: $terracotta-700;
  font-size: $text-sm;
}

.substack-feed__posts {
  display: flex;
  flex-direction: column;
  gap: $space-4;
  margin-bottom: $space-6;
}

.substack-feed__post {
  padding-bottom: $space-4;
  border-bottom: 1px solid $earth-200;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
}

.substack-feed__post-link {
  display: block;
  text-decoration: none;
  color: inherit;
  transition: opacity $transition-base;

  &:hover {
    opacity: 0.8;

    .substack-feed__post-title {
      color: $terracotta-700;
    }
  }
}

.substack-feed__post-date {
  font-family: $font-mono;
  font-size: $text-xs;
  color: $earth-400;
  letter-spacing: $tracking-wide;
}

.substack-feed__post-title {
  font-family: $font-serif;
  font-size: $text-base;
  margin: $space-1 0 $space-2 0;
  transition: color $transition-base;
}

.substack-feed__post-excerpt {
  font-size: $text-sm;
  color: $earth-500;
  line-height: $leading-relaxed;
}

.substack-feed__cta {
  display: inline-block;
  font-family: $font-mono;
  font-size: $text-sm;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  color: $warm-black;
  text-decoration: none;
  padding-bottom: $space-1;
  border-bottom: 1px solid $warm-black;
  transition: color $transition-base, border-color $transition-base;

  &:hover {
    color: $terracotta-700;
    border-color: $terracotta-700;
  }
}
</style>
