<script setup lang="ts">
// Support page - SIMPLIFIED: Path visualization, Impact, Donate, Community, FAQ
const { t } = useI18n()

useSeoMeta({
  title: 'Support | 20,000KM',
  description: 'Help make the first human attempt to run across Asia and Europe possible. Every €5 funds 1 kilometer of this historic journey.'
})

const { formattedFunded, formattedTotal, progress } = useFundraising()

// Top supporters (donations over €100)
const topSupporters = [
  { name: 'Giles Rozier' },
  { name: 'Sophie Qu' },
  { name: 'Jady Tsao' },
  { name: 'Yuka Toda' },
  { name: 'Mads Soegaard' },
  { name: 'Daniel Nickerson' },
  { name: 'Sheila Nussbaumer' },
  { name: 'Cormac O Bric' }
]

// FAQ data - using translation keys
const faqKeys = ['cost', 'perKm', 'goalNotMet', 'unusedFunds'] as const

const expandedFaq = ref<number | null>(null)
const toggleFaq = (index: number) => {
  expandedFaq.value = expandedFaq.value === index ? null : index
}
</script>

<template>
  <div class="support-page">
    <!-- ============================================
         ABOVE THE FOLD: Path + Impact + CTA
         ============================================ -->

    <!-- PATH VISUALIZATION -->
    <section class="path-section">
      <div class="container">
        <div class="path-header">
          <span class="path-direction">{{ $t('supportPage.pathDirection') }}</span>
          <span class="path-stats">
            <strong>{{ formattedFunded }}</strong> / {{ formattedTotal }} {{ $t('supportPage.kmFunded') }}
          </span>
        </div>

        <div class="path-bar">
          <div class="path-fill" :style="{ width: `${progress}%` }"></div>
          <span class="path-start">{{ $t('locations.vladivostok') }}</span>
          <span class="path-end">{{ $t('locations.lisbon') }}<br><small>{{ $t('supportPage.goal') }}</small></span>
        </div>
      </div>
    </section>

    <!-- YOUR IMPACT -->
    <section class="impact-section">
      <div class="container">
        <h2 class="section-title">{{ $t('supportPage.impactTitle') }}</h2>

        <div class="impact-grid">
          <div class="impact-item">
            <span class="impact-amount">{{ $t('supportPage.impact.1km.amount') }}</span>
            <span class="impact-label">{{ $t('supportPage.impact.1km.label') }}</span>
          </div>
          <div class="impact-item">
            <span class="impact-amount">{{ $t('supportPage.impact.morning.amount') }}</span>
            <span class="impact-label">{{ $t('supportPage.impact.morning.label') }}</span>
          </div>
          <div class="impact-item">
            <span class="impact-amount">{{ $t('supportPage.impact.day.amount') }}</span>
            <span class="impact-label">{{ $t('supportPage.impact.day.label') }}</span>
          </div>
          <div class="impact-item">
            <span class="impact-amount">{{ $t('supportPage.impact.week.amount') }}</span>
            <span class="impact-label">{{ $t('supportPage.impact.week.label') }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- PRIMARY CTA -->
    <section class="cta-section">
      <div class="container">
        <a
          href="https://www.gofundme.com/rias-20000-km-run-across-asia-and-europe"
          target="_blank"
          rel="noopener noreferrer"
          class="cta-primary"
          aria-label="Donate now on GoFundMe (opens in new tab)"
        >
          {{ $t('supportPage.donateCta') }}
        </a>

        <NuxtLink to="/contact" class="cta-sponsor">
          {{ $t('supportPage.sponsorCta') }}
        </NuxtLink>
      </div>
    </section>

    <!-- ============================================
         COMMUNITY - Supporters
         ============================================ -->
    <section class="community-section">
      <div class="container">
        <h2 class="section-title">{{ $t('supportPage.communityTitle') }}</h2>
        <p class="community-subtitle">{{ $t('supportPage.communitySubtitle') }}</p>

        <div class="supporters-list">
          <h3 class="supporters-heading">{{ $t('supportPage.supportersHeading') }}</h3>
          <ul class="supporters-names">
            <li v-for="supporter in topSupporters" :key="supporter.name">
              <a
                v-if="supporter.url"
                :href="supporter.url"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="`Visit ${supporter.name} (opens in new tab)`"
              >
                {{ supporter.name }}
              </a>
              <span v-else>{{ supporter.name }}</span>
            </li>
          </ul>
        </div>

        <a
          href="https://www.gofundme.com/rias-20000-km-run-across-asia-and-europe"
          target="_blank"
          rel="noopener noreferrer"
          class="community-cta"
          aria-label="See all supporters on GoFundMe (opens in new tab)"
        >
          {{ $t('supportPage.seeAllSupporters') }}
        </a>
      </div>
    </section>

    <!-- ============================================
         FAQ
         ============================================ -->
    <section class="faq-section">
      <div class="container">
        <h2 class="section-title">{{ $t('supportPage.faqTitle') }}</h2>

        <div class="faq-list">
          <div
            v-for="(key, index) in faqKeys"
            :key="key"
            class="faq-item"
            :class="{ 'faq-item--expanded': expandedFaq === index }"
          >
            <button
              class="faq-question"
              :aria-expanded="expandedFaq === index"
              @click="toggleFaq(index)"
            >
              {{ $t(`supportPage.faqs.${key}.question`) }}
              <span class="faq-icon" aria-hidden="true">{{ expandedFaq === index ? '−' : '+' }}</span>
            </button>
            <div v-show="expandedFaq === index" class="faq-answer">
              <p>{{ $t(`supportPage.faqs.${key}.answer`) }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

.support-page {
  position: relative;
}

// ============================================
// PATH VISUALIZATION
// ============================================
.path-section {
  padding: $space-12 0;
  background: $sand-100;
  border-bottom: 3px solid $warm-black;
}

.path-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $space-6;

  @media (max-width: $breakpoint-md) {
    flex-direction: column;
    gap: $space-2;
    text-align: center;
  }
}

.path-direction {
  font-family: $font-serif;
  font-style: italic;
  font-size: $text-xl;
  color: $terracotta-700;
}

.path-stats {
  font-family: $font-mono;
  font-size: $text-sm;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  color: $a11y-text-secondary; // WCAG AAA compliant

  strong {
    color: $terracotta-700;
    font-size: $text-lg;
  }
}

.path-bar {
  position: relative;
  height: 12px;
  background: $earth-200;
  margin-bottom: $space-8;
}

.path-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: $terracotta;
  transition: width 0.8s ease;
}

.path-start,
.path-end {
  position: absolute;
  top: 100%;
  font-family: $font-mono;
  font-size: $text-xs;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  color: $a11y-text-secondary; // WCAG AAA compliant
  margin-top: $space-2;

  small {
    display: block;
    color: $terracotta-700;
    font-weight: 600;
  }
}

.path-start {
  left: 0;
}

.path-end {
  right: 0;
  text-align: right;
}

// ============================================
// YOUR IMPACT
// ============================================
.impact-section {
  padding: $space-12 0;
  background: $cream;
}

.section-title {
  font-family: $font-serif;
  font-size: clamp($text-2xl, 5vw, $text-3xl);
  text-transform: uppercase;
  letter-spacing: -0.02em;
  margin-bottom: $space-8;
  text-align: center;
}

.impact-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $space-4;
  max-width: 800px;
  margin: 0 auto;
  padding: $space-6 0;
  border-top: 2px solid $warm-black;
  border-bottom: 2px solid $warm-black;

  @media (max-width: $breakpoint-md) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.impact-item {
  text-align: center;
}

.impact-amount {
  display: block;
  font-family: $font-serif;
  font-size: clamp($text-2xl, 4vw, $text-3xl);
  color: $terracotta-700;
  line-height: 1;
}

.impact-label {
  display: block;
  font-family: $font-mono;
  font-size: $text-xs;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  color: $a11y-text-secondary; // WCAG AAA compliant
  margin-top: $space-2;
}

// ============================================
// CTA SECTION
// ============================================
.cta-section {
  padding: $space-8 0 $space-12;
  text-align: center;
  background: $cream;
}

.cta-primary {
  display: inline-block;
  padding: $space-4 $space-12;
  background: $terracotta-700;
  color: $cream;
  font-family: $font-mono;
  font-size: $text-base;
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

.cta-sponsor {
  display: block;
  margin-top: $space-6;
  font-family: $font-mono;
  font-size: $text-base;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  color: $warm-black;
  text-decoration: underline;
  text-underline-offset: 4px;

  &:hover {
    color: $terracotta-700;
  }
}

// ============================================
// COMMUNITY SECTION
// ============================================
.community-section {
  padding: $space-12 0;
  background: $sand-100;
  text-align: center;
}

.community-subtitle {
  font-family: $font-serif;
  font-style: italic;
  font-size: $text-lg;
  color: $a11y-text-secondary; // WCAG AAA compliant
  margin-bottom: $space-8;
}

.supporters-list {
  max-width: 500px;
  margin: 0 auto $space-8;
  padding: $space-6;
  background: $cream;
  border: 2px solid $warm-black;
}

.supporters-heading {
  font-family: $font-mono;
  font-size: $text-xs;
  letter-spacing: $tracking-widest;
  text-transform: uppercase;
  color: $terracotta-700;
  margin-bottom: $space-4;
}

.supporters-names {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: $space-2 $space-4;

  li {
    font-family: $font-serif;
    font-size: $text-base;
    color: $earth-700;
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

.community-cta {
  display: inline-block;
  padding: $space-3 $space-6;
  background: $warm-black;
  color: $cream;
  font-family: $font-mono;
  font-size: $text-sm;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: $terracotta-700;
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
    color: $a11y-text-secondary; // WCAG AAA compliant
    line-height: $leading-relaxed;
    margin: 0;
  }
}
</style>
