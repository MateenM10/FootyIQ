import { View, Text, StyleSheet } from 'react-native'
import colors from '../theme/colors'
import typography from '../theme/typography'

export default function PremiumScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Premium</Text>
      <Text style={styles.subtitle}>Coming soon</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.white,
  },
  subtitle: {
    fontSize: typography.sizes.md,
    color: colors.muted,
    marginTop: 8,
  },
})