<script setup lang="ts">
// Support section with donation links and interactive map
</script>

<template>
  <section class="support-section">
    <div class="support-header">
      <h2 class="support-title">{{ $t('support.title') }}</h2>
      <p class="support-subtitle">{{ $t('support.description') }}</p>
      <p class="support-highlight">
        <span>€5</span> {{ $t('support.highlight').replace('€5 ', '') }}
      </p>
    </div>

    <!-- Interactive Route Map -->
    <InteractiveMap />

    <div class="direct-support">
      <p class="direct-support-label">{{ $t('support.directLabel') }}</p>
      <div class="direct-links">
        <a href="https://wise.com/pay/me/yuweix2" class="direct-link" target="_blank" rel="noopener noreferrer">Wise</a>
        <a href="https://revolut.me/whereisriax" class="direct-link" target="_blank" rel="noopener noreferrer">Revolut</a>
        <a href="https://paypal.me/whereisriax" class="direct-link" target="_blank" rel="noopener noreferrer">PayPal</a>
        <a href="https://venmo.com/u/whereisriax" class="direct-link" target="_blank" rel="noopener noreferrer">Venmo</a>
        <a href="https://ko-fi.com/whereisriax" class="direct-link credit-card-link" target="_blank" rel="noopener noreferrer">
          Buy Me a Coffee <span class="cc-note">(credit card)</span>
        </a>
      </div>
    </div>

    <figure class="runner-image">
      <img src="/sinai-run.webp" alt="Running with friends in Sinai" loading="lazy">
      <figcaption>
        Photo by <a href="https://instagram.com/jack.lawes" target="_blank" rel="noopener noreferrer">Jack Lawes (@jack.lawes)</a>
      </figcaption>
    </figure>
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

.support-section {
  padding: $space-16 0;
  border-top: $border-width solid $warm-black;
  margin-top: $space-12;
}

.support-header {
  text-align: center;
  margin-bottom: $space-8;
}

.support-title {
  font-family: $font-serif;
  font-size: $text-3xl;
  margin-bottom: $space-3;
}

.support-subtitle {
  font-size: $text-sm;
  opacity: 0.7;
  line-height: $leading-relaxed;
  max-width: 500px;
  margin: 0 auto;
}

.support-highlight {
  margin-top: $space-8;
  font-family: $font-serif;
  font-size: $text-xl;
  line-height: $leading-relaxed;

  span {
    color: $terracotta;
    font-family: $font-mono;
  }
}

.runner-image {
  margin-top: $space-20;
  padding-top: $space-20;
  border-top: $border-width solid $warm-black;
  text-align: center;

  img {
    max-width: 100%;
    height: auto;
    max-height: 400px;
    object-fit: cover;
  }

  figcaption {
    margin-top: $space-3;
    font-size: $text-sm;
    opacity: 0.5;
    font-style: italic;

    a {
      color: $warm-black;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.credit-card-link {
  .cc-note {
    font-size: $text-xs;
    opacity: 0.6;
    margin-left: $space-1;
    letter-spacing: 0.02em;
    text-transform: none;
  }
}
</style>
