<script setup lang="ts">
interface EventData {
  id: number
  title: string
  description: string
  activityType: string
  startDate: string
  startDateLocal: string
  address: string
  stravaUrl: string
  isPast: boolean
}

interface EventsResponse {
  upcoming: EventData[]
  past: EventData[]
}

const config = useRuntimeConfig()
const clubId = config.public.stravaClubId

const { data: eventsData, pending, error } = await useFetch<EventsResponse>('/api/strava/events')

const activeTab = ref<'upcoming' | 'past'>('upcoming')

const displayedEvents = computed(() => {
  if (!eventsData.value) return []
  return activeTab.value === 'upcoming'
    ? eventsData.value.upcoming
    : eventsData.value.past
})

const stravaEventsUrl = computed(() => `https://www.strava.com/clubs/${clubId}/group_events`)

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

function formatTime(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}

function setActiveTab(tab: 'upcoming' | 'past') {
  activeTab.value = tab
}

// Keyboard navigation for tabs (WCAG 2.1 requirement)
function handleTabKeydown(event: KeyboardEvent, currentTab: 'upcoming' | 'past') {
  const tabs: ('upcoming' | 'past')[] = ['upcoming', 'past']
  const currentIndex = tabs.indexOf(currentTab)

  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault()
    const direction = event.key === 'ArrowRight' ? 1 : -1
    const newIndex = (currentIndex + direction + tabs.length) % tabs.length
    setActiveTab(tabs[newIndex])

    // Focus the new tab
    const newTabId = `tab-${tabs[newIndex]}`
    const newTabElement = document.getElementById(newTabId)
    newTabElement?.focus()
  }
}
</script>

<template>
  <!-- Only show section if data loaded and has events -->
  <section v-if="!pending && !error && eventsData && (eventsData.upcoming?.length || eventsData.past?.length)" class="events-section" aria-labelledby="events-heading">
    <div class="container">
      <h2 id="events-heading" class="events-section__title">Group Runs</h2>

      <!-- Tab Navigation -->
      <div class="events-section__tabs" role="tablist" aria-label="Event categories">
        <button
          role="tab"
          :aria-selected="activeTab === 'upcoming'"
          :tabindex="activeTab === 'upcoming' ? 0 : -1"
          :class="['events-section__tab', { 'events-section__tab--active': activeTab === 'upcoming' }]"
          @click="setActiveTab('upcoming')"
          @keydown="handleTabKeydown($event, 'upcoming')"
          id="tab-upcoming"
          aria-controls="panel-upcoming"
        >
          Upcoming
          <span v-if="eventsData?.upcoming?.length" class="events-section__count" aria-label="count">
            {{ eventsData.upcoming.length }}
          </span>
        </button>
        <button
          role="tab"
          :aria-selected="activeTab === 'past'"
          :tabindex="activeTab === 'past' ? 0 : -1"
          :class="['events-section__tab', { 'events-section__tab--active': activeTab === 'past' }]"
          @click="setActiveTab('past')"
          @keydown="handleTabKeydown($event, 'past')"
          id="tab-past"
          aria-controls="panel-past"
        >
          Past
          <span v-if="eventsData?.past?.length" class="events-section__count" aria-label="count">
            {{ eventsData.past.length }}
          </span>
        </button>
      </div>

      <!-- Events List -->
      <div
        :id="'panel-' + activeTab"
        role="tabpanel"
        :aria-labelledby="'tab-' + activeTab"
        class="events-section__panel"
      >
        <ul class="events-section__list">
          <li
            v-for="event in displayedEvents"
            :key="event.id"
            class="events-section__event"
          >
            <div class="events-section__event-header">
              <span class="events-section__event-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </span>
              <h3 class="events-section__event-title">{{ event.title }}</h3>
            </div>
            <div class="events-section__event-details">
              <time :datetime="event.startDate" class="events-section__event-date">
                {{ formatDate(event.startDateLocal) }} · {{ formatTime(event.startDateLocal) }}
              </time>
              <span v-if="event.address" class="events-section__event-location">
                {{ event.address }}
              </span>
            </div>
            <a
              :href="event.stravaUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="events-section__event-link"
              :aria-label="`View ${event.title} on Strava (opens in new tab)`"
            >
              View on Strava
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.events-section {
  padding: $space-16 $space-4;
  background: $cream;

  .container {
    max-width: $max-width-narrow;
    margin: 0 auto;
  }

  &__title {
    font-family: $font-serif;
    font-size: $text-2xl;
    text-align: center;
    margin-bottom: $space-8;
    color: $warm-black;
  }

  &__tabs {
    display: flex;
    justify-content: center;
    gap: $space-4;
    margin-bottom: $space-8;
    border-bottom: 1px solid $earth-200;
    padding-bottom: $space-4;
  }

  &__tab {
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
    border: none;
    cursor: pointer;
    transition: color $transition-base;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: calc(-1 * $space-4 - 1px);
      left: 0;
      right: 0;
      height: 2px;
      background: transparent;
      transition: background $transition-base;
    }

    &:hover {
      color: $warm-black;
    }

    &:focus-visible {
      outline: 2px solid $terracotta-500;
      outline-offset: 2px;
    }

    &--active {
      color: $warm-black;

      &::after {
        background: $terracotta-600;
      }
    }
  }

  &__count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 20px;
    height: 20px;
    padding: 0 $space-1;
    font-size: $text-xs;
    background: $sand-200;
    border-radius: 10px;
    color: $earth-600;

    .events-section__tab--active & {
      background: $terracotta-100;
      color: $terracotta-700;
    }
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

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: $space-4;
  }

  &__event {
    padding: $space-6;
    background: $sand-50;
    border: 1px solid $earth-200;
    border-radius: $border-radius-md;
    transition: border-color $transition-base;

    &:hover {
      border-color: $earth-400;
    }
  }

  &__event-header {
    display: flex;
    align-items: flex-start;
    gap: $space-3;
    margin-bottom: $space-3;
  }

  &__event-icon {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    color: $terracotta-600;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  &__event-title {
    font-family: $font-serif;
    font-size: $text-lg;
    font-weight: 700;
    color: $warm-black;
    margin: 0;
    line-height: $leading-snug;
  }

  &__event-details {
    display: flex;
    flex-direction: column;
    gap: $space-1;
    margin-left: calc(20px + $space-3);
    margin-bottom: $space-4;
  }

  &__event-date {
    font-family: $font-mono;
    font-size: $text-sm;
    color: $earth-700; // WCAG AA compliant
  }

  &__event-location {
    font-size: $text-sm;
    color: $earth-600; // WCAG AA compliant for larger text
    font-style: italic;
  }

  &__event-link {
    display: inline-flex;
    align-items: center;
    gap: $space-1;
    margin-left: calc(20px + $space-3);
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

  &__strava-link {
    display: inline-block;
    margin-top: $space-4;
    font-family: $font-mono;
    font-size: $text-sm;
    color: $terracotta-600;
    text-decoration: underline;
    text-underline-offset: 2px;

    &:hover {
      color: $terracotta-700;
    }

    &:focus-visible {
      outline: 2px solid $terracotta-500;
      outline-offset: 2px;
    }
  }
}
</style>
