import { defineEventHandler } from 'h3'

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

  // If no access token, return empty data
  if (!accessToken || accessToken === 'your_access_token_here') {
    console.error('Strava API error: No valid access token')
    return {
      id: 0,
      name: '',
      description: '',
      memberCount: 0,
      city: '',
      country: '',
      profileImage: '',
      coverImage: '',
      stravaUrl: ''
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

    // Return empty response for any API failure (auth or otherwise)
    if (!response.ok) {
      console.error('Strava API error: HTTP', response.status)
      return {
        id: 0,
        name: '',
        description: '',
        memberCount: 0,
        city: '',
        country: '',
        profileImage: '',
        coverImage: '',
        stravaUrl: ''
      }
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
    console.error('Strava API error:', error)
    return {
      id: 0,
      name: '',
      description: '',
      memberCount: 0,
      city: '',
      country: '',
      profileImage: '',
      coverImage: '',
      stravaUrl: ''
    }
  }
})
