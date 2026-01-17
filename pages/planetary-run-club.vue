<script setup lang="ts">
useSeoMeta({
  title: 'Planetary Run Club | 20,000KM',
  description: 'Join the Planetary Run Club community. Run anywhere, connect everywhere.'
})
</script>

<template>
  <div class="container py-16">
    <div class="container-narrow mx-auto">
      <h1 class="font-serif text-3xl mb-4">Planetary Run Club</h1>
      <p class="tagline text-xl text-terracotta mb-12">
        Nowhere we can run to is too far,—and everyone you meet is a neighbor
      </p>

      <div class="badge mb-12">
        <p class="badge-title">Join the Movement</p>
        <p class="badge-text">Run anywhere. Connect everywhere.</p>
      </div>

      <section class="mb-12">
        <h2 class="font-serif text-2xl mb-4">What is Planetary Run Club?</h2>
        <p class="text-muted leading-relaxed mb-4">
          Planetary Run Club is a global community of runners inspired by the 20,000km journey.
          Whether you're running your first kilometer or your thousandth, you're part of something bigger.
        </p>
        <p class="text-muted leading-relaxed">
          As the run progresses, we'll be hosting virtual and in-person events along the route.
          Stay tuned for more details.
        </p>
      </section>

      <section>
        <h2 class="font-serif text-2xl mb-4">Stay Connected</h2>
        <div class="links-row">
          <a href="https://instagram.com/whereisriax" class="btn" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href="https://substack.com/@whereisriax" class="btn" target="_blank" rel="noopener noreferrer">
            Newsletter
          </a>
          <a href="https://strava.app.link/B5t6CElN7Yb" class="btn" target="_blank" rel="noopener noreferrer">
            Strava
          </a>
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

.links-row {
  display: flex;
  gap: $space-4;
  flex-wrap: wrap;
}
</style>
