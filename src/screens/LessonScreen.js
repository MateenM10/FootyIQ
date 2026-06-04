import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
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
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      <Text style={styles.category}>{lesson.category}</Text>
      <Text style={styles.title}>{lesson.icon} {lesson.title}</Text>
      <Text style={styles.duration}>{lesson.duration} read</Text>

      <View style={styles.divider} />

      {lesson.content.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.heading}>{section.heading}</Text>
          <Text style={styles.body}>{section.body}</Text>
        </View>
      ))}

      {isComplete(lesson.id) ? (
        <View style={styles.completedRow}>
          <Text style={styles.completedText}>✓ Completed</Text>
          <TouchableOpacity style={styles.retakeButton} onPress={handleFinish}>
            <Text style={styles.retakeButtonText}>Retake quiz</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleFinish}>
          <Text style={styles.buttonText}>Take the quiz →</Text>
        </TouchableOpacity>
      )}

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
  category: {
    fontSize: typography.sizes.xs,
    color: colors.accent,
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.white,
    marginBottom: 8,
    lineHeight: 34,
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
  },
  heading: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.white,
    marginBottom: 10,
  },
  body: {
    fontSize: typography.sizes.md,
    color: colors.muted,
    lineHeight: 26,
  },
  button: {
    backgroundColor: colors.accent,
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: colors.black,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.md,
  },
  completedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    padding: 16,
    backgroundColor: colors.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  completedText: {
    color: colors.accent,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.md,
  },
  retakeButton: {
    backgroundColor: colors.accent,
    borderRadius: 8,
    padding: 8,
    paddingHorizontal: 14,
  },
  retakeButtonText: {
    color: colors.black,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.sm,
  },
})