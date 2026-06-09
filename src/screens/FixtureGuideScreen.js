import {
  View, Text, StyleSheet, ScrollView, Image
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import colors from '../theme/colors'
import typography from '../theme/typography'
import glossary from '../data/glossary'
import GlossaryTerm from '../components/GlossaryTerm'
import { generateMatchAnalysis } from '../services/matchAnalysis'

const PREMIER_LEAGUE_INFO = 'The Premier League is the top division of English football, featuring 20 clubs competing from August to May. Each team plays 38 matches — home and away against every other side. The team with the most points at the end of the season wins the title. The bottom three clubs are relegated to the Championship.'

const FIXTURE_KEY_TERMS = ['press', 'lowBlock', 'counter', 'setPiece', 'transition', 'buildUp']

export default function FixtureGuideScreen({ route }) {
  const { fixture } = route.params
  const analysis = generateMatchAnalysis(fixture)

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.matchHeader}>
          <Text style={styles.competition}>{fixture.competition}</Text>

          <View style={styles.teamsRow}>
            <View style={styles.team}>
              <Image
                source={{ uri: fixture.homeLogo }}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text
                style={[styles.teamName, fixture.homeWin && styles.winnerText]}
                numberOfLines={2}
              >
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
              <Text style={styles.kickoff}>{fixture.kickoff}</Text>
            </View>

            <View style={styles.team}>
              <Image
                source={{ uri: fixture.awayLogo }}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text
                style={[styles.teamName, fixture.awayWin && styles.winnerText]}
                numberOfLines={2}
              >
                {fixture.awayTeam}
              </Text>
            </View>
          </View>
        </View>

        {analysis && (
          <>
            <View style={styles.divider} />
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Match Analysis</Text>
              {analysis.map((insight, index) => (
                <View key={index} style={styles.insightCard}>
                  <View style={styles.insightIconContainer}>
                    <Ionicons name={insight.icon} size={18} color={colors.accent} />
                  </View>
                  <View style={styles.insightText}>
                    <Text style={styles.insightHeading}>{insight.heading}</Text>
                    <Text style={styles.insightBody}>{insight.body}</Text>
                  </View>
                </View>
              ))}
            </View>
          </>
        )}

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>About this Competition</Text>
          <Text style={styles.body}>{PREMIER_LEAGUE_INFO}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Key Terms to Know</Text>
          <Text style={styles.sectionHint}>Tap any term to learn what it means</Text>
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
          {[
            {
              icon: 'stats-chart-outline',
              title: 'The Score',
              body: 'The first number is the home team\'s goals, the second is the away team\'s. A win earns 3 points in the league, a draw earns 1, and a loss earns 0.',
            },
            {
              icon: 'home-outline',
              title: 'Home Advantage',
              body: 'The home team plays in their own stadium with their own fans. Home teams win more often — the crowd creates pressure, and the away team has had to travel.',
            },
            {
              icon: 'arrow-forward-circle-outline',
              title: 'What Happens Next',
              body: 'Points accumulate across the whole season. After 38 games, the team with the most points wins the Premier League title. The bottom three teams get relegated to the Championship.',
            },
          ].map((item, index) => (
            <View key={index} style={styles.explainerCard}>
              <View style={styles.explainerIconContainer}>
                <Ionicons name={item.icon} size={18} color={colors.accent} />
              </View>
              <View style={styles.explainerText}>
                <Text style={styles.explainerTitle}>{item.title}</Text>
                <Text style={styles.explainerBody}>{item.body}</Text>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.black,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  matchHeader: {
    alignItems: 'center',
    gap: 20,
  },
  competition: {
    fontSize: typography.sizes.xs,
    color: colors.accent,
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  teamsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  team: {
    flex: 1,
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    width: 56,
    height: 56,
  },
  teamName: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.white,
    textAlign: 'center',
    lineHeight: 20,
  },
  winnerText: {
    color: colors.accent,
  },
  scoreBox: {
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
  },
  score: {
    fontSize: 36,
    fontWeight: typography.weights.bold,
    color: colors.white,
    letterSpacing: 2,
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
    fontSize: 11,
    color: colors.muted,
    fontWeight: typography.weights.bold,
    letterSpacing: 0.3,
  },
  kickoff: {
    fontSize: 11,
    color: colors.muted,
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
    letterSpacing: 0.8,
  },
  sectionHint: {
    fontSize: typography.sizes.sm,
    color: colors.muted,
    marginTop: -6,
  },
  body: {
    fontSize: typography.sizes.md,
    color: colors.muted,
    lineHeight: 26,
  },
  insightCard: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'flex-start',
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
  },
  insightIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.accent + '18',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  insightText: {
    flex: 1,
    gap: 6,
  },
  insightHeading: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.white,
  },
  insightBody: {
    fontSize: typography.sizes.sm,
    color: colors.muted,
    lineHeight: 22,
  },
  termsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
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
    flexDirection: 'row',
    gap: 14,
    alignItems: 'flex-start',
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
  },
  explainerIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.accent + '18',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  explainerText: {
    flex: 1,
    gap: 6,
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