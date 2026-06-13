import {
  View, Text, StyleSheet,
  TouchableOpacity, Image, RefreshControl
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import colors from '../theme/colors'
import typography from '../theme/typography'
import { getUpcomingFixtures } from '../services/footballApi'
import ScreenWrapper from '../components/ScreenWrapper'
import Card from '../components/Card'
import SectionLabel from '../components/SectionLabel'
import IconContainer from '../components/IconContainer'
import SkeletonFixtureCard from '../components/SkeletonFixtureCard'

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
    <ScreenWrapper
      edges={['top']}
      contentStyle={styles.content}
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
        <>
          <SkeletonFixtureCard />
          <SkeletonFixtureCard />
          <SkeletonFixtureCard />
        </>
      )}

      {error && !loading && (
        <Card style={styles.stateBox}>
          <IconContainer
            icon="wifi-outline"
            size={56}
            iconSize={28}
            color={colors.muted}
            style={{ backgroundColor: colors.surface2 }}
          />
          <Text style={styles.stateTitle}>Couldn't load matches</Text>
          <Text style={styles.stateText}>Check your connection and try again.</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => load()}>
            <Text style={styles.retryText}>Try again</Text>
          </TouchableOpacity>
        </Card>
      )}

      {!loading && !error && fixtures.length === 0 && (
        <Card style={styles.stateBox}>
          <IconContainer
            icon="football-outline"
            size={56}
            iconSize={28}
            color={colors.muted}
            style={{ backgroundColor: colors.surface2 }}
          />
          <Text style={styles.stateTitle}>No matches found</Text>
          <Text style={styles.stateText}>Pull down to refresh.</Text>
        </Card>
      )}

      {!loading && !error && fixtures.map(fixture => (
        <Card
          key={fixture.id}
          style={styles.fixtureCard}
          onPress={() => navigation.navigate('FixtureGuide', { fixture })}
        >
          <View style={styles.fixtureHeader}>
            <SectionLabel>{fixture.competition}</SectionLabel>
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
        </Card>
      ))}

    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
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
    padding: 18,
  },
  fixtureHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
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
    padding: 36,
    alignItems: 'center',
    gap: 10,
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