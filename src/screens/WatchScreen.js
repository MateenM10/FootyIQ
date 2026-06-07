import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Image, ActivityIndicator, RefreshControl
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useState, useEffect } from 'react'
import colors from '../theme/colors'
import typography from '../theme/typography'
import { getUpcomingFixtures } from '../services/footballApi'

export default function WatchScreen() {
  const navigation = useNavigation()
  const [fixtures, setFixtures] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const load = async (forceRefresh = false) => {
    if (!forceRefresh) setLoading(true)
    setError(false)
    try {
      const result = await getUpcomingFixtures(forceRefresh)
      setFixtures(result.fixtures)
    } catch (e) {
      setError(true)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const onRefresh = () => {
    setRefreshing(true)
    load(true)
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={colors.accent}
          colors={[colors.accent]}
        />
      }
    >

      <Text style={styles.heading}>Watch</Text>
      <Text style={styles.subheading}>Recent Premier League results with educational breakdowns</Text>

      {loading && (
        <View style={styles.stateBox}>
          <ActivityIndicator size="large" color={colors.accent} />
        </View>
      )}

      {error && !loading && (
        <View style={styles.stateBox}>
          <Text style={styles.stateText}>Couldn't load matches right now.</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => load()}>
            <Text style={styles.retryText}>Try again</Text>
          </TouchableOpacity>
        </View>
      )}

      {!loading && !error && fixtures.length === 0 && (
        <View style={styles.stateBox}>
          <Text style={styles.stateText}>No matches found.</Text>
        </View>
      )}

      {!loading && !error && fixtures.map(fixture => (
        <TouchableOpacity
          key={fixture.id}
          style={styles.fixtureCard}
          onPress={() => navigation.navigate('FixtureGuide', { fixture })}
        >
          <View style={styles.fixtureHeader}>
            <Text style={styles.competition}>{fixture.competition}</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{fixture.status}</Text>
            </View>
          </View>

          <View style={styles.teamsRow}>
            <View style={styles.team}>
              <Image
                source={{ uri: fixture.homeLogo }}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={[styles.teamName, fixture.homeWin && styles.winnerText]}>
                {fixture.homeTeam}
              </Text>
            </View>

            <View style={styles.scoreBox}>
              {fixture.score
                ? <Text style={styles.score}>{fixture.score}</Text>
                : <Text style={styles.vs}>vs</Text>
              }
            </View>

            <View style={styles.team}>
              <Image
                source={{ uri: fixture.awayLogo }}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={[styles.teamName, fixture.awayWin && styles.winnerText]}>
                {fixture.awayTeam}
              </Text>
            </View>
          </View>

          <View style={styles.guideRow}>
            <Text style={styles.guideLabel}>Match Guide</Text>
            <Text style={styles.guideArrow}>→</Text>
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
    paddingBottom: 40,
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
    marginBottom: 28,
  },
  fixtureCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
    marginBottom: 16,
  },
  fixtureHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  competition: {
    fontSize: typography.sizes.xs,
    color: colors.accent,
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  statusBadge: {
    backgroundColor: colors.surface2,
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
  logo: {
    width: 44,
    height: 44,
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
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  score: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.white,
  },
  vs: {
    fontSize: typography.sizes.sm,
    color: colors.muted,
    fontWeight: typography.weights.bold,
  },
  guideRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  guideLabel: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.white,
  },
  guideArrow: {
    fontSize: typography.sizes.lg,
    color: colors.accent,
  },
  stateBox: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 32,
    alignItems: 'center',
    gap: 16,
  },
  stateText: {
    fontSize: typography.sizes.md,
    color: colors.muted,
    textAlign: 'center',
    lineHeight: 24,
  },
  retryButton: {
    backgroundColor: colors.accent,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  retryText: {
    color: colors.black,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.md,
  },
})