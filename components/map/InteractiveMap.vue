<script setup lang="ts">
/**
 * InteractiveMap - Progress tracker overlaid on route map image
 * Ported from tracker/interactive-map.js to Vue 3 Composition API
 * Shows animated runner progress and hover tooltips for waypoints
 */

interface Waypoint {
  id: string
  name: string
  km: number
  x: number
  y: number
  country: string
  info: string
}

// Waypoint data - preserved exactly from original
const waypoints: Waypoint[] = [
  { id: 'vladivostok', name: 'Vladivostok', km: 0, x: 96, y: 43, country: 'Russia', info: 'Start - Pacific coast of Russia' },
  { id: 'beijing', name: 'Beijing', km: 1854, x: 86, y: 59, country: 'China', info: 'Through the Great Wall' },
  { id: 'xian', name: "Xi'an", km: 3000, x: 82.5, y: 76, country: 'China', info: 'Ancient Silk Road capital' },
  { id: 'urumqi', name: 'Urumqi', km: 5584, x: 72.5, y: 53, country: 'China', info: 'Gateway to Central Asia' },
  { id: 'samarkand', name: 'Samarkand', km: 8262, x: 52, y: 60, country: 'Uzbekistan', info: 'Heart of the Silk Road' },
  { id: 'iran', name: 'Iran', km: 11500, x: 44, y: 79, country: 'Iran', info: 'Persian highlands crossing' },
  { id: 'istanbul', name: 'Istanbul', km: 13500, x: 28, y: 53, country: 'Turkey', info: 'Where East meets West' },
  { id: 'italy', name: 'Italy', km: 16500, x: 17, y: 36, country: 'Italy', info: 'Through the Alps' },
  { id: 'santiago', name: 'Santiago', km: 19000, x: 4, y: 50, country: 'Spain', info: 'Camino de Santiago' },
  { id: 'lisbon', name: 'Cabo da Roca', km: 20000, x: 4, y: 64, country: 'Portugal', info: 'Finish - Westernmost point of Eurasia' }
]

// Props
const props = withDefaults(defineProps<{
  animationDuration?: number
  showMilestones?: boolean
}>(), {
  animationDuration: 2000,
  showMilestones: true
})

// Fundraising data
const {
  fundedKm,
  totalKm,
  formattedFunded,
  formattedTotal,
  progress,
  isLoading
} = useFundraising()

// Milestones (based on budget)
interface Milestone {
  id: string
  name: string
  amount: number
  km: number // equivalent km at €5/km
  description: string
}

const milestones: Milestone[] = [
  { id: 'vehicle', name: 'Support Vehicle', amount: 32000, km: 6400, description: 'Van purchase & equipment' },
  { id: 'logistics', name: 'Logistics', amount: 49000, km: 9800, description: 'Visas, permits & transport' },
  { id: 'crew', name: 'Crew & Daily', amount: 86000, km: 17200, description: 'Crew support & daily costs' },
  { id: 'full', name: 'Fully Funded', amount: 100000, km: 20000, description: 'Complete expedition support' }
]

// Current milestone
const currentMilestone = computed(() => {
  const funded = fundedKm.value * 5 // Convert km back to euros
  for (let i = 0; i < milestones.length; i++) {
    if (funded < milestones[i].amount) {
      return {
        milestone: milestones[i],
        index: i,
        progressToNext: i === 0
          ? (funded / milestones[0].amount) * 100
          : ((funded - milestones[i - 1].amount) / (milestones[i].amount - milestones[i - 1].amount)) * 100
      }
    }
  }
  return {
    milestone: milestones[milestones.length - 1],
    index: milestones.length - 1,
    progressToNext: 100
  }
})

const fundedAmount = computed(() => fundedKm.value * 5)

// Sensory mode
const { motionAllowed } = useSensoryMode()

// Refs
const routePath = ref<SVGPathElement | null>(null)
const redOverlay = ref<HTMLElement | null>(null)
const runnerEl = ref<HTMLButtonElement | null>(null)

// State
const pinnedTooltip = ref<string | null>(null)
const runnerTooltipPinned = ref(false)
const activeTooltip = ref<Waypoint | null>(null)
const runnerPosition = ref({ x: 95, y: 28 })
const runnerVisible = ref(false)
const displayedFundedKm = ref(0)

// Computed
const liveRegionText = computed(() => {
  return `${formattedFunded.value} of ${formattedTotal.value} kilometers funded, ${progress.value.toFixed(1)} percent complete`
})

const isTooltipPinned = computed(() => pinnedTooltip.value !== null || runnerTooltipPinned.value)

// Methods
const isEndpoint = (id: string) => id === 'vladivostok' || id === 'lisbon'

const isWaypointReached = (km: number) => fundedKm.value >= km

const showTooltip = (waypoint: Waypoint) => {
  if (isTooltipPinned.value) return
  activeTooltip.value = waypoint
}

const hideTooltip = () => {
  if (isTooltipPinned.value) return
  activeTooltip.value = null
}

const handleWaypointClick = (waypoint: Waypoint, event: Event) => {
  event.stopPropagation()

  if (pinnedTooltip.value === waypoint.id) {
    pinnedTooltip.value = null
    activeTooltip.value = null
  } else {
    pinnedTooltip.value = waypoint.id
    activeTooltip.value = waypoint
    runnerTooltipPinned.value = false
  }
}

const handleRunnerClick = (event: Event) => {
  event.stopPropagation()
  runnerTooltipPinned.value = !runnerTooltipPinned.value

  if (runnerTooltipPinned.value) {
    pinnedTooltip.value = null
    activeTooltip.value = null
  }
}

const handleDocumentClick = () => {
  pinnedTooltip.value = null
  runnerTooltipPinned.value = false
  activeTooltip.value = null
}

// Animation
const setRunnerPosition = (path: SVGPathElement, length: number) => {
  const point = path.getPointAtLength(length)
  runnerPosition.value = { x: point.x, y: point.y }
  runnerVisible.value = true

  // Update clip-path on red overlay
  if (redOverlay.value) {
    redOverlay.value.style.clipPath = `inset(0 0 0 ${point.x}%)`
  }
}

const animateRunner = (targetProgress: number) => {
  if (!routePath.value) return

  const path = routePath.value
  const pathLength = path.getTotalLength()
  const targetLength = pathLength * (targetProgress / 100)

  // Check for reduced motion
  const prefersReducedMotion = !motionAllowed.value

  if (prefersReducedMotion) {
    setRunnerPosition(path, targetLength)
    displayedFundedKm.value = fundedKm.value
    return
  }

  // Animate to position
  const startTime = performance.now()
  const duration = props.animationDuration
  const startKm = displayedFundedKm.value
  const targetKm = fundedKm.value

  const animate = (now: number) => {
    const elapsed = now - startTime
    const t = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - t, 3) // ease-out

    const currentLength = targetLength * eased
    setRunnerPosition(path, currentLength)

    // Animate km counter
    displayedFundedKm.value = Math.round(startKm + (targetKm - startKm) * eased)

    if (t < 1) {
      requestAnimationFrame(animate)
    }
  }

  requestAnimationFrame(animate)
}

// Watch for data changes
watch([fundedKm, totalKm], () => {
  if (!isLoading.value) {
    animateRunner(progress.value)
  }
})

// Setup on mount
onMounted(() => {
  document.addEventListener('click', handleDocumentClick)

  // Initial animation after data loads
  if (!isLoading.value) {
    nextTick(() => {
      animateRunner(progress.value)
    })
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick)
})
</script>

<template>
  <div
    class="interactive-map"
    :class="{ 'interactive-map--tooltip-pinned': isTooltipPinned }"
    role="region"
    :aria-label="$t('map.ariaLabel')"
  >
    <!-- Progress stats bar -->
    <div class="interactive-map__stats">
      <div class="interactive-map__stats-left">
        <span class="interactive-map__direction">{{ $t('map.runningDirection') }}</span>
      </div>
      <div class="interactive-map__stats-right">
        <span class="interactive-map__funded">{{ displayedFundedKm.toLocaleString() }}</span>
        <span class="interactive-map__separator">/</span>
        <span class="interactive-map__total">{{ formattedTotal }}</span>
        <span class="interactive-map__unit">{{ $t('map.kmFunded') }}</span>
      </div>
    </div>

    <!-- Milestones progress -->
    <div v-if="showMilestones" class="interactive-map__milestones">
      <div class="interactive-map__milestone-bar">
        <div
          class="interactive-map__milestone-progress"
          :style="{ width: `${progress}%` }"
        ></div>
        <button
          v-for="(ms, index) in milestones"
          :key="ms.id"
          type="button"
          class="interactive-map__milestone-marker"
          :class="{
            'interactive-map__milestone-marker--reached': fundedAmount >= ms.amount,
            'interactive-map__milestone-marker--current': currentMilestone.index === index
          }"
          :style="{ left: `${(ms.amount / 100000) * 100}%` }"
          :aria-label="`${ms.name}: €${(ms.amount / 1000).toFixed(0)}k - ${ms.description}`"
        >
          <span class="interactive-map__milestone-dot"></span>
          <!-- Hover tooltip -->
          <span class="interactive-map__milestone-tooltip">
            <span class="interactive-map__milestone-tooltip-name">{{ ms.name }}</span>
            <span class="interactive-map__milestone-tooltip-amount">€{{ (ms.amount / 1000).toFixed(0) }}k</span>
            <span class="interactive-map__milestone-tooltip-desc">{{ ms.description }}</span>
          </span>
        </button>
      </div>
      <p class="interactive-map__milestone-current">
        <span class="interactive-map__milestone-next-label">Next:</span>
        <strong>{{ currentMilestone.milestone.name }}</strong>
        <span class="interactive-map__milestone-next-amount">(€{{ (currentMilestone.milestone.amount / 1000).toFixed(0) }}k)</span>
        <span class="interactive-map__milestone-next-desc">— {{ currentMilestone.milestone.description }}</span>
      </p>
    </div>

    <div class="interactive-map__image-wrapper">
      <!-- Gray route (base layer) -->
      <img
        src="/images/route-map-gray.webp"
        alt=""
        class="interactive-map__image interactive-map__image--gray"
        loading="lazy"
        aria-hidden="true"
      >

      <!-- Red route (overlay - revealed as runner passes) -->
      <div
        ref="redOverlay"
        class="interactive-map__picture interactive-map__picture--red"
      >
        <img
          src="/images/route-map.webp"
          :alt="$t('map.routeAlt')"
          class="interactive-map__image interactive-map__image--red"
          loading="lazy"
        >
      </div>

      <!-- SVG overlay for the route path -->
      <svg class="interactive-map__overlay" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          ref="routePath"
          class="interactive-map__route"
          d="M 95 28
             C 93 32, 91 38, 89 42
             C 87 52, 86 58, 85 62
             C 82 58, 78 45, 73 38
             C 66 35, 58 40, 52 45
             C 48 48, 45 52, 42 55
             C 38 50, 33 42, 28 38
             C 23 34, 20 32, 17 30
             C 12 32, 9 33, 7 35
             C 5 40, 4 45, 3 48"
          fill="none"
          stroke="transparent"
          stroke-width="2"
        />
      </svg>

      <!-- Waypoint markers -->
      <div class="interactive-map__waypoints">
        <button
          v-for="wp in waypoints"
          :key="wp.id"
          class="interactive-map__waypoint"
          :class="{
            'interactive-map__waypoint--endpoint': isEndpoint(wp.id),
            'interactive-map__waypoint--reached': isWaypointReached(wp.km)
          }"
          :style="{ left: `${wp.x}%`, top: `${wp.y}%` }"
          :aria-label="`${wp.name}, ${wp.country} - ${wp.km.toLocaleString()} km. ${wp.info}`"
          @mouseenter="showTooltip(wp)"
          @mouseleave="hideTooltip"
          @focus="showTooltip(wp)"
          @blur="hideTooltip"
          @click="handleWaypointClick(wp, $event)"
        >
          <span class="interactive-map__waypoint-dot"></span>
          <span class="interactive-map__waypoint-label">{{ wp.name }}</span>
        </button>
      </div>

      <!-- Runner icon -->
      <button
        ref="runnerEl"
        class="interactive-map__runner"
        :class="{
          'interactive-map__runner--visible': runnerVisible,
          'interactive-map__runner--tooltip-pinned': runnerTooltipPinned
        }"
        :style="{ left: `${runnerPosition.x}%`, top: `${runnerPosition.y}%` }"
        type="button"
        :aria-label="`Fundraising progress: ${formattedFunded} of ${formattedTotal} kilometers funded`"
        aria-describedby="runner-tooltip"
        @click="handleRunnerClick"
      >
        <svg viewBox="0 0 100 100" fill="currentColor" style="transform: scaleX(-1);" aria-hidden="true">
          <path d="M73.742,16.819c-2.138,5.297-8.161,7.866-13.472,5.755c-5.298-2.138-7.879-8.161-5.741-13.472c2.124-5.311,8.147-7.892,13.458-5.754C73.285,5.485,75.866,11.509,73.742,16.819z"/>
          <path d="M46.543,61.739l-5.62,8.363l-6.306,3.012c-1.95,0.928-3.415,2.554-4.127,4.584c-0.726,2.018-0.605,4.209,0.322,6.145c0.121,0.256,0.269,0.484,0.404,0.727l-6.319,9.425c-1.25,1.869-3.415,2.877-5.661,2.635c-0.968-0.107-1.896-0.443-2.716-0.981c-2.756-1.868-3.496-5.62-1.64-8.376l22.601-33.693l0.014,0.014l0.04,0.04L46.543,61.739z"/>
          <path d="M34.644,45.727c0.444,2.635-1.331,5.109-3.953,5.553c-0.269,0.04-0.538,0.067-0.807,0.067c-0.027,0-0.054-0.014-0.094-0.014c-0.121,0-0.229-0.014-0.35-0.027c-0.188-0.026-0.363-0.04-0.538-0.08c-0.121-0.027-0.242-0.054-0.363-0.095c-0.161-0.054-0.336-0.107-0.498-0.174c-0.107-0.041-0.215-0.094-0.336-0.162c-0.148-0.067-0.296-0.161-0.444-0.255c-0.094-0.067-0.202-0.134-0.296-0.202c-0.134-0.107-0.269-0.229-0.39-0.35c-0.094-0.081-0.175-0.161-0.255-0.255c-0.121-0.134-0.229-0.282-0.336-0.43c-0.067-0.094-0.134-0.175-0.202-0.282c-0.107-0.175-0.188-0.35-0.269-0.538c-0.041-0.094-0.094-0.175-0.135-0.269c-0.094-0.283-0.188-0.592-0.242-0.901l-2.891-23.3c0-0.041,0-0.067,0-0.094c-0.027-0.175-0.027-0.35-0.04-0.524c0-0.161-0.014-0.309-0.014-0.47c0.014-0.027,0-0.067,0-0.094c0.014-0.121,0.054-0.242,0.067-0.363c0.027-0.161,0.054-0.322,0.094-0.484c0.04-0.161,0.107-0.309,0.161-0.457s0.094-0.282,0.162-0.403c0.067-0.162,0.161-0.31,0.255-0.457c0.081-0.108,0.148-0.229,0.229-0.336c0.094-0.134,0.215-0.255,0.336-0.39c0.094-0.094,0.188-0.202,0.282-0.296c0.135-0.107,0.269-0.215,0.404-0.309c0.107-0.081,0.215-0.162,0.349-0.242c0.148-0.094,0.31-0.161,0.471-0.242c0.121-0.054,0.242-0.107,0.363-0.148c0.188-0.081,0.376-0.121,0.564-0.161c0.094-0.027,0.175-0.054,0.282-0.081c0.027,0,0.054,0,0.081,0c0.175-0.027,0.363-0.027,0.538-0.041c0.121,0,0.242-0.013,0.363-0.013c0.027,0,0.054,0.013,0.094,0.013c0.014,0,0.041,0,0.054,0c0.014,0,0.014,0,0.027,0c0.014,0,0.014,0,0.027,0c0,0,20.894,1.17,22.44,1.654c0.995,0.309,17.089,8.067,17.681,11.832l4.611,12.154L84.565,34.5c0.256-0.175,0.511-0.323,0.78-0.444c0.08-0.041,0.161-0.067,0.241-0.094c0.188-0.081,0.391-0.148,0.578-0.202c0.095-0.027,0.188-0.041,0.282-0.067c0.202-0.04,0.417-0.067,0.619-0.081c0.08,0,0.161-0.013,0.229-0.013c0.04,0,0.054,0,0.094,0c0.081,0,0.148,0.013,0.229,0.027c0.242,0,0.484,0.027,0.727,0.081c0.121,0.027,0.242,0.054,0.362,0.094c0.216,0.054,0.431,0.134,0.646,0.229c0.107,0.054,0.229,0.107,0.336,0.161c0.216,0.121,0.404,0.255,0.605,0.403c0.081,0.067,0.175,0.121,0.269,0.202c0.27,0.229,0.512,0.498,0.74,0.793c1.546,2.165,1.062,5.176-1.103,6.736l-17.546,12.92c-0.027,0.027-0.054,0.027-0.081,0.054c-0.134,0.095-0.296,0.175-0.443,0.256c-0.148,0.081-0.282,0.161-0.417,0.215c-0.04,0.014-0.067,0.041-0.094,0.054c-0.121,0.041-0.229,0.054-0.35,0.095c-0.148,0.054-0.31,0.107-0.471,0.134c-0.161,0.041-0.323,0.041-0.484,0.067c-0.147,0.014-0.296,0.027-0.43,0.027c-0.175,0-0.35-0.014-0.524-0.027c-0.135-0.014-0.27-0.026-0.403-0.054c-0.175-0.026-0.337-0.08-0.498-0.135c-0.134-0.04-0.269-0.066-0.39-0.12c-0.161-0.067-0.31-0.148-0.457-0.216c-0.121-0.067-0.256-0.134-0.377-0.215c-0.147-0.094-0.282-0.202-0.416-0.31c-0.108-0.08-0.216-0.161-0.31-0.255c-0.135-0.135-0.269-0.296-0.39-0.444c-0.054-0.066-0.135-0.134-0.188-0.215c-0.014-0.026-0.027-0.054-0.04-0.08c-0.107-0.135-0.188-0.296-0.27-0.458c-0.08-0.134-0.147-0.269-0.215-0.403c-0.014-0.04-0.027-0.066-0.04-0.094l-4.007-9.062c0,0-3.469,6.279-4.49,8.041l11.898,10.729c1.196,1.076,1.909,2.568,1.99,4.168c0.04,0.888-0.121,1.762-0.444,2.555c-0.026,0.081-0.026,0.148-0.054,0.215c-0.538,1.52-1.641,2.743-3.092,3.429l-26.5,12.639c-0.82,0.39-1.694,0.578-2.595,0.578c-2.313,0-4.451-1.345-5.445-3.429c-0.054-0.107-0.067-0.229-0.121-0.336c-0.551-1.371-0.619-2.877-0.121-4.275c0.538-1.52,1.64-2.743,3.092-3.429l3.24-1.546l15.543-7.408l-6.588-5.93l-8.78-7.919c-0.094-0.094-0.161-0.188-0.242-0.282c-3.644-4.061-0.955-10.837-0.242-12.598l3.993-9.949l-9.896-0.807L34.644,45.727z"/>
        </svg>
        <!-- Runner tooltip -->
        <span id="runner-tooltip" class="interactive-map__runner-tooltip" role="tooltip">
          <span class="interactive-map__runner-tooltip-km">{{ formattedFunded }} km</span>
          <span class="interactive-map__runner-tooltip-note">funded so far</span>
          <span class="interactive-map__runner-tooltip-disclaimer">This shows fundraising progress, not real-time location</span>
        </span>
      </button>

      <!-- Waypoint tooltip -->
      <div
        v-if="activeTooltip"
        class="interactive-map__tooltip interactive-map__tooltip--visible"
        :style="{ left: `${activeTooltip.x}%`, top: `${activeTooltip.y}%` }"
        role="tooltip"
      >
        <div class="interactive-map__tooltip-name">{{ activeTooltip.name }}</div>
        <div class="interactive-map__tooltip-country">{{ activeTooltip.country }}</div>
        <div class="interactive-map__tooltip-km">{{ activeTooltip.km.toLocaleString() }} km from start</div>
        <div class="interactive-map__tooltip-info">{{ activeTooltip.info }}</div>
      </div>
    </div>

    <!-- Accessible live region -->
    <div class="sr-only" role="status" aria-live="polite">
      {{ liveRegionText }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
// Import variables for use in scoped styles
@use '~/assets/scss/_variables' as *;

.interactive-map {
  width: 100%;
  margin: $space-8 0;
}

// When a tooltip is pinned, disable hover effects
.interactive-map--tooltip-pinned .interactive-map__waypoint:hover .interactive-map__waypoint-dot {
  transform: none;
  background: $warm-black;
}

.interactive-map--tooltip-pinned .interactive-map__waypoint--reached:hover .interactive-map__waypoint-dot {
  background: $terracotta;
}

.interactive-map--tooltip-pinned .interactive-map__runner:hover .interactive-map__runner-tooltip {
  opacity: 0;
  visibility: hidden;
}

.interactive-map__image-wrapper {
  position: relative;
  width: 100%;
  overflow: visible;
  border-radius: $border-radius-md;
}

.interactive-map__picture {
  display: block;
  width: 100%;
}

// NOTE: Removed unused .interactive-map__picture--gray class

.interactive-map__picture--red {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  clip-path: inset(0 0 0 100%);
  z-index: 1;
}

.interactive-map__image {
  display: block;
  width: 100%;
  height: auto;
}

.interactive-map__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
}

.interactive-map__route {
  stroke-linecap: round;
  stroke-linejoin: round;
}

.interactive-map__waypoints {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
}

.interactive-map__waypoint {
  position: absolute;
  transform: translate(-50%, -50%);
  background: none;
  border: none;
  padding: $space-6; // 24px - ensures 44px+ touch target
  min-width: 44px;
  min-height: 44px;
  cursor: pointer;
  pointer-events: auto;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $space-1;

  &:focus-visible {
    outline: 2px solid $terracotta;
    outline-offset: 2px;
    border-radius: $border-radius-sm;
  }

  &:focus-visible .interactive-map__waypoint-dot {
    box-shadow: 0 0 0 3px $terracotta;
  }
}

.interactive-map__waypoint-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: $warm-black;
  border: 2px solid $cream;
  box-shadow: $shadow-sm;
  transition: transform $transition-base, background $transition-base;
}

.interactive-map__waypoint:hover .interactive-map__waypoint-dot,
.interactive-map__waypoint:focus .interactive-map__waypoint-dot {
  transform: scale(1.3);
  background: $terracotta;
}

.interactive-map__waypoint--reached .interactive-map__waypoint-dot {
  background: $terracotta;
}

.interactive-map__waypoint-label {
  font-family: $font-mono;
  font-size: $text-sm;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  color: $warm-black;
  background: rgba($cream, 0.9);
  padding: 2px 6px;
  border-radius: $border-radius-sm;
  white-space: nowrap;
  opacity: 0;
  transform: translateY(-4px);
  transition: opacity $transition-base, transform $transition-base;
  pointer-events: none;
}

.interactive-map__waypoint:hover .interactive-map__waypoint-label,
.interactive-map__waypoint:focus .interactive-map__waypoint-label {
  opacity: 1;
  transform: translateY(0);
}

@media (min-width: $breakpoint-lg) {
  .interactive-map__waypoint-label {
    opacity: 1;
    transform: translateY(0);
  }
}

// Runner icon
.interactive-map__runner {
  position: absolute;
  width: 48px;
  height: 48px;
  transform: translate(-50%, -50%);
  color: $terracotta;
  z-index: 15;
  opacity: 0;
  transition: opacity $transition-slow;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  pointer-events: auto;
  cursor: pointer;
  background: none;
  border: none;
  padding: 8px;
  margin: -4px;

  &:focus {
    outline: 2px solid $terracotta;
    outline-offset: 4px;
    border-radius: 50%;
  }

  &--visible {
    opacity: 1;
  }

  svg {
    width: 100%;
    height: 100%;
  }

  // Pulse animation
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 40px;
    height: 40px;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: $terracotta;
    opacity: 0;
    animation: runner-pulse 2s ease-out infinite;
    z-index: -1;
  }
}

@keyframes runner-pulse {
  0% {
    opacity: 0.4;
    transform: translate(-50%, -50%) scale(0.5);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.5);
  }
}

// Runner tooltip
.interactive-map__runner-tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-8px);
  background: $warm-black;
  color: $cream;
  padding: 10px 14px;
  border-radius: $border-radius-md;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity $transition-base, visibility $transition-base;
  pointer-events: none;
  text-align: center;
  min-width: 180px;
  box-shadow: $shadow-lg;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid $warm-black;
  }
}

.interactive-map__runner:hover .interactive-map__runner-tooltip,
.interactive-map__runner:focus .interactive-map__runner-tooltip,
.interactive-map__runner--tooltip-pinned .interactive-map__runner-tooltip {
  opacity: 1;
  visibility: visible;
}

.interactive-map__runner-tooltip-km {
  display: block;
  font-family: $font-mono;
  font-size: $text-lg;
  font-weight: 700;
  color: $terracotta;
}

.interactive-map__runner-tooltip-note {
  display: block;
  font-family: $font-serif;
  font-size: $text-base;
  margin-bottom: 6px;
}

.interactive-map__runner-tooltip-disclaimer {
  display: block;
  font-family: $font-mono;
  font-size: $text-xs;
  opacity: 0.7;
  letter-spacing: 0.02em;
  line-height: 1.4;
  white-space: normal;
  max-width: 160px;
}

// Waypoint tooltip
.interactive-map__tooltip {
  position: absolute;
  z-index: 20;
  background: $warm-black;
  color: $cream;
  padding: 12px 16px;
  border-radius: $border-radius-md;
  pointer-events: none;
  transform: translate(-50%, -100%) translateY(-16px);
  min-width: 160px;
  text-align: center;
  box-shadow: $shadow-lg;

  &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid $warm-black;
  }
}

.interactive-map__tooltip-name {
  font-family: $font-serif;
  font-size: $text-lg;
  margin-bottom: 2px;
}

.interactive-map__tooltip-country {
  font-family: $font-mono;
  font-size: $text-xs;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.7;
  margin-bottom: 8px;
}

.interactive-map__tooltip-km {
  font-family: $font-mono;
  font-size: $text-sm;
  color: $terracotta;
  margin-bottom: 4px;
}

.interactive-map__tooltip-info {
  font-family: $font-serif;
  font-style: italic;
  font-size: $text-sm;
  opacity: 0.8;
}

// Stats bar
.interactive-map__stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $space-4 0;
  border-bottom: $border-width solid $warm-black;
  margin-bottom: $space-4;
}

// Milestones
.interactive-map__milestones {
  margin-bottom: $space-6;
  padding: $space-4 0;
}

.interactive-map__milestone-bar {
  position: relative;
  height: 8px;
  background: $earth-200;
  border-radius: 4px;
  margin-bottom: $space-4;
}

.interactive-map__milestone-progress {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: $terracotta;
  border-radius: 4px;
  transition: width 0.5s ease-out;
}

.interactive-map__milestone-marker {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  background: none;
  border: none;
  padding: $space-4; // 16px padding for 44px+ touch target
  min-width: 44px;
  min-height: 44px;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid $terracotta;
    outline-offset: 2px;
    border-radius: $border-radius-sm;
  }

  &:focus-visible .interactive-map__milestone-dot {
    box-shadow: 0 0 0 3px $terracotta;
  }

  // Show tooltip on hover/focus
  &:hover .interactive-map__milestone-tooltip,
  &:focus .interactive-map__milestone-tooltip {
    opacity: 1;
    visibility: visible;
    transform: translate(-50%, 0);
  }

  &:hover .interactive-map__milestone-dot {
    transform: scale(1.2);
  }
}

.interactive-map__milestone-dot {
  display: block;
  width: 16px;
  height: 16px;
  background: $cream;
  border: 3px solid $earth-300;
  border-radius: 50%;
  transition: border-color $transition-base, background $transition-base, transform $transition-base;
}

.interactive-map__milestone-marker--reached .interactive-map__milestone-dot {
  border-color: $terracotta;
  background: $terracotta;
}

.interactive-map__milestone-marker--current .interactive-map__milestone-dot {
  border-color: $terracotta;
  background: $cream;
  box-shadow: 0 0 0 4px rgba($terracotta, 0.2);
}

// Milestone tooltip (shown on hover)
.interactive-map__milestone-tooltip {
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  transform: translate(-50%, -4px);
  background: $warm-black;
  color: $cream;
  padding: $space-3;
  border-radius: $border-radius-md;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity $transition-base, transform $transition-base, visibility $transition-base;
  pointer-events: none;
  z-index: 20;
  text-align: center;
  min-width: 120px;
  box-shadow: $shadow-lg;

  // Arrow pointing up
  &::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid $warm-black;
  }
}

.interactive-map__milestone-tooltip-name {
  display: block;
  font-family: $font-mono;
  font-size: $text-xs;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  color: $terracotta;
  margin-bottom: 2px;
}

.interactive-map__milestone-tooltip-amount {
  display: block;
  font-family: $font-mono;
  font-size: $text-base;
  font-weight: 600;
  margin-bottom: 4px;
}

.interactive-map__milestone-tooltip-desc {
  display: block;
  font-size: $text-xs;
  color: rgba($cream, 0.7);
}

.interactive-map__milestone-current {
  font-size: $text-sm;
  color: $earth-500;
  text-align: center;

  strong {
    color: $terracotta;
    font-family: $font-mono;
    letter-spacing: $tracking-wide;
  }
}

.interactive-map__milestone-next-label {
  font-family: $font-mono;
  font-size: $text-xs;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  margin-right: $space-1;
}

.interactive-map__milestone-next-amount {
  font-family: $font-mono;
  font-size: $text-xs;
  color: $earth-400;
  margin-left: $space-1;
}

.interactive-map__milestone-next-desc {
  color: $earth-400;
  font-style: italic;

  @media (max-width: $breakpoint-md) {
    display: none;
  }
}

.interactive-map__direction {
  font-family: $font-serif;
  font-style: italic;
  font-size: $text-base;
  color: $terracotta;
}

.interactive-map__stats-right {
  font-family: $font-mono;
  font-size: $text-sm;
}

.interactive-map__funded {
  font-weight: 700;
  color: $terracotta;
}

.interactive-map__separator {
  opacity: 0.4;
  margin: 0 $space-1;
}

.interactive-map__total {
  opacity: 0.7;
}

.interactive-map__unit {
  font-size: $text-sm;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  opacity: 0.6;
  margin-left: $space-2;
}

// NOTE: Using global .sr-only class from _utilities.scss instead of local .visually-hidden

// Responsive - Show simplified waypoints on mobile instead of hiding entirely
@media (max-width: calc($breakpoint-lg - 1px)) {
  .interactive-map__waypoint {
    padding: $space-4; // Smaller padding on mobile
    min-width: 36px;
    min-height: 36px;
  }

  // Only show start and end waypoints on mobile for clarity
  .interactive-map__waypoint:not(.interactive-map__waypoint--endpoint) {
    display: none;
  }
}

@media (max-width: $breakpoint-lg) {
  .interactive-map__waypoint-dot {
    width: 10px;
    height: 10px;
  }

  .interactive-map__waypoint-label {
    font-size: 0.55rem;
    padding: 1px 4px;
  }

  .interactive-map__runner {
    width: 36px;
    height: 36px;
  }

  .interactive-map__tooltip {
    min-width: 140px;
    padding: 10px 12px;
  }

  .interactive-map__tooltip-name {
    font-size: $text-base;
  }

  .interactive-map__stats {
    flex-direction: column;
    gap: $space-2;
    text-align: center;
  }
}

@media (max-width: $breakpoint-sm) {
  .interactive-map__waypoint-label {
    display: none;
  }

  .interactive-map__waypoint:hover .interactive-map__waypoint-label,
  .interactive-map__waypoint:focus .interactive-map__waypoint-label {
    display: block;
    opacity: 1;
  }
}

// Loading skeleton
.interactive-map__loading {
  width: 100%;
}

.interactive-map__loading-stats {
  display: flex;
  justify-content: space-between;
  padding: $space-4 0;
  border-bottom: $border-width solid $earth-200;
  margin-bottom: $space-4;
}

.interactive-map__loading-bar {
  height: 16px;
  width: 120px;
  background: linear-gradient(
    90deg,
    $earth-100 25%,
    $earth-200 50%,
    $earth-100 75%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s ease-in-out infinite;
  border-radius: $border-radius-sm;

  &--short {
    width: 80px;
  }

  &--full {
    width: 100%;
    height: 8px;
  }
}

.interactive-map__loading-milestones {
  margin-bottom: $space-6;
  padding: $space-4 0;
}

.interactive-map__loading-map {
  position: relative;
}

.interactive-map__loading-image {
  width: 100%;
  aspect-ratio: 16 / 9;
  background: linear-gradient(
    90deg,
    $earth-100 25%,
    $earth-200 50%,
    $earth-100 75%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s ease-in-out infinite;
  border-radius: $border-radius-md;
}

@keyframes skeleton-shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

// Respect reduced motion for skeleton animation
@media (prefers-reduced-motion: reduce) {
  .interactive-map__loading-bar,
  .interactive-map__loading-image {
    animation: none;
    background: $earth-200;
  }
}
</style>
