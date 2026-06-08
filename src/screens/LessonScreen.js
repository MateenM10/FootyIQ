import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import colors from '../theme/colors'
import typography from '../theme/typography'
import useProgress from '../hooks/useProgress'
import lessonQuizzes from '../data/lessonQuizzes'

export default function LessonScreen({ route }) {
  const { lesson } = route.params
  const navigation = useNavigation()
  const { isComplete } = useProgress()

  const hasQuiz = lessonQuizzes[lesson.id] !== undefined

  const handleFinish = () => {
    if (hasQuiz) {
      navigation.navigate('LessonQuiz', {
        lesson,
        questions: lessonQuizzes[lesson.id],
      })
    }
  }

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.lessonHeader}>
          <View style={styles.iconContainer}>
            <Ionicons name={lesson.icon} size={26} color={colors.accent} />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.category}>{lesson.category}</Text>
            <Text style={styles.title}>{lesson.title}</Text>
            <View style={styles.durationRow}>
              <Ionicons name="time-outline" size={13} color={colors.muted} />
              <Text style={styles.duration}>{lesson.duration} read</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {lesson.content.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.heading}>{section.heading}</Text>
            <Text style={styles.body}>{section.body}</Text>
          </View>
        ))}

        <View style={styles.divider} />

        {isComplete(lesson.id) ? (
          <View style={styles.completedRow}>
            <View style={styles.completedBadge}>
              <Ionicons name="checkmark-circle" size={18} color={colors.accent} />
              <Text style={styles.completedText}>Completed</Text>
            </View>
            <TouchableOpacity style={styles.retakeButton} onPress={handleFinish}>
              <Text style={styles.retakeButtonText}>Retake quiz</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.quizButton}
            onPress={handleFinish}
            activeOpacity={0.8}
          >
            <Text style={styles.quizButtonText}>Take the quiz</Text>
            <Ionicons name="arrow-forward" size={16} color={colors.black} />
          </TouchableOpacity>
        )}

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
  },
  lessonHeader: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: colors.accent + '18',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
    flexShrink: 0,
  },
  headerText: {
    flex: 1,
    gap: 4,
  },
  category: {
    fontSize: typography.sizes.xs,
    color: colors.accent,
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.white,
    lineHeight: 30,
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  duration: {
    fontSize: typography.sizes.sm,
    color: colors.muted,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 28,
  },
  section: {
    marginBottom: 28,
    gap: 10,
  },
  heading: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.white,
  },
  body: {
    fontSize: typography.sizes.md,
    color: colors.muted,
    lineHeight: 26,
  },
  completedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.accent + '44',
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  completedText: {
    color: colors.accent,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.md,
  },
  retakeButton: {
    backgroundColor: colors.surface2,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  retakeButtonText: {
    color: colors.white,
    fontWeight: typography.weights.medium,
    fontSize: typography.sizes.sm,
  },
  quizButton: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  quizButtonText: {
    color: colors.black,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.md,
  },
})