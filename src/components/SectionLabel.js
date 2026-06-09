import { Text, StyleSheet } from 'react-native'
import colors from '../theme/colors'
import typography from '../theme/typography'

export default function SectionLabel({ children, style }) {
  return (
    <Text style={[styles.label, style]}>{children}</Text>
  )
}

const styles = StyleSheet.create({
  label: {
    fontSize: typography.sizes.xs,
    color: colors.accent,
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
})