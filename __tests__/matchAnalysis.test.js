import { generateMatchAnalysis } from '../src/services/matchAnalysis'

const makeFixture = (overrides = {}) => ({
  id: 1,
  homeTeam: 'Arsenal',
  awayTeam: 'Chelsea',
  score: '2-1',
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
    const fixture = makeFixture({ score: null })
    expect(generateMatchAnalysis(fixture)).toBeNull()
  })

  it('returns exactly 3 insights for a finished match', () => {
    const result = generateMatchAnalysis(makeFixture())
    expect(result).toHaveLength(3)
  })

  it('each insight has icon, heading, and body', () => {
    const result = generateMatchAnalysis(makeFixture())
    result.forEach(insight => {
      expect(insight).toHaveProperty('icon')
      expect(insight).toHaveProperty('heading')
      expect(insight).toHaveProperty('body')
      expect(typeof insight.icon).toBe('string')
      expect(typeof insight.heading).toBe('string')
      expect(typeof insight.body).toBe('string')
    })
  })

  it('identifies a home win correctly', () => {
    const result = generateMatchAnalysis(makeFixture({ score: '3-0', homeWin: true, awayWin: false }))
    const headings = result.map(i => i.heading)
    expect(headings.some(h => /win|won|victory/i.test(h))).toBe(true)
  })

  it('identifies an away win correctly', () => {
    const result = generateMatchAnalysis(makeFixture({
      score: '0-2',
      homeWin: false,
      awayWin: true,
    }))
    const bodies = result.map(i => i.body).join(' ')
    expect(/away/i.test(bodies)).toBe(true)
  })

  it('identifies a 0-0 draw', () => {
    const result = generateMatchAnalysis(makeFixture({
      score: '0-0',
      homeWin: false,
      awayWin: false,
    }))
    const text = result.map(i => i.heading + ' ' + i.body).join(' ')
    expect(/goalless|0.0|draw/i.test(text)).toBe(true)
  })

  it('identifies a score draw', () => {
    const result = generateMatchAnalysis(makeFixture({
      score: '2-2',
      homeWin: false,
      awayWin: false,
    }))
    const text = result.map(i => i.heading + ' ' + i.body).join(' ')
    expect(/draw/i.test(text)).toBe(true)
  })

  it('identifies a clean sheet', () => {
    const result = generateMatchAnalysis(makeFixture({ score: '2-0', homeWin: true, awayWin: false }))
    const text = result.map(i => i.heading + ' ' + i.body).join(' ')
    expect(/clean sheet/i.test(text)).toBe(true)
  })

  it('identifies both teams scoring', () => {
    const result = generateMatchAnalysis(makeFixture({ score: '1-1', homeWin: false, awayWin: false }))
    const text = result.map(i => i.heading + ' ' + i.body).join(' ')
    expect(/both|scored/i.test(text)).toBe(true)
  })
})