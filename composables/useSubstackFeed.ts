/**
 * Composable to fetch and cache Substack RSS feed
 * Auto-updates when page loads, caches for 30 minutes
 */

interface SubstackPost {
  title: string
  link: string
  pubDate: string
  description: string
  formattedDate: string
}

interface SubstackFeed {
  posts: SubstackPost[]
  isLoading: boolean
  error: string | null
}

const SUBSTACK_URL = 'https://whereisriax.substack.com'
const RSS_TO_JSON_API = 'https://api.rss2json.com/v1/api.json'
const CACHE_KEY = '20000km_substack_feed'
const CACHE_DURATION = 30 * 60 * 1000 // 30 minutes

export const useSubstackFeed = () => {
  const posts = ref<SubstackPost[]>([])
  const isLoading = ref(true)
  const error = ref<string | null>(null)

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const stripHtml = (html: string): string => {
    return html.replace(/<[^>]*>/g, '').substring(0, 150) + '...'
  }

  const fetchFeed = async () => {
    // Check cache first
    if (import.meta.client) {
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) {
        try {
          const { data, timestamp } = JSON.parse(cached)
          if (Date.now() - timestamp < CACHE_DURATION) {
            posts.value = data
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
        `${RSS_TO_JSON_API}?rss_url=${encodeURIComponent(SUBSTACK_URL + '/feed')}`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch feed')
      }

      const data = await response.json()

      if (data.status === 'ok' && data.items) {
        posts.value = data.items.slice(0, 3).map((item: any) => ({
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
          description: stripHtml(item.description || item.content || ''),
          formattedDate: formatDate(item.pubDate)
        }))

        // Cache the results
        if (import.meta.client) {
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            data: posts.value,
            timestamp: Date.now()
          }))
        }
      }
    } catch (e) {
      error.value = 'Unable to load posts'
      console.error('Substack feed error:', e)
    } finally {
      isLoading.value = false
    }
  }

  // Fetch on mount
  onMounted(() => {
    fetchFeed()
  })

  return {
    posts,
    isLoading,
    error,
    substackUrl: SUBSTACK_URL
  }
}
