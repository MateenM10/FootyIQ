import AsyncStorage from '@react-native-async-storage/async-storage'
import config from '../config'

const BASE_URL = 'https://v3.football.api-sports.io'

const LEAGUE_ID = 39
const SEASON = 2024

const CACHE_MAX_AGE = 1000 * 60 * 60 * 6

const FIXTURES_CACHE_KEY = 'cachedFixtures'
const FIXTURES_TIME_KEY = 'cachedFixturesTime'
const STANDINGS_CACHE_KEY = 'cachedStandings'
const STANDINGS_TIME_KEY = 'cachedStandingsTime'

export async function getUpcomingFixtures(forceRefresh = false) {
  if (!forceRefresh) {
    try {
      const cached = await AsyncStorage.getItem(FIXTURES_CACHE_KEY)
      const cachedTime = await AsyncStorage.getItem(FIXTURES_TIME_KEY)
      if (cached && cachedTime) {
        const age = Date.now() - parseInt(cachedTime)
        if (age < CACHE_MAX_AGE) {
          return { fixtures: JSON.parse(cached), fromCache: true }
        }
      }
    } catch (e) {
      // ignore cache errors
    }
  }

  const url = `${BASE_URL}/fixtures?league=${LEAGUE_ID}&season=${SEASON}`
  const response = await fetch(url, {
    headers: { 'x-apisports-key': config.footballApiKey },
  })

  if (!response.ok) throw new Error('HTTP status ' + response.status)

  const data = await response.json()
  if (data.errors && Object.keys(data.errors).length > 0) {
    throw new Error(JSON.stringify(data.errors))
  }

  const finished = data.response.filter(item => item.fixture.status.short === 'FT')
  finished.sort((a, b) => new Date(b.fixture.date) - new Date(a.fixture.date))
  const fixtures = finished.slice(0, 10).map(transformFixture)

  try {
    await AsyncStorage.setItem(FIXTURES_CACHE_KEY, JSON.stringify(fixtures))
    await AsyncStorage.setItem(FIXTURES_TIME_KEY, Date.now().toString())
  } catch (e) {
    // ignore
  }

  return { fixtures, fromCache: false }
}

export async function getStandings(forceRefresh = false) {
  if (!forceRefresh) {
    try {
      const cached = await AsyncStorage.getItem(STANDINGS_CACHE_KEY)
      const cachedTime = await AsyncStorage.getItem(STANDINGS_TIME_KEY)
      if (cached && cachedTime) {
        const age = Date.now() - parseInt(cachedTime)
        if (age < CACHE_MAX_AGE) {
          return { standings: JSON.parse(cached), fromCache: true }
        }
      }
    } catch (e) {
      // ignore cache errors
    }
  }

  const url = `${BASE_URL}/standings?league=${LEAGUE_ID}&season=${SEASON}`
  const response = await fetch(url, {
    headers: { 'x-apisports-key': config.footballApiKey },
  })

  if (!response.ok) throw new Error('HTTP status ' + response.status)

  const data = await response.json()
  if (data.errors && Object.keys(data.errors).length > 0) {
    throw new Error(JSON.stringify(data.errors))
  }

  if (!data.response || data.response.length === 0) {
    throw new Error('No standings returned')
  }

  // The table is nested deep inside the response
  const table = data.response[0].league.standings[0].map(transformStanding)

  try {
    await AsyncStorage.setItem(STANDINGS_CACHE_KEY, JSON.stringify(table))
    await AsyncStorage.setItem(STANDINGS_TIME_KEY, Date.now().toString())
  } catch (e) {
    // ignore
  }

  return { standings: table, fromCache: false }
}

function transformFixture(item) {
  const homeGoals = item.goals.home
  const awayGoals = item.goals.away

  return {
    id: String(item.fixture.id),
    homeTeam: item.teams.home.name,
    awayTeam: item.teams.away.name,
    homeLogo: item.teams.home.logo,
    awayLogo: item.teams.away.logo,
    competition: item.league.name,
    kickoff: formatKickoff(item.fixture.date),
    status: item.fixture.status.short,
    score: homeGoals !== null && awayGoals !== null
      ? homeGoals + ' - ' + awayGoals
      : null,
    homeWin: item.teams.home.winner === true,
    awayWin: item.teams.away.winner === true,
  }
}

function transformStanding(item) {
  return {
    rank: item.rank,
    teamName: item.team.name,
    logo: item.team.logo,
    played: item.all.played,
    goalsDiff: item.goalsDiff,
    points: item.points,
  }
}

function formatKickoff(isoDate) {
  const d = new Date(isoDate)
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${days[d.getDay()]} ${months[d.getMonth()]} ${d.getDate()}`
}