<script setup lang="ts">
interface ClubData {
  id: number
  name: string
  description: string
  memberCount: number
  city: string
  country: string
  profileImage: string
  coverImage: string
  stravaUrl: string
}

const config = useRuntimeConfig()
const clubId = config.public.stravaClubId

const { data: clubData, pending: clubPending, error: clubError } = await useFetch<ClubData>('/api/strava/club')

const isLoading = computed(() => clubPending.value)

const stravaJoinUrl = computed(() => `https://www.strava.com/clubs/${clubId}`)
</script>

<template>
  <section class="club-stats" aria-labelledby="club-stats-heading">
    <h2 id="club-stats-heading" class="visually-hidden">Club Statistics</h2>

    <!-- Stats Display (only show if data loaded successfully) -->
    <div v-if="!isLoading && !clubError && clubData" class="club-stats__grid">
      <div class="club-stats__item">
        <span class="club-stats__value">{{ clubData?.memberCount || '—' }}</span>
        <span class="club-stats__label">Members</span>
      </div>
    </div>

    <!-- Join Button (Below Stats) -->
    <div class="club-stats__action">
      <a
        :href="stravaJoinUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="club-stats__join-btn"
        aria-label="Join 20,000KM Planetary Run Club on Strava (opens in new tab)"
      >
        <svg class="club-stats__strava-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169"/>
        </svg>
        <span>Join the Club</span>
        <svg class="club-stats__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M7 17L17 7M17 7H7M17 7V17"/>
        </svg>
      </a>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.club-stats {
  padding: $space-12 $space-4;
  background: $sand-100;
  border-top: 2px solid $warm-black;
  border-bottom: 2px solid $warm-black;

  &__loading,
  &__error {
    text-align: center;
    padding: $space-8;
    font-family: $font-mono;
    font-size: $text-sm;
    color: $earth-600;
  }

  &__error {
    color: $terracotta-700;
  }

  &__grid {
    display: flex;
    justify-content: center;
    gap: $space-8;
    flex-wrap: wrap;
    max-width: $max-width-narrow;
    margin: 0 auto;

    @media (min-width: $breakpoint-lg) {
      gap: $space-16;
    }
  }

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    min-width: 100px;
  }

  &__value {
    font-family: $font-serif;
    font-size: clamp($text-3xl, 6vw, $text-5xl);
    font-weight: 700;
    color: $warm-black;
    line-height: $leading-tight;
  }

  &__label {
    font-family: $font-mono;
    font-size: $text-xs;
    text-transform: uppercase;
    letter-spacing: $tracking-widest;
    color: $earth-700; // WCAG AA compliant contrast
    margin-top: $space-2;
  }

  &__action {
    display: flex;
    justify-content: center;
    margin-top: $space-8;
  }

  &__join-btn {
    display: inline-flex;
    align-items: center;
    gap: $space-3;
    padding: $space-4 $space-8;
    background: $terracotta-600;
    color: $cream;
    font-family: $font-mono;
    font-size: $text-sm;
    text-transform: uppercase;
    letter-spacing: $tracking-wide;
    text-decoration: none;
    border: 2px solid $terracotta-700;
    transition: background $transition-base, transform $transition-base;

    &:hover {
      background: $terracotta-700;
      transform: translateY(-2px);
    }

    &:focus-visible {
      outline: 2px solid $terracotta-500;
      outline-offset: 2px;
    }

    // Trauma-informed: disable motion transforms for reduced motion preference
    @media (prefers-reduced-motion: reduce) {
      transition: background $transition-base;

      &:hover {
        transform: none;
      }
    }
  }

  &__strava-icon {
    width: 20px;
    height: 20px;
  }

  &__arrow {
    width: 16px;
    height: 16px;
    transition: transform $transition-base;

    .club-stats__join-btn:hover & {
      transform: translate(2px, -2px);
    }
  }
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
