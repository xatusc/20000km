<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useTypewriter } from '~/composables/useScrollReveal'
import { useSensoryMode } from '~/composables/useSensoryMode'

const { t } = useI18n()
const quoteRef = ref<HTMLElement | null>(null)
const hasTypedQuote = ref(false)
const { typewrite } = useTypewriter({ charDelay: 35, startDelay: 400 })
const { motionAllowed } = useSensoryMode()

interface MediaMention {
  name: string
  url: string
  logo: string
  logoHeight?: number // Custom height in px for visual balance
}

const mentions: MediaMention[] = [
  {
    name: 'The Independent',
    url: 'https://www.independent.co.uk/',
    logo: '/the-independent-clean.svg',
    logoHeight: 80
  },
  {
    name: 'South China Morning Post',
    url: 'https://www.scmp.com/lifestyle/health-wellness/article/3331773/after-break-beijing-born-tech-turned-ultrarunner-plans-ai-backed-silk-road-trek',
    logo: '/SCMP_logo.svg',
    logoHeight: 40
  }
]

const quoteText = t('media.quote')

const setupTypewriter = () => {
  if (quoteRef.value) {
    if (motionAllowed.value && !hasTypedQuote.value) {
      typewrite(quoteRef.value, quoteText, () => { hasTypedQuote.value = true })
    } else {
      quoteRef.value.textContent = quoteText
      quoteRef.value.classList.add('typing-complete')
      hasTypedQuote.value = true
    }
  }
}

onMounted(() => {
  setupTypewriter()
})

watch(motionAllowed, (allowed) => {
  if (quoteRef.value) {
    if (!allowed) {
      quoteRef.value.textContent = quoteText
      quoteRef.value.classList.add('typing-complete')
      hasTypedQuote.value = true
    } else if (allowed && !hasTypedQuote.value) {
      quoteRef.value.textContent = ''
      quoteRef.value.classList.remove('typing-complete')
      hasTypedQuote.value = false
      typewrite(quoteRef.value, quoteText, () => { hasTypedQuote.value = true })
    }
  }
})
// ...existing code...
</script>

<template>
  <section class="media-coverage">
    <span class="media-coverage__label">{{ $t('media.label') }}</span>

    <div class="media-coverage__logos">
      <a
        v-for="mention in mentions"
        :key="mention.name"
        :href="mention.url"
        target="_blank"
        rel="noopener noreferrer"
        class="media-coverage__logo"
        :aria-label="`Read coverage on ${mention.name} (opens in new tab)`"
      >
        <img
          :src="mention.logo"
          :alt="mention.name"
          class="media-coverage__logo-img"
          :style="mention.logoHeight ? { height: `${mention.logoHeight}px` } : undefined"
        >
      </a>
    </div>

    <blockquote class="media-coverage__quote">
      <p>
        <span ref="quoteRef" class="typewriter" :aria-label="quoteText"></span>
      </p>
      <cite>— {{ $t('media.quoteSource') }}</cite>
    </blockquote>
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

.media-coverage {
  padding: $space-12;
  text-align: center;
  border: 3px solid $warm-black;
  background: $cream;
  margin: $space-12 0;
}

.media-coverage__label {
  display: block;
  font-family: $font-mono;
  font-size: $text-xs;
  letter-spacing: $tracking-widest;
  text-transform: uppercase;
  color: $a11y-text-secondary; // WCAG AAA compliant
  margin-bottom: $space-6;
}

.media-coverage__logos {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: $space-8;
  margin-bottom: $space-8;
}

.media-coverage__logo {
  text-decoration: none;
  transition: opacity $transition-base;

  &:hover {
    opacity: 0.7;
  }
}

.media-coverage__logo-img {
  height: 60px;
  width: auto;
  object-fit: contain;
  filter: grayscale(100%);
  transition: filter $transition-base;

  @media (max-width: $breakpoint-md) {
    height: 48px;
  }
}

.media-coverage__logo:hover .media-coverage__logo-img {
  filter: grayscale(0%);
}

.media-coverage__quote {
  max-width: $max-width-narrow;
  margin: 0 auto;
  padding: 0 $space-4;

  p {
    font-family: $font-serif;
    font-style: italic;
    font-size: $text-base;
    color: $a11y-text-secondary; // WCAG AAA compliant
    margin-bottom: $space-2;
  }

  cite {
    font-family: $font-mono;
    font-style: normal;
    font-size: $text-xs;
    letter-spacing: $tracking-wide;
    color: $a11y-text-secondary; // WCAG AAA compliant
  }
}
</style>
