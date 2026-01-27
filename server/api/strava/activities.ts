import { defineEventHandler, createError, getQuery } from 'h3'

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

  // If no access token, return mock data for development
  if (!accessToken || accessToken === 'your_access_token_here') {
    const mockActivities: ActivityResponse[] = [
      { athleteName: 'Sarah M.', name: 'Morning Run', distance: 8200, distanceKm: '8.20', movingTime: 2732, movingTimeFormatted: '45:32', elevationGain: 45, type: 'Run' },
      { athleteName: 'John D.', name: 'Trail Adventure', distance: 12400, distanceKm: '12.40', movingTime: 4325, movingTimeFormatted: '1:12:05', elevationGain: 234, type: 'Run' },
      { athleteName: 'Ria X.', name: 'Long Run Sunday', distance: 21100, distanceKm: '21.10', movingTime: 7275, movingTimeFormatted: '2:01:15', elevationGain: 156, type: 'Run' },
      { athleteName: 'Team', name: 'Recovery Jog', distance: 5000, distanceKm: '5.00', movingTime: 1720, movingTimeFormatted: '28:40', elevationGain: 12, type: 'Run' },
      { athleteName: 'Maria K.', name: 'Tempo Run', distance: 10000, distanceKm: '10.00', movingTime: 2940, movingTimeFormatted: '49:00', elevationGain: 78, type: 'Run' },
      { athleteName: 'Alex P.', name: 'Easy Miles', distance: 6500, distanceKm: '6.50', movingTime: 2280, movingTimeFormatted: '38:00', elevationGain: 32, type: 'Run' },
      { athleteName: 'Chris T.', name: 'Hill Repeats', distance: 7800, distanceKm: '7.80', movingTime: 2880, movingTimeFormatted: '48:00', elevationGain: 189, type: 'Run' },
      { athleteName: 'Emma L.', name: 'Sunrise Run', distance: 5200, distanceKm: '5.20', movingTime: 1800, movingTimeFormatted: '30:00', elevationGain: 24, type: 'Run' },
      { athleteName: 'David R.', name: 'Fartlek Friday', distance: 8000, distanceKm: '8.00', movingTime: 2520, movingTimeFormatted: '42:00', elevationGain: 56, type: 'Run' },
      { athleteName: 'Lisa W.', name: 'Park Loop', distance: 4200, distanceKm: '4.20', movingTime: 1500, movingTimeFormatted: '25:00', elevationGain: 18, type: 'Run' }
    ]

    const mockTotalDistance = mockActivities.reduce((sum, a) => sum + a.distance, 0)
    const mockTotalElevation = mockActivities.reduce((sum, a) => sum + a.elevationGain, 0)
    const mockTotalTime = mockActivities.reduce((sum, a) => sum + a.movingTime, 0)
    return {
      activities: mockActivities.slice(0, limit),
      totalCount: mockActivities.length,
      totalDistanceKm: Math.round(mockTotalDistance / 1000),
      totalElevationGain: mockTotalElevation,
      totalMovingTimeSeconds: mockTotalTime,
      totalMovingTimeFormatted: formatTime(mockTotalTime)
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

    if (!response.ok) {
      if (response.status === 401) {
        throw createError({
          statusCode: 401,
          message: 'Strava access token expired or invalid'
        })
      }
      throw createError({
        statusCode: response.status,
        message: 'Failed to fetch activities from Strava'
      })
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
    if (error.statusCode) throw error

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
