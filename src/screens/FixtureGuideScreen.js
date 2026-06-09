import {
  View, Text, StyleSheet, Image
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import colors from '../theme/colors'
import typography from '../theme/typography'
import glossary from '../data/glossary'
import GlossaryTerm from '../components/GlossaryTerm'
import { generateMatchAnalysis } from '../services/matchAnalysis'
import ScreenWrapper from '../components/ScreenWrapper'
import Card from '../components/Card'
import SectionLabel from '../components/SectionLabel'
import IconContainer from '../components/IconContainer'

const PREMIER_LEAGUE_INFO = 'The Premier League is the top division of English football, featuring 20 clubs competing from August to May. Each team plays 38 matches — home and away against every other side. The team with the most points at the end of the season wins the title. The bottom three clubs are relegated to the Championship.'

const FIXTURE_KEY_TERMS = ['press', 'lowBlock', 'counter', 'setPiece', 'transition', 'buildUp']

export default function FixtureGuideScreen({ route }) {
  const { fixture } = route.params
  const analysis = generateMatchAnalysis(fixture)

  return (
    <ScreenWrapper edges={['bottom']} contentStyle={styles.content}>

      <View style={styles.matchHeader}>
        <SectionLabel>{fixture.competition}</SectionLabel>

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
            <SectionLabel>Match Analysis</SectionLabel>
            {analysis.map((insight, index) => (
              <Card key={index} style={styles.insightCard}>
                <IconContainer
                  icon={insight.icon}
                  size={36}
                  iconSize={18}
                  color={colors.accent}
                  style={{ flexShrink: 0 }}
                />
                <View style={styles.insightText}>
                  <Text style={styles.insightHeading}>{insight.heading}</Text>
                  <Text style={styles.insightBody}>{insight.body}</Text>
                </View>
              </Card>
            ))}
          </View>
        </>
      )}

      <View style={styles.divider} />

      <View style={styles.section}>
        <SectionLabel>About this Competition</SectionLabel>
        <Text style={styles.body}>{PREMIER_LEAGUE_INFO}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <SectionLabel>Key Terms to Know</SectionLabel>
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
        <SectionLabel>How to Read a Result</SectionLabel>
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
          <Card key={index} style={styles.insightCard}>
            <IconContainer
              icon={item.icon}
              size={36}
              iconSize={18}
              color={colors.accent}
              style={{ flexShrink: 0 }}
            />
            <View style={styles.insightText}>
              <Text style={styles.insightHeading}>{item.title}</Text>
              <Text style={styles.insightBody}>{item.body}</Text>
            </View>
          </Card>
        ))}
      </View>

    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  matchHeader: {
    alignItems: 'center',
    gap: 20,
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
    padding: 16,
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
})