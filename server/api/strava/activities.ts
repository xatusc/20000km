import { defineEventHandler, getQuery } from 'h3'

interface StravaClubActivity {
  athlete: {
    firstname: string
    lastname: string
  }
  name: string
  distance: number
  moving_time: number
  elapsed_time: number
  total_elevation_gain: number
  type: string
}

interface ActivityResponse {
  athleteName: string
  name: string
  distance: number // in meters
  distanceKm: string // formatted
  movingTime: number // in seconds
  movingTimeFormatted: string
  elevationGain: number
  type: string
}

interface ActivitiesResponse {
  activities: ActivityResponse[]
  totalCount: number
  totalDistanceKm: number
  totalElevationGain: number
  totalMovingTimeSeconds: number
  totalMovingTimeFormatted: string
}

// Cache for activities data (15 minute TTL)
let cachedActivities: ActivitiesResponse | null = null
let cacheTimestamp = 0
const CACHE_TTL = 15 * 60 * 1000 // 15 minutes

function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`
}

function formatDistance(meters: number): string {
  const km = meters / 1000
  return km >= 10 ? km.toFixed(1) : km.toFixed(2)
}

export default defineEventHandler(async (event): Promise<ActivitiesResponse> => {
  const config = useRuntimeConfig()
  const clubId = config.public.stravaClubId
  const accessToken = config.stravaAccessToken

  const query = getQuery(event)
  const limit = Math.min(parseInt(query.limit as string) || 10, 30) // Max 30 activities

  // Return cached data if still valid
  if (cachedActivities && Date.now() - cacheTimestamp < CACHE_TTL) {
    return {
      ...cachedActivities,
      activities: cachedActivities.activities.slice(0, limit)
    }
  }

  // If no access token, return empty data
  if (!accessToken || accessToken === 'your_access_token_here') {
    console.error('Strava API error: No valid access token')
    return {
      activities: [],
      totalCount: 0,
      totalDistanceKm: 0,
      totalElevationGain: 0,
      totalMovingTimeSeconds: 0,
      totalMovingTimeFormatted: '0:00'
    }
  }

  try {
    const response = await fetch(
      `https://www.strava.com/api/v3/clubs/${clubId}/activities?per_page=30`,
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
        activities: [],
        totalCount: 0,
        totalDistanceKm: 0,
        totalElevationGain: 0,
        totalMovingTimeSeconds: 0,
        totalMovingTimeFormatted: '0:00'
      }
    }

    const activities: StravaClubActivity[] = await response.json()

    // Transform activities
    const transformedActivities: ActivityResponse[] = activities.map(act => ({
      athleteName: `${act.athlete.firstname} ${act.athlete.lastname.charAt(0)}.`,
      name: act.name,
      distance: act.distance,
      distanceKm: formatDistance(act.distance),
      movingTime: act.moving_time,
      movingTimeFormatted: formatTime(act.moving_time),
      elevationGain: act.total_elevation_gain,
      type: act.type || 'Run'
    }))

    // Calculate stats
    const totalDistance = activities.reduce((sum, act) => sum + act.distance, 0)
    const totalElevation = activities.reduce((sum, act) => sum + act.total_elevation_gain, 0)
    const totalMovingTime = activities.reduce((sum, act) => sum + act.moving_time, 0)

    cachedActivities = {
      activities: transformedActivities,
      totalCount: activities.length,
      totalDistanceKm: Math.round(totalDistance / 1000),
      totalElevationGain: Math.round(totalElevation),
      totalMovingTimeSeconds: totalMovingTime,
      totalMovingTimeFormatted: formatTime(totalMovingTime)
    }
    cacheTimestamp = Date.now()

    return {
      ...cachedActivities,
      activities: cachedActivities.activities.slice(0, limit)
    }
  } catch (error: any) {
    console.error('Strava API error:', error)
    return {
      activities: [],
      totalCount: 0,
      totalDistanceKm: 0,
      totalElevationGain: 0,
      totalMovingTimeSeconds: 0,
      totalMovingTimeFormatted: '0:00'
    }
  }
})
