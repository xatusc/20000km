<script setup lang="ts">
/**
 * VoiceNotesSection - CTA for supporters to send voice messages to Ria
 * Bold, attention-grabbing design to encourage engagement
 */

const voiceNoteEmail = 'hello@20000km.com'
const voiceNoteLink = `mailto:${voiceNoteEmail}?subject=Voice Note for Ria&body=Hi Ria! Here's my message of encouragement for your journey...`
</script>

<template>
  <section class="voice-notes">
    <div class="container">
      <div class="voice-notes__inner">
        <div class="voice-notes__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" y1="19" x2="12" y2="23"/>
            <line x1="8" y1="23" x2="16" y2="23"/>
          </svg>
        </div>

        <div class="voice-notes__content">
          <span class="voice-notes__label">Cheer Her On</span>
          <h2 class="voice-notes__title">Send Ria a Voice Note</h2>
          <p class="voice-notes__desc">
            Record a message of encouragement. Your voice will fuel the kilometers ahead.
          </p>
        </div>

        <a
          :href="voiceNoteLink"
          class="voice-notes__cta"
        >
          <span class="voice-notes__cta-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
            </svg>
          </span>
          Send a Message
        </a>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

.voice-notes {
  padding: $space-16 0;
  background: $terracotta-700; // Flat, no gradient
}

.voice-notes__inner {
  display: flex;
  align-items: center;
  gap: $space-10;
  padding: $space-10;
  background: rgba($cream, 0.03);
  border: 2px solid rgba($cream, 0.12); // Hard border, no radius

  @media (max-width: $breakpoint-lg) {
    flex-direction: column;
    text-align: center;
  }
}

.voice-notes__icon {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba($cream, 0.08);
  border: 2px solid rgba($cream, 0.15); // Hard border, no radius

  svg {
    width: 40px;
    height: 40px;
    color: $cream;
  }

  @media (max-width: $breakpoint-lg) {
    width: 64px;
    height: 64px;

    svg {
      width: 32px;
      height: 32px;
    }
  }
}

.voice-notes__content {
  flex: 1;
}

.voice-notes__label {
  display: block;
  font-family: $font-mono;
  font-size: $text-xs;
  letter-spacing: $tracking-widest;
  text-transform: uppercase;
  color: rgba($cream, 0.9);
  margin-bottom: $space-2;
}

.voice-notes__title {
  font-family: $font-serif;
  font-size: $text-2xl;
  color: $cream;
  margin: 0 0 $space-2 0;

  @media (max-width: $breakpoint-md) {
    font-size: $text-xl;
  }
}

.voice-notes__desc {
  font-size: $text-base;
  color: rgba($cream, 0.9);
  margin: 0;
  max-width: 400px;

  @media (max-width: $breakpoint-lg) {
    max-width: none;
  }
}

.voice-notes__cta {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: $space-3;
  background: $cream;
  color: $terracotta-800;
  padding: $space-4 $space-10;
  font-family: $font-mono;
  font-size: $text-sm;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  text-decoration: none;
  border: 2px solid $cream; // Hard border, no radius
  transition: all $transition-base;
  min-height: 56px;

  &:hover {
    background: transparent;
    color: $cream;
  }
}

.voice-notes__cta-icon {
  width: 18px;
  height: 18px;

  svg {
    width: 100%;
    height: 100%;
    color: $terracotta-700;
  }
}
</style>
