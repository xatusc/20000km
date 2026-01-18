<script setup lang="ts">
// Support page - BOLD conversion page with National Geographic/1970s Patagonia aesthetic
useSeoMeta({
  title: 'Support | 20,000KM',
  description: 'Help make the first human attempt to run across Asia and Europe possible. Every €5 funds 1 kilometer of this historic journey.'
})

const { formattedFunded, formattedTotal, progress, fundedKm, totalKm } = useFundraising()
const { formatted } = useCountdown('2026-05-01')

// Milestone data with full details
interface Milestone {
  id: string
  name: string
  amount: number
  km: number
  description: string
}

const milestones: Milestone[] = [
  { id: 'vehicle', name: 'Support Vehicle', amount: 32000, km: 6400, description: 'Van purchase & equipment' },
  { id: 'logistics', name: 'Logistics', amount: 49000, km: 9800, description: 'Visas, permits & transport' },
  { id: 'crew', name: 'Crew & Daily', amount: 86000, km: 17200, description: 'Crew support & daily costs' },
  { id: 'full', name: 'Fully Funded', amount: 100000, km: 20000, description: 'Complete expedition support' }
]

// Current milestone calculation
const fundedAmount = computed(() => fundedKm.value * 5)
const currentMilestone = computed(() => {
  for (let i = 0; i < milestones.length; i++) {
    if (fundedAmount.value < milestones[i].amount) {
      return {
        milestone: milestones[i],
        index: i,
        amountToNext: milestones[i].amount - fundedAmount.value
      }
    }
  }
  return {
    milestone: milestones[milestones.length - 1],
    index: milestones.length - 1,
    amountToNext: 0
  }
})

// Milestone position on bar (percentage)
const getMilestonePosition = (amount: number) => (amount / 100000) * 100

// FAQ data
const faqs = [
  {
    question: 'Where does the money go?',
    answer: 'Funds cover crew salaries, support vehicle, equipment, visas for 17 countries, accommodation, food, medical supplies, and documentation equipment. A detailed breakdown is available on the GoFundMe page.'
  },
  {
    question: 'What if the goal isn\'t met?',
    answer: 'The run starts May 1st, 2026 regardless. If fully funded, Ria runs with a support crew and vehicle. If not, she runs solo and unsupported. Every contribution makes the journey safer.'
  },
  {
    question: 'How is €5 = 1 kilometer calculated?',
    answer: 'The total budget divided by 20,000 kilometers equals roughly €5 per kilometer. This includes all costs: crew, vehicle, equipment, visas, food, accommodation, and documentation.'
  },
  {
    question: 'What happens to unused funds?',
    answer: 'All unused funds will be returned to supporters proportionally. Full transparency on spending will be provided throughout the journey.'
  }
]

const expandedFaq = ref<number | null>(null)
const toggleFaq = (index: number) => {
  expandedFaq.value = expandedFaq.value === index ? null : index
}
</script>

<template>
  <div class="support-page">
    <!-- Grain texture overlay for vintage documentary feel -->
    <div class="grain-overlay" aria-hidden="true"></div>

    <!-- ============================================
         HERO - DRAMATIC & BOLD
         ============================================ -->
    <section class="hero">
      <div class="container">
        <span class="hero__eyebrow">Running West</span>
        <h1 class="hero__title">Be Part<br>of This</h1>
        <p class="hero__subtitle">One woman. Seventeen countries. 20,000 kilometers on foot.</p>
      </div>
    </section>

    <!-- ============================================
         MILESTONE TRACKER - Full functionality
         ============================================ -->
    <section class="tracker">
      <div class="container">
        <div class="tracker__header">
          <span class="tracker__direction">Running West</span>
          <span class="tracker__stats">
            <strong>{{ formattedFunded }}</strong> / {{ formattedTotal }} km funded
          </span>
        </div>

        <div class="tracker__bar">
          <div class="tracker__fill" :style="{ width: `${progress}%` }"></div>

          <!-- Milestone markers with hover tooltips -->
          <button
            v-for="(milestone, index) in milestones"
            :key="milestone.id"
            type="button"
            class="tracker__marker"
            :class="{
              'tracker__marker--reached': fundedAmount >= milestone.amount,
              'tracker__marker--next': currentMilestone.index === index
            }"
            :style="{ left: `${getMilestonePosition(milestone.amount)}%` }"
            :aria-label="`${milestone.name}: €${milestone.amount.toLocaleString()}`"
          >
            <span class="tracker__marker-dot"></span>
            <!-- Hover tooltip -->
            <span class="tracker__tooltip">
              <span class="tracker__tooltip-name">{{ milestone.name }}</span>
              <span class="tracker__tooltip-amount">€{{ (milestone.amount / 1000).toFixed(0) }}k</span>
              <span class="tracker__tooltip-desc">{{ milestone.description }}</span>
            </span>
          </button>
        </div>

        <!-- Next milestone callout -->
        <p v-if="currentMilestone.amountToNext > 0" class="tracker__next">
          <span class="tracker__next-label">Next:</span>
          <strong>{{ currentMilestone.milestone.name }}</strong>
          <span class="tracker__next-amount">(€{{ (currentMilestone.milestone.amount / 1000).toFixed(0) }}k)</span>
          <span class="tracker__next-desc">— {{ currentMilestone.milestone.description }}</span>
        </p>
      </div>
    </section>

    <!-- ============================================
         COUNTDOWN - Matching site style
         ============================================ -->
    <section class="countdown-section">
      <div class="container">
        <span class="countdown__label">Departure</span>
        <div class="countdown" role="timer" aria-label="Time until departure">
          <div class="countdown__item">
            <span class="countdown__number">{{ formatted.days }}</span>
            <span class="countdown__unit">Days</span>
          </div>
          <div class="countdown__item">
            <span class="countdown__number">{{ formatted.hours }}</span>
            <span class="countdown__unit">Hours</span>
          </div>
          <div class="countdown__item">
            <span class="countdown__number">{{ formatted.minutes }}</span>
            <span class="countdown__unit">Min</span>
          </div>
          <div class="countdown__item">
            <span class="countdown__number">{{ formatted.seconds }}</span>
            <span class="countdown__unit">Sec</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================
         PRIMARY CTA - BOLD
         ============================================ -->
    <section class="cta-section">
      <div class="container">
        <a
          href="https://www.gofundme.com/rias-20000-km-run-across-asia-and-europe"
          target="_blank"
          rel="noopener noreferrer"
          class="cta-primary"
        >
          Support the Journey
        </a>
      </div>
    </section>

    <!-- ============================================
         FEATURED QUOTE - Maximum Impact
         ============================================ -->
    <section class="quote-section">
      <div class="container">
        <blockquote class="quote">
          <p>
            "I'm trying to write the real-life <em>Forrest Gump</em> story of our generation,
            as a 27-year-old Asian woman. This isn't just a run—it's an experiment
            to prove we can pursue seemingly delusional goals and make them happen
            through <strong>collective power</strong>."
          </p>
          <cite>— Ria</cite>
        </blockquote>
      </div>
    </section>

    <!-- ============================================
         FULL-BLEED IMAGE MOMENT - Humanize the journey
         ============================================ -->
    <section class="image-moment">
      <figure class="image-moment__figure">
        <img
          src="/Ria_lookback.webp"
          alt="Ria pausing on the trail, looking back at the path already traveled"
          loading="lazy"
        >
        <figcaption class="image-moment__caption">
          <span class="image-moment__location">Sinai Trail, 2024</span>
        </figcaption>
      </figure>
    </section>

    <!-- ============================================
         IMPACT STATS BAND - Horizontal, less boxy
         ============================================ -->
    <section class="stats-section">
      <div class="container">
        <h2 class="section-title">Your Impact</h2>

        <div class="stats-band">
          <div class="stat">
            <span class="stat-amount">€5</span>
            <span class="stat-label">1 kilometer</span>
          </div>
          <div class="stat-divider" aria-hidden="true"></div>
          <div class="stat">
            <span class="stat-amount">€50</span>
            <span class="stat-label">A morning's run</span>
          </div>
          <div class="stat-divider" aria-hidden="true"></div>
          <div class="stat">
            <span class="stat-amount">€250</span>
            <span class="stat-label">A full day</span>
          </div>
          <div class="stat-divider" aria-hidden="true"></div>
          <div class="stat">
            <span class="stat-amount">€500</span>
            <span class="stat-label">A week of progress</span>
          </div>
        </div>

        <p class="stats-footnote">Every €5 funds 1 kilometer of the journey.</p>
      </div>
    </section>

    <!-- ============================================
         THE CHOICE - Supported vs Solo
         ============================================ -->
    <section class="choice-section">
      <div class="container">
        <h2 class="section-title">The Choice</h2>

        <div class="choice-grid">
          <div class="choice-card choice-card--supported">
            <h3>With Your Support</h3>
            <ul>
              <li>Small crew for safety and documentation</li>
              <li>Support vehicle carrying supplies</li>
              <li>Medical supplies and emergency protocol</li>
              <li>Professional filming for the documentary</li>
              <li>Regular communication and updates</li>
            </ul>
          </div>

          <div class="choice-card choice-card--solo">
            <h3>Without Support</h3>
            <ul>
              <li>Running alone through 17 countries</li>
              <li>Carrying everything on her back</li>
              <li>Limited safety net</li>
              <li>Minimal documentation</li>
              <li>The run still happens—May 1st is non-negotiable</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================
         SOCIAL PROOF - Using verifiable data
         ============================================ -->
    <section class="supporters-section">
      <div class="container">
        <h2 class="supporters__title">Join the Community</h2>
        <p class="supporters__subtitle">People from around the world are making this journey possible</p>

        <!-- Verifiable stat from our data -->
        <div class="supporters__stat">
          <span class="supporters__stat-number">{{ formattedFunded }}</span>
          <span class="supporters__stat-label">kilometers funded so far</span>
        </div>

        <a
          href="https://www.gofundme.com/rias-20000-km-run-across-asia-and-europe"
          target="_blank"
          rel="noopener noreferrer"
          class="supporters__cta"
        >
          See All Supporters
        </a>
      </div>
    </section>

    <!-- ============================================
         LANDSCAPE IMAGE - Show the vastness
         ============================================ -->
    <section class="landscape-moment">
      <figure class="landscape-moment__figure">
        <img
          src="/sinai-run.webp"
          alt="Golden hour across the Sinai desert, endless horizon stretching ahead"
          loading="lazy"
        >
      </figure>
      <p class="landscape-moment__caption">20,000 kilometers of this.</p>
    </section>

    <!-- ============================================
         FAQ
         ============================================ -->
    <section class="faq-section">
      <div class="container">
        <h2 class="section-title">Questions</h2>

        <div class="faq-list">
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="faq-item"
            :class="{ 'faq-item--expanded': expandedFaq === index }"
          >
            <button
              class="faq-question"
              :aria-expanded="expandedFaq === index"
              @click="toggleFaq(index)"
            >
              {{ faq.question }}
              <span class="faq-icon" aria-hidden="true">{{ expandedFaq === index ? '−' : '+' }}</span>
            </button>
            <div v-show="expandedFaq === index" class="faq-answer">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================
         NOT READY? FOLLOW INSTEAD
         ============================================ -->
    <section class="follow-section">
      <div class="container">
        <div class="follow-card">
          <h2>Not Ready to Donate?</h2>
          <p>Follow the journey. Weekly dispatches from the road.</p>
          <a
            href="https://substack.com/@whereisriax"
            target="_blank"
            rel="noopener noreferrer"
            class="follow-cta"
          >
            Subscribe on Substack
          </a>
        </div>
      </div>
    </section>

    <!-- ============================================
         EXPEDITION BADGE - Vintage closer
         ============================================ -->
    <section class="badge-section">
      <div class="container">
        <div class="expedition-badge">
          <span class="badge-label">Official Expedition</span>
          <span class="badge-year">2026–2027</span>
          <span class="badge-route">Vladivostok → Cabo da Roca</span>
        </div>
      </div>
    </section>

    <!-- ============================================
         SPONSOR - P.S. style, deprioritized
         ============================================ -->
    <aside class="sponsor-ps">
      <div class="container">
        <p class="sponsor-ps__text">
          For corporate partnerships and sponsorship inquiries,
          <NuxtLink to="/contact?reason=sponsorship">get in touch</NuxtLink>.
        </p>
      </div>
    </aside>
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;
@use '~/assets/scss/_decorative' as *;

.support-page {
  position: relative;
  padding-bottom: $space-8;
}

// ============================================
// GRAIN TEXTURE OVERLAY
// ============================================
.grain-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1000;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E");
}

// ============================================
// HERO - DRAMATIC NATIONAL GEOGRAPHIC STYLE
// ============================================
.hero {
  padding: $space-16 0 $space-12;
  background: $sand-100;
  text-align: center;
  border-bottom: 3px solid $warm-black;
}

.hero__eyebrow {
  display: block;
  font-family: $font-mono;
  font-size: $text-xs;
  letter-spacing: $tracking-widest;
  text-transform: uppercase;
  color: $terracotta-700;
  margin-bottom: $space-4;
}

.hero__title {
  font-family: $font-serif;
  font-size: clamp($text-5xl, 10vw, 6rem);
  font-weight: 400;
  line-height: 0.9;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  color: $warm-black;
  margin: 0 0 $space-6 0;
}

.hero__subtitle {
  font-family: $font-mono;
  font-size: $text-sm;
  letter-spacing: $tracking-widest;
  text-transform: uppercase;
  color: $earth-500;
  margin: 0;
}

// ============================================
// MILESTONE TRACKER - Full Functionality
// ============================================
.tracker {
  padding: $space-8 0;
  background: $cream;
  border-bottom: $border-width solid $earth-300;
}

.tracker__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $space-4;

  @media (max-width: $breakpoint-md) {
    flex-direction: column;
    gap: $space-2;
  }
}

.tracker__direction {
  font-family: $font-serif;
  font-style: italic;
  font-size: $text-lg;
  color: $terracotta-700;
}

.tracker__stats {
  font-family: $font-mono;
  font-size: $text-sm;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  color: $earth-500;

  strong {
    color: $terracotta-700;
    font-size: $text-base;
  }
}

.tracker__bar {
  position: relative;
  height: 8px;
  background: $earth-200;
  margin-bottom: $space-4;
}

.tracker__fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: $terracotta;
  transition: width 0.8s ease;
}

// Milestone markers with tooltips
.tracker__marker {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  z-index: 2;

  &:hover .tracker__tooltip,
  &:focus .tracker__tooltip {
    opacity: 1;
    visibility: visible;
    transform: translate(-50%, -8px);
  }
}

.tracker__marker-dot {
  display: block;
  width: 20px;
  height: 20px;
  margin: 6px;
  border-radius: 50%;
  background: $cream;
  border: 3px solid $earth-300;
  transition: all 0.2s ease;

  .tracker__marker--reached & {
    background: $terracotta;
    border-color: $terracotta;
  }

  .tracker__marker--next & {
    background: $cream;
    border-color: $terracotta;
    box-shadow: 0 0 0 4px rgba($terracotta, 0.25);
  }
}

.tracker__tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translate(-50%, 0);
  width: 160px;
  padding: $space-3;
  background: $warm-black;
  color: $cream;
  text-align: center;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  z-index: 10;
  pointer-events: none;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-top-color: $warm-black;
  }
}

.tracker__tooltip-name {
  display: block;
  font-family: $font-mono;
  font-size: $text-xs;
  font-weight: 600;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  margin-bottom: $space-1;
}

.tracker__tooltip-amount {
  display: block;
  font-family: $font-serif;
  font-size: $text-lg;
  color: $terracotta-300;
  margin-bottom: $space-1;
}

.tracker__tooltip-desc {
  display: block;
  font-size: $text-xs;
  color: rgba($cream, 0.7);
}

.tracker__next {
  text-align: center;
  font-size: $text-sm;
  color: $earth-600;
  margin: 0;
}

.tracker__next-label {
  font-family: $font-mono;
  font-size: $text-xs;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  color: $earth-400;
  margin-right: $space-1;
}

.tracker__next-amount {
  color: $terracotta-700;
}

.tracker__next-desc {
  color: $earth-500;
  font-style: italic;
}

// ============================================
// COUNTDOWN - Light style matching site
// ============================================
.countdown-section {
  padding: $space-12 0;
  background: $sand-50;
  text-align: center;
}

.countdown__label {
  display: block;
  font-family: $font-mono;
  font-size: $text-xs;
  letter-spacing: $tracking-widest;
  text-transform: uppercase;
  color: $terracotta-700;
  margin-bottom: $space-6;
}

// Override global dark countdown styles
.countdown {
  display: flex;
  justify-content: center;
  gap: $space-6;

  @media (max-width: $breakpoint-md) {
    gap: $space-4;
  }
}

.countdown__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80px;
  background: transparent;
  padding: 0;
  color: $warm-black;

  // Remove the offset border pseudo-element from global styles
  &::after {
    display: none;
  }

  @media (max-width: $breakpoint-md) {
    min-width: 60px;
  }
}

.countdown__number {
  font-family: $font-serif;
  font-size: $text-5xl;
  font-weight: 400;
  line-height: 1;
  color: $warm-black;

  @media (max-width: $breakpoint-md) {
    font-size: $text-4xl;
  }

  @media (max-width: $breakpoint-sm) {
    font-size: $text-3xl;
  }
}

.countdown__unit {
  font-family: $font-mono;
  font-size: $text-xs;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  color: $earth-500;
  margin-top: $space-2;
  opacity: 1;
}

// ============================================
// PRIMARY CTA - BOLD
// ============================================
.cta-section {
  padding: $space-8 0;
  text-align: center;
  background: $cream;
}

.cta-primary {
  display: inline-block;
  padding: $space-4 $space-10;
  background: $terracotta-700;
  color: $cream;
  font-family: $font-mono;
  font-size: $text-sm;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  text-decoration: none;
  border: 2px solid $terracotta-700;
  transition: all 0.2s ease;
  min-height: 56px;

  &:hover {
    background: $terracotta-800;
    border-color: $terracotta-800;
    transform: translateY(-2px);
  }
}

// ============================================
// FEATURED QUOTE - MAXIMUM IMPACT
// ============================================
.quote-section {
  padding: $space-16 0;
  background: $warm-black;
  color: $cream;
}

.quote {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;

  p {
    font-family: $font-serif;
    font-size: clamp($text-xl, 4vw, $text-3xl);
    line-height: $leading-relaxed;
    margin: 0 0 $space-8 0;

    em {
      font-style: italic;
    }

    strong {
      color: $terracotta-300;
      font-weight: normal;
    }
  }

  cite {
    font-family: $font-mono;
    font-style: normal;
    font-size: $text-sm;
    color: $terracotta-300;
    letter-spacing: $tracking-widest;
    text-transform: uppercase;
  }
}

// ============================================
// SECTION TITLES - BOLD
// ============================================
.section-title {
  font-family: $font-serif;
  font-size: clamp($text-3xl, 6vw, $text-4xl);
  text-transform: uppercase;
  letter-spacing: -0.02em;
  margin-bottom: $space-4;
  text-align: center;
}

.section-intro {
  text-align: center;
  font-family: $font-mono;
  font-size: $text-sm;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  color: $earth-500;
  margin-bottom: $space-8;
}

// ============================================
// FULL-BLEED IMAGE MOMENT
// ============================================
.image-moment {
  // Full-width bleed
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  background: $warm-black;
}

.image-moment__figure {
  position: relative;
  margin: 0;

  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    object-position: center 40%;
    display: block;

    @media (max-width: $breakpoint-md) {
      height: 300px;
    }
  }
}

.image-moment__caption {
  position: absolute;
  bottom: $space-6;
  left: $space-6;
  padding: $space-2 $space-4;
  background: $warm-black;
}

.image-moment__location {
  font-family: $font-mono;
  font-size: $text-xs;
  letter-spacing: $tracking-widest;
  text-transform: uppercase;
  color: $cream;
}

// ============================================
// STATS BAND - Horizontal, elegant
// ============================================
.stats-section {
  padding: $space-12 0;
  background: $sand-100;
}

.stats-band {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: $space-6;
  max-width: 800px;
  margin: 0 auto $space-6;
  padding: $space-8 0;
  border-top: 2px solid $warm-black;
  border-bottom: 2px solid $warm-black;

  @media (max-width: $breakpoint-md) {
    flex-wrap: wrap;
    gap: $space-4 $space-6;
  }
}

.stat {
  text-align: center;
  flex: 1;
  min-width: 100px;
}

.stat-amount {
  display: block;
  font-family: $font-serif;
  font-size: clamp($text-2xl, 4vw, $text-3xl);
  color: $terracotta-700;
  line-height: 1;
}

.stat-label {
  display: block;
  font-family: $font-mono;
  font-size: $text-xs;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  color: $earth-500;
  margin-top: $space-2;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: $earth-300;

  @media (max-width: $breakpoint-md) {
    display: none;
  }
}

.stats-footnote {
  text-align: center;
  font-family: $font-serif;
  font-style: italic;
  font-size: $text-base;
  color: $earth-500;
  margin: 0;
}

// ============================================
// THE CHOICE
// ============================================
.choice-section {
  padding: $space-12 0;
  background: $cream;
}

.choice-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $space-6;
  max-width: 900px;
  margin: 0 auto;

  @media (max-width: $breakpoint-md) {
    grid-template-columns: 1fr;
  }
}

.choice-card {
  padding: $space-8;

  h3 {
    font-family: $font-mono;
    font-size: $text-sm;
    letter-spacing: $tracking-widest;
    text-transform: uppercase;
    margin-bottom: $space-6;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: $space-3 0;
    padding-left: $space-6;
    position: relative;
    font-size: $text-base;
    color: $earth-600;
    line-height: $leading-relaxed;
    border-bottom: $border-width solid rgba($warm-black, 0.1);

    &:last-child {
      border-bottom: none;
    }

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 18px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }
  }

  &--supported {
    background: $sand-50;
    border: 3px solid $teal-500;

    h3 {
      color: $teal-600;
    }

    li::before {
      background: $teal-500;
    }
  }

  &--solo {
    background: $earth-50;
    border: 3px solid $earth-400;

    h3 {
      color: $earth-500;
    }

    li::before {
      background: $earth-400;
    }
  }
}

// ============================================
// SUPPORTERS - Verifiable Data
// ============================================
.supporters-section {
  padding: $space-12 0;
  background: $sand-100;
  text-align: center;
}

.supporters__title {
  font-family: $font-serif;
  font-size: clamp($text-2xl, 5vw, $text-3xl);
  text-transform: uppercase;
  letter-spacing: -0.02em;
  margin-bottom: $space-2;
}

.supporters__subtitle {
  font-family: $font-serif;
  font-style: italic;
  font-size: $text-base;
  color: $earth-500;
  margin-bottom: $space-8;
}

.supporters__stat {
  max-width: 400px;
  margin: 0 auto $space-8;
  padding: $space-8;
  background: $cream;
  border: 3px solid $warm-black;
}

.supporters__stat-number {
  display: block;
  font-family: $font-serif;
  font-size: clamp($text-4xl, 10vw, $text-5xl);
  color: $terracotta-700;
  line-height: 1;
  margin-bottom: $space-2;
}

.supporters__stat-label {
  display: block;
  font-family: $font-mono;
  font-size: $text-sm;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  color: $earth-500;
}

.supporters__cta {
  display: inline-block;
  padding: $space-4 $space-8;
  background: $warm-black;
  color: $cream;
  font-family: $font-mono;
  font-size: $text-sm;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  text-decoration: none;
  border: 2px solid $warm-black;
  transition: all 0.2s ease;

  &:hover {
    background: $terracotta-700;
    border-color: $terracotta-700;
  }
}

// ============================================
// FAQ
// ============================================
.faq-section {
  padding: $space-12 0;
  background: $cream;
}

.faq-list {
  max-width: 700px;
  margin: 0 auto;
}

.faq-item {
  border-bottom: 2px solid $warm-black;

  &:first-child {
    border-top: 2px solid $warm-black;
  }
}

.faq-question {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $space-5 0;
  background: none;
  border: none;
  font-family: $font-mono;
  font-size: $text-sm;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  color: $warm-black;
  cursor: pointer;
  text-align: left;

  &:hover {
    color: $terracotta-700;
  }
}

.faq-icon {
  font-family: $font-mono;
  font-size: $text-2xl;
  color: $terracotta-700;
  flex-shrink: 0;
  margin-left: $space-4;
}

.faq-answer {
  padding: 0 0 $space-5 0;

  p {
    font-size: $text-base;
    color: $earth-600;
    line-height: $leading-relaxed;
    margin: 0;
  }
}

// ============================================
// FOLLOW SECTION
// ============================================
.follow-section {
  padding: $space-12 0;
  background: $sand-100;
}

.follow-card {
  max-width: 600px;
  margin: 0 auto;
  padding: $space-10;
  background: $warm-black;
  color: $cream;
  text-align: center;

  h2 {
    font-family: $font-serif;
    font-size: $text-2xl;
    text-transform: uppercase;
    margin-bottom: $space-3;
  }

  p {
    font-size: $text-base;
    color: rgba($cream, 0.8);
    margin-bottom: $space-6;
  }
}

.follow-cta {
  display: inline-block;
  padding: $space-3 $space-6;
  background: transparent;
  color: $cream;
  border: 2px solid rgba($cream, 0.5);
  font-family: $font-mono;
  font-size: $text-sm;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: $cream;
    color: $warm-black;
    border-color: $cream;
  }
}

// ============================================
// LANDSCAPE IMAGE MOMENT - Full-bleed panorama
// ============================================
.landscape-moment {
  position: relative;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  background: $warm-black;
}

.landscape-moment__figure {
  margin: 0;

  img {
    width: 100%;
    height: 350px;
    object-fit: cover;
    object-position: center;
    display: block;

    @media (max-width: $breakpoint-md) {
      height: 250px;
    }
  }
}

.landscape-moment__caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: $space-4;
  background: linear-gradient(to top, rgba($warm-black, 0.8), transparent);
  text-align: center;
  font-family: $font-serif;
  font-style: italic;
  font-size: $text-lg;
  color: $cream;
  margin: 0;
}

// ============================================
// EXPEDITION BADGE - Vintage closer
// ============================================
.badge-section {
  padding: $space-12 0;
  background: $sand-100;
}

.expedition-badge {
  max-width: 280px;
  margin: 0 auto;
  padding: $space-6;
  border: 2px solid $warm-black;
  text-align: center;
  position: relative;

  // Corner notches for vintage stamp feel
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    background: $sand-100;
    border: 2px solid $warm-black;
  }

  &::before {
    top: -6px;
    left: -6px;
    border-right: none;
    border-bottom: none;
  }

  &::after {
    bottom: -6px;
    right: -6px;
    border-left: none;
    border-top: none;
  }
}

.badge-label {
  display: block;
  font-family: $font-mono;
  font-size: $text-xs;
  letter-spacing: $tracking-widest;
  text-transform: uppercase;
  color: $terracotta-700;
  margin-bottom: $space-2;
}

.badge-year {
  display: block;
  font-family: $font-serif;
  font-size: $text-3xl;
  color: $warm-black;
  margin-bottom: $space-2;
}

.badge-route {
  display: block;
  font-family: $font-mono;
  font-size: $text-xs;
  color: $earth-500;
  letter-spacing: $tracking-wide;
}

// ============================================
// SPONSOR P.S. - Subtle afterthought
// ============================================
.sponsor-ps {
  padding: $space-6 0 $space-10;
  background: $sand-100;
}

.sponsor-ps__text {
  text-align: center;
  font-family: $font-serif;
  font-style: italic;
  font-size: $text-sm;
  color: $earth-500;
  margin: 0;

  strong {
    font-style: normal;
    color: $earth-600;
  }

  a {
    color: $terracotta-700;
    text-decoration: underline;
    text-underline-offset: 2px;

    &:hover {
      color: $terracotta-800;
    }
  }
}
</style>
