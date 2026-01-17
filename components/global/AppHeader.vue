<script setup lang="ts">
// Header component with logo and navigation
const mobileMenuOpen = ref(false)

const navItems = [
  { path: '/', label: 'nav.home' },
  { path: '/live-updates', label: 'nav.liveUpdates' },
  { path: '/planetary-run-club', label: 'nav.runClub' },
  { path: '/about', label: 'nav.about' },
  { path: '/contact', label: 'nav.contact' },
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
    <div class="container header-inner">
      <div class="header-left">
        <NuxtLink to="/" class="logo">
          {{ $t('site.title') }}
        </NuxtLink>
        <span class="tagline">
          {{ $t('site.tagline') }}
        </span>
      </div>

      <!-- Desktop Navigation -->
      <nav class="nav-desktop" aria-label="Main navigation">
        <NuxtLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="nav-link"
        >
          {{ $t(item.label) }}
        </NuxtLink>
      </nav>

      <!-- Mobile Menu Button -->
      <button
        class="mobile-menu-btn"
        :aria-expanded="mobileMenuOpen"
        aria-controls="mobile-nav"
        aria-label="Toggle navigation menu"
        @click="toggleMobileMenu"
      >
        <span class="hamburger" :class="{ open: mobileMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
    </div>

    <!-- Mobile Navigation -->
    <nav
      id="mobile-nav"
      class="nav-mobile"
      :class="{ open: mobileMenuOpen }"
      aria-label="Mobile navigation"
    >
      <NuxtLink
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="nav-link-mobile"
      >
        {{ $t(item.label) }}
      </NuxtLink>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.header {
  border-bottom: $border-width solid $warm-black;
  padding: $space-4 0;
  margin-bottom: $space-12;
}

.header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
  gap: $space-4;

  @media (max-width: $breakpoint-md) {
    flex-direction: column;
    align-items: flex-start;
    gap: $space-1;
  }
}

.logo {
  font-size: $text-sm;
  letter-spacing: $tracking-wider;
  text-transform: uppercase;
  text-decoration: none;
  color: $warm-black;
  font-weight: 600;

  &:hover {
    color: $terracotta;
  }
}

.tagline {
  font-family: $font-serif;
  font-style: italic;
  font-size: $text-sm;
  color: $terracotta;

  @media (max-width: $breakpoint-lg) {
    display: none;
  }
}

// Desktop Navigation
.nav-desktop {
  display: flex;
  gap: $space-6;

  @media (max-width: $breakpoint-lg) {
    display: none;
  }
}

.nav-link {
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
    color: $terracotta;
  }
}

// Mobile Menu Button
.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  padding: $space-2;
  cursor: pointer;

  @media (max-width: $breakpoint-lg) {
    display: block;
  }
}

.hamburger {
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

  &.open {
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

// Mobile Navigation
.nav-mobile {
  display: none;
  flex-direction: column;
  padding: $space-4 0;
  border-top: $border-width solid rgba($warm-black, 0.1);
  margin-top: $space-4;

  @media (max-width: $breakpoint-lg) {
    &.open {
      display: flex;
    }
  }
}

.nav-link-mobile {
  font-size: $text-base;
  text-decoration: none;
  color: $warm-black;
  padding: $space-3 0;
  border-bottom: $border-width solid rgba($warm-black, 0.1);

  &:last-child {
    border-bottom: none;
  }

  &:hover,
  &.router-link-active {
    color: $terracotta;
  }
}
</style>
