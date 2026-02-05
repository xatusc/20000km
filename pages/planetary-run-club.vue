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

    <!-- Two Ways to Join Section -->
    <section class="join-section">
      <div class="container">
        <h2 class="join-section__title">{{ $t('runClub.twoWays.title') }}</h2>

        <div class="join-section__grid">
          <!-- Virtual Track -->
          <div class="join-section__track">
            <div class="join-section__track-header">
              <span class="join-section__track-number">01</span>
              <h3 class="join-section__track-title">{{ $t('runClub.twoWays.virtual.title') }}</h3>
            </div>
            <p class="join-section__track-desc">{{ $t('runClub.twoWays.virtual.desc') }}</p>
            <p class="join-section__track-note">{{ $t('runClub.twoWays.virtual.note') }}</p>

            <div class="join-section__social">
              <a href="https://substack.com/@whereisriax" target="_blank" rel="noopener noreferrer" class="join-section__social-link" aria-label="Follow on Substack (opens in new tab)">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
                </svg>
                <span>Substack</span>
              </a>
              <a href="https://instagram.com/whereisriax" target="_blank" rel="noopener noreferrer" class="join-section__social-link" aria-label="Follow on Instagram (opens in new tab)">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
                <span>Instagram</span>
              </a>
              <a href="https://strava.app.link/Ko6etEYp5Zb" target="_blank" rel="noopener noreferrer" class="join-section__social-link" aria-label="Follow on Strava (opens in new tab)">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169"/>
                </svg>
                <span>Strava</span>
              </a>
            </div>
          </div>

          <!-- In Person Track -->
          <div class="join-section__track">
            <div class="join-section__track-header">
              <span class="join-section__track-number">02</span>
              <h3 class="join-section__track-title">{{ $t('runClub.twoWays.inPerson.title') }}</h3>
            </div>
            <p class="join-section__track-desc">{{ $t('runClub.twoWays.inPerson.desc') }}</p>

            <div class="join-section__options">
              <!-- Flagship Runs -->
              <div class="join-section__option">
                <h4 class="join-section__option-title">{{ $t('runClub.twoWays.inPerson.flagship.title') }}</h4>
                <p class="join-section__option-desc">{{ $t('runClub.twoWays.inPerson.flagship.desc') }}</p>
                <a
                  href="https://strava.app.link/Ko6etEYp5Zb"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="join-section__cta"
                  aria-label="Join the Strava Run Club (opens in new tab)"
                >
                  {{ $t('runClub.twoWays.inPerson.flagship.cta') }}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <path d="M7 17L17 7M17 7H7M17 7V17"/>
                  </svg>
                </a>
              </div>

              <!-- Local Runs -->
              <div class="join-section__option">
                <h4 class="join-section__option-title">{{ $t('runClub.twoWays.inPerson.local.title') }}</h4>
                <p class="join-section__option-desc">{{ $t('runClub.twoWays.inPerson.local.desc') }}</p>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSeHWS96TKFyz31taqQ0zr9dysYEJjA4xgYpnhPRNzX1wN4xlA/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="join-section__cta"
                  aria-label="Sign up to host a local run (opens in new tab)"
                >
                  {{ $t('runClub.twoWays.inPerson.local.cta') }}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <path d="M7 17L17 7M17 7H7M17 7V17"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Strava Club Stats - commented out for now -->
    <!-- <StravaClubStats /> -->

    <!-- Strava Events with Tabs - commented out for now -->
    <!-- <StravaEventsTabs /> -->

    <!-- Strava Activity Feed - commented out for now -->
    <!-- <StravaActivityFeed /> -->

    <!-- Support Section -->
    <!-- <SupportSection /> -->

    <!-- Pull quote section -->
    <section class="quote-section">
      <blockquote class="quote-section__content">
        <p>"Nowhere we can run to is too far,<br>and everyone you meet is a neighbor"</p>
      </blockquote>
    </section>

    <!-- Dune image - full width -->
    <figure class="team-image">
      <img
        src="/images/Sand_Dune.webp"
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
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  background-image: url('/images/Ria_team_horizontal.webp');
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

// Two Ways to Join section
.join-section {
  padding: $space-16 $space-4;
  background: $sand-100;
  border-bottom: 3px solid $warm-black;

  .container {
    max-width: $max-width-content;
    margin: 0 auto;
  }

  &__title {
    font-family: $font-serif;
    font-size: clamp($text-2xl, 4vw, $text-3xl);
    text-align: center;
    margin-bottom: $space-12;
    color: $warm-black;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-8;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
      gap: $space-12;
    }
  }

  &__track {
    background: $cream;
    padding: $space-8;
    border: 2px solid $earth-200;

    @media (min-width: 768px) {
      padding: $space-10;
    }
  }

  &__track-header {
    display: flex;
    align-items: center;
    gap: $space-4;
    margin-bottom: $space-4;
  }

  &__track-number {
    font-family: $font-mono;
    font-size: $text-sm;
    color: $terracotta;
    letter-spacing: $tracking-wider;
  }

  &__track-title {
    font-family: $font-serif;
    font-size: $text-xl;
    color: $warm-black;
    margin: 0;
  }

  &__track-desc {
    font-size: $text-base;
    color: $earth-700;
    line-height: $leading-relaxed;
    margin-bottom: $space-4;
  }

  &__track-note {
    font-size: $text-sm;
    font-style: italic;
    color: $a11y-text-secondary; // WCAG AAA compliant
    margin: 0;
  }

  &__social {
    display: flex;
    gap: $space-6;
    flex-wrap: wrap;
    margin-top: $space-6;
    padding-top: $space-6;
    border-top: 1px solid $earth-200;
  }

  &__social-link {
    display: flex;
    align-items: center;
    gap: $space-2;
    font-family: $font-mono;
    font-size: $text-sm;
    color: $earth-700;
    text-decoration: none;
    transition: color 0.2s ease;

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

    &:focus-visible {
      outline: 2px solid $terracotta-500;
      outline-offset: 2px;
    }
  }

  &__options {
    display: flex;
    flex-direction: column;
    gap: $space-6;
    margin-top: $space-6;
    padding-top: $space-6;
    border-top: 1px solid $earth-200;
  }

  &__option {
    padding-left: $space-4;
    border-left: 2px solid $terracotta-300;
  }

  &__option-title {
    font-family: $font-mono;
    font-size: $text-sm;
    text-transform: uppercase;
    letter-spacing: $tracking-wider;
    color: $warm-black;
    margin: 0 0 $space-2 0;
  }

  &__option-desc {
    font-size: $text-sm;
    color: $earth-700;
    line-height: $leading-relaxed;
    margin: 0 0 $space-3 0;
  }

  &__cta {
    display: inline-flex;
    align-items: center;
    gap: $space-2;
    font-family: $font-mono;
    font-size: $text-sm;
    color: $terracotta-700;
    text-decoration: none;
    transition: all 0.2s ease;

    svg {
      width: 16px;
      height: 16px;
      transition: transform 0.2s ease;
    }

    &:hover {
      color: $terracotta-900;

      svg {
        transform: translate(2px, -2px);
      }
    }

    &:focus-visible {
      outline: 2px solid $terracotta-500;
      outline-offset: 2px;
    }

    &--primary {
      margin-top: $space-6;
      padding: $space-3 $space-5;
      background: $terracotta-700;
      color: $cream;
      font-size: $text-sm;

      &:hover {
        background: $terracotta-800;
        color: $cream;
      }
    }
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

.team-image {
  margin: 0;
  width: 100%;
  height: 70vh;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}
</style>
