<script setup lang="ts">
// Full-width pull quote section with typewriter animation
// Creates visual break between story and route map

const quoteRef = ref<HTMLElement | null>(null)
const quoteText = 'At human speed, strangers become hosts. Headlines become handshakes.'

const { observe } = useScrollReveal({ threshold: 0.5 })
const { typewrite } = useTypewriter({ charDelay: 35, startDelay: 400 })
const { motionAllowed } = useSensoryMode()

const hasTyped = ref(false)

onMounted(() => {
  if (!quoteRef.value) return

  const setupTypewriter = () => {
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
      // Show immediately if motion not allowed
      quoteRef.value.textContent = quoteText
      quoteRef.value.classList.add('typing-complete')
    }
  }

  setupTypewriter()
})

// Handle motion preference changes
watch(motionAllowed, (allowed) => {
  if (quoteRef.value) {
    if (!allowed) {
      quoteRef.value.textContent = quoteText
      quoteRef.value.classList.add('typing-complete')
    } else if (allowed && !hasTyped.value) {
      // Reset and re-trigger typewriter effect if motion is enabled after mount
      quoteRef.value.textContent = ''
      quoteRef.value.classList.remove('typing-complete')
      hasTyped.value = false
      // Re-run observer/typewriter
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
    }
  }
})
</script>

<template>
  <section class="pull-quote">
    <blockquote class="pull-quote__text">
      <span class="pull-quote__mark" aria-hidden="true">"</span>
      <span
        ref="quoteRef"
        class="typewriter"
        :aria-label="quoteText"
      >{{ motionAllowed ? '' : quoteText }}</span>
      <span class="pull-quote__mark pull-quote__mark--end" aria-hidden="true">"</span>
    </blockquote>
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

.pull-quote {
  // Full-width bleed + full-screen height
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  background: $warm-black;
  padding: $space-12 $space-8;

  @media (max-width: $breakpoint-md) {
    min-height: 80vh;
    padding: $space-8 $space-6;
  }
}

.pull-quote__text {
  max-width: 850px;
  margin: 0 auto;

  font-family: $font-serif;
  font-style: italic;
  font-size: clamp($text-2xl, 4vw, $text-4xl);
  line-height: $leading-relaxed;
  text-align: center;
  color: $cream;

  br {
    @media (max-width: $breakpoint-md) {
      display: none;
    }
  }
}

.pull-quote__mark {
  color: $terracotta;
  font-size: 1.2em;
  line-height: 0;
  vertical-align: -0.1em;

  &--end {
    // Hide until typing complete to avoid dangling quote mark
    opacity: 0;
    transition: opacity 0.3s ease;

    .typing-complete + & {
      opacity: 1;
    }
  }
}

// Typewriter overrides for this context
.typewriter {
  font-family: $font-serif;
  font-style: italic;

  &::after {
    // Cursor styling for dark background
    color: $terracotta;
  }
}
</style>
