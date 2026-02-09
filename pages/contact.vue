<script setup lang="ts">
useSeoMeta({
  title: 'Connect | 20,000KM',
  description: 'Get in touch with the 20,000km team for press, sponsorship, or land crew inquiries.'
})

const socialLinks = [
  { name: 'Instagram', handle: '@whereisriax', url: 'https://instagram.com/whereisriax' },
  { name: 'Strava', handle: 'Ria Xi', url: 'https://strava.app.link/qeKK5Sw4OZb' },
  { name: 'TikTok', handle: '@whereisriax', url: 'https://tiktok.com/@whereisriax' }
]
</script>

<template>
  <div class="contact-page">
    <div class="container">
      <div class="contact-content">
        <!-- Header -->
        <header class="contact-header">
          <span class="contact-eyebrow">{{ $t('contact.eyebrow') }}</span>
          <h1 class="contact-title">{{ $t('contact.title') }}</h1>
          <p class="contact-intro">{{ $t('contact.intro') }}</p>
        </header>

        <!-- Email - Primary Contact -->
        <section class="contact-email">
          <h2 class="section-label">{{ $t('contact.emailLabel') }}</h2>
          <a href="mailto:hello@20000km.com" class="email-link">
            hello@20000km.com
          </a>
        </section>

        <!-- Social Links -->
        <section class="contact-social" aria-labelledby="social-heading">
          <h2 id="social-heading" class="section-label">{{ $t('contact.followLabel') }}</h2>
          <ul class="social-list">
            <li v-for="link in socialLinks" :key="link.name">
              <a
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="social-link"
                :aria-label="`Follow on ${link.name} at ${link.handle} (opens in new tab)`"
              >
                <span class="social-name" aria-hidden="true">{{ link.name }}</span>
                <span class="social-handle" aria-hidden="true">{{ link.handle }}</span>
              </a>
            </li>
          </ul>
        </section>

        <!-- Quick Links for specific inquiries -->
        <section class="contact-inquiries">
          <h2 class="section-label">{{ $t('contact.inquiriesLabel') }}</h2>
          <div class="inquiry-cards">
            <a href="mailto:hello@20000km.com?subject=Press Inquiry" class="inquiry-card">
              <svg class="external-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
              </svg>
              <h3>{{ $t('contact.inquiries.press.title') }}</h3>
              <p>{{ $t('contact.inquiries.press.desc') }}</p>
            </a>
            <a href="mailto:hello@20000km.com?subject=Sponsorship Inquiry" class="inquiry-card">
              <svg class="external-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
              </svg>
              <h3>{{ $t('contact.inquiries.sponsorship.title') }}</h3>
              <p>{{ $t('contact.inquiries.sponsorship.desc') }}</p>
            </a>
            <a href="mailto:hello@20000km.com?subject=Land Crew Application" class="inquiry-card">
              <svg class="external-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
              </svg>
              <h3>{{ $t('contact.inquiries.landCrew.title') }}</h3>
              <p>{{ $t('contact.inquiries.landCrew.desc') }}</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@use '~/assets/scss/_variables' as *;

.contact-page {
  padding: $space-16 0;
  background: $sand-100;
  min-height: 70vh;
}

.contact-content {
  max-width: 700px;
  margin: 0 auto;
}

// Header
.contact-header {
  text-align: center;
  margin-bottom: $space-12;
}

.contact-eyebrow {
  display: block;
  font-family: $font-mono;
  font-size: $text-xs;
  letter-spacing: $tracking-widest;
  text-transform: uppercase;
  color: $terracotta-700;
  margin-bottom: $space-4;
}

.contact-title {
  font-family: $font-serif;
  font-size: clamp($text-4xl, 8vw, $text-5xl);
  text-transform: uppercase;
  letter-spacing: -0.02em;
  margin: 0 0 $space-4 0;
}

.contact-intro {
  font-family: $font-serif;
  font-style: italic;
  font-size: $text-lg;
  color: $a11y-text-secondary; // WCAG AAA compliant
  margin: 0;
}

// Section Labels
.section-label {
  font-family: $font-mono;
  font-size: $text-xs;
  letter-spacing: $tracking-widest;
  text-transform: uppercase;
  color: $terracotta-700;
  margin-bottom: $space-4;
}

// Email Section
.contact-email {
  text-align: center;
  margin-bottom: $space-12;
  padding: $space-8;
  background: $cream;
  border: 3px solid $warm-black;
}

.email-link {
  font-family: $font-serif;
  font-size: clamp($text-2xl, 5vw, $text-3xl);
  color: $warm-black;
  text-decoration: none;
  border-bottom: 2px solid $warm-black;
  padding-bottom: $space-1;
  transition: color 0.2s ease, border-color 0.2s ease;

  &:hover {
    color: $terracotta-700;
    border-color: $terracotta-700;
  }
}

// Social Links
.contact-social {
  margin-bottom: $space-12;
  text-align: center;
}

.social-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: $space-4;
}

.social-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: $space-4 $space-6;
  background: $cream;
  border: 2px solid $earth-300;
  text-decoration: none;
  transition: border-color 0.2s ease;
  min-width: 140px;

  &:hover {
    border-color: $terracotta-700;

    .social-name {
      color: $terracotta-700;
    }
  }
}

.social-name {
  font-family: $font-mono;
  font-size: $text-sm;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  color: $warm-black;
  margin-bottom: $space-1;
}

.social-handle {
  font-size: $text-sm;
  color: $a11y-text-secondary; // WCAG AAA compliant
}

// Inquiry Cards
.contact-inquiries {
  text-align: center;
}

.inquiry-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $space-4;

  @media (max-width: $breakpoint-md) {
    grid-template-columns: 1fr;
  }
}

.inquiry-card {
  position: relative;
  display: block;
  padding: $space-6;
  background: $cream;
  border: 2px solid $earth-300;
  text-align: left;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease;

  &:hover {
    border-color: $terracotta-700;
    background: color.adjust($cream, $lightness: 2%);

    .external-icon {
      color: $terracotta-700;
      transform: translate(2px, -2px);
    }
  }

  h3 {
    font-family: $font-mono;
    font-size: $text-sm;
    letter-spacing: $tracking-wide;
    text-transform: uppercase;
    margin-bottom: $space-2;
    color: $warm-black;
  }

  p {
    font-size: $text-sm;
    color: $a11y-text-secondary; // WCAG AAA compliant
    line-height: $leading-relaxed;
    margin-bottom: 0;
  }
}

.external-icon {
  position: absolute;
  top: $space-4;
  right: $space-4;
  color: $a11y-text-secondary; // WCAG AAA compliant
  transition: color 0.2s ease, transform 0.2s ease;
}
</style>
