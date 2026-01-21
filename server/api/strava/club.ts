import { defineEventHandler, createError } from 'h3'

interface StravaClub {
  id: number
  name: string
  profile_medium: string
  cover_photo: string
  description: string
  city: string
  state: string
  country: string
  member_count: number
  sport_type: string
  url: string
}

interface ClubResponse {
  id: number
  name: string
  description: string
  memberCount: number
  city: string
  country: string
  profileImage: string
  coverImage: string
  stravaUrl: string
}

// Cache for club data (5 minute TTL)
let cachedClub: ClubResponse | null = null
let cacheTimestamp = 0
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

export default defineEventHandler(async (): Promise<ClubResponse> => {
  const config = useRuntimeConfig()
  const clubId = config.public.stravaClubId
  const accessToken = config.stravaAccessToken

  // Return cached data if still valid
  if (cachedClub && Date.now() - cacheTimestamp < CACHE_TTL) {
    return cachedClub
  }

  // If no access token, return mock data for development
  if (!accessToken || accessToken === 'your_access_token_here') {
    return {
      id: parseInt(clubId),
      name: '20,000KM Planetary Run Club',
      description: 'A global community of runners following Ria\'s 20,000km journey from Vladivostok to Lisbon.',
      memberCount: 147,
      city: 'Global',
      country: 'Worldwide',
      profileImage: '/images/run-club-profile.webp',
      coverImage: '/images/Ria_team_horizontal.webp',
      stravaUrl: `https://www.strava.com/clubs/${clubId}`
    }
  }

  try {
    const response = await fetch(
      `https://www.strava.com/api/v3/clubs/${clubId}`,
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
        message: 'Failed to fetch club data from Strava'
      })
    }

    const club: StravaClub = await response.json()

    // Transform to our response format
    cachedClub = {
      id: club.id,
      name: club.name,
      description: club.description || '',
      memberCount: club.member_count,
      city: club.city || '',
      country: club.country || '',
      profileImage: club.profile_medium || '',
      coverImage: club.cover_photo || '',
      stravaUrl: `https://www.strava.com/clubs/${club.url || clubId}`
    }
    cacheTimestamp = Date.now()

    return cachedClub
  } catch (error: any) {
    // If fetch fails, return mock data as fallback
    if (error.statusCode) throw error

    console.error('Strava API error:', error)
    return {
      id: parseInt(clubId),
      name: '20,000KM Planetary Run Club',
      description: 'A global community of runners following Ria\'s 20,000km journey from Vladivostok to Lisbon.',
      memberCount: 147,
      city: 'Global',
      country: 'Worldwide',
      profileImage: '/images/run-club-profile.webp',
      coverImage: '/images/Ria_team_horizontal.webp',
      stravaUrl: `https://www.strava.com/clubs/${clubId}`
    }
  }
})
