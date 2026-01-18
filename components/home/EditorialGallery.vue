<script setup lang="ts">
// Editorial photo gallery - asymmetrical layout with dramatic imagery
// Uses previously unused images for visual impact
</script>

<template>
  <section class="editorial-gallery">
    <div class="editorial-gallery__grid">
      <!-- Large feature image - dramatic low angle -->
      <figure class="editorial-gallery__item editorial-gallery__item--large">
        <img
          src="/images/Ria_horizontal_fullbody_lowangle.webp"
          alt="Ria running at full stride, captured from a dramatic low angle against an expansive sky"
          loading="lazy"
        >
        <figcaption class="editorial-gallery__caption">
          <span class="editorial-gallery__location">Training, 2025</span>
        </figcaption>
      </figure>

      <!-- Stacked smaller images -->
      <div class="editorial-gallery__stack">
        <figure class="editorial-gallery__item editorial-gallery__item--stacked">
          <img
            src="/images/Ria_truck.webp"
            alt="Ria with the support vehicle, preparing for a day on the road"
            loading="lazy"
          >
          <figcaption class="editorial-gallery__caption">
            <span class="editorial-gallery__location">Support Vehicle</span>
          </figcaption>
        </figure>

        <figure class="editorial-gallery__item editorial-gallery__item--stacked">
          <img
            src="/images/Ria_teamrun_horizontal.webp"
            alt="Ria running alongside her support crew during an expedition"
            loading="lazy"
          >
          <figcaption class="editorial-gallery__caption">
            <span class="editorial-gallery__location">Support Crew</span>
          </figcaption>
        </figure>
      </div>
    </div>

    <!-- Editorial text overlay -->
    <div class="editorial-gallery__text">
      <span class="editorial-gallery__eyebrow">The Preparation</span>
      <p class="editorial-gallery__quote">
        Two years of training. Thousands of kilometers already run.
        Now the real journey begins.
      </p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

.editorial-gallery {
  position: relative;
  padding: $space-16 0;
  background: $sand-100;
  // Full-width bleed
  width: 100vw;
  margin-left: calc(-50vw + 50%);
}

.editorial-gallery__grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: $space-6;
  max-width: $max-width-content;
  margin: 0 auto;
  padding: 0 $space-8;

  @media (max-width: $breakpoint-lg) {
    grid-template-columns: 1fr;
    gap: $space-4;
    padding: 0 $space-4;
  }
}

.editorial-gallery__item {
  position: relative;
  margin: 0;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: 3px solid $warm-black;
    transition: transform 0.5s ease;
  }

  &:hover img {
    transform: scale(1.02);
  }
}

.editorial-gallery__item--large {
  img {
    height: 500px;

    @media (max-width: $breakpoint-lg) {
      height: 350px;
    }

    @media (max-width: $breakpoint-md) {
      height: 280px;
    }
  }
}

.editorial-gallery__stack {
  display: flex;
  flex-direction: column;
  gap: $space-6;

  @media (max-width: $breakpoint-lg) {
    flex-direction: row;
    gap: $space-4;
  }
}

.editorial-gallery__item--stacked {
  flex: 1;

  img {
    height: 237px;

    @media (max-width: $breakpoint-lg) {
      height: 200px;
    }

    @media (max-width: $breakpoint-md) {
      height: 160px;
    }
  }
}

.editorial-gallery__caption {
  position: absolute;
  bottom: $space-4;
  left: $space-4;
  padding: $space-2 $space-3;
  background: $warm-black;
}

.editorial-gallery__location {
  font-family: $font-mono;
  font-size: $text-xs;
  letter-spacing: $tracking-widest;
  text-transform: uppercase;
  color: $cream;
}

.editorial-gallery__text {
  max-width: $max-width-content;
  margin: $space-10 auto 0;
  padding: 0 $space-8;
  text-align: center;

  @media (max-width: $breakpoint-md) {
    padding: 0 $space-4;
    margin-top: $space-8;
  }
}

.editorial-gallery__eyebrow {
  display: block;
  font-family: $font-serif;
  font-style: italic;
  font-size: $text-lg;
  color: $terracotta;
  margin-bottom: $space-3;
}

.editorial-gallery__quote {
  font-family: $font-serif;
  font-size: clamp($text-xl, 3vw, $text-2xl);
  line-height: $leading-relaxed;
  color: $earth-700;
  max-width: 600px;
  margin: 0 auto;
}
</style>
