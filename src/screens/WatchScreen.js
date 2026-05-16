import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import colors from '../theme/colors'
import typography from '../theme/typography'
import matches from '../data/matches'

export default function WatchScreen() {
  const navigation = useNavigation()

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      <Text style={styles.heading}>Watch</Text>
      <Text style={styles.subheading}>Understand the game before it kicks off</Text>

      {matches.map(match => (
        <TouchableOpacity
          key={match.id}
          style={styles.matchCard}
          onPress={() => navigation.navigate('MatchGuide', { match })}
        >
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

          <View style={styles.previewRow}>
            <Text style={styles.previewLabel}>Match Guide</Text>
            <Text style={styles.previewArrow}>→</Text>
          </View>
        </TouchableOpacity>
      ))}

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
  },
  heading: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.white,
    marginBottom: 8,
  },
  subheading: {
    fontSize: typography.sizes.md,
    color: colors.muted,
    marginBottom: 32,
  },
  matchCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
    marginBottom: 16,
  },
  competition: {
    fontSize: typography.sizes.xs,
    color: colors.accent,
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 16,
  },
  teamsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  team: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    fontSize: 36,
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
    marginBottom: 16,
  },
  previewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  previewLabel: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.white,
  },
  previewArrow: {
    fontSize: typography.sizes.lg,
    color: colors.accent,
  },
})