<script setup lang="ts">
interface Activity {
  athleteName: string
  name: string
  distance: number
  distanceKm: string
  movingTime: number
  movingTimeFormatted: string
  elevationGain: number
  type: string
}

interface ActivitiesResponse {
  activities: Activity[]
  totalCount: number
  totalDistanceKm: number
  totalElevationGain: number
  totalMovingTimeSeconds: number
  totalMovingTimeFormatted: string
}

const config = useRuntimeConfig()
const clubId = config.public.stravaClubId

const showAll = ref(false)
const initialCount = 5

const { data, pending, error } = await useFetch<ActivitiesResponse>('/api/strava/activities', {
  query: { limit: 30 }
})

const displayedActivities = computed(() => {
  if (!data.value?.activities) return []
  return showAll.value
    ? data.value.activities
    : data.value.activities.slice(0, initialCount)
})

const hasMoreToShow = computed(() => {
  return data.value?.activities && data.value.activities.length > initialCount && !showAll.value
})

const stravaClubUrl = computed(() => `https://www.strava.com/clubs/${clubId}`)

const activityCountDisplay = computed(() => {
  const count = data.value?.totalCount || 0
  return count >= 30 ? '30+' : count.toString()
})

function toggleShowAll() {
  showAll.value = !showAll.value
}
</script>

<template>
  <!-- Only show section if data loaded successfully -->
  <section v-if="!pending && !error && displayedActivities.length > 0" class="activity-feed" aria-labelledby="activity-heading">
    <div class="container">
      <h2 id="activity-heading" class="activity-feed__title">Recent Club Activity</h2>
      <p class="activity-feed__subtitle">
        <span class="activity-feed__stat-highlight">{{ data?.totalDistanceKm?.toLocaleString() || 0 }} km</span>,
        <span class="activity-feed__stat-highlight">{{ data?.totalElevationGain?.toLocaleString() || 0 }}m</span> elevation across
        <span class="activity-feed__stat-highlight">{{ activityCountDisplay }}</span> recent runs
      </p>

      <!-- Activities Grid -->
      <div class="activity-feed__content">
        <div class="activity-feed__scroll-container" role="list">
          <article
            v-for="(activity, index) in displayedActivities"
            :key="index"
            class="activity-feed__card"
            role="listitem"
          >
            <div class="activity-feed__card-header">
              <span class="activity-feed__activity-name">{{ activity.name }}</span>
            </div>
            <div class="activity-feed__card-stats">
              <div class="activity-feed__stat">
                <span class="activity-feed__stat-value">{{ activity.distanceKm }}</span>
                <span class="activity-feed__stat-label">km</span>
              </div>
              <div class="activity-feed__stat">
                <span class="activity-feed__stat-value">{{ activity.movingTimeFormatted }}</span>
                <span class="activity-feed__stat-label">time</span>
              </div>
            </div>
            <div class="activity-feed__card-footer">
              <span class="activity-feed__athlete">{{ activity.athleteName }}</span>
            </div>
          </article>
        </div>

        <!-- View More Button -->
        <div v-if="hasMoreToShow" class="activity-feed__more">
          <button
            @click="toggleShowAll"
            class="activity-feed__more-btn"
            aria-expanded="false"
          >
            View More
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
        </div>

        <!-- Collapse Button (when expanded) -->
        <div v-if="showAll && data?.activities && data.activities.length > initialCount" class="activity-feed__more">
          <button
            @click="toggleShowAll"
            class="activity-feed__more-btn"
            aria-expanded="true"
          >
            Show Less
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M5 15l7-7 7 7"/>
            </svg>
          </button>
        </div>

        <!-- Link to Strava -->
        <div class="activity-feed__strava-link-wrapper">
          <a
            :href="stravaClubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="activity-feed__strava-link"
            aria-label="View all activities on Strava (opens in new tab)"
          >
            View all on Strava
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.activity-feed {
  padding: $space-16 $space-4;
  background: $sand-100;

  .container {
    max-width: $max-width-content;
    margin: 0 auto;
  }

  &__title {
    font-family: $font-serif;
    font-size: $text-2xl;
    text-align: center;
    margin-bottom: $space-2;
    color: $warm-black;
  }

  &__subtitle {
    font-family: $font-mono;
    font-size: $text-sm;
    text-align: center;
    color: $earth-600;
    margin-bottom: $space-8;
  }

  &__stat-highlight {
    font-weight: 700;
    color: $warm-black;
  }

  &__loading,
  &__error,
  &__empty {
    text-align: center;
    padding: $space-8;
    font-family: $font-mono;
    font-size: $text-sm;
    color: $earth-600;
  }

  &__error {
    color: $terracotta-700;
  }

  &__scroll-container {
    display: flex;
    gap: $space-4;
    overflow-x: auto;
    padding-bottom: $space-4;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;

    // Hide scrollbar but keep functionality
    scrollbar-width: thin;
    scrollbar-color: $earth-300 transparent;

    &::-webkit-scrollbar {
      height: 6px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: $earth-300;
      border-radius: 3px;
    }

    @media (min-width: $breakpoint-lg) {
      flex-wrap: wrap;
      justify-content: center;
      overflow-x: visible;
      scroll-snap-type: none;
    }
  }

  &__card {
    flex-shrink: 0;
    width: 160px;
    padding: $space-4;
    background: $cream;
    border: 1px solid $earth-200;
    border-radius: $border-radius-md;
    scroll-snap-align: start;
    transition: border-color $transition-base, transform $transition-base;

    &:hover {
      border-color: $earth-400;
      transform: translateY(-2px);
    }

    // Trauma-informed: disable motion transforms for reduced motion preference
    @media (prefers-reduced-motion: reduce) {
      transition: border-color $transition-base;

      &:hover {
        transform: none;
      }
    }

    @media (min-width: $breakpoint-lg) {
      width: 180px;
    }
  }

  &__card-header {
    margin-bottom: $space-3;
    padding-bottom: $space-3;
    border-bottom: 1px solid $earth-100;
  }

  &__activity-name {
    display: block;
    font-family: $font-serif;
    font-size: $text-sm;
    font-weight: 700;
    color: $warm-black;
    line-height: $leading-snug;
    // Truncate long names
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__card-stats {
    display: flex;
    gap: $space-4;
    margin-bottom: $space-3;
  }

  &__stat {
    display: flex;
    flex-direction: column;
  }

  &__stat-value {
    font-family: $font-serif;
    font-size: $text-lg;
    font-weight: 700;
    color: $warm-black;
    line-height: $leading-tight;
  }

  &__stat-label {
    font-family: $font-mono;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: $tracking-widest;
    color: $earth-700; // WCAG AA compliant
  }

  &__card-footer {
    padding-top: $space-2;
    border-top: 1px solid $earth-100;
  }

  &__athlete {
    font-family: $font-mono;
    font-size: $text-xs;
    color: $earth-700; // WCAG AA compliant
  }

  &__more {
    display: flex;
    justify-content: center;
    margin-top: $space-6;
  }

  &__more-btn {
    display: inline-flex;
    align-items: center;
    gap: $space-2;
    padding: $space-2 $space-4;
    font-family: $font-mono;
    font-size: $text-sm;
    text-transform: uppercase;
    letter-spacing: $tracking-wide;
    color: $earth-700; // WCAG AA compliant
    background: transparent;
    border: 1px solid $earth-400;
    border-radius: $border-radius-md;
    cursor: pointer;
    transition: color $transition-base, border-color $transition-base;

    svg {
      width: 16px;
      height: 16px;
    }

    &:hover {
      color: $warm-black;
      border-color: $earth-600;
    }

    &:focus-visible {
      outline: 2px solid $terracotta-500;
      outline-offset: 2px;
    }
  }

  &__strava-link-wrapper {
    text-align: center;
    margin-top: $space-6;
  }

  &__strava-link {
    display: inline-flex;
    align-items: center;
    gap: $space-1;
    font-family: $font-mono;
    font-size: $text-sm;
    color: $terracotta-600;
    text-decoration: none;
    transition: color $transition-base;

    svg {
      width: 14px;
      height: 14px;
      transition: transform $transition-base;
    }

    &:hover {
      color: $terracotta-700;

      svg {
        transform: translate(2px, -2px);
      }
    }

    &:focus-visible {
      outline: 2px solid $terracotta-500;
      outline-offset: 2px;
    }
  }
}
</style>
