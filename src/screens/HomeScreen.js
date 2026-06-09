import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import colors from '../theme/colors'
import typography from '../theme/typography'
import useStreak from '../hooks/useStreak'
import useProgress from '../hooks/useProgress'
import lessons from '../data/lessons'
import ScreenWrapper from '../components/ScreenWrapper'
import Card from '../components/Card'
import SectionLabel from '../components/SectionLabel'
import IconContainer from '../components/IconContainer'
import PrimaryButton from '../components/PrimaryButton'

const topics = [
  { icon: 'document-text-outline', label: 'Rules',     trackId: 'beginner'  },
  { icon: 'people-outline',        label: 'Positions', trackId: 'positions' },
  { icon: 'bulb-outline',          label: 'Tactics',   trackId: 'tactics'   },
  { icon: 'trophy-outline',        label: 'History',   trackId: 'history'   },
]

export default function HomeScreen() {
  const navigation = useNavigation()
  const { streak, loadStreak } = useStreak()
  const { completed, loadProgress } = useProgress()
  const [loading, setLoading] = useState(true)

  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        await loadProgress()
        await loadStreak()
        setLoading(false)
      }
      load()
    }, [])
  )

  const progress = completed.length / lessons.length

  if (loading) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.accent} />
        </View>
      </SafeAreaView>
    )
  }

  return (
    <ScreenWrapper>

      <View style={styles.header}>
        <Text style={styles.logo}>
          Footy<Text style={styles.logoAccent}>IQ</Text>
        </Text>
        <Text style={styles.tagline}>Learn soccer like a pro</Text>
      </View>

      {completed.length === 0 && streak === 0 ? (
        <Card style={styles.welcomeCard}>
          <IconContainer icon="football-outline" size={56} />
          <Text style={styles.welcomeTitle}>Welcome to FootyIQ</Text>
          <Text style={styles.welcomeText}>
            Complete your first lesson and daily challenge to start tracking your progress.
          </Text>
        </Card>
      ) : (
        <View style={styles.statsRow}>
          <Card style={styles.statCard}>
            <Ionicons name="flame" size={18} color={colors.accent} />
            <Text style={styles.statValue}>{streak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </Card>
          <Card style={styles.statCard}>
            <Ionicons name="book-outline" size={18} color={colors.accent} />
            <Text style={styles.statValue}>{completed.length}/{lessons.length}</Text>
            <Text style={styles.statLabel}>Lessons Done</Text>
          </Card>
          <Card style={styles.statCard}>
            <Ionicons name="star-outline" size={18} color={colors.accent} />
            <Text style={styles.statValue}>{Math.round(progress * 100)}%</Text>
            <Text style={styles.statLabel}>Complete</Text>
          </Card>
        </View>
      )}

      <Card style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Overall progress</Text>
          <Text style={styles.progressCount}>{Math.round(progress * 100)}%</Text>
        </View>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: (progress * 100) + '%' }]} />
        </View>
      </Card>

      <Card style={styles.challengeCard}>
        <SectionLabel style={styles.challengeLabelSpacing}>Daily Challenge</SectionLabel>
        <Text style={styles.challengeTitle}>Ready for today's question?</Text>
        <PrimaryButton
          label="Play now"
          onPress={() => navigation.navigate('Daily')}
        />
      </Card>

      <Text style={styles.sectionTitle}>What do you want to learn?</Text>

      <View style={styles.topicGrid}>
        {topics.map(topic => (
          <Card
            key={topic.label}
            style={styles.topicCard}
            onPress={() => navigation.navigate('Learn', {
              screen: 'LearnList',
              params: { initialTrack: topic.trackId },
            })}
          >
            <IconContainer icon={topic.icon} size={44} />
            <Text style={styles.topicName}>{topic.label}</Text>
          </Card>
        ))}
      </View>

    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.black,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    marginBottom: 28,
  },
  logo: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.white,
    letterSpacing: -0.5,
  },
  logoAccent: {
    color: colors.accent,
  },
  tagline: {
    fontSize: typography.sizes.md,
    color: colors.muted,
    marginTop: 4,
  },
  welcomeCard: {
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  welcomeTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.white,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: typography.sizes.sm,
    color: colors.muted,
    textAlign: 'center',
    lineHeight: 22,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    padding: 14,
    alignItems: 'center',
    gap: 6,
  },
  statValue: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.white,
  },
  statLabel: {
    fontSize: 11,
    color: colors.muted,
    textAlign: 'center',
    fontWeight: typography.weights.medium,
  },
  progressCard: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressLabel: {
    fontSize: typography.sizes.sm,
    color: colors.muted,
    fontWeight: typography.weights.medium,
  },
  progressCount: {
    fontSize: typography.sizes.sm,
    color: colors.accent,
    fontWeight: typography.weights.bold,
  },
  progressBarBg: {
    height: 5,
    backgroundColor: colors.border,
    borderRadius: 4,
  },
  progressBarFill: {
    height: 5,
    backgroundColor: colors.accent,
    borderRadius: 4,
  },
  challengeCard: {
    marginBottom: 32,
    gap: 8,
  },
  challengeLabelSpacing: {
    marginBottom: 4,
  },
  challengeTitle: {
    fontSize: typography.sizes.lg,
    color: colors.white,
    fontWeight: typography.weights.bold,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.white,
    marginBottom: 14,
  },
  topicGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  topicCard: {
    width: '47%',
    alignItems: 'center',
    gap: 10,
    padding: 18,
  },
  topicName: {
    fontSize: typography.sizes.sm,
    color: colors.white,
    fontWeight: typography.weights.bold,
  },
})