import { useState, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import colors from '../theme/colors'
import typography from '../theme/typography'

const slides = [
  {
    icon: 'football-outline',
    title: 'Welcome to FootyIQ',
    desc: 'The smartest way to learn soccer. From basic rules to advanced tactics.',
  },
  {
    icon: 'book-outline',
    title: 'Learn at your pace',
    desc: 'Bite-sized lessons covering rules, positions, formations and more.',
  },
  {
    icon: 'flash-outline',
    title: 'Daily challenges',
    desc: 'One question every day. Build your streak and test your knowledge.',
  },
  {
    icon: 'tv-outline',
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
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        <View style={styles.dotsRow}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === index && styles.dotActive,
                i < index && styles.dotPast,
              ]}
            />
          ))}
        </View>

        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <View style={styles.iconContainer}>
            <Ionicons name={slide.icon} size={40} color={colors.accent} />
          </View>
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.desc}>{slide.desc}</Text>
        </Animated.View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNext}
            activeOpacity={0.8}
          >
            <Text style={styles.nextButtonText}>
              {isLast ? 'Get started' : 'Next'}
            </Text>
            <Ionicons
              name={isLast ? 'checkmark' : 'arrow-forward'}
              size={16}
              color={colors.black}
            />
          </TouchableOpacity>

          {!isLast && (
            <TouchableOpacity
              style={styles.skipButton}
              onPress={handleSkip}
              activeOpacity={0.7}
            >
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          )}
        </View>

      </View>
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
    paddingHorizontal: 28,
    paddingTop: 48,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 6,
    alignSelf: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.border,
  },
  dotActive: {
    backgroundColor: colors.accent,
    width: 20,
    borderRadius: 3,
  },
  dotPast: {
    backgroundColor: colors.accent + '44',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    paddingHorizontal: 8,
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 28,
    backgroundColor: colors.accent + '18',
    borderWidth: 1,
    borderColor: colors.accent + '33',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.white,
    textAlign: 'center',
    lineHeight: 34,
    letterSpacing: -0.3,
  },
  desc: {
    fontSize: typography.sizes.md,
    color: colors.muted,
    textAlign: 'center',
    lineHeight: 26,
  },
  actions: {
    gap: 12,
  },
  nextButton: {
    backgroundColor: colors.accent,
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  nextButtonText: {
    color: colors.black,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.md,
  },
  skipButton: {
    padding: 12,
    alignItems: 'center',
  },
  skipText: {
    color: colors.muted,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
  },
})