import { View, StyleSheet, Animated } from 'react-native'
import { useEffect, useRef } from 'react'
import colors from '../theme/colors'

const Block = ({ style, opacity }) => (
  <Animated.View style={[styles.block, style, { opacity }]} />
)

export default function SkeletonFixtureCard() {
  const pulse = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 750, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 750, useNativeDriver: true }),
      ])
    ).start()
  }, [])

  const opacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.25, 0.6],
  })

  return (
    <View style={styles.card}>

      {/* Competition label + status badge */}
      <View style={styles.headerRow}>
        <Block style={styles.competitionLabel} opacity={opacity} />
        <Block style={styles.statusBadge} opacity={opacity} />
      </View>

      {/* Home team — score — away team */}
      <View style={styles.teamsRow}>
        <View style={styles.team}>
          <Block style={styles.logo} opacity={opacity} />
          <Block style={styles.teamName} opacity={opacity} />
        </View>
        <Block style={styles.scoreBox} opacity={opacity} />
        <View style={styles.team}>
          <Block style={styles.logo} opacity={opacity} />
          <Block style={styles.teamName} opacity={opacity} />
        </View>
      </View>

      {/* Match guide row */}
      <View style={styles.guideRow}>
        <Block style={styles.guideLabel} opacity={opacity} />
        <Block style={styles.chevron} opacity={opacity} />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    gap: 16,
  },
  block: {
    backgroundColor: colors.surface2,
    borderRadius: 5,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  competitionLabel: {
    width: 110,
    height: 10,
  },
  statusBadge: {
    width: 50,
    height: 20,
    borderRadius: 6,
  },
  teamsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  team: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  teamName: {
    width: 68,
    height: 10,
  },
  scoreBox: {
    width: 52,
    height: 36,
    borderRadius: 8,
  },
  guideRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  guideLabel: {
    width: 80,
    height: 10,
  },
  chevron: {
    width: 14,
    height: 14,
    borderRadius: 3,
  },
})