import { generateMatchAnalysis } from '../src/services/matchAnalysis'

// NOTE: scores use the ' - ' format (space-dash-space) that the
// football API produces and that matchAnalysis.js splits on.
const makeFixture = (overrides = {}) => ({
  id: 1,
  homeTeam: 'Arsenal',
  awayTeam: 'Chelsea',
  score: '2 - 1',
  homeWin: true,
  awayWin: false,
  status: 'FT',
  competition: 'Premier League',
  kickoff: '15:00',
  homeLogo: '',
  awayLogo: '',
  ...overrides,
})

describe('generateMatchAnalysis', () => {
  it('returns null when no score is available', () => {
    expect(generateMatchAnalysis(makeFixture({ score: null }))).toBeNull()
  })

  it('returns null for a malformed score string', () => {
    expect(generateMatchAnalysis(makeFixture({ score: 'abc' }))).toBeNull()
  })

  it('returns exactly 3 insights for a finished match', () => {
    const result = generateMatchAnalysis(makeFixture())
    expect(result).toHaveLength(3)
  })

  it('each insight has string icon, heading, and body', () => {
    const result = generateMatchAnalysis(makeFixture())
    result.forEach(insight => {
      expect(typeof insight.icon).toBe('string')
      expect(typeof insight.heading).toBe('string')
      expect(typeof insight.body).toBe('string')
    })
  })

  it('identifies a home win correctly', () => {
    const result = generateMatchAnalysis(makeFixture({ score: '3 - 0', homeWin: true, awayWin: false }))
    const headings = result.map(i => i.heading)
    expect(headings.some(h => /win|display|comfortable|dominant/i.test(h))).toBe(true)
  })

  it('flags an away win as being on the road', () => {
    const result = generateMatchAnalysis(makeFixture({
      score: '0 - 2',
      homeTeam: 'Arsenal',
      awayTeam: 'Chelsea',
      homeWin: false,
      awayWin: true,
    }))
    const text = result.map(i => i.heading + ' ' + i.body).join(' ')
    expect(/away/i.test(text)).toBe(true)
  })

  it('identifies a goalless draw', () => {
    const result = generateMatchAnalysis(makeFixture({
      score: '0 - 0',
      homeWin: false,
      awayWin: false,
    }))
    const text = result.map(i => i.heading + ' ' + i.body).join(' ')
    expect(/goalless|0-0/i.test(text)).toBe(true)
  })

  it('identifies a score draw', () => {
    const result = generateMatchAnalysis(makeFixture({
      score: '2 - 2',
      homeWin: false,
      awayWin: false,
    }))
    const text = result.map(i => i.heading + ' ' + i.body).join(' ')
    expect(/draw/i.test(text)).toBe(true)
  })

  it('awards one point each on a draw', () => {
    const result = generateMatchAnalysis(makeFixture({
      score: '1 - 1',
      homeWin: false,
      awayWin: false,
    }))
    const headings = result.map(i => i.heading).join(' ')
    expect(/one point/i.test(headings)).toBe(true)
  })

  it('awards three points on a win', () => {
    const result = generateMatchAnalysis(makeFixture({ score: '2 - 1' }))
    const headings = result.map(i => i.heading).join(' ')
    expect(/three points/i.test(headings)).toBe(true)
  })

  it('identifies a clean sheet when the loser fails to score', () => {
    const result = generateMatchAnalysis(makeFixture({ score: '2 - 0', homeWin: true, awayWin: false }))
    const text = result.map(i => i.heading + ' ' + i.body).join(' ')
    expect(/clean sheet/i.test(text)).toBe(true)
  })

  it('notes both teams scoring when the loser also found the net', () => {
    const result = generateMatchAnalysis(makeFixture({ score: '3 - 1', homeWin: true, awayWin: false }))
    const text = result.map(i => i.heading + ' ' + i.body).join(' ')
    expect(/both teams scored/i.test(text)).toBe(true)
  })

  it('labels a three-plus goal margin as dominant', () => {
    const result = generateMatchAnalysis(makeFixture({ score: '4 - 0', homeWin: true, awayWin: false }))
    const headings = result.map(i => i.heading).join(' ')
    expect(/dominant/i.test(headings)).toBe(true)
  })
})