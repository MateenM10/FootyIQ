import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import colors from '../theme/colors'
import typography from '../theme/typography'
import glossary from '../data/glossary'
import GlossaryTerm from '../components/GlossaryTerm'

const PREMIER_LEAGUE_INFO = 'The Premier League is the top division of English football, featuring 20 clubs competing from August to May. Each team plays 38 matches — home and away against every other side. The team with the most points at the end of the season wins the title. The bottom three clubs are relegated.'

const FIXTURE_KEY_TERMS = ['press', 'lowBlock', 'counter', 'setPiece', 'transition', 'buildUp']

export default function FixtureGuideScreen({ route }) {
  const { fixture } = route.params

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      <Text style={styles.competition}>{fixture.competition}</Text>

      <View style={styles.teamsRow}>
        <View style={styles.team}>
          <Image source={{ uri: fixture.homeLogo }} style={styles.logo} resizeMode="contain" />
          <Text style={[styles.teamName, fixture.homeWin && styles.winnerText]}>
            {fixture.homeTeam}
          </Text>
        </View>

        <View style={styles.scoreBox}>
          {fixture.score
            ? <Text style={styles.score}>{fixture.score}</Text>
            : <Text style={styles.vs}>vs</Text>
          }
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{fixture.status}</Text>
          </View>
        </View>

        <View style={styles.team}>
          <Image source={{ uri: fixture.awayLogo }} style={styles.logo} resizeMode="contain" />
          <Text style={[styles.teamName, fixture.awayWin && styles.winnerText]}>
            {fixture.awayTeam}
          </Text>
        </View>
      </View>

      <Text style={styles.kickoff}>{fixture.kickoff}</Text>

      <View style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>About this Competition</Text>
        <Text style={styles.body}>{PREMIER_LEAGUE_INFO}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Key Terms to Know</Text>
        <Text style={styles.hint}>Tap any term to learn what it means</Text>
        <View style={styles.termsRow}>
          {FIXTURE_KEY_TERMS.map(key => (
            glossary[key] ? (
              <View key={key} style={styles.termChip}>
                <GlossaryTerm termKey={key}>{glossary[key].term}</GlossaryTerm>
              </View>
            ) : null
          ))}
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>How to Read a Result</Text>
        <View style={styles.explainerCard}>
          <Text style={styles.explainerTitle}>The Score</Text>
          <Text style={styles.explainerBody}>
            The first number is the home team's goals, the second is the away team's. A win earns 3 points in the league, a draw earns 1, and a loss earns 0.
          </Text>
        </View>
        <View style={styles.explainerCard}>
          <Text style={styles.explainerTitle}>Home Advantage</Text>
          <Text style={styles.explainerBody}>
            The home team plays in their own stadium with their own fans. Home teams win more often — the crowd creates pressure, and the away team has had to travel.
          </Text>
        </View>
        <View style={styles.explainerCard}>
          <Text style={styles.explainerTitle}>What Happens Next</Text>
          <Text style={styles.explainerBody}>
            Points accumulate across the whole season. After 38 games, the team with the most points wins the Premier League title. The bottom three teams get relegated to the Championship.
          </Text>
        </View>
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  content: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  competition: {
    fontSize: typography.sizes.xs,
    color: colors.accent,
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 20,
    textAlign: 'center',
  },
  teamsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  team: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  logo: {
    width: 52,
    height: 52,
  },
  teamName: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.white,
    textAlign: 'center',
  },
  winnerText: {
    color: colors.accent,
  },
  scoreBox: {
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
  },
  score: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.white,
  },
  vs: {
    fontSize: typography.sizes.lg,
    color: colors.muted,
    fontWeight: typography.weights.bold,
  },
  statusBadge: {
    backgroundColor: colors.surface,
    borderRadius: 6,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statusText: {
    fontSize: typography.sizes.xs,
    color: colors.muted,
    fontWeight: typography.weights.bold,
  },
  kickoff: {
    fontSize: typography.sizes.sm,
    color: colors.muted,
    textAlign: 'center',
    marginBottom: 4,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 28,
  },
  section: {
    gap: 14,
  },
  sectionLabel: {
    fontSize: typography.sizes.xs,
    color: colors.accent,
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  body: {
    fontSize: typography.sizes.md,
    color: colors.muted,
    lineHeight: 26,
  },
  hint: {
    fontSize: typography.sizes.sm,
    color: colors.muted,
    marginTop: -6,
  },
  termsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  termChip: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  explainerCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 8,
  },
  explainerTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.white,
  },
  explainerBody: {
    fontSize: typography.sizes.sm,
    color: colors.muted,
    lineHeight: 22,
  },
})