import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, ActivityIndicator
} from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import colors from '../theme/colors'
import typography from '../theme/typography'
import useStreak from '../hooks/useStreak'
import useProgress from '../hooks/useProgress'
import lessons from '../data/lessons'

const topics = [
  { icon: 'document-text-outline', label: 'Rules' },
  { icon: 'people-outline',        label: 'Positions' },
  { icon: 'bulb-outline',          label: 'Tactics' },
  { icon: 'trophy-outline',        label: 'History' },
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
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.header}>
          <Text style={styles.logo}>
            Footy<Text style={styles.logoAccent}>IQ</Text>
          </Text>
          <Text style={styles.tagline}>Learn soccer like a pro</Text>
        </View>

        {completed.length === 0 && streak === 0 ? (
          <View style={styles.welcomeCard}>
            <View style={styles.welcomeIconContainer}>
              <Ionicons name="football-outline" size={28} color={colors.accent} />
            </View>
            <Text style={styles.welcomeTitle}>Welcome to FootyIQ</Text>
            <Text style={styles.welcomeText}>
              Complete your first lesson and daily challenge to start tracking your progress.
            </Text>
          </View>
        ) : (
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Ionicons name="flame" size={18} color={colors.accent} />
              <Text style={styles.statValue}>{streak}</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="book-outline" size={18} color={colors.accent} />
              <Text style={styles.statValue}>{completed.length}/{lessons.length}</Text>
              <Text style={styles.statLabel}>Lessons Done</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="star-outline" size={18} color={colors.accent} />
              <Text style={styles.statValue}>{Math.round(progress * 100)}%</Text>
              <Text style={styles.statLabel}>Complete</Text>
            </View>
          </View>
        )}

        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Overall progress</Text>
            <Text style={styles.progressCount}>{Math.round(progress * 100)}%</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: (progress * 100) + '%' }]} />
          </View>
        </View>

        <View style={styles.challengeCard}>
          <Text style={styles.challengeLabel}>Daily Challenge</Text>
          <Text style={styles.challengeTitle}>Ready for today's question?</Text>
          <TouchableOpacity
            style={styles.challengeButton}
            onPress={() => navigation.navigate('Daily')}
            activeOpacity={0.8}
          >
            <Text style={styles.challengeButtonText}>Play now</Text>
            <Ionicons name="arrow-forward" size={16} color={colors.black} />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>What do you want to learn?</Text>

        <View style={styles.topicGrid}>
          {topics.map(topic => (
            <TouchableOpacity
              key={topic.label}
              style={styles.topicCard}
              onPress={() => navigation.navigate('Learn')}
              activeOpacity={0.7}
            >
              <View style={styles.topicIconContainer}>
                <Ionicons name={topic.icon} size={22} color={colors.accent} />
              </View>
              <Text style={styles.topicName}>{topic.label}</Text>
            </TouchableOpacity>
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
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
    paddingBottom: 40,
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
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 24,
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  welcomeIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.accent + '18',
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
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
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
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
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: colors.border,
  },
  challengeLabel: {
    fontSize: typography.sizes.xs,
    color: colors.accent,
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  challengeTitle: {
    fontSize: typography.sizes.lg,
    color: colors.white,
    fontWeight: typography.weights.bold,
    marginBottom: 16,
  },
  challengeButton: {
    backgroundColor: colors.accent,
    borderRadius: 10,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  challengeButtonText: {
    color: colors.black,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.md,
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
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    width: '47%',
    alignItems: 'center',
    gap: 10,
  },
  topicIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.accent + '18',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topicName: {
    fontSize: typography.sizes.sm,
    color: colors.white,
    fontWeight: typography.weights.bold,
  },
})