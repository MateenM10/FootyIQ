import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import * as Haptics from 'expo-haptics'
import colors from '../theme/colors'
import typography from '../theme/typography'
import useProgress from '../hooks/useProgress'

export default function LessonQuizScreen({ route }) {
  const { lesson, questions } = route.params
  const navigation = useNavigation()
  const { markComplete } = useProgress()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const currentQuestion = questions[currentIndex]
  const isLast = currentIndex === questions.length - 1

  const handleAnswer = (index) => {
    if (answered) return
    setSelected(index)
    setAnswered(true)

    if (index === currentQuestion.correct) {
      setScore(score + 1)
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
    }
  }

  const handleNext = async () => {
    if (isLast) {
      await markComplete(lesson.id)
      setFinished(true)
    } else {
      setCurrentIndex(currentIndex + 1)
      setSelected(null)
      setAnswered(false)
    }
  }

  const getOptionStyle = (index) => {
    if (!answered) return styles.option
    if (index === currentQuestion.correct) return [styles.option, styles.correct]
    if (index === selected) return [styles.option, styles.wrong]
    return styles.option
  }

  const getOptionTextStyle = (index) => {
    if (!answered) return styles.optionText
    if (index === currentQuestion.correct) return [styles.optionText, styles.correctText]
    if (index === selected) return [styles.optionText, styles.wrongText]
    return styles.optionText
  }

  if (finished) {
    return (
      <View style={styles.resultContainer}>
        <Text style={styles.resultIcon}>
          {score === questions.length ? '🏆' : score >= 2 ? '⭐' : '📖'}
        </Text>
        <Text style={styles.resultTitle}>
          {score === questions.length ? 'Perfect score!' : score >= 2 ? 'Well done!' : 'Keep learning!'}
        </Text>
        <Text style={styles.resultScore}>
          {score}/{questions.length} correct
        </Text>
        <Text style={styles.resultSub}>
          {score === questions.length
            ? 'You nailed every question. Lesson complete!'
            : 'Lesson marked as complete. Review it anytime to improve.'}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('LearnList')}
        >
          <Text style={styles.buttonText}>Back to lessons</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      <View style={styles.progressRow}>
        {questions.map((_, i) => (
          <View
            key={i}
            style={[
              styles.progressDot,
              i === currentIndex && styles.progressDotActive,
              i < currentIndex && styles.progressDotDone,
            ]}
          />
        ))}
      </View>

      <Text style={styles.questionCount}>
        Question {currentIndex + 1} of {questions.length}
      </Text>

      <Text style={styles.question}>{currentQuestion.question}</Text>

      {currentQuestion.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={getOptionStyle(index)}
          onPress={() => handleAnswer(index)}
        >
          <Text style={getOptionTextStyle(index)}>{option}</Text>
        </TouchableOpacity>
      ))}

      {answered && (
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {isLast ? 'Finish lesson →' : 'Next question →'}
          </Text>
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
  progressRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 32,
  },
  progressDot: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
  },
  progressDotActive: {
    backgroundColor: colors.accent,
  },
  progressDotDone: {
    backgroundColor: colors.accent,
    opacity: 0.4,
  },
  questionCount: {
    fontSize: typography.sizes.xs,
    color: colors.accent,
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 16,
  },
  question: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.white,
    marginBottom: 28,
    lineHeight: 28,
  },
  option: {
    backgroundColor: colors.surface2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 10,
  },
  optionText: {
    fontSize: typography.sizes.md,
    color: colors.white,
    fontWeight: typography.weights.medium,
  },
  correct: {
    borderColor: '#00C87A',
    backgroundColor: '#00C87A22',
  },
  wrong: {
    borderColor: '#FF4D4D',
    backgroundColor: '#FF4D4D22',
  },
  correctText: {
    color: colors.accent,
  },
  wrongText: {
    color: '#FF4D4D',
  },
  nextButton: {
    backgroundColor: colors.accent,
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  nextButtonText: {
    color: colors.black,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.md,
  },
  resultContainer: {
    flex: 1,
    backgroundColor: colors.black,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  resultIcon: {
    fontSize: 64,
  },
  resultTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.white,
    textAlign: 'center',
  },
  resultScore: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.accent,
  },
  resultSub: {
    fontSize: typography.sizes.md,
    color: colors.muted,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: colors.accent,
    borderRadius: 10,
    padding: 16,
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: colors.black,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.md,
  },
})