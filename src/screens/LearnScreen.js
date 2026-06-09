import {
  View, Text, StyleSheet, ActivityIndicator
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
import ScreenWrapper from '../components/ScreenWrapper'
import Card from '../components/Card'
import SectionLabel from '../components/SectionLabel'
import IconContainer from '../components/IconContainer'

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
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.black }} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.accent} />
        </View>
      </SafeAreaView>
    )
  }

  return (
    <ScreenWrapper edges={['top']} scrollRef={scrollViewRef} contentStyle={styles.content}>

      <Text style={styles.heading}>Learn</Text>
      <Text style={styles.subheading}>Work through the tracks at your own pace</Text>

      <Card style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Overall progress</Text>
          <Text style={styles.progressCount}>
            {completed.length}/{lessons.length} lessons
          </Text>
        </View>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: (progress * 100) + '%' }]} />
        </View>
      </Card>

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
              <IconContainer icon={track.icon} color={colors.accent} />
              <View style={styles.trackHeaderText}>
                <Text style={styles.trackTitle}>{track.title}</Text>
                <Text style={styles.trackDesc}>{track.description}</Text>
              </View>
            </View>

            <SectionLabel style={styles.trackProgress}>
              {doneInTrack} of {trackLessons.length} complete
            </SectionLabel>

            {trackLessons.map(lesson => (
              <Card
                key={lesson.id}
                style={[
                  styles.lessonCard,
                  isComplete(lesson.id) && styles.lessonCardComplete,
                ]}
                onPress={() => navigation.navigate('Lesson', { lesson })}
              >
                <IconContainer
                  icon={isComplete(lesson.id) ? 'checkmark' : lesson.icon}
                  color={colors.accent}
                  style={!isComplete(lesson.id) && { backgroundColor: colors.surface2 }}
                />
                <View style={styles.lessonInfo}>
                  <Text style={styles.lessonTitle}>{lesson.title}</Text>
                  <Text style={styles.lessonMeta}>{lesson.category} · {lesson.duration}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={colors.muted} />
              </Card>
            ))}

          </View>
        )
      })}

    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    marginBottom: 14,
    marginLeft: 54,
  },
  lessonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    marginBottom: 10,
    gap: 14,
  },
  lessonCardComplete: {
    borderColor: colors.accent + '33',
    backgroundColor: colors.accent + '08',
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