import {
  View, Text, StyleSheet, TouchableOpacity
} from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import * as Haptics from 'expo-haptics'
import colors from '../theme/colors'
import typography from '../theme/typography'
import useProgress from '../hooks/useProgress'
import ScreenWrapper from '../components/ScreenWrapper'
import SectionLabel from '../components/SectionLabel'
import PrimaryButton from '../components/PrimaryButton'

const getResult = (score, total) => {
  if (score === total) return {
    icon: 'trophy',
    iconColor: '#FFB800',
    title: 'Perfect score!',
    sub: 'You nailed every question. Lesson complete.',
  }
  if (score >= Math.ceil(total / 2)) return {
    icon: 'star',
    iconColor: colors.accent,
    title: 'Well done!',
    sub: 'Lesson marked as complete. Review it anytime.',
  }
  return {
    icon: 'book-outline',
    iconColor: colors.muted,
    title: 'Keep learning!',
    sub: 'Lesson marked as complete. Review it anytime.',
  }
}

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
      setScore(prev => prev + 1)
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
      setCurrentIndex(prev => prev + 1)
      setSelected(null)
      setAnswered(false)
    }
  }

  const getOptionStyle = (index) => {
    if (!answered) return styles.option
    if (index === currentQuestion.correct) return [styles.option, styles.optionCorrect]
    if (index === selected) return [styles.option, styles.optionWrong]
    return [styles.option, styles.optionDimmed]
  }

  const getOptionTextStyle = (index) => {
    if (!answered) return styles.optionText
    if (index === currentQuestion.correct) return [styles.optionText, styles.optionTextCorrect]
    if (index === selected) return [styles.optionText, styles.optionTextWrong]
    return [styles.optionText, styles.optionTextDimmed]
  }

  if (finished) {
    const result = getResult(score, questions.length)
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.black }}>
        <View style={styles.resultContainer}>
          <View style={[styles.resultIconContainer, { borderColor: result.iconColor + '44' }]}>
            <Ionicons name={result.icon} size={40} color={result.iconColor} />
          </View>
          <Text style={styles.resultTitle}>{result.title}</Text>
          <View style={styles.scoreRow}>
            <Text style={styles.scoreValue}>{score}</Text>
            <Text style={styles.scoreSeparator}>/</Text>
            <Text style={styles.scoreTotal}>{questions.length}</Text>
          </View>
          <Text style={styles.scoreSub}>correct</Text>
          <Text style={styles.resultSub}>{result.sub}</Text>
          <PrimaryButton
            label="Back to lessons"
            onPress={() => navigation.navigate('LearnList')}
            style={{ width: '100%', marginTop: 12 }}
          />
        </View>
      </SafeAreaView>
    )
  }

  return (
    <ScreenWrapper edges={['bottom']} contentStyle={styles.content}>

      <View style={styles.progressRow}>
        {questions.map((_, i) => (
          <View
            key={i}
            style={[
              styles.progressSegment,
              i < currentIndex && styles.progressSegmentDone,
              i === currentIndex && styles.progressSegmentActive,
            ]}
          />
        ))}
      </View>

      <SectionLabel style={{ marginBottom: 14 }}>
        Question {currentIndex + 1} of {questions.length}
      </SectionLabel>

      <Text style={styles.question}>{currentQuestion.question}</Text>

      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={getOptionStyle(index)}
            onPress={() => handleAnswer(index)}
            disabled={answered}
            activeOpacity={0.7}
          >
            <Text style={getOptionTextStyle(index)}>{option}</Text>
            {answered && index === currentQuestion.correct && (
              <Ionicons name="checkmark-circle" size={18} color={colors.accent} />
            )}
            {answered && index === selected && index !== currentQuestion.correct && (
              <Ionicons name="close-circle" size={18} color="#FF4D4D" />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {answered && (
        <PrimaryButton
          label={isLast ? 'Finish lesson' : 'Next question'}
          onPress={handleNext}
          style={{ marginTop: 8 }}
        />
      )}

    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  progressRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 28,
  },
  progressSegment: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
  },
  progressSegmentActive: {
    backgroundColor: colors.accent,
  },
  progressSegmentDone: {
    backgroundColor: colors.accent + '55',
  },
  question: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.white,
    marginBottom: 28,
    lineHeight: 28,
  },
  optionsContainer: {
    gap: 8,
    marginBottom: 16,
  },
  option: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionCorrect: {
    borderColor: colors.accent,
    backgroundColor: colors.accent + '18',
  },
  optionWrong: {
    borderColor: '#FF4D4D',
    backgroundColor: '#FF4D4D18',
  },
  optionDimmed: {
    opacity: 0.35,
  },
  optionText: {
    fontSize: typography.sizes.md,
    color: colors.white,
    fontWeight: typography.weights.medium,
    flex: 1,
  },
  optionTextCorrect: {
    color: colors.accent,
    fontWeight: typography.weights.bold,
  },
  optionTextWrong: {
    color: '#FF4D4D',
  },
  optionTextDimmed: {
    color: colors.muted,
  },
  resultContainer: {
    flex: 1,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  resultIconContainer: {
    width: 88,
    height: 88,
    borderRadius: 24,
    backgroundColor: colors.surface,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  resultTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.white,
    textAlign: 'center',
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
  },
  scoreValue: {
    fontSize: 56,
    fontWeight: typography.weights.bold,
    color: colors.white,
    lineHeight: 64,
  },
  scoreSeparator: {
    fontSize: 32,
    color: colors.muted,
    lineHeight: 64,
  },
  scoreTotal: {
    fontSize: 32,
    color: colors.muted,
    lineHeight: 64,
  },
  scoreSub: {
    fontSize: typography.sizes.sm,
    color: colors.muted,
    marginTop: -8,
  },
  resultSub: {
    fontSize: typography.sizes.md,
    color: colors.muted,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 16,
    marginTop: 4,
  },
})