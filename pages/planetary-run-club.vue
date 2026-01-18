<script setup lang="ts">
useSeoMeta({
  title: 'Planetary Run Club | 20,000KM',
  description: 'Join the Planetary Run Club — a community of runners following Ria\'s 20,000km journey. Get weekly dispatches from training now, live updates once the run begins.'
})
</script>

<template>
  <div class="run-club-page">
    <!-- Hero section -->
    <section class="hero-section">
      <div class="hero-section__overlay"></div>
      <div class="container">
        <div class="hero-section__content">
          <span class="hero-section__kicker">Join the Movement</span>
          <h1 class="hero-section__title">Planetary Run Club</h1>
        </div>
      </div>
    </section>

    <!-- Pull quote section -->
    <section class="quote-section">
      <blockquote class="quote-section__content">
        <p>"Nowhere we can run to is too far,—and everyone you meet is a neighbor"</p>
      </blockquote>
    </section>

    <!-- Community section -->
    <div class="container">
      <section class="community-section">
        <div class="community-section__card">
          <h2 class="community-section__title">The Movement is Growing</h2>
          <p class="community-section__desc">
            Planetary Run Club is a community of runners joining Ria's journey.
            Right now, that means weekly dispatches from training. Once the run
            begins, we'll be building virtual challenges, meetups, and more — together.
          </p>
          <p class="community-section__location">
            Whether you're in Tokyo or Toronto, Berlin or Buenos Aires—you're
            part of this journey.
          </p>

          <div class="community-section__social">
            <a href="https://substack.com/@whereisriax" target="_blank" rel="noopener" class="community-section__social-link">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
              </svg>
              <span>Substack</span>
            </a>
            <a href="https://instagram.com/whereisriax" target="_blank" rel="noopener" class="community-section__social-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
              <span>Instagram</span>
            </a>
            <a href="https://strava.app.link/B5t6CElN7Yb" target="_blank" rel="noopener" class="community-section__social-link">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169"/>
              </svg>
              <span>Strava</span>
            </a>
          </div>

        </div>
      </section>
    </div>

    <!-- Team image - full width -->
    <figure class="team-image">
      <img
        src="/Ria_team_horizontal.webp"
        alt="Ria and team together"
        loading="lazy"
      >
    </figure>
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

// Hero section
.hero-section {
  position: relative;
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  background-image: url('/Ria_teamrun_horizontal.webp');
  background-size: cover;
  background-position: center;

  &__overlay {
    position: absolute;
    inset: 0;
    background: rgba($warm-black, 0.5);
  }

  &__content {
    position: relative;
    z-index: 1;
    max-width: 600px;
    padding: $space-16 $space-4;
  }

  &__kicker {
    display: block;
    font-family: $font-mono;
    font-size: $text-xs;
    letter-spacing: $tracking-widest;
    text-transform: uppercase;
    color: $terracotta-300;
    margin-bottom: $space-4;
  }

  &__title {
    font-family: $font-serif;
    font-size: clamp($text-5xl, 10vw, 6rem);
    color: $cream;
    margin: 0;
  }
}

// Pull quote section
.quote-section {
  padding: $space-16 $space-4;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $sand-100;

  &__content {
    max-width: 800px;
    margin: 0;
    text-align: center;

    p {
      font-family: $font-serif;
      font-size: clamp($text-xl, 3vw, $text-3xl);
      font-style: italic;
      line-height: $leading-relaxed;
      color: $warm-black;
      margin: 0;
    }
  }
}

// Community section
.community-section {
  padding: $space-16 0;

  &__card {
    text-align: center;
    max-width: 700px;
    margin: 0 auto;
  }

  &__title {
    font-family: $font-serif;
    font-size: $text-2xl;
    margin-bottom: $space-4;
  }

  &__desc {
    font-size: $text-base;
    color: $earth-600;
    line-height: $leading-relaxed;
    margin-bottom: $space-4;
  }

  &__location {
    font-size: $text-base;
    font-style: italic;
    color: $earth-500;
    margin-bottom: $space-8;
  }

  &__social {
    display: flex;
    justify-content: center;
    gap: $space-6;
    flex-wrap: wrap;
  }

  &__social-link {
    display: flex;
    align-items: center;
    gap: $space-2;
    font-family: $font-mono;
    font-size: $text-sm;
    color: $earth-600;
    text-decoration: none;
    transition: color 0.2s ease;
    position: relative;

    svg {
      width: 20px;
      height: 20px;
    }

    span {
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 1px;
        background: $terracotta;
        transition: width 0.3s ease;
      }
    }

    &:hover {
      color: $terracotta;

      span::after {
        width: 100%;
      }
    }
  }
}

.team-image {
  margin: 0;
  width: 100%;
  max-height: 60vh;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
