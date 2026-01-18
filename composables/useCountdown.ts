/**
 * Countdown timer composable
 * Calculates time remaining until a target date
 */
export function useCountdown(targetDate: string | Date) {
  const target = new Date(targetDate).getTime()

  const days = ref(0)
  const hours = ref(0)
  const minutes = ref(0)
  const seconds = ref(0)
  const isComplete = ref(false)

  const update = () => {
    const now = Date.now()
    const distance = target - now

    if (distance <= 0) {
      isComplete.value = true
      days.value = 0
      hours.value = 0
      minutes.value = 0
      seconds.value = 0
      return
    }

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
    isComplete: readonly(isComplete),
    formatted,
  }
}
