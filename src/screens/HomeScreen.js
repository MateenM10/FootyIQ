import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import colors from '../theme/colors'
import typography from '../theme/typography'
import useStreak from '../hooks/useStreak'
import useProgress from '../hooks/useProgress'
import lessons from '../data/lessons'

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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    )
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      <View style={styles.header}>
        <Text style={styles.logo}>Footy<Text style={styles.logoAccent}>IQ</Text></Text>
        <Text style={styles.tagline}>Learn soccer like a pro</Text>
      </View>

      {completed.length === 0 && streak === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyIcon}>⚽</Text>
          <Text style={styles.emptyTitle}>Welcome to FootyIQ</Text>
          <Text style={styles.emptyText}>
            Complete your first lesson and daily challenge to start tracking your progress.
          </Text>
        </View>
      ) : (
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{streak}</Text>
            <Text style={styles.statLabel}>🔥 Day streak</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{completed.length}/{lessons.length}</Text>
            <Text style={styles.statLabel}>📖 Lessons done</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{Math.round(progress * 100)}%</Text>
            <Text style={styles.statLabel}>⭐ Complete</Text>
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

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Today's Challenge</Text>
        <Text style={styles.cardTitle}>Ready for today's question?</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Daily')}
        >
          <Text style={styles.buttonText}>Play now →</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>What do you want to learn?</Text>

      <View style={styles.topicGrid}>
        <TouchableOpacity
          style={styles.topicCard}
          onPress={() => navigation.navigate('Learn')}
        >
          <Text style={styles.topicIcon}>📖</Text>
          <Text style={styles.topicName}>Rules</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.topicCard}
          onPress={() => navigation.navigate('Learn')}
        >
          <Text style={styles.topicIcon}>🏃</Text>
          <Text style={styles.topicName}>Positions</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.topicCard}
          onPress={() => navigation.navigate('Learn')}
        >
          <Text style={styles.topicIcon}>🧠</Text>
          <Text style={styles.topicName}>Tactics</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.topicCard}
          onPress={() => navigation.navigate('Learn')}
        >
          <Text style={styles.topicIcon}>🏆</Text>
          <Text style={styles.topicName}>History</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  content: {
    padding: 24,
    paddingTop: 60,
  },
  header: {
    marginBottom: 24,
  },
  logo: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.white,
  },
  logoAccent: {
    color: colors.accent,
  },
  tagline: {
    fontSize: typography.sizes.md,
    color: colors.muted,
    marginTop: 4,
  },
  emptyCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    gap: 10,
  },
  emptyIcon: {
    fontSize: 40,
  },
  emptyTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.white,
    textAlign: 'center',
  },
  emptyText: {
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
    borderRadius: 12,
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
    fontSize: typography.sizes.xs,
    color: colors.muted,
    textAlign: 'center',
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
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 4,
  },
  progressBarFill: {
    height: 6,
    backgroundColor: colors.accent,
    borderRadius: 4,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardLabel: {
    fontSize: typography.sizes.xs,
    color: colors.accent,
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: typography.sizes.lg,
    color: colors.white,
    fontWeight: typography.weights.bold,
    marginBottom: 16,
    lineHeight: 28,
  },
  button: {
    backgroundColor: colors.accent,
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.black,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.md,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.white,
    marginBottom: 16,
  },
  topicGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  topicCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
    width: '47%',
    alignItems: 'center',
    gap: 8,
  },
  topicIcon: {
    fontSize: 28,
  },
  topicName: {
    fontSize: typography.sizes.md,
    color: colors.white,
    fontWeight: typography.weights.medium,
  },
})