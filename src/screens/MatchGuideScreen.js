import { View, Text, StyleSheet, ScrollView } from 'react-native'
import colors from '../theme/colors'
import typography from '../theme/typography'

export default function MatchGuideScreen({ route }) {
  const { match } = route.params

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      <Text style={styles.competition}>{match.competition}</Text>

      <View style={styles.teamsRow}>
        <View style={styles.team}>
          <Text style={styles.badge}>{match.homeBadge}</Text>
          <Text style={styles.teamName}>{match.homeTeam}</Text>
        </View>
        <Text style={styles.vs}>vs</Text>
        <View style={styles.team}>
          <Text style={styles.badge}>{match.awayBadge}</Text>
          <Text style={styles.teamName}>{match.awayTeam}</Text>
        </View>
      </View>

      <Text style={styles.kickoff}>{match.kickoff}</Text>

      <View style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>The Storyline</Text>
        <Text style={styles.storyline}>{match.storyline}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Key Battles</Text>
        {match.keyBattles.map((battle, index) => (
          <View key={index} style={styles.battleCard}>
            <Text style={styles.battleTitle}>⚔️ {battle.title}</Text>
            <Text style={styles.battleExplanation}>{battle.explanation}</Text>
          </View>
        ))}
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Tactics to Know</Text>
        <Text style={styles.tactics}>{match.tactics}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>What to Watch For</Text>
        {match.whatToWatch.map((tip, index) => (
          <View key={index} style={styles.tipRow}>
            <Text style={styles.tipBullet}>→</Text>
            <Text style={styles.tipText}>{tip}</Text>
          </View>
        ))}
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
  badge: {
    fontSize: 40,
  },
  teamName: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.white,
    textAlign: 'center',
  },
  vs: {
    fontSize: typography.sizes.sm,
    color: colors.muted,
    fontWeight: typography.weights.bold,
    paddingHorizontal: 16,
  },
  kickoff: {
    fontSize: typography.sizes.sm,
    color: colors.muted,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 28,
  },
  section: {
    gap: 16,
  },
  sectionLabel: {
    fontSize: typography.sizes.xs,
    color: colors.accent,
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  storyline: {
    fontSize: typography.sizes.md,
    color: colors.muted,
    lineHeight: 26,
  },
  battleCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 8,
  },
  battleTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.white,
  },
  battleExplanation: {
    fontSize: typography.sizes.sm,
    color: colors.muted,
    lineHeight: 22,
  },
  tactics: {
    fontSize: typography.sizes.md,
    color: colors.muted,
    lineHeight: 26,
  },
  tipRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  tipBullet: {
    color: colors.accent,
    fontSize: typography.sizes.md,
    marginTop: 2,
  },
  tipText: {
    flex: 1,
    fontSize: typography.sizes.md,
    color: colors.muted,
    lineHeight: 24,
  },
})