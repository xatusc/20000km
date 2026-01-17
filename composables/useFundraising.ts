/**
 * Fundraising data composable
 * Fetches and manages fundraising progress data
 */

interface FundraisingData {
  fundedKm: number
  totalKm: number
}

const DEFAULT_DATA_URL = 'https://gist.githubusercontent.com/xatusc/c0f8cb44d773b6b06ac4cda016feb759/raw/fundraising-data.json'
const CACHE_KEY = 'fundraising_data'
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export function useFundraising(dataUrl: string = DEFAULT_DATA_URL) {
  const fundedKm = ref(0)
  const totalKm = ref(20000)
  const isLoading = ref(true)
  const error = ref<Error | null>(null)

  const formattedFunded = computed(() => fundedKm.value.toLocaleString())
  const formattedTotal = computed(() => totalKm.value.toLocaleString())
  const progress = computed(() => Math.min((fundedKm.value / totalKm.value) * 100, 100))
  const displayProgress = computed(() => Math.max(progress.value, 1)) // Minimum 1% for visibility

  const loadFromCache = (): FundraisingData | null => {
    if (import.meta.server) return null

    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) {
        const { data, timestamp } = JSON.parse(cached)
        if (Date.now() - timestamp < CACHE_DURATION) {
          return data
        }
      }
    } catch {
      // Cache read failed, proceed with fetch
    }
    return null
  }

  const saveToCache = (data: FundraisingData) => {
    if (import.meta.server) return

    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        data,
        timestamp: Date.now()
      }))
    } catch {
      // Cache write failed, ignore
    }
  }

  const fetchData = async () => {
    isLoading.value = true
    error.value = null

    // Try cache first
    const cached = loadFromCache()
    if (cached) {
      fundedKm.value = cached.fundedKm
      totalKm.value = cached.totalKm
      isLoading.value = false
      return
    }

    try {
      const response = await fetch(dataUrl)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data: FundraisingData = await response.json()

      fundedKm.value = data.fundedKm
      totalKm.value = data.totalKm

      saveToCache(data)
    } catch (e) {
      error.value = e instanceof Error ? e : new Error('Failed to fetch fundraising data')
      console.error('Error loading fundraising data:', e)

      // Use defaults on error
      fundedKm.value = 0
      totalKm.value = 20000
    } finally {
      isLoading.value = false
    }
  }

  const refresh = () => {
    // Clear cache and refetch
    if (!import.meta.server) {
      localStorage.removeItem(CACHE_KEY)
    }
    return fetchData()
  }

  // Fetch on mount
  onMounted(() => {
    fetchData()
  })

  return {
    fundedKm: readonly(fundedKm),
    totalKm: readonly(totalKm),
    formattedFunded,
    formattedTotal,
    progress,
    displayProgress,
    isLoading: readonly(isLoading),
    error: readonly(error),
    refresh,
  }
}
