import { useState, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../theme/colors'
import typography from '../theme/typography'
import IconContainer from '../components/IconContainer'
import PrimaryButton from '../components/PrimaryButton'

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
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.black }}>
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
          <IconContainer
            icon={slide.icon}
            size={96}
            iconSize={40}
            color={colors.accent}
            style={{
              borderWidth: 1,
              borderColor: colors.accent + '33',
              borderRadius: 28,
              marginBottom: 8,
            }}
          />
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.desc}>{slide.desc}</Text>
        </Animated.View>

        <View style={styles.actions}>
          <PrimaryButton
            label={isLast ? 'Get started' : 'Next'}
            icon={isLast ? 'checkmark' : 'arrow-forward'}
            onPress={handleNext}
          />
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