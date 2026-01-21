import { defineEventHandler, createError } from 'h3'

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

  // If no access token, return mock data for development
  if (!accessToken || accessToken === 'your_access_token_here') {
    const now = new Date()
    return {
      upcoming: [
        {
          id: 1,
          title: 'Saturday Morning Group Run',
          description: 'Join us for our weekly long run through the park.',
          activityType: 'Run',
          startDate: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          startDateLocal: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          address: 'Central Park, New York',
          stravaUrl: `https://www.strava.com/clubs/${clubId}/group_events`,
          isPast: false
        },
        {
          id: 2,
          title: 'Midweek Recovery Run',
          description: 'Easy-paced recovery run. All levels welcome.',
          activityType: 'Run',
          startDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(),
          startDateLocal: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(),
          address: 'Riverside Trail',
          stravaUrl: `https://www.strava.com/clubs/${clubId}/group_events`,
          isPast: false
        }
      ],
      past: [
        {
          id: 3,
          title: 'New Year Kickoff Run',
          description: 'Starting the year strong with a community run.',
          activityType: 'Run',
          startDate: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          startDateLocal: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          address: 'Downtown Loop',
          stravaUrl: `https://www.strava.com/clubs/${clubId}/group_events`,
          isPast: true
        }
      ]
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

    if (!response.ok) {
      if (response.status === 401) {
        throw createError({
          statusCode: 401,
          message: 'Strava access token expired or invalid'
        })
      }
      throw createError({
        statusCode: response.status,
        message: 'Failed to fetch events from Strava'
      })
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
    if (error.statusCode) throw error

    console.error('Strava API error:', error)
    // Return empty arrays as fallback
    return {
      upcoming: [],
      past: []
    }
  }
})
