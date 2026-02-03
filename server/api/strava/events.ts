import { defineEventHandler } from 'h3'

interface StravaEvent {
  id: number
  title: string
  description: string
  activity_type: string
  start_date: string
  start_date_local: string
  created_at: string
  route_id: number | null
  address: string
  private: boolean
  club_id: number
}

interface EventResponse {
  id: number
  title: string
  description: string
  activityType: string
  startDate: string
  startDateLocal: string
  address: string
  stravaUrl: string
  isPast: boolean
}

interface EventsResponse {
  upcoming: EventResponse[]
  past: EventResponse[]
}

// Cache for events data (10 minute TTL)
let cachedEvents: EventsResponse | null = null
let cacheTimestamp = 0
const CACHE_TTL = 10 * 60 * 1000 // 10 minutes

export default defineEventHandler(async (event): Promise<EventsResponse> => {
  const config = useRuntimeConfig()
  const clubId = config.public.stravaClubId
  const accessToken = config.stravaAccessToken

  // Return cached data if still valid
  if (cachedEvents && Date.now() - cacheTimestamp < CACHE_TTL) {
    return cachedEvents
  }

  // If no access token, return empty data
  if (!accessToken || accessToken === 'your_access_token_here') {
    console.error('Strava API error: No valid access token')
    return {
      upcoming: [],
      past: []
    }
  }

  try {
    const response = await fetch(
      `https://www.strava.com/api/v3/clubs/${clubId}/group_events`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    )

    // Return empty response for any API failure (auth or otherwise)
    if (!response.ok) {
      console.error('Strava API error: HTTP', response.status)
      return {
        upcoming: [],
        past: []
      }
    }

    const events: StravaEvent[] = await response.json()
    const now = new Date()

    // Transform and categorize events
    const transformedEvents: EventResponse[] = events.map(evt => ({
      id: evt.id,
      title: evt.title,
      description: evt.description || '',
      activityType: evt.activity_type || 'Run',
      startDate: evt.start_date,
      startDateLocal: evt.start_date_local,
      address: evt.address || '',
      stravaUrl: `https://www.strava.com/clubs/${clubId}/group_events/${evt.id}`,
      isPast: new Date(evt.start_date) < now
    }))

    cachedEvents = {
      upcoming: transformedEvents.filter(e => !e.isPast).sort((a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      ),
      past: transformedEvents.filter(e => e.isPast).sort((a, b) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      )
    }
    cacheTimestamp = Date.now()

    return cachedEvents
  } catch (error: any) {
    console.error('Strava API error:', error)
    return {
      upcoming: [],
      past: []
    }
  }
})
