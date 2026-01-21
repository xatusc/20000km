<script setup lang="ts">
// Simplified support section - progress bar + single CTA
// Full details on /support page
const { formattedFunded, formattedTotal, progress } = useFundraising()
</script>

<template>
  <section class="support-section">
    <!-- Left: Content -->
    <div class="support-section__content">
      <span class="support-section__eyebrow">{{ $t('supportSection.eyebrow') }}</span>
      <h2 class="support-section__title" v-html="$t('supportSection.title').replace(' ', '<br>')"></h2>

      <!-- Progress indicator - prominent with black frame -->
      <div class="support-section__progress">
        <div class="support-section__progress-header">
          <span class="support-section__progress-funded">{{ formattedFunded }} {{ $t('supportSection.kmFunded') }}</span>
          <span class="support-section__progress-total">{{ $t('supportSection.of') }} {{ formattedTotal }} km</span>
        </div>
        <div
          class="support-section__progress-bar"
          role="progressbar"
          :aria-valuenow="Math.round(progress)"
          aria-valuemin="0"
          aria-valuemax="100"
          :aria-label="`Journey funding progress: ${Math.round(progress)}% complete, ${formattedFunded} of ${formattedTotal} kilometers funded`"
        >
          <div class="support-section__progress-fill" :style="{ width: `${Math.max(progress, 2)}%` }">
            <span v-if="progress > 10" class="support-section__progress-runner" aria-hidden="true"></span>
          </div>
        </div>
        <div class="support-section__progress-endpoints">
          <span>{{ $t('locations.vladivostok') }}</span>
          <span>{{ $t('locations.lisbon') }}</span>
        </div>
      </div>

      <!-- Single compelling line -->
      <p class="support-section__hook">{{ $t('supportSection.hook') }}</p>

      <!-- Single CTA to GoFundMe -->
      <a
        href="https://www.gofundme.com/rias-20000-km-run-across-asia-and-europe"
        target="_blank"
        rel="noopener noreferrer"
        class="support-section__cta"
      >
        {{ $t('supportSection.cta') }}
      </a>

      <!-- Sponsorship contact -->
      <p class="support-section__sponsor">
        <a href="mailto:hello@20000km.com">hello@20000km.com</a> {{ $t('supportSection.sponsorText') }}
      </p>
    </div>

    <!-- Right: Large dramatic image -->
    <figure class="support-section__image">
      <img
        src="/images/Ria_lookback.webp"
        alt="Ria looking back over her shoulder while running through dramatic terrain"
        loading="lazy"
      >
    </figure>
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;
@use '~/assets/scss/_decorative' as *;

.support-section {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: $space-12;
  align-items: center;
  padding: $space-16 0;

  @media (max-width: $breakpoint-xl) {
    grid-template-columns: 1fr;
    gap: $space-8;
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
    line-height: $leading-tight;
    text-transform: uppercase;
    letter-spacing: -0.02em;
    margin-bottom: $space-8;
  }

  // Progress section with paper texture and bold black frame
  &__progress {
    @include paper-texture($sand-50);
    padding: $space-6;
    border: 3px solid $warm-black;
    margin-bottom: $space-6;
  }

  &__progress-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: $space-3;
  }

  &__progress-funded {
    font-family: $font-mono;
    font-size: $text-base;
    font-weight: 600;
    color: $terracotta-700;
    letter-spacing: $tracking-wide;
  }

  &__progress-total {
    font-family: $font-mono;
    font-size: $text-sm;
    color: $earth-500;
    letter-spacing: $tracking-wide;
  }

  &__progress-bar {
    height: 20px;
    background: $earth-200;
    overflow: hidden;
    position: relative;
  }

  &__progress-fill {
    height: 100%;
    background: $terracotta;
    transition: width 0.8s ease;
    position: relative;
    min-width: 2%;
  }

  &__progress-runner {
    position: absolute;
    right: -2px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    background: $warm-black;
    border-radius: 50%;
    border: 2px solid $cream;

    &::after {
      content: '→';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: $cream;
      font-size: 8px;
    }
  }

  &__progress-endpoints {
    display: flex;
    justify-content: space-between;
    margin-top: $space-2;
    font-family: $font-mono;
    font-size: $text-xs;
    color: $earth-400;
    letter-spacing: $tracking-wide;
    text-transform: uppercase;
  }

  &__hook {
    font-family: $font-mono;
    font-size: $text-sm;
    letter-spacing: $tracking-wide;
    color: $earth-600;
    margin-bottom: $space-6;
    max-width: 400px;
  }

  &__cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: $terracotta-700;
    color: $cream;
    padding: $space-4 $space-10;
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
      transform: translateY(-1px);
    }
  }

  &__sponsor {
    margin-top: $space-4;
    font-family: $font-mono;
    font-size: $text-sm;
    color: $earth-500;

    a {
      color: $terracotta-700;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  &__details {
    display: block;
    margin-top: $space-4;
    font-family: $font-mono;
    font-size: $text-sm;
    letter-spacing: $tracking-wide;
    color: $earth-500;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: $terracotta-700;
    }
  }

  &__image {
    position: relative;
    margin: 0;

    img {
      width: 100%;
      height: auto;
      min-height: 450px;
      object-fit: cover;
      @include hand-drawn-border-subtle($warm-black, 3px);
    }

    @media (max-width: $breakpoint-xl) {
      order: -1;

      img {
        min-height: 300px;
      }
    }
  }
}
</style>
