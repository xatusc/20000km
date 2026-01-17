<script setup lang="ts">
// Story section - the "why" that comes before asking for support
</script>

<template>
  <section class="story-section">
    <div class="story-content">
      <h2 class="story-title">The Story</h2>

      <div class="story-text">
        <p>
          Two years ago, Ria Xi couldn't get out of bed. Burned out from her tech career
          in Silicon Valley, she started running as a 30-day challenge after a breakup.
        </p>
        <p>
          Within a year, she went from struggling to finish a half marathon to setting
          Fastest Known Times on world-renowned routes. The Via Francigena: 1,014 km in
          21 days. The Camino de Santiago: 780 km in 12 days.
        </p>
        <p class="story-highlight">
          Now she's attempting the impossible: running 20,000 kilometers from Vladivostok
          to Lisbon, retracing the ancient Silk Road on foot.
        </p>
      </div>

      <div class="story-themes">
        <div class="theme">
          <h3>Women's Empowerment</h3>
          <p>The first woman-led ultra-distance crossing of the Eurasian continent.</p>
        </div>
        <div class="theme">
          <h3>Mental Health</h3>
          <p>Proof that movement and ambitious goals can rebuild a sense of meaning.</p>
        </div>
        <div class="theme">
          <h3>Connection</h3>
          <p>At human speed, strangers become hosts. Headlines become handshakes.</p>
        </div>
      </div>

      <NuxtLink to="/about" class="story-link">
        Read the full story
      </NuxtLink>
    </div>

    <figure class="story-image">
      <img
        src="/Ria_flash.webp"
        alt="Ria Xi running"
        loading="lazy"
      >
    </figure>
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

.story-section {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: $space-12;
  align-items: start;
  padding: $space-16 0;
  border-bottom: $border-width solid $warm-black;

  @media (max-width: $breakpoint-xl) {
    grid-template-columns: 1fr;
    gap: $space-8;
  }
}

.story-title {
  font-family: $font-serif;
  font-size: $text-3xl;
  margin-bottom: $space-6;
}

.story-text {
  margin-bottom: $space-8;

  p {
    font-size: $text-base;
    line-height: $leading-loose;
    color: $earth-600;
    margin-bottom: $space-4;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .story-highlight {
    font-family: $font-serif;
    font-size: $text-lg;
    color: $warm-black;
    font-style: italic;
    padding-left: $space-4;
    border-left: 2px solid $terracotta;
    margin-top: $space-6;
  }
}

.story-themes {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $space-6;
  margin-bottom: $space-8;

  @media (max-width: $breakpoint-lg) {
    grid-template-columns: 1fr;
    gap: $space-4;
  }
}

.theme {
  h3 {
    font-family: $font-mono;
    font-size: $text-xs;
    letter-spacing: $tracking-wide;
    text-transform: uppercase;
    color: $terracotta;
    margin-bottom: $space-2;
  }

  p {
    font-size: $text-sm;
    line-height: $leading-relaxed;
    color: $earth-500;
  }
}

.story-link {
  display: inline-block;
  font-family: $font-mono;
  font-size: $text-sm;
  letter-spacing: $tracking-wide;
  color: $warm-black;
  text-decoration: none;
  padding-bottom: $space-1;
  border-bottom: 1px solid $warm-black;
  transition: color 0.2s ease, border-color 0.2s ease;

  &:hover {
    color: $terracotta;
    border-color: $terracotta;
  }
}

.story-image {
  position: sticky;
  top: $space-8;

  img {
    width: 100%;
    border-radius: $border-radius-md;
  }

  @media (max-width: $breakpoint-xl) {
    position: static;
    max-width: 400px;
    margin: 0 auto;
    order: -1;
  }
}
</style>
