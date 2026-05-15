import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import colors from '../theme/colors'
import typography from '../theme/typography'
import questions from '../data/questions'

const getDailyQuestion = () => {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const diff = now - start
  const oneDay = 1000 * 60 * 60 * 24
  const dayOfYear = Math.floor(diff / oneDay)
  return questions[dayOfYear % questions.length]
}

export default function DailyScreen() {
  const question = getDailyQuestion()
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)

  const handleAnswer = (index) => {
    if (answered) return
    setSelected(index)
    setAnswered(true)
  }

  const getFeedback = () => {
    if (selected === question.correct) {
      return 'Correct! Great job!'
    }
    return 'Not quite. The answer is ' + question.options[question.correct] + '.'
  }

  const getOptionStyle = (index) => {
    if (!answered) return styles.option
    if (index === question.correct) return [styles.option, styles.correct]
    if (index === selected) return [styles.option, styles.wrong]
    return styles.option
  }

  const getOptionTextStyle = (index) => {
    if (!answered) return styles.optionText
    if (index === question.correct) return [styles.optionText, styles.correctText]
    if (index === selected) return [styles.optionText, styles.wrongText]
    return styles.optionText
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      <Text style={styles.heading}>Daily Challenge</Text>
      <Text style={styles.subheading}>One question every day. Keep your streak alive.</Text>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Today's Question</Text>
        <Text style={styles.question}>{question.question}</Text>

        {question.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={getOptionStyle(index)}
            onPress={() => handleAnswer(index)}
          >
            <Text style={getOptionTextStyle(index)}>{option}</Text>
          </TouchableOpacity>
        ))}

        {answered && (
          <Text style={styles.feedback}>{getFeedback()}</Text>
        )}
      </View>

      <View style={styles.streakCard}>
        <Text style={styles.streakLabel}>Current Streak</Text>
        <Text style={styles.streakValue}>1 day</Text>
      </View>

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
    marginBottom: 32,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
    marginBottom: 16,
  },
  cardLabel: {
    fontSize: typography.sizes.xs,
    color: colors.accent,
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  question: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.white,
    marginBottom: 24,
    lineHeight: 28,
  },
  option: {
    backgroundColor: colors.surface2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
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
  feedback: {
    fontSize: typography.sizes.md,
    color: colors.white,
    marginTop: 8,
    lineHeight: 22,
  },
  streakCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
    alignItems: 'center',
  },
  streakLabel: {
    fontSize: typography.sizes.sm,
    color: colors.muted,
    marginBottom: 8,
  },
  streakValue: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.white,
  },
})