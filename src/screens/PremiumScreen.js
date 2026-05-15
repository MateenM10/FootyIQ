import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import colors from '../theme/colors'
import typography from '../theme/typography'

const features = [
  { icon: '⚡', title: 'Live Match Companion', desc: 'Get real time explanations while watching any match' },
  { icon: '🧠', title: 'Deep Tactics', desc: 'Advanced breakdowns of formations and playing styles' },
  { icon: '🎮', title: 'Multiplayer Quiz', desc: 'Challenge friends in live trivia battles' },
  { icon: '📈', title: 'Progress Tracking', desc: 'See how your knowledge grows over time' },
  { icon: '🚫', title: 'No Ads', desc: 'Clean and distraction free experience' },
]

export default function PremiumScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      <Text style={styles.heading}>Premium</Text>
      <Text style={styles.subheading}>Take your soccer knowledge to the next level</Text>

      <View style={styles.priceCard}>
        <Text style={styles.priceLabel}>Monthly</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>$4.99</Text>
          <Text style={styles.pricePer}>/month</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Start Free Trial</Text>
        </TouchableOpacity>
        <Text style={styles.trialNote}>7 days free, cancel anytime</Text>
      </View>

      <Text style={styles.sectionTitle}>Everything included</Text>

      {features.map((feature, index) => (
        <View key={index} style={styles.featureRow}>
          <Text style={styles.featureIcon}>{feature.icon}</Text>
          <View style={styles.featureInfo}>
            <Text style={styles.featureTitle}>{feature.title}</Text>
            <Text style={styles.featureDesc}>{feature.desc}</Text>
          </View>
        </View>
      ))}

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
  priceCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.accent,
    padding: 24,
    marginBottom: 32,
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: typography.sizes.sm,
    color: colors.muted,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 24,
    gap: 4,
  },
  price: {
    fontSize: 48,
    fontWeight: typography.weights.bold,
    color: colors.white,
  },
  pricePer: {
    fontSize: typography.sizes.md,
    color: colors.muted,
    marginBottom: 10,
  },
  button: {
    backgroundColor: colors.accent,
    borderRadius: 10,
    padding: 14,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: colors.black,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.md,
  },
  trialNote: {
    fontSize: typography.sizes.sm,
    color: colors.muted,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.white,
    marginBottom: 20,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    marginBottom: 20,
  },
  featureIcon: {
    fontSize: 24,
  },
  featureInfo: {
    flex: 1,
  },
  featureTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.white,
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: typography.sizes.sm,
    color: colors.muted,
    lineHeight: 20,
  },
})