<script setup lang="ts">
// Footer component with contact and social links
</script>

<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div class="contact">
        {{ $t('footer.contact') }}
        <a :href="`mailto:${$t('footer.email')}`" class="email">
          {{ $t('footer.email') }}
        </a>
      </div>
      <div class="social-links">
        <a
          href="https://instagram.com/whereisriax"
          class="social-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
        <a
          href="https://strava.app.link/B5t6CElN7Yb"
          class="social-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Strava
        </a>
        <a
          href="https://substack.com/@whereisriax"
          class="social-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Substack
        </a>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  padding: $space-12 0;
  border-top: $border-width solid $warm-black;
}

.footer-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: $space-8;

  @media (max-width: $breakpoint-md) {
    flex-direction: column;
    text-align: center;
  }
}

.contact {
  font-size: $text-sm;
}

.email {
  color: $terracotta-700;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
</style>
