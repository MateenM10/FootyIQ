import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Image, ActivityIndicator, RefreshControl
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
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
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
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
        <Text style={styles.subheading}>
          Tap any match to understand what happened and why
        </Text>

        {loading && (
          <View style={styles.stateBox}>
            <ActivityIndicator size="large" color={colors.accent} />
          </View>
        )}

        {error && !loading && (
          <View style={styles.stateBox}>
            <View style={styles.stateIconContainer}>
              <Ionicons name="wifi-outline" size={28} color={colors.muted} />
            </View>
            <Text style={styles.stateTitle}>Couldn't load matches</Text>
            <Text style={styles.stateText}>Check your connection and try again.</Text>
            <TouchableOpacity style={styles.retryButton} onPress={() => load()}>
              <Text style={styles.retryText}>Try again</Text>
            </TouchableOpacity>
          </View>
        )}

        {!loading && !error && fixtures.length === 0 && (
          <View style={styles.stateBox}>
            <View style={styles.stateIconContainer}>
              <Ionicons name="football-outline" size={28} color={colors.muted} />
            </View>
            <Text style={styles.stateTitle}>No matches found</Text>
            <Text style={styles.stateText}>Pull down to refresh.</Text>
          </View>
        )}

        {!loading && !error && fixtures.map(fixture => (
          <TouchableOpacity
            key={fixture.id}
            style={styles.fixtureCard}
            onPress={() => navigation.navigate('FixtureGuide', { fixture })}
            activeOpacity={0.7}
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

            <View style={styles.guideRow}>
              <Text style={styles.guideLabel}>Match Guide</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.accent} />
            </View>
          </TouchableOpacity>
        ))}

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
    gap: 14,
  },
  heading: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.white,
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  subheading: {
    fontSize: typography.sizes.md,
    color: colors.muted,
    lineHeight: 22,
    marginBottom: 8,
  },
  fixtureCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
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
    letterSpacing: 0.8,
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
    fontSize: 11,
    color: colors.muted,
    fontWeight: typography.weights.bold,
    letterSpacing: 0.3,
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
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 4,
  },
  score: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.white,
    letterSpacing: 1,
  },
  vs: {
    fontSize: typography.sizes.md,
    color: colors.muted,
    fontWeight: typography.weights.bold,
  },
  kickoff: {
    fontSize: 11,
    color: colors.muted,
    fontWeight: typography.weights.medium,
  },
  guideRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  guideLabel: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.white,
  },
  stateBox: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 36,
    alignItems: 'center',
    gap: 10,
  },
  stateIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.surface2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  stateTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.white,
  },
  stateText: {
    fontSize: typography.sizes.sm,
    color: colors.muted,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: colors.accent,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginTop: 4,
  },
  retryText: {
    color: colors.black,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.sm,
  },
})