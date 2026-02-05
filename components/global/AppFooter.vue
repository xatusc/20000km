<script setup lang="ts">
// Footer component with sitemap navigation and social links
const { t } = useI18n()

// Sitemap navigation - deduplicated, SEO-optimized labels
const siteLinks = computed(() => [
  { to: '/who', labelKey: 'footer.links.who' },
  { to: '/journey', labelKey: 'footer.links.theJourney' },
  { to: '/planetary-run-club', labelKey: 'footer.links.runClub' }
])

const socialLinks = computed(() => [
  { href: 'https://instagram.com/whereisriax', labelKey: 'footer.links.instagram' },
  { href: 'https://strava.app.link/B5t6CElN7Yb', labelKey: 'footer.links.strava' },
  { href: 'https://tiktok.com/@whereisriax', labelKey: 'footer.links.tiktok' }
])
</script>

<template>
  <footer class="footer">
    <div class="container">
      <!-- Follow CTA row -->
      <div class="footer__newsletter">
        <div class="footer__newsletter-content">
          <h3 class="footer__newsletter-title">{{ $t('footer.followTitle') }}</h3>
          <p class="footer__newsletter-desc">{{ $t('footer.followDesc') }}</p>
        </div>

        <a
          href="https://instagram.com/whereisriax"
          target="_blank"
          rel="noopener noreferrer"
          class="footer__newsletter-link"
          aria-label="Follow on Instagram (opens in new tab)"
        >
          {{ $t('footer.followCta') }}
        </a>
      </div>

      <!-- Sitemap Footer -->
      <nav class="footer__sitemap" aria-label="Footer navigation">
        <!-- Column 1: The Run -->
        <div class="footer__sitemap-col">
          <h4 class="footer__sitemap-heading">{{ $t('footer.columns.theRun') }}</h4>
          <ul class="footer__sitemap-links">
            <li v-for="link in siteLinks" :key="link.to">
              <NuxtLink :to="link.to">{{ $t(link.labelKey) }}</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Column 2: Follow -->
        <div class="footer__sitemap-col">
          <h4 class="footer__sitemap-heading">{{ $t('footer.columns.follow') }}</h4>
          <ul class="footer__sitemap-links">
            <li v-for="link in socialLinks" :key="link.href">
              <a
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="`Follow on ${$t(link.labelKey)} (opens in new tab)`"
              >
                {{ $t(link.labelKey) }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Column 3: Support -->
        <div class="footer__sitemap-col">
          <h4 class="footer__sitemap-heading">{{ $t('footer.columns.support') }}</h4>
          <ul class="footer__sitemap-links">
            <li>
              <NuxtLink to="/support">{{ $t('footer.links.supportTheJourney') }}</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact">{{ $t('footer.links.becomeSponsor') }}</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Column 4: Connect -->
        <div class="footer__sitemap-col">
          <h4 class="footer__sitemap-heading">{{ $t('footer.columns.connect') }}</h4>
          <ul class="footer__sitemap-links">
            <li>
              <NuxtLink to="/contact">{{ $t('footer.links.pressMedia') }}</NuxtLink>
            </li>
            <li>
              <a href="mailto:hello@20000km.com">hello@20000km.com</a>
            </li>
          </ul>
        </div>
      </nav>

      <!-- Brand Statement (SEO keyword targeting) -->
      <div class="footer__brand-statement">
        <p>{{ $t('footer.brandStatement') }}</p>
      </div>

      <!-- Bottom row -->
      <div class="footer__bottom">
        <span class="footer__copyright">{{ $t('footer.copyright') }}</span>
        <NuxtLink to="/contact" class="footer__contact-link">{{ $t('footer.contact') }}</NuxtLink>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

.footer {
  background: $warm-black;
  color: $cream;
  padding: $space-12 0 $space-8;

  // Newsletter section
  &__newsletter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: $space-8;
    padding-bottom: $space-8;
    border-bottom: 1px solid rgba($cream, 0.15);
    margin-bottom: $space-8;

    @media (max-width: $breakpoint-lg) {
      flex-direction: column;
      align-items: stretch;
      text-align: center;
    }
  }

  &__newsletter-content {
    flex: 1;
  }

  &__newsletter-title {
    font-family: $font-serif;
    font-size: $text-lg;
    margin-bottom: $space-1;
  }

  &__newsletter-desc {
    font-size: $text-sm;
    color: rgba($cream, 0.85); // WCAG AAA compliant contrast on dark bg
    max-width: 400px;

    @media (max-width: $breakpoint-lg) {
      max-width: none;
    }
  }

  &__newsletter-link {
    flex-shrink: 0;
    font-family: $font-mono;
    font-size: $text-sm;
    color: $terracotta-300;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: $cream;
    }

    @media (max-width: $breakpoint-lg) {
      align-self: center;
    }
  }

  // Sitemap section
  &__sitemap {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: $space-8;
    padding: $space-8 0;
    border-bottom: 1px solid rgba($cream, 0.1);

    @media (max-width: $breakpoint-xl) {
      grid-template-columns: repeat(2, 1fr);
      gap: $space-6;
    }

    @media (max-width: $breakpoint-sm) {
      grid-template-columns: 1fr;
      text-align: center;
    }
  }

  &__sitemap-col {
    display: flex;
    flex-direction: column;
    gap: $space-3;
  }

  &__sitemap-heading {
    font-family: $font-mono;
    font-size: $text-xs;
    letter-spacing: $tracking-widest;
    text-transform: uppercase;
    color: rgba($cream, 0.85);
    margin-bottom: $space-1;
  }

  &__sitemap-links {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: $space-2;

    li {
      margin: 0;
    }

    a {
      font-size: $text-sm;
      color: $cream;
      text-decoration: none;
      transition: color 0.2s ease;

      &:hover {
        color: $terracotta-300;
      }
    }
  }

  // Brand statement
  &__brand-statement {
    padding: $space-6 0;
    border-bottom: 1px solid rgba($cream, 0.1);

    p {
      font-family: $font-serif;
      font-size: $text-sm;
      font-style: italic;
      color: rgba($cream, 0.85);
      line-height: $leading-relaxed;
      max-width: 600px;
      text-align: center;
      margin: 0 auto;
    }
  }

  // Bottom row
  &__bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: $space-6;

    @media (max-width: $breakpoint-md) {
      flex-direction: column;
      gap: $space-3;
      text-align: center;
    }
  }

  &__copyright {
    font-family: $font-mono;
    font-size: $text-xs;
    color: rgba($cream, 0.85); // WCAG AAA compliant contrast on dark bg
    letter-spacing: $tracking-wide;
  }

  &__contact-link {
    font-size: $text-xs;
    color: rgba($cream, 0.85); // WCAG AAA compliant contrast on dark bg
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: $cream;
    }
  }
}
</style>
