import { useState, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import colors from '../theme/colors'
import typography from '../theme/typography'

const slides = [
  {
    icon: '⚽',
    title: 'Welcome to FootyIQ',
    desc: 'The smartest way to learn soccer. From basic rules to advanced tactics.',
  },
  {
    icon: '📖',
    title: 'Learn at your pace',
    desc: 'Bite sized lessons covering rules, positions, formations and more.',
  },
  {
    icon: '⚡',
    title: 'Daily challenges',
    desc: 'One question every day. Build your streak and test your knowledge.',
  },
  {
    icon: '📺',
    title: 'Watch smarter',
    desc: 'Real match results with plain-English breakdowns of what happened and why.',
  },
]

export default function OnboardingScreen({ onDone }) {
  const [index, setIndex] = useState(0)
  const fadeAnim = useRef(new Animated.Value(1)).current

  const transition = (callback) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      callback()
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start()
    })
  }

  const handleNext = () => {
    if (index < slides.length - 1) {
      transition(() => setIndex(index + 1))
    } else {
      transition(() => onDone())
    }
  }

  const handleSkip = () => {
    transition(() => onDone())
  }

  const slide = slides[index]
  const isLast = index === slides.length - 1

  return (
    <View style={styles.container}>

      <View style={styles.dotsRow}>
        {slides.map((_, i) => (
          <View key={i} style={[styles.dot, i === index && styles.activeDot]} />
        ))}
      </View>

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Text style={styles.icon}>{slide.icon}</Text>
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.desc}>{slide.desc}</Text>
      </Animated.View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {isLast ? 'Get started' : 'Next'}
          </Text>
        </TouchableOpacity>

        {!isLast && (
          <TouchableOpacity onPress={handleSkip}>
            <Text style={styles.skip}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    padding: 24,
    paddingTop: 80,
    paddingBottom: 60,
    justifyContent: 'space-between',
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
  activeDot: {
    backgroundColor: colors.accent,
    width: 24,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    paddingHorizontal: 16,
  },
  icon: {
    fontSize: 80,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.white,
    textAlign: 'center',
    lineHeight: 36,
  },
  desc: {
    fontSize: typography.sizes.md,
    color: colors.muted,
    textAlign: 'center',
    lineHeight: 26,
  },
  actions: {
    gap: 16,
  },
  button: {
    backgroundColor: colors.accent,
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.black,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.md,
  },
  skip: {
    color: colors.muted,
    fontSize: typography.sizes.md,
    textAlign: 'center',
  },
})