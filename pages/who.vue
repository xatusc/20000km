<script setup lang="ts">
useSeoMeta({
  title: 'Who | 20,000KM',
  description: 'Meet Ria Xi - from burnout in Silicon Valley to the first human attempt to run across Asia and Europe on the Silk Road.'
})

// Typewriter for pull quote
const quoteRef = ref<HTMLElement | null>(null)
const quoteText = 'Only delusional until it\'s not.'

const { typewrite } = useTypewriter({ charDelay: 50, startDelay: 600 })
const { motionAllowed } = useSensoryMode()

const hasTyped = ref(false)

onMounted(() => {
  if (!quoteRef.value) return

  if (motionAllowed.value && !hasTyped.value) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasTyped.value) {
          hasTyped.value = true
          typewrite(quoteRef.value, quoteText)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(quoteRef.value)
  } else {
    quoteRef.value.textContent = quoteText
    quoteRef.value.classList.add('typing-complete')
  }
})

watch(motionAllowed, (allowed) => {
  if (!allowed && quoteRef.value) {
    quoteRef.value.textContent = quoteText
    quoteRef.value.classList.add('typing-complete')
  }
})
</script>

<template>
  <div class="about-page">
    <!-- ============================================
         HERO - Photo right, story intro left
         ============================================ -->
    <section class="hero">
      <div class="container">
        <div class="hero-grid">
          <div class="hero-content">
            <span class="hero-kicker">The Runner</span>
            <h1 class="hero-title">Ria Xi</h1>
            <p class="hero-subtitle">
              From burnout in Silicon Valley to the first human attempt to run the Silk Road.
            </p>
          </div>
          <figure class="hero-image">
            <img
              src="/images/Ria_vertical.webp"
              alt="Ria Xi standing on a mountain trail at golden hour, looking toward the horizon"
            >
            <figcaption>The road ahead: 20,000 kilometers</figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- ============================================
         THE STORY - Narrative arc
         ============================================ -->
    <section class="story-section">
      <div class="container">
        <div class="story-content">
          <div class="story-block">
            <p class="story-lede">
              Two years ago, I was burnt out from my tech career in Silicon Valley, coming out of a difficult relationship, and struggling with mental health issues.
            </p>
            <p>
              I felt like a failure. I lost my career, my relationship, network of friends, a sense of meaning, and I felt powerless to change my circumstances. I was at the lowest point of my life.
            </p>
          </div>

          <div class="story-divider" aria-hidden="true"></div>

          <div class="story-block">
            <p>
              Running became my way out. It initially started as a 30 day challenge to run everyday after a breakup. Within a year, I went from struggling to finish a half marathon in 2024 to setting ultramarathon records on world-renowned routes.
            </p>
            <div class="records-callout">
              <div class="record">
                <span class="record-distance">1,014 km</span>
                <span class="record-time">21 days</span>
                <span class="record-name">Via Francigena</span>
                <span class="record-note">Overall FKT</span>
              </div>
              <div class="record">
                <span class="record-distance">780 km</span>
                <span class="record-time">12 days</span>
                <span class="record-name">Camino de Santiago</span>
                <span class="record-note">Female self-supported FKT</span>
              </div>
              <div class="record">
                <span class="record-distance">539 km</span>
                <span class="record-time">World first</span>
                <span class="record-name">Sinai Trail</span>
              </div>
            </div>
          </div>

          <div class="story-divider" aria-hidden="true"></div>

          <div class="story-block">
            <p>
              I asked myself: what is the most impossible thing I could attempt?
            </p>
            <p>
              The answer came to me one day after just finishing my first ever ultramarathon: running across the entire Eurasian continent, 20,000 kilometers from Vladivostok to Lisbon, retracing the ancient Silk Road.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================
         PULL QUOTE - Full width moment with typewriter
         ============================================ -->
    <section class="quote-section">
      <div class="container">
        <blockquote class="pull-quote">
          <p>
            <span class="pull-quote__mark" aria-hidden="true">"</span>
            <span
              ref="quoteRef"
              class="typewriter"
              :aria-label="quoteText"
            >{{ motionAllowed ? '' : quoteText }}</span>
            <span class="pull-quote__mark pull-quote__mark--end" aria-hidden="true">"</span>
          </p>
        </blockquote>
      </div>
    </section>

    <!-- ============================================
         THE VISION - Why this matters
         ============================================ -->
    <section class="vision-section">
      <div class="container">
        <div class="vision-content">
          <div class="story-block">
            <p class="story-lede">
              And here is why:
            </p>
            <ol class="why-list">
              <li>to prove to myself and the world that we can rewrite the narratives that define our personal lives, because it's only delusional until it's not;</li>
              <li>to rewrite the narratives of division in our world with one of connection. Communities from around the world are coming together to make something big happen, and the east and the west are once again connected with footsteps.</li>
            </ol>
          </div>

          <!-- Stats band -->
          <div class="stats-band">
            <div class="stat">
              <span class="stat-number">20,000</span>
              <span class="stat-label">Kilometers</span>
            </div>
            <div class="stat">
              <span class="stat-number">17</span>
              <span class="stat-label">Countries</span>
            </div>
            <div class="stat">
              <span class="stat-number">14</span>
              <span class="stat-label">Months</span>
            </div>
            <div class="stat">
              <span class="stat-number">1</span>
              <span class="stat-label">Woman</span>
            </div>
          </div>

          <div class="story-block">
            <p>
              This is no longer just one woman's journey of transformation. In the past year, the 20000km experiment has evolved into a collective project, a "neighborhood run" of the Planetary Run Club. Because at the end of the day, nowhere we can run to is too far to be our neighborhood, and no one we meet on the run is too foreign to be our neighbor.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================
         THE CREW - Placeholder for team content
         ============================================ -->
    <section class="crew-section">
      <div class="container">
        <div class="crew-content">
          <h2 class="crew-title">The Crew</h2>
          <p class="crew-intro">
            No one runs 20,000 kilometers alone. Meet the team making this journey possible.
          </p>

          <!-- TODO: Add crew member cards here -->
          <div class="crew-placeholder">
            <p>Crew profiles coming soon.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================
         WAYFINDING - Where to go next
         ============================================ -->
    <section class="wayfinding-section">
      <div class="container">
        <h2 class="wayfinding-title">Be Part of This</h2>

        <div class="wayfinding-grid">
          <NuxtLink to="/support" class="wayfinding-card wayfinding-card--primary">
            <span class="wayfinding-label">Fund the Journey</span>
            <span class="wayfinding-heading">Support</span>
            <p>Every €5 funds 1 kilometer. Help make the impossible possible.</p>
          </NuxtLink>

          <NuxtLink to="/planetary-run-club" class="wayfinding-card">
            <span class="wayfinding-label">Join the Community</span>
            <span class="wayfinding-heading">Planetary Run Club</span>
            <p>Weekly dispatches from training. Live updates once the run begins.</p>
          </NuxtLink>

          <NuxtLink to="/contact" class="wayfinding-card">
            <span class="wayfinding-label">Press & Partnerships</span>
            <span class="wayfinding-heading">Connect</span>
            <p>Media inquiries, sponsorships, or just want to say hello.</p>
          </NuxtLink>
        </div>
      </div>
    </section>

  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;
@use '~/assets/scss/_decorative' as *;

.about-page {
  overflow-x: hidden;
}

// ============================================
// HERO
// ============================================
.hero {
  padding: $space-16 0 $space-12;
  background: $sand-100;
  border-bottom: 3px solid $warm-black;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $space-12;
  align-items: center;

  @media (max-width: $breakpoint-xl) {
    grid-template-columns: 1fr;
    gap: $space-8;
  }
}

.hero-content {
  @media (max-width: $breakpoint-xl) {
    order: 2;
    text-align: center;
  }
}

.hero-kicker {
  display: block;
  font-family: $font-mono;
  font-size: $text-xs;
  letter-spacing: $tracking-widest;
  text-transform: uppercase;
  color: $terracotta-700;
  margin-bottom: $space-4;
}

.hero-title {
  font-family: $font-serif;
  font-size: clamp($text-5xl, 10vw, 6rem);
  font-weight: 400;
  line-height: 0.9;
  letter-spacing: -0.03em;
  color: $warm-black;
  margin: 0 0 $space-6 0;
}

.hero-subtitle {
  font-family: $font-serif;
  font-size: $text-xl;
  font-style: italic;
  line-height: $leading-relaxed;
  color: $earth-600;
  max-width: 400px;
  margin: 0;

  @media (max-width: $breakpoint-xl) {
    max-width: 500px;
    margin: 0 auto;
  }
}

.hero-image {
  margin: 0;

  @media (max-width: $breakpoint-xl) {
    order: 1;
    max-width: 350px;
    margin: 0 auto;
  }

  img {
    width: 100%;
    max-width: 400px;
    @include hand-drawn-border($warm-black, 3px);
    display: block;
    margin-left: auto;

    @media (max-width: $breakpoint-xl) {
      margin: 0 auto;
    }
  }

  figcaption {
    margin-top: $space-3;
    font-family: $font-serif;
    font-style: italic;
    font-size: $text-sm;
    color: $earth-500;
    text-align: right;

    @media (max-width: $breakpoint-xl) {
      text-align: center;
    }
  }
}

// ============================================
// STORY SECTION
// ============================================
.story-section {
  padding: $space-16 0;
  background: $cream;
}

.story-content,
.vision-content {
  max-width: 700px;
  margin: 0 auto;
}

.story-block {
  margin-bottom: $space-10;

  &:last-child {
    margin-bottom: 0;
  }

  p {
    font-size: $text-lg;
    line-height: $leading-loose;
    color: $earth-700;
    margin-bottom: $space-4;

    &:last-of-type {
      margin-bottom: 0;
    }

    em {
      font-style: italic;
      color: $terracotta-700;
    }
  }
}

.story-lede {
  font-family: $font-serif;
  font-size: $text-2xl !important;
  font-style: italic;
  color: $warm-black !important;
  line-height: $leading-snug !important;
  margin-bottom: $space-6 !important;
}

.story-divider {
  width: 60px;
  height: 2px;
  background: $terracotta-300;
  margin: $space-10 0;
}

// Why list (numbered reasons)
.why-list {
  margin: $space-4 0 0 0;
  padding-left: $space-6;

  li {
    font-size: $text-lg;
    line-height: $leading-loose;
    color: $earth-700;
    margin-bottom: $space-4;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

// Records callout
.records-callout {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $space-4;
  margin: $space-8 0;
  padding: $space-6;
  background: $sand-100;
  border-left: 4px solid $terracotta;

  @media (max-width: $breakpoint-lg) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: $breakpoint-md) {
    grid-template-columns: 1fr;
  }
}

.record {
  display: flex;
  flex-direction: column;
}

.record-distance {
  font-family: $font-serif;
  font-size: $text-3xl;
  color: $terracotta-700;
  line-height: 1;
}

.record-time {
  font-family: $font-mono;
  font-size: $text-sm;
  color: $earth-500;
  letter-spacing: $tracking-wide;
  margin-bottom: $space-1;
}

.record-name {
  font-family: $font-serif;
  font-style: italic;
  font-size: $text-base;
  color: $earth-600;
}

.record-note {
  font-family: $font-mono;
  font-size: $text-xs;
  color: $terracotta-700;
  text-transform: uppercase;
  letter-spacing: $tracking-wide;
  margin-top: $space-1;
}

// ============================================
// PULL QUOTE
// ============================================
.quote-section {
  padding: $space-16 0;
  background: $warm-black;
}

.pull-quote {
  margin: 0;
  text-align: center;

  p {
    font-family: $font-serif;
    font-size: clamp($text-3xl, 8vw, $text-5xl);
    font-style: italic;
    line-height: 1.2;
    color: $cream;
    margin: 0;
  }

  &__mark {
    color: $terracotta-400;

    &--end {
      opacity: 0;
      transition: opacity 0.4s ease;

      .typing-complete + & {
        opacity: 1;
      }
    }
  }

  .typewriter {
    font-family: $font-serif;
    font-style: italic;

    &::after {
      color: $terracotta-400;
    }
  }
}

// ============================================
// VISION SECTION
// ============================================
.vision-section {
  padding: $space-16 0;
  background: $cream;
}

// Stats band
.stats-band {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $space-4;
  margin: $space-10 0;
  padding: $space-8 0;
  border-top: 2px solid $warm-black;
  border-bottom: 2px solid $warm-black;

  @media (max-width: $breakpoint-md) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.stat {
  text-align: center;
}

.stat-number {
  display: block;
  font-family: $font-serif;
  font-size: clamp($text-3xl, 6vw, $text-4xl);
  color: $terracotta-700;
  line-height: 1;
}

.stat-label {
  display: block;
  font-family: $font-mono;
  font-size: $text-xs;
  letter-spacing: $tracking-widest;
  text-transform: uppercase;
  color: $earth-500;
  margin-top: $space-2;
}

// ============================================
// CREW SECTION
// ============================================
.crew-section {
  padding: $space-16 0;
  background: $sand-100;
  border-top: 1px solid $earth-200;
}

.crew-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.crew-title {
  font-family: $font-serif;
  font-size: $text-3xl;
  margin-bottom: $space-4;
}

.crew-intro {
  font-family: $font-serif;
  font-size: $text-lg;
  font-style: italic;
  color: $earth-600;
  margin-bottom: $space-10;
}

.crew-placeholder {
  padding: $space-12;
  border: 2px dashed $earth-300;
  background: rgba($cream, 0.5);

  p {
    font-family: $font-mono;
    font-size: $text-sm;
    color: $earth-400;
    text-transform: uppercase;
    letter-spacing: $tracking-wide;
    margin: 0;
  }
}

// ============================================
// WAYFINDING
// ============================================
.wayfinding-section {
  padding: $space-16 0;
  background: $warm-black;
}

.wayfinding-title {
  font-family: $font-serif;
  font-size: $text-3xl;
  text-align: center;
  color: $cream;
  margin-bottom: $space-10;
}

.wayfinding-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $space-6;
  max-width: 900px;
  margin: 0 auto;

  @media (max-width: $breakpoint-lg) {
    grid-template-columns: 1fr;
    max-width: 400px;
  }
}

.wayfinding-card {
  display: flex;
  flex-direction: column;
  padding: $space-6;
  background: transparent;
  border: 2px solid rgba($cream, 0.3);
  text-decoration: none;
  color: $cream;
  transition: border-color 0.2s ease, background 0.2s ease;

  &:hover,
  &:focus {
    border-color: $cream;
    background: rgba($cream, 0.05);
    outline: none;

    .wayfinding-heading {
      text-decoration: underline;
      text-underline-offset: 4px;
    }
  }

  &:focus-visible {
    outline: 2px solid $terracotta-300;
    outline-offset: 2px;
  }

  &--primary {
    background: $terracotta-700;
    border-color: $terracotta-700;

    &:hover,
    &:focus {
      background: $terracotta-800;
      border-color: $terracotta-800;
    }

    .wayfinding-label {
      color: rgba($cream, 0.85);
    }
  }

  p {
    font-size: $text-sm;
    color: rgba($cream, 0.8);
    line-height: $leading-relaxed;
    margin: 0;
  }
}

.wayfinding-label {
  display: block;
  font-family: $font-mono;
  font-size: $text-xs;
  letter-spacing: $tracking-widest;
  text-transform: uppercase;
  color: $terracotta-300;
  margin-bottom: $space-2;
}

.wayfinding-heading {
  display: block;
  font-family: $font-serif;
  font-size: $text-xl;
  margin-bottom: $space-2;
}

// ============================================
// COVER IMAGE WITH BADGE OVERLAY
// ============================================
.cover-image-section {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.cover-image {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

.badge-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.expedition-badge {
  max-width: 280px;
  padding: $space-6;
  border: 2px solid $warm-black;
  text-align: center;
  position: relative;
  background: $cream;

  // Corner notches for vintage stamp feel
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    background: $cream;
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
</style>
