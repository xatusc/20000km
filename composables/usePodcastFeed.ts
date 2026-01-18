/**
 * Composable to fetch and cache podcast RSS feed
 * Auto-selects most recent episode as featured
 */

export interface PodcastEpisode {
  title: string
  description: string
  audioUrl: string
  duration: string
  pubDate: string
  formattedDate: string
  episodeNumber?: number
}

const RSS_URL = 'https://publicfeeds.net/f/5670/women-who-travel'
const RSS_TO_JSON_API = 'https://api.rss2json.com/v1/api.json'
const CACHE_KEY = '20000km_podcast_feed'
const CACHE_DURATION = 30 * 60 * 1000 // 30 minutes

export const usePodcastFeed = () => {
  const episodes = ref<PodcastEpisode[]>([])
  const isLoading = ref(true)
  const error = ref<string | null>(null)

  // Latest episode is always first (most recent)
  const latestEpisode = computed(() => episodes.value[0] || null)

  // More episodes for the horizontal scroll (skip the featured one)
  const moreEpisodes = computed(() => episodes.value.slice(1, 6))

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatDuration = (seconds: number | string): string => {
    if (typeof seconds === 'string') {
      // Already formatted like "45:23" or "1:23:45"
      if (seconds.includes(':')) return seconds
      seconds = parseInt(seconds, 10)
    }

    if (isNaN(seconds)) return ''

    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)

    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const stripHtml = (html: string): string => {
    if (!html) return ''
    return html.replace(/<[^>]*>/g, '').substring(0, 200).trim() + '...'
  }

  const fetchFeed = async () => {
    // Check cache first (client-side only)
    if (import.meta.client) {
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) {
        try {
          const { data, timestamp } = JSON.parse(cached)
          if (Date.now() - timestamp < CACHE_DURATION) {
            episodes.value = data
            isLoading.value = false
            return
          }
        } catch (e) {
          localStorage.removeItem(CACHE_KEY)
        }
      }
    }

    try {
      const response = await fetch(
        `${RSS_TO_JSON_API}?rss_url=${encodeURIComponent(RSS_URL)}`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch podcast feed')
      }

      const data = await response.json()

      if (data.status === 'ok' && data.items) {
        episodes.value = data.items.slice(0, 10).map((item: any, index: number) => ({
          title: item.title || 'Untitled Episode',
          description: stripHtml(item.description || item.content || ''),
          audioUrl: item.enclosure?.link || item.enclosure?.url || '',
          duration: formatDuration(item.enclosure?.duration || item.itunes?.duration || ''),
          pubDate: item.pubDate,
          formattedDate: formatDate(item.pubDate),
          episodeNumber: data.items.length - index
        }))

        // Cache the results (client-side only)
        if (import.meta.client) {
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            data: episodes.value,
            timestamp: Date.now()
          }))
        }
      }
    } catch (e) {
      error.value = 'Unable to load podcast'
      console.error('Podcast feed error:', e)
    } finally {
      isLoading.value = false
    }
  }

  // Fetch on mount
  onMounted(() => {
    fetchFeed()
  })

  return {
    episodes,
    latestEpisode,
    moreEpisodes,
    isLoading,
    error,
    podcastUrl: 'https://open.spotify.com/show/1T2czpHjPbzMNhnFCphQsV' // Update with your podcast URL
  }
}
