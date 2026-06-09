import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import colors from '../theme/colors'
import typography from '../theme/typography'

export default function PrimaryButton({
  label,
  onPress,
  icon = 'arrow-forward',
  showIcon = true,
  style,
  disabled,
}) {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled, style]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <Text style={styles.label}>{label}</Text>
      {showIcon && (
        <Ionicons name={icon} size={16} color={colors.black} />
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    color: colors.black,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.md,
  },
})