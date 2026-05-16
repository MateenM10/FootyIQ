import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import colors from '../theme/colors'
import typography from '../theme/typography'

export default function HomeScreen() {
  const navigation = useNavigation()

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      <View style={styles.header}>
        <Text style={styles.logo}>Footy<Text style={styles.logoAccent}>IQ</Text></Text>
        <Text style={styles.tagline}>Learn soccer like a pro</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Today's Challenge</Text>
        <Text style={styles.cardTitle}>How many players are on a soccer team?</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Daily')}
        >
          <Text style={styles.buttonText}>Play now →</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>What do you want to learn?</Text>

      <View style={styles.topicGrid}>
        <TouchableOpacity
          style={styles.topicCard}
          onPress={() => navigation.navigate('Learn')}
        >
          <Text style={styles.topicIcon}>📖</Text>
          <Text style={styles.topicName}>Rules</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.topicCard}
          onPress={() => navigation.navigate('Learn')}
        >
          <Text style={styles.topicIcon}>🏃</Text>
          <Text style={styles.topicName}>Positions</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.topicCard}
          onPress={() => navigation.navigate('Learn')}
        >
          <Text style={styles.topicIcon}>🧠</Text>
          <Text style={styles.topicName}>Tactics</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.topicCard}
          onPress={() => navigation.navigate('Learn')}
        >
          <Text style={styles.topicIcon}>🏆</Text>
          <Text style={styles.topicName}>History</Text>
        </TouchableOpacity>
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
  header: {
    marginBottom: 32,
  },
  logo: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.white,
  },
  logoAccent: {
    color: colors.accent,
  },
  tagline: {
    fontSize: typography.sizes.md,
    color: colors.muted,
    marginTop: 4,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardLabel: {
    fontSize: typography.sizes.xs,
    color: colors.accent,
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: typography.sizes.lg,
    color: colors.white,
    fontWeight: typography.weights.bold,
    marginBottom: 16,
    lineHeight: 28,
  },
  button: {
    backgroundColor: colors.accent,
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.black,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.md,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.white,
    marginBottom: 16,
  },
  topicGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  topicCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
    width: '47%',
    alignItems: 'center',
    gap: 8,
  },
  topicIcon: {
    fontSize: 28,
  },
  topicName: {
    fontSize: typography.sizes.md,
    color: colors.white,
    fontWeight: typography.weights.medium,
  },
})