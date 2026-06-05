import AsyncStorage from '@react-native-async-storage/async-storage'
import config from '../config'

const BASE_URL = 'https://v3.football.api-sports.io'

// Premier League is league ID 39. Season is the starting year,
// so the 2025/26 season is 2025.
const LEAGUE_ID = 39
const SEASON = 2025

// Cache settings — we store fixtures locally so reopening the app
// doesn't burn an API request. We only refetch if the cache is older
// than 6 hours.
const CACHE_KEY = 'cachedFixtures'
const CACHE_TIME_KEY = 'cachedFixturesTime'
const CACHE_MAX_AGE = 1000 * 60 * 60 * 6 // 6 hours in milliseconds

export async function getUpcomingFixtures() {
  // 1. Try the cache first
  try {
    const cached = await AsyncStorage.getItem(CACHE_KEY)
    const cachedTime = await AsyncStorage.getItem(CACHE_TIME_KEY)

    if (cached && cachedTime) {
      const age = Date.now() - parseInt(cachedTime)
      if (age < CACHE_MAX_AGE) {
        return { fixtures: JSON.parse(cached), fromCache: true }
      }
    }
  } catch (e) {
    // If reading the cache fails, just carry on and fetch fresh
  }

  // 2. No fresh cache — fetch from the API
  const url = `${BASE_URL}/fixtures?league=${LEAGUE_ID}&season=${SEASON}&next=10`

  const response = await fetch(url, {
    headers: {
      'x-apisports-key': config.footballApiKey,
    },
  })

  if (!response.ok) {
    throw new Error('Network request failed')
  }

  const data = await response.json()

  // API-Football reports problems inside an "errors" field, not as an HTTP error
  if (data.errors && Object.keys(data.errors).length > 0) {
    throw new Error(JSON.stringify(data.errors))
  }

  const fixtures = data.response.map(transformFixture)

  // 3. Save the fresh results to the cache
  try {
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(fixtures))
    await AsyncStorage.setItem(CACHE_TIME_KEY, Date.now().toString())
  } catch (e) {
    // If saving fails it's not fatal — we still return the data
  }

  return { fixtures, fromCache: false }
}

// Turn the big raw API object into the small shape our screen needs
function transformFixture(item) {
  return {
    id: String(item.fixture.id),
    homeTeam: item.teams.home.name,
    awayTeam: item.teams.away.name,
    homeLogo: item.teams.home.logo,
    awayLogo: item.teams.away.logo,
    competition: item.league.name,
    kickoff: formatKickoff(item.fixture.date),
  }
}

// Format the ISO date string into something readable like "Sat Jun 7 · 3:00 PM"
function formatKickoff(isoDate) {
  const d = new Date(isoDate)
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  let hours = d.getHours()
  const minutes = d.getMinutes().toString().padStart(2, '0')
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  if (hours === 0) hours = 12

  return `${days[d.getDay()]} ${months[d.getMonth()]} ${d.getDate()} · ${hours}:${minutes} ${ampm}`
}