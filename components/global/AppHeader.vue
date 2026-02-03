<script setup lang="ts">
// Header component with logo, navigation, and support CTA
// Sticky on desktop for persistent support access
const mobileMenuOpen = ref(false)

// Navigation order: Story first (builds emotional investment), then Journey, then Connect
// Note: Home removed from nav - logo serves as home link
const navItems = [
  { path: '/who', label: 'nav.who' },
  { path: '/journey', label: 'nav.theJourney' },
  { path: '/planetary-run-club', label: 'nav.runClub' },
  { path: '/contact', label: 'nav.connect' },
]

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

// Close mobile menu on route change
const route = useRoute()
watch(() => route.path, () => {
  mobileMenuOpen.value = false
})
</script>

<template>
  <header class="header">
    <div class="container header__inner">
      <div class="header__left">
        <NuxtLink to="/" class="header__logo">
          {{ $t('site.tagline') }}
        </NuxtLink>
      </div>

      <!-- Desktop Navigation + Support CTA + Utilities -->
      <div class="header__right">
        <nav class="header__nav" aria-label="Main navigation">
          <NuxtLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="header__nav-link"
          >
            {{ $t(item.label) }}
          </NuxtLink>
        </nav>

        <!-- Support CTA Button -->
        <NuxtLink to="/support" class="header__support-btn">
          {{ $t('nav.support') }}
        </NuxtLink>

        <!-- Utilities (motion toggle, future: language switcher) -->
        <div class="header__utilities">
          <ClientOnly>
            <SensoryModeToggle />
            <template #fallback>
              <span class="motion-toggle-placeholder">Motion: ...</span>
            </template>
          </ClientOnly>
        </div>
      </div>

      <!-- Mobile Menu Button -->
      <button
        class="header__menu-btn"
        :aria-expanded="mobileMenuOpen"
        aria-controls="mobile-nav"
        :aria-label="$t('nav.toggleMenu')"
        @click="toggleMobileMenu"
      >
        <span class="header__hamburger" :class="{ 'header__hamburger--open': mobileMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
    </div>

    <!-- Mobile Navigation -->
    <nav
      id="mobile-nav"
      class="header__nav-mobile"
      :class="{ 'header__nav-mobile--open': mobileMenuOpen }"
      aria-label="Mobile navigation"
    >
      <NuxtLink
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="header__nav-link--mobile"
      >
        {{ $t(item.label) }}
      </NuxtLink>

      <!-- Mobile Support CTA -->
      <NuxtLink to="/support" class="header__nav-link--mobile header__nav-link--support">
        {{ $t('nav.supportTheJourney') }}
      </NuxtLink>

      <!-- Mobile utilities -->
      <div class="header__mobile-utilities">
        <ClientOnly>
          <SensoryModeToggle />
          <template #fallback>
            <span class="motion-toggle-placeholder">Motion: ...</span>
          </template>
        </ClientOnly>
      </div>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.header {
  border-bottom: $border-width solid $warm-black;
  padding: $space-4 0;
  background: $cream;

  // Sticky on all screen sizes
  position: sticky;
  top: 0;
  z-index: $z-sticky;
  // GPU acceleration - prevents scroll jitter on mobile
  transform: translateZ(0);

  // Elements
  &__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__left {
    display: flex;
    align-items: center;
    gap: $space-4;

    @media (max-width: $breakpoint-md) {
      flex-direction: column;
      align-items: flex-start;
      gap: $space-1;
    }
  }

  &__logo {
    font-size: $text-sm;
    letter-spacing: $tracking-wider;
    text-transform: uppercase;
    text-decoration: none;
    color: $warm-black;
    font-weight: 600;

    &:hover {
      color: $terracotta-700;
    }
  }

  &__tagline {
    font-family: $font-serif;
    font-style: italic;
    font-size: $text-sm;
    color: $terracotta-700;

    @media (max-width: $breakpoint-lg) {
      display: none;
    }
  }

  &__right {
    display: flex;
    align-items: center;
    gap: $space-6;

    @media (max-width: $breakpoint-lg) {
      display: none;
    }
  }

  &__nav {
    display: flex;
    gap: $space-6;
  }

  &__nav-link {
    font-size: $text-sm;
    text-decoration: none;
    color: $warm-black;
    letter-spacing: $tracking-wide;
    padding: $space-2 0;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 1px;
      background: $terracotta;
      transition: width 0.2s ease;
    }

    &:hover::after,
    &.router-link-active::after {
      width: 100%;
    }

    &.router-link-active {
      color: $terracotta-700;
    }

    // Modifier: mobile nav link
    &--mobile {
      font-size: $text-base;
      text-decoration: none;
      color: $warm-black;
      padding: $space-3 0;
      border-bottom: $border-width solid rgba($warm-black, 0.1);

      &:hover,
      &.router-link-active {
        color: $terracotta-700;
      }
    }

    // Modifier: support link in mobile nav
    &--support {
      margin-top: $space-2;
      padding: $space-3 $space-4;
      background: $terracotta-700;
      color: $cream;
      text-align: center;
      font-family: $font-mono;
      font-size: $text-sm;
      letter-spacing: $tracking-wide;
      text-transform: uppercase;
      border: none;

      &:hover,
      &.router-link-active {
        color: $cream;
        background: $terracotta-800;
      }
    }
  }

  &__support-btn {
    display: inline-flex;
    align-items: center;
    padding: $space-2 $space-4;
    background: $terracotta-700;
    color: $cream;
    font-family: $font-mono;
    font-size: $text-sm;
    letter-spacing: $tracking-wide;
    text-transform: uppercase;
    text-decoration: none;
    border: 2px solid $terracotta-700;
    transition: all 0.2s ease;

    &:hover {
      background: $terracotta-800;
      border-color: $terracotta-800;
      transform: translateY(-1px);
    }

    &.router-link-active {
      background: $terracotta-800;
      border-color: $terracotta-800;
    }
  }

  &__utilities {
    display: flex;
    align-items: center;
    gap: $space-3;
    padding-left: $space-4;
    border-left: $border-width solid $earth-200;
  }

  &__menu-btn {
    display: none;
    background: none;
    border: none;
    padding: $space-3;
    min-width: 44px;
    min-height: 44px;
    cursor: pointer;

    @media (max-width: $breakpoint-lg) {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &__hamburger {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 24px;

    span {
      display: block;
      height: 2px;
      background: $warm-black;
      transition: transform 0.2s ease, opacity 0.2s ease;
    }

    // Modifier: open state
    &--open {
      span:nth-child(1) {
        transform: translateY(6px) rotate(45deg);
      }
      span:nth-child(2) {
        opacity: 0;
      }
      span:nth-child(3) {
        transform: translateY(-6px) rotate(-45deg);
      }
    }
  }

  &__nav-mobile {
    display: none;
    flex-direction: column;
    padding: $space-4 $space-6;
    border-top: $border-width solid rgba($warm-black, 0.1);
    margin-top: $space-4;

    // Modifier: open state
    &--open {
      @media (max-width: $breakpoint-lg) {
        display: flex;
      }
    }
  }

  &__mobile-utilities {
    padding-top: $space-4;
    margin-top: $space-2;
    border-top: $border-width solid rgba($warm-black, 0.1);
  }
}

// Placeholder for motion toggle during SSR/hydration
.motion-toggle-placeholder {
  display: flex;
  align-items: center;
  font-family: $font-mono;
  font-size: $text-sm;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  color: $earth-600;
  padding: $space-1 $space-2;
}
</style>
