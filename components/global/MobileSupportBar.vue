<script setup lang="ts">
// Sticky mobile CTA bar that appears after scrolling
// Shows funding progress and a support button
const { formattedFunded, progress } = useFundraising()
const route = useRoute()

const MOBILE_BREAKPOINT = 480
const isVisible = ref(false)
const isMobile = ref(false)

// Don't show on support page - user is already there
const isOnSupportPage = computed(() => route.path === '/support')

const checkMobile = () => {
  isMobile.value = window.innerWidth <= MOBILE_BREAKPOINT
}

const handleScroll = () => {
  if (isOnSupportPage.value || !isMobile.value) {
    isVisible.value = false
    return
  }
  // Show after scrolling past 100% of viewport height
  isVisible.value = window.scrollY > window.innerHeight
}

onMounted(() => {
  checkMobile()
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', checkMobile, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', checkMobile)
})

// Watch route changes to hide on support page
watch(() => route.path, () => {
  handleScroll()
})
</script>

<template>
  <Transition name="slide-up">
    <div v-if="isMobile && isVisible && !isOnSupportPage" class="mobile-support-bar">
      <div class="mobile-support-bar__progress">
        <span class="mobile-support-bar__funded">{{ formattedFunded }} km</span>
        <div class="mobile-support-bar__bar">
          <div
            class="mobile-support-bar__fill"
            :style="{ width: `${Math.max(progress, 3)}%` }"
          ></div>
        </div>
      </div>
      <NuxtLink to="/support" class="mobile-support-bar__btn">
        Support
      </NuxtLink>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

.mobile-support-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: $space-4;
  padding: $space-3 $space-4;
  background: $warm-black;
  z-index: $z-fixed;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.15);

  // Safe area for notched devices
  padding-bottom: max($space-3, env(safe-area-inset-bottom));
}

.mobile-support-bar__progress {
  flex: 1;
  min-width: 0;
}

.mobile-support-bar__funded {
  display: block;
  font-family: $font-mono;
  font-size: $text-xs;
  color: $terracotta-300;
  letter-spacing: $tracking-wide;
  margin-bottom: $space-1;
}

.mobile-support-bar__bar {
  height: 4px;
  background: rgba($cream, 0.2);
  border-radius: 2px;
  overflow: hidden;
}

.mobile-support-bar__fill {
  height: 100%;
  background: linear-gradient(90deg, $terracotta-700, $terracotta-500);
  border-radius: 2px;
  transition: width 0.5s ease;
}

.mobile-support-bar__btn {
  flex-shrink: 0;
  padding: $space-2 $space-5;
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
  }
}

// Slide up transition
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
