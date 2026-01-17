<script setup lang="ts">
useSeoMeta({
  title: 'Contact | 20,000KM',
  description: 'Get in touch with the 20,000km team.'
})

const selectedIntent = ref<string | null>(null)

const intents = [
  { id: 'media', label: 'Press & Media', description: 'Interviews, features, documentary inquiries' },
  { id: 'crew', label: 'Join the Crew', description: 'Apply to be part of the support team' },
  { id: 'sponsor', label: 'Sponsorship', description: 'Partnership and sponsorship opportunities' },
]
</script>

<template>
  <div class="container py-16">
    <div class="container-narrow mx-auto">
      <h1 class="font-serif text-3xl mb-4">Contact</h1>
      <p class="text-muted mb-12">Get in touch with the 20,000km team.</p>

      <!-- Intent-based routing -->
      <div class="intents-grid mb-12">
        <button
          v-for="intent in intents"
          :key="intent.id"
          class="intent-card transition-essential"
          :class="{ 'intent-card--active': selectedIntent === intent.id }"
          @click="selectedIntent = selectedIntent === intent.id ? null : intent.id"
        >
          <span class="intent-label">{{ intent.label }}</span>
          <span class="intent-desc">{{ intent.description }}</span>
        </button>
      </div>

      <!-- Intent-specific content -->
      <div v-if="selectedIntent === 'media'" class="intent-content">
        <h2 class="font-serif text-xl mb-4">Press & Media</h2>
        <p class="text-muted mb-4">
          For press inquiries, interviews, or documentary collaboration, please reach out directly.
        </p>
        <a href="mailto:hello@20000km.com?subject=Press Inquiry" class="btn">
          Email Press Team
        </a>
      </div>

      <div v-if="selectedIntent === 'crew'" class="intent-content">
        <h2 class="font-serif text-xl mb-4">Join the Crew</h2>
        <p class="text-muted mb-4">
          We're looking for support crew across 29 segments. Be part of something delusional.
        </p>
        <a href="https://forms.gle/4hi4gMRhXii32uax5" class="btn" target="_blank" rel="noopener noreferrer">
          Apply Now
        </a>
      </div>

      <div v-if="selectedIntent === 'sponsor'" class="intent-content">
        <h2 class="font-serif text-xl mb-4">Sponsorship</h2>
        <p class="text-muted mb-4">
          Interested in partnering with the 20,000km project? Let's talk.
        </p>
        <a href="mailto:hello@20000km.com?subject=Sponsorship Inquiry" class="btn">
          Email Sponsorship Team
        </a>
      </div>

      <!-- Direct contact info -->
      <div class="direct-contact">
        <p class="text-sm text-muted">
          Prefer email?
          <a href="mailto:hello@20000km.com" class="text-terracotta">
            hello@20000km.com
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

.intents-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $space-6;

  @media (max-width: $breakpoint-lg) {
    grid-template-columns: 1fr;
  }
}

.intent-card {
  padding: $space-6;
  border: $border-width solid $earth-300;
  text-align: left;
  cursor: pointer;
  background: $cream;

  &:hover {
    border-color: $earth-500;
  }

  &--active {
    border-color: $terracotta;
    background: $terracotta-50;
  }
}

.intent-label {
  display: block;
  font-family: $font-serif;
  font-size: $text-lg;
  margin-bottom: $space-2;
}

.intent-desc {
  font-size: $text-sm;
  color: $earth-600;
}

.intent-content {
  padding: $space-8;
  border: $border-width solid $warm-black;
  margin-bottom: $space-12;
}

.direct-contact {
  margin-top: $space-12;
  padding-top: $space-12;
  border-top: $border-width solid $earth-200;
  text-align: center;
}
</style>
