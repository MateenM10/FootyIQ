import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'
import colors from '../theme/colors'
import typography from '../theme/typography'
import lessons from '../data/lessons'
import tracks from '../data/tracks'
import useProgress from '../hooks/useProgress'

export default function LearnScreen() {
  const navigation = useNavigation()
  const { isComplete, completed, loadProgress } = useProgress()

  useFocusEffect(
    useCallback(() => {
      loadProgress()
    }, [])
  )

  const progress = completed.length / lessons.length

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      <Text style={styles.heading}>Learn</Text>
      <Text style={styles.subheading}>Work through the tracks at your own pace</Text>

      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Your progress</Text>
          <Text style={styles.progressCount}>
            {completed.length}/{lessons.length} lessons
          </Text>
        </View>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: (progress * 100) + '%' }]} />
        </View>
      </View>

      {tracks.map(track => {
        const trackLessons = lessons.filter(lesson => lesson.track === track.id)
        const doneInTrack = trackLessons.filter(lesson => isComplete(lesson.id)).length

        return (
          <View key={track.id} style={styles.trackSection}>
            <View style={styles.trackHeader}>
              <Text style={styles.trackIcon}>{track.icon}</Text>
              <View style={styles.trackHeaderText}>
                <Text style={styles.trackTitle}>{track.title}</Text>
                <Text style={styles.trackDesc}>{track.description}</Text>
              </View>
            </View>

            <Text style={styles.trackProgress}>
              {doneInTrack}/{trackLessons.length} complete
            </Text>

            {trackLessons.map(lesson => (
              <TouchableOpacity
                key={lesson.id}
                style={[styles.lessonCard, isComplete(lesson.id) && styles.lessonCardComplete]}
                onPress={() => navigation.navigate('Lesson', { lesson })}
              >
                <Text style={styles.lessonIcon}>{lesson.icon}</Text>
                <View style={styles.lessonInfo}>
                  <Text style={styles.lessonTitle}>{lesson.title}</Text>
                  <Text style={styles.lessonMeta}>{lesson.category} · {lesson.duration}</Text>
                </View>
                {isComplete(lesson.id)
                  ? <Text style={styles.checkmark}>✓</Text>
                  : <Text style={styles.arrow}>→</Text>
                }
              </TouchableOpacity>
            ))}
          </View>
        )
      })}

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
    marginBottom: 24,
  },
  progressCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 32,
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
  trackSection: {
    marginBottom: 32,
  },
  trackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 8,
  },
  trackIcon: {
    fontSize: 30,
  },
  trackHeaderText: {
    flex: 1,
  },
  trackTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.white,
    marginBottom: 2,
  },
  trackDesc: {
    fontSize: typography.sizes.sm,
    color: colors.muted,
    lineHeight: 20,
  },
  trackProgress: {
    fontSize: typography.sizes.xs,
    color: colors.accent,
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 14,
  },
  lessonCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 14,
  },
  lessonCardComplete: {
    borderColor: '#00C87A44',
    backgroundColor: '#00C87A0A',
  },
  lessonIcon: {
    fontSize: 28,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.white,
    marginBottom: 4,
  },
  lessonMeta: {
    fontSize: typography.sizes.sm,
    color: colors.muted,
  },
  arrow: {
    fontSize: typography.sizes.lg,
    color: colors.accent,
  },
  checkmark: {
    fontSize: typography.sizes.lg,
    color: colors.accent,
    fontWeight: typography.weights.bold,
  },
})