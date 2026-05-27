/**
 * Countdown timer composable
 * Calculates time remaining until a target date.
 * If the target is in the past, counts UP from it (isElapsed = true).
 */
export function useCountdown(targetDate: string | Date) {
  const target = new Date(targetDate).getTime()

  const days = ref(0)
  const hours = ref(0)
  const minutes = ref(0)
  const seconds = ref(0)
  const isElapsed = ref(false)

  const update = () => {
    const now = Date.now()
    const distance = target - now

    if (distance <= 0) {
      // Target reached — count UP from it instead of zeroing.
      isElapsed.value = true
      const elapsed = Math.abs(distance)
      days.value = Math.floor(elapsed / (1000 * 60 * 60 * 24))
      hours.value = Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      minutes.value = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60))
      seconds.value = Math.floor((elapsed % (1000 * 60)) / 1000)
      return
    }

    isElapsed.value = false
    days.value = Math.floor(distance / (1000 * 60 * 60 * 24))
    hours.value = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    minutes.value = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    seconds.value = Math.floor((distance % (1000 * 60)) / 1000)
  }

  let interval: ReturnType<typeof setInterval> | null = null

  onMounted(() => {
    update()
    interval = setInterval(update, 1000)
  })

  onUnmounted(() => {
    if (interval) {
      clearInterval(interval)
    }
  })

  const formatted = computed(() => ({
    days: days.value.toString(),
    hours: hours.value.toString().padStart(2, '0'),
    minutes: minutes.value.toString().padStart(2, '0'),
    seconds: seconds.value.toString().padStart(2, '0'),
  }))

  return {
    days: readonly(days),
    hours: readonly(hours),
    minutes: readonly(minutes),
    seconds: readonly(seconds),
    // Back-compat alias — isComplete used to mean "countdown hit zero".
    isComplete: readonly(isElapsed),
    isElapsed: readonly(isElapsed),
    formatted,
  }
}
