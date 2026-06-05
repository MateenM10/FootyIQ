import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import colors from '../theme/colors'
import typography from '../theme/typography'
import glossary from '../data/glossary'
import GlossaryTerm from '../components/GlossaryTerm'
import FormationPitch from '../components/FormationPitch'

export default function MatchGuideScreen({ route }) {
  const { match } = route.params
  const [activeTeam, setActiveTeam] = useState('home')

  const isHome = activeTeam === 'home'
  const formation = isHome ? match.homeFormation : match.awayFormation
  const teamName = isHome ? match.homeTeam : match.awayTeam
  const teamColor = isHome ? '#00C87A' : '#4A90E2'

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
        <Text style={styles.sectionLabel}>Formations</Text>
        <Text style={styles.termsHint}>Tap a team to see how they line up</Text>

        <View style={styles.toggle}>
          <TouchableOpacity
            style={[styles.toggleButton, isHome && styles.toggleButtonActive]}
            onPress={() => setActiveTeam('home')}
          >
            <Text style={[styles.toggleText, isHome && styles.toggleTextActive]}>
              {match.homeTeam}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, !isHome && styles.toggleButtonActive]}
            onPress={() => setActiveTeam('away')}
          >
            <Text style={[styles.toggleText, !isHome && styles.toggleTextActive]}>
              {match.awayTeam}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.pitchWrapper}>
          <View style={styles.pitchSize}>
            <FormationPitch formation={formation} color={teamColor} />
          </View>
        </View>

        <Text style={styles.formationCaption}>
          {teamName} · {formation}
        </Text>
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
        <Text style={styles.sectionLabel}>Key Terms to Know</Text>
        <Text style={styles.termsHint}>Tap any term to learn what it means</Text>
        <View style={styles.termsRow}>
          {match.keyTerms.map(key => (
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
  toggle: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 4,
    gap: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  toggleButtonActive: {
    backgroundColor: colors.surface2,
  },
  toggleText: {
    fontSize: typography.sizes.sm,
    color: colors.muted,
    fontWeight: typography.weights.medium,
  },
  toggleTextActive: {
    color: colors.white,
    fontWeight: typography.weights.bold,
  },
  pitchWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  pitchSize: {
    width: '82%',
  },
  formationCaption: {
    fontSize: typography.sizes.md,
    color: colors.accent,
    fontWeight: typography.weights.bold,
    textAlign: 'center',
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
  termsHint: {
    fontSize: typography.sizes.sm,
    color: colors.muted,
    marginTop: -8,
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