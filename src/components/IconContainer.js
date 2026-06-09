import { View, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import colors from '../theme/colors'

export default function IconContainer({
  icon,
  size = 40,
  iconSize,
  color,
  style,
}) {
  const iconColor = color || colors.accent
  const computedIconSize = iconSize || Math.round(size * 0.48)
  const borderRadius = Math.round(size * 0.28)

  return (
    <View style={[
      styles.container,
      {
        width: size,
        height: size,
        borderRadius,
        backgroundColor: iconColor + '18',
      },
      style,
    ]}>
      <Ionicons name={icon} size={computedIconSize} color={iconColor} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
})