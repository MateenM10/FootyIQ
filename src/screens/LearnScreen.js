import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, ActivityIndicator
} from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { useCallback, useState, useRef, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import colors from '../theme/colors'
import typography from '../theme/typography'
import lessons from '../data/lessons'
import tracks from '../data/tracks'
import useProgress from '../hooks/useProgress'

export default function LearnScreen({ route }) {
  const navigation = useNavigation()
  const { isComplete, completed, loadProgress } = useProgress()
  const [loading, setLoading] = useState(true)
  const scrollViewRef = useRef(null)
  const sectionOffsets = useRef({})
  const initialTrack = route?.params?.initialTrack

  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        await loadProgress()
        setLoading(false)
      }
      load()
    }, [])
  )

  useEffect(() => {
    if (!loading && initialTrack) {
      const timer = setTimeout(() => {
        const offset = sectionOffsets.current[initialTrack]
        if (offset !== undefined && scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            y: Math.max(0, offset - 16),
            animated: true,
          })
        }
      }, 150)
      return () => clearTimeout(timer)
    }
  }, [loading, initialTrack])

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
        ref={scrollViewRef}
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        <Text style={styles.heading}>Learn</Text>
        <Text style={styles.subheading}>Work through the tracks at your own pace</Text>

        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Overall progress</Text>
            <Text style={styles.progressCount}>
              {completed.length}/{lessons.length} lessons
            </Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: (progress * 100) + '%' }]} />
          </View>
        </View>

        {tracks.map(track => {
          const trackLessons = lessons.filter(l => l.track === track.id)
          const doneInTrack = trackLessons.filter(l => isComplete(l.id)).length

          return (
            <View
              key={track.id}
              style={styles.trackSection}
              onLayout={e => {
                sectionOffsets.current[track.id] = e.nativeEvent.layout.y
              }}
            >

              <View style={styles.trackHeader}>
                <View style={styles.trackIconContainer}>
                  <Ionicons name={track.icon} size={20} color={colors.accent} />
                </View>
                <View style={styles.trackHeaderText}>
                  <Text style={styles.trackTitle}>{track.title}</Text>
                  <Text style={styles.trackDesc}>{track.description}</Text>
                </View>
              </View>

              <Text style={styles.trackProgress}>
                {doneInTrack} of {trackLessons.length} complete
              </Text>

              {trackLessons.map(lesson => (
                <TouchableOpacity
                  key={lesson.id}
                  style={[
                    styles.lessonCard,
                    isComplete(lesson.id) && styles.lessonCardComplete,
                  ]}
                  onPress={() => navigation.navigate('Lesson', { lesson })}
                  activeOpacity={0.7}
                >
                  <View style={[
                    styles.lessonIconContainer,
                    isComplete(lesson.id) && styles.lessonIconContainerComplete,
                  ]}>
                    <Ionicons
                      name={isComplete(lesson.id) ? 'checkmark' : lesson.icon}
                      size={18}
                      color={colors.accent}
                    />
                  </View>
                  <View style={styles.lessonInfo}>
                    <Text style={styles.lessonTitle}>{lesson.title}</Text>
                    <Text style={styles.lessonMeta}>{lesson.category} · {lesson.duration}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color={colors.muted} />
                </TouchableOpacity>
              ))}

            </View>
          )
        })}

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
  heading: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.white,
    marginBottom: 6,
  },
  subheading: {
    fontSize: typography.sizes.md,
    color: colors.muted,
    marginBottom: 28,
    lineHeight: 22,
  },
  progressCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 36,
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
  trackSection: {
    marginBottom: 36,
  },
  trackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 6,
  },
  trackIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.accent + '18',
    alignItems: 'center',
    justifyContent: 'center',
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
    letterSpacing: 0.8,
    marginBottom: 14,
    marginLeft: 54,
  },
  lessonCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 14,
  },
  lessonCardComplete: {
    borderColor: colors.accent + '33',
    backgroundColor: colors.accent + '08',
  },
  lessonIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.surface2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lessonIconContainerComplete: {
    backgroundColor: colors.accent + '18',
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.white,
    marginBottom: 3,
  },
  lessonMeta: {
    fontSize: typography.sizes.sm,
    color: colors.muted,
  },
})