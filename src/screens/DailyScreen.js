import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity
} from 'react-native'
import { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Haptics from 'expo-haptics'
import colors from '../theme/colors'
import typography from '../theme/typography'
import questions from '../data/questions'
import useStreak from '../hooks/useStreak'

const getDailyQuestion = () => {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const diff = now - start
  const oneDay = 1000 * 60 * 60 * 24
  const dayOfYear = Math.floor(diff / oneDay)
  return questions[dayOfYear % questions.length]
}

const getStreakMessage = (streak) => {
  if (streak === 0) return 'Answer today to start your streak'
  if (streak >= 30) return 'Incredible — a whole month!'
  if (streak >= 7) return 'One week strong — keep it going'
  if (streak === 1) return 'Great start — come back tomorrow'
  return 'Keep the streak alive'
}

export default function DailyScreen() {
  const question = getDailyQuestion()
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)
  const { streak, incrementStreak, loadStreak } = useStreak()

  useFocusEffect(
    useCallback(() => {
      loadStreak()
      loadAnsweredState()
    }, [])
  )

  const loadAnsweredState = async () => {
    try {
      const saved = await AsyncStorage.getItem('dailyAnswer')
      if (saved) {
        const { date, selected: savedSelected } = JSON.parse(saved)
        const today = new Date().toDateString()
        if (date === today) {
          setSelected(savedSelected)
          setAnswered(true)
        } else {
          setSelected(null)
          setAnswered(false)
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  const handleAnswer = async (index) => {
    if (answered) return
    setSelected(index)
    setAnswered(true)
    incrementStreak()

    try {
      const today = new Date().toDateString()
      await AsyncStorage.setItem('dailyAnswer', JSON.stringify({
        date: today,
        selected: index,
      }))
    } catch (e) {
      console.log(e)
    }

    if (index === question.correct) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
    }
  }

  const getFeedback = () => {
    if (selected === question.correct) return 'Correct! Great job.'
    return 'Not quite. The answer is ' + question.options[question.correct] + '.'
  }

  const isCorrect = answered && selected === question.correct

  const getOptionStyle = (index) => {
    if (!answered) return styles.option
    if (index === question.correct) return [styles.option, styles.optionCorrect]
    if (index === selected) return [styles.option, styles.optionWrong]
    return [styles.option, styles.optionDimmed]
  }

  const getOptionTextStyle = (index) => {
    if (!answered) return styles.optionText
    if (index === question.correct) return [styles.optionText, styles.optionTextCorrect]
    if (index === selected) return [styles.optionText, styles.optionTextWrong]
    return [styles.optionText, styles.optionTextDimmed]
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        <Text style={styles.heading}>Daily Challenge</Text>
        <Text style={styles.subheading}>One question every day. Keep your streak alive.</Text>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Today's Question</Text>
          <Text style={styles.question}>{question.question}</Text>

          <View style={styles.optionsContainer}>
            {question.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={getOptionStyle(index)}
                onPress={() => handleAnswer(index)}
                disabled={answered}
                activeOpacity={0.7}
              >
                <Text style={getOptionTextStyle(index)}>{option}</Text>
                {answered && index === question.correct && (
                  <Ionicons name="checkmark-circle" size={18} color={colors.accent} />
                )}
                {answered && index === selected && index !== question.correct && (
                  <Ionicons name="close-circle" size={18} color="#FF4D4D" />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {answered && (
            <View style={[
              styles.feedbackRow,
              isCorrect ? styles.feedbackCorrect : styles.feedbackWrong,
            ]}>
              <Ionicons
                name={isCorrect ? 'checkmark-circle-outline' : 'information-circle-outline'}
                size={18}
                color={isCorrect ? colors.accent : '#FF4D4D'}
              />
              <Text style={[
                styles.feedbackText,
                isCorrect ? styles.feedbackTextCorrect : styles.feedbackTextWrong,
              ]}>
                {getFeedback()}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.streakCard}>
          <View style={styles.streakIconRow}>
            <Ionicons
              name={streak > 0 ? 'flame' : 'flame-outline'}
              size={32}
              color={streak > 0 ? colors.accent : colors.muted}
            />
          </View>
          <Text style={styles.streakValue}>
            {streak === 0 ? '—' : streak}
          </Text>
          <Text style={styles.streakUnit}>
            {streak === 1 ? 'day streak' : 'day streak'}
          </Text>
          <Text style={styles.streakMessage}>{getStreakMessage(streak)}</Text>
        </View>

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
  heading: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.white,
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  subheading: {
    fontSize: typography.sizes.md,
    color: colors.muted,
    marginBottom: 28,
    lineHeight: 22,
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
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  question: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.white,
    marginBottom: 24,
    lineHeight: 28,
  },
  optionsContainer: {
    gap: 8,
  },
  option: {
    backgroundColor: colors.surface2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
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
    opacity: 0.4,
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
  feedbackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
    padding: 12,
    borderRadius: 10,
  },
  feedbackCorrect: {
    backgroundColor: colors.accent + '14',
  },
  feedbackWrong: {
    backgroundColor: '#FF4D4D14',
  },
  feedbackText: {
    fontSize: typography.sizes.sm,
    flex: 1,
    lineHeight: 20,
  },
  feedbackTextCorrect: {
    color: colors.accent,
  },
  feedbackTextWrong: {
    color: '#FF4D4D',
  },
  streakCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 24,
    alignItems: 'center',
    gap: 4,
  },
  streakIconRow: {
    marginBottom: 8,
  },
  streakValue: {
    fontSize: 48,
    fontWeight: typography.weights.bold,
    color: colors.white,
    lineHeight: 56,
  },
  streakUnit: {
    fontSize: typography.sizes.sm,
    color: colors.muted,
    fontWeight: typography.weights.medium,
  },
  streakMessage: {
    fontSize: typography.sizes.sm,
    color: colors.muted,
    textAlign: 'center',
    marginTop: 4,
  },
})