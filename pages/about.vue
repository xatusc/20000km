<script setup lang="ts">
useSeoMeta({
  title: 'About | 20,000KM',
  description: 'Learn about Ria Xi and the 20,000km run from Vladivostok to Lisbon.'
})
</script>

<template>
  <div class="container py-16">
    <div class="grid-layout">
      <div class="content">
        <h1 class="font-serif text-3xl mb-8">About the Run</h1>

        <section class="mb-12">
          <h2 class="font-serif text-2xl mb-4">The Runner</h2>
          <p class="text-muted leading-relaxed mb-4">
            Ria Xi is a Chinese-American ultrarunner with a background in computer science.
            After experiencing burnout working in Silicon Valley, she found healing through running.
          </p>
          <p class="text-muted leading-relaxed mb-4">
            In under 12 months, she went from her first half marathon to completing a 1,000km ultramarathon.
            Her fastest known times include the Via Francigena (1,014km in 21 days) and the
            Camino de Santiago (780km in 12 days, female self-supported record).
          </p>
        </section>

        <section class="mb-12">
          <h2 class="font-serif text-2xl mb-4">The Project</h2>
          <p class="text-muted leading-relaxed mb-4">
            <strong>20,000 kilometers.</strong> From Vladivostok, Russia to Cabo da Roca, Portugal.
            Across 17+ countries. Following the ancient Silk Road.
          </p>
          <p class="text-muted leading-relaxed mb-4">
            <strong>Starting May 1st, 2026.</strong> Averaging ~50km per day for approximately 14 months.
          </p>
          <p class="text-muted leading-relaxed">
            The run will be supported by a small crew and documented for a future film.
          </p>
        </section>

        <section class="mb-12">
          <h2 class="font-serif text-2xl mb-4">The Route</h2>
          <p class="text-muted leading-relaxed mb-4">
            Vladivostok → China → Kazakhstan → Kyrgyzstan → Uzbekistan → Turkmenistan →
            Iran → Iraq → Turkey → Bulgaria → Serbia → Croatia → Slovenia → Italy →
            France → Spain → Portugal
          </p>
        </section>

        <section>
          <h2 class="font-serif text-2xl mb-4">The Themes</h2>
          <ul class="themes-list">
            <li>
              <strong>Women's Empowerment:</strong> First-of-its-kind woman-led ultra-distance continental crossing
            </li>
            <li>
              <strong>Mental Health Awareness:</strong> Rooted in Ria's journey from burnout to record-setting ultrarunner
            </li>
            <li>
              <strong>Connecting in a Dividing World:</strong> Human-speed connection across cultures
            </li>
            <li>
              <strong>Planetary Run Club:</strong> A global community turning the run into a lasting movement
            </li>
          </ul>
        </section>
      </div>

      <aside class="sidebar">
        <figure class="runner-figure">
          <picture>
            <source srcset="/Ria_flash.webp" type="image/webp">
            <img src="/Ria_flash.webp" alt="Ria running" loading="lazy">
          </picture>
        </figure>
      </aside>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

.grid-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: $space-12;
  align-items: start;

  @media (max-width: $breakpoint-xl) {
    grid-template-columns: 1fr;
  }
}

.themes-list {
  li {
    margin-bottom: $space-4;
    padding-left: $space-4;
    border-left: 2px solid $terracotta;
    color: $earth-600;

    strong {
      color: $warm-black;
    }
  }
}

.runner-figure {
  img {
    width: 100%;
    border-radius: $border-radius-md;
  }

  @media (max-width: $breakpoint-xl) {
    max-width: 400px;
    margin: 0 auto;
  }
}
</style>
