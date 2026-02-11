/**
 * Sensory mode composable (Trauma-Informed Design)
 * Manages motion/animation preferences
 * Motion is OFF by default for safety
 */

const STORAGE_KEY = 'sensory_mode'

type SensoryMode = 'motion-allowed' | 'motion-reduced' | 'auto'

export function useSensoryMode() {
  const motionAllowed = useState<boolean>('motionAllowed', () => false)

  const applyMotionPreference = (allowed: boolean) => {
    if (import.meta.server) return

    if (allowed) {
      document.documentElement.setAttribute('data-motion-allowed', 'true')
    } else {
      document.documentElement.removeAttribute('data-motion-allowed')
    }
  }

  const initialize = () => {
    if (import.meta.server) return

    // Check for saved preference
    const saved = localStorage.getItem(STORAGE_KEY) as SensoryMode | null

    if (saved === 'motion-allowed') {
      motionAllowed.value = true
    } else if (saved === 'auto') {
      // Respect system preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      motionAllowed.value = !prefersReducedMotion
    } else {
      // Default: motion OFF (trauma-informed safe default)
      motionAllowed.value = false
    }

    applyMotionPreference(motionAllowed.value)
  }

  const toggleMotion = () => {
    motionAllowed.value = !motionAllowed.value

    if (!import.meta.server) {
      localStorage.setItem(
        STORAGE_KEY,
        motionAllowed.value ? 'motion-allowed' : 'motion-reduced'
      )
    }

    applyMotionPreference(motionAllowed.value)
  }

  const enableMotion = () => {
    motionAllowed.value = true
    if (!import.meta.server) {
      localStorage.setItem(STORAGE_KEY, 'motion-allowed')
    }
    applyMotionPreference(true)
  }

  const disableMotion = () => {
    motionAllowed.value = false
    if (!import.meta.server) {
      localStorage.setItem(STORAGE_KEY, 'motion-reduced')
    }
    applyMotionPreference(false)
  }

  const setAutoMode = () => {
    if (!import.meta.server) {
      localStorage.setItem(STORAGE_KEY, 'auto')
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      motionAllowed.value = !prefersReducedMotion
      applyMotionPreference(motionAllowed.value)
    }
  }

  // Initialize on mount
  onMounted(() => {
    initialize()
  })

  return {
    motionAllowed: readonly(motionAllowed),
    toggleMotion,
    enableMotion,
    disableMotion,
    setAutoMode,
  }
}
