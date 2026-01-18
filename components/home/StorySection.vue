<script setup lang="ts">
// Story section - the personal narrative that builds emotional connection
// Uses slow scroll-triggered reveal animation

const sectionRef = ref<HTMLElement | null>(null)
const { observeAll } = useScrollReveal({ threshold: 0.1 })

onMounted(() => {
  if (sectionRef.value) {
    observeAll('.reveal', sectionRef.value)
  }
})
</script>

<template>
  <section ref="sectionRef" class="story-section">
    <div class="story-section__content reveal">
      <span class="story-section__eyebrow">The Beginning</span>
      <h2 class="story-section__title">The Story</h2>

      <div class="story-section__text">
        <p>
          Two years ago, Ria Xi couldn't get out of bed. Burned out from her tech career
          in Silicon Valley, she started running as a 30-day challenge after a breakup.
        </p>
        <p>
          Within a year, she went from struggling to finish a half marathon to setting
          Fastest Known Times on world-renowned routes. The Via Francigena: 1,014 km in
          21 days. The Camino de Santiago: 780 km in 12 days.
        </p>
        <p class="story-section__highlight">
          Now she's attempting the impossible: running 20,000 kilometers from Vladivostok
          to Lisbon, retracing the ancient Silk Road on foot.
        </p>
      </div>

      <NuxtLink to="/about" class="story-section__link">
        Read the full story →
      </NuxtLink>
    </div>

    <figure class="story-section__image reveal">
      <img
        src="/images/Ria_flash.webp"
        alt="Ria Xi mid-stride on a dusty trail, determination visible in her posture as she runs through challenging terrain"
        loading="lazy"
      >
    </figure>
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;
@use '~/assets/scss/_decorative' as *;

.story-section {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: $space-12;
  align-items: center;
  padding: $space-16 0;

  @media (max-width: $breakpoint-xl) {
    grid-template-columns: 1fr;
    gap: $space-8;
  }

  &__content {
    @include paper-texture($sand-50);
    padding: $space-8;
    margin: -$space-8;
  }

  &__eyebrow {
    display: block;
    font-family: $font-serif;
    font-style: italic;
    font-size: $text-lg;
    color: $terracotta;
    margin-bottom: $space-3;
  }

  &__title {
    font-family: $font-serif;
    font-size: clamp($text-3xl, 6vw, $text-4xl);
    text-transform: uppercase;
    letter-spacing: -0.02em;
    margin-bottom: $space-6;
  }

  &__text {
    margin-bottom: $space-8;

    p {
      font-size: $text-base;
      line-height: $leading-loose;
      color: $earth-700;
      margin-bottom: $space-4;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  &__highlight {
    font-family: $font-serif;
    font-size: $text-lg;
    color: $warm-black;
    font-style: italic;
    padding-left: $space-4;
    border-left: 3px solid $terracotta;
    margin-top: $space-6;
  }

  &__link {
    display: inline-block;
    font-family: $font-mono;
    font-size: $text-sm;
    letter-spacing: $tracking-wide;
    color: $warm-black;
    text-decoration: none;
    padding-bottom: $space-1;
    border-bottom: 2px solid $warm-black;
    transition: color 0.2s ease, border-color 0.2s ease;

    &:hover {
      color: $terracotta-700;
      border-color: $terracotta-700;
    }
  }

  &__image {
    position: sticky;
    top: $space-8;
    margin: 0;

    img {
      width: 100%;
      height: auto;
      min-height: 450px;
      object-fit: cover;
      @include hand-drawn-border($warm-black, 3px);
    }

    @media (max-width: $breakpoint-xl) {
      position: static;
      max-width: 500px;
      margin: 0 auto;
      order: -1;

      img {
        min-height: 350px;
      }
    }
  }
}
</style>
