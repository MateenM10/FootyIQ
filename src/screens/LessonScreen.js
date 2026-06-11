import {
  View, Text, StyleSheet, TouchableOpacity
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import colors from '../theme/colors'
import typography from '../theme/typography'
import useProgress from '../hooks/useProgress'
import lessonQuizzes from '../data/lessonQuizzes'
import ScreenWrapper from '../components/ScreenWrapper'
import Card from '../components/Card'
import SectionLabel from '../components/SectionLabel'
import IconContainer from '../components/IconContainer'
import PrimaryButton from '../components/PrimaryButton'

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
    <ScreenWrapper edges={['bottom']} contentStyle={styles.content}>

      <View style={styles.lessonHeader}>
        <IconContainer
          icon={lesson.icon}
          size={52}
          iconSize={26}
          color={colors.accent}
          style={{ marginTop: 2, flexShrink: 0 }}
        />
        <View style={styles.headerText}>
          <SectionLabel>{lesson.category}</SectionLabel>
          <Text style={styles.title}>{lesson.title}</Text>
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
        <Card style={styles.completedRow}>
          <View style={styles.completedBadge}>
            <Ionicons name="checkmark-circle" size={18} color={colors.accent} />
            <Text style={styles.completedText}>Completed</Text>
          </View>
          <TouchableOpacity style={styles.retakeButton} onPress={handleFinish}>
            <Text style={styles.retakeButtonText}>Retake quiz</Text>
          </TouchableOpacity>
        </Card>
      ) : (
        <PrimaryButton label="Take the quiz" onPress={handleFinish} />
      )}

    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
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
  headerText: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.white,
    lineHeight: 30,
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
    borderRadius: 12,
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
})