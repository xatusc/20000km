<script setup lang="ts">
// Footer component with sitemap navigation and social links

// Sitemap navigation - deduplicated, SEO-optimized labels
const siteLinks = [
  { to: '/about', label: 'About' },
  { to: '/journey', label: 'The Journey' },
  { to: '/planetary-run-club', label: 'Run Club' }
]

const socialLinks = [
  { href: 'https://instagram.com/whereisriax', label: 'Instagram' },
  { href: 'https://strava.app.link/B5t6CElN7Yb', label: 'Strava' },
  { href: 'https://substack.com/@whereisriax', label: 'Substack' }
]
</script>

<template>
  <footer class="footer">
    <div class="container">
      <!-- Newsletter CTA row -->
      <div class="footer__newsletter">
        <div class="footer__newsletter-content">
          <h3 class="footer__newsletter-title">Long Run Letters</h3>
          <p class="footer__newsletter-desc">
            Weekly stories from the road. Training updates now, live dispatches from 17 countries starting May 2026.
          </p>
        </div>

        <a
          href="https://substack.com/@whereisriax"
          target="_blank"
          rel="noopener noreferrer"
          class="footer__newsletter-link"
        >
          Subscribe on Substack &rarr;
        </a>
      </div>

      <!-- Sitemap Footer -->
      <nav class="footer__sitemap" aria-label="Footer navigation">
        <!-- Column 1: The Run -->
        <div class="footer__sitemap-col">
          <h4 class="footer__sitemap-heading">The Run</h4>
          <ul class="footer__sitemap-links">
            <li v-for="link in siteLinks" :key="link.to">
              <NuxtLink :to="link.to">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Column 2: Follow -->
        <div class="footer__sitemap-col">
          <h4 class="footer__sitemap-heading">Follow</h4>
          <ul class="footer__sitemap-links">
            <li v-for="link in socialLinks" :key="link.href">
              <a :href="link.href" target="_blank" rel="noopener noreferrer">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Column 3: Support -->
        <div class="footer__sitemap-col">
          <h4 class="footer__sitemap-heading">Support</h4>
          <ul class="footer__sitemap-links">
            <li>
              <NuxtLink to="/support">Support the Journey</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact?reason=sponsorship">Become a Sponsor</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Column 4: Connect -->
        <div class="footer__sitemap-col">
          <h4 class="footer__sitemap-heading">Connect</h4>
          <ul class="footer__sitemap-links">
            <li>
              <NuxtLink to="/contact?reason=press">Press & Media</NuxtLink>
            </li>
            <li>
              <a href="mailto:hello@20000km.com">hello@20000km.com</a>
            </li>
          </ul>
        </div>
      </nav>

      <!-- Brand Statement (SEO keyword targeting) -->
      <div class="footer__brand-statement">
        <p>
          20,000KM is the first human attempt to run across Asia and Europe,
          retracing the ancient Silk Road on foot. One woman. Seventeen countries.
          From Vladivostok to Cabo da Roca.
        </p>
      </div>

      <!-- Bottom row -->
      <div class="footer__bottom">
        <span class="footer__copyright">&copy; 2026-2027 20,000KM Expedition</span>
        <NuxtLink to="/contact" class="footer__contact-link">Contact</NuxtLink>
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
    color: rgba($cream, 0.7);
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
    color: rgba($cream, 0.7);
    letter-spacing: $tracking-wide;
  }

  &__contact-link {
    font-size: $text-xs;
    color: rgba($cream, 0.7);
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: $cream;
    }
  }
}
</style>
