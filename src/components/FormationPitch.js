import { View, StyleSheet } from 'react-native'

export default function FormationPitch({ formation, color }) {
  // Turn "4-3-3" into [4, 3, 3]
  const outfield = formation.split('-').map(n => parseInt(n))

  // outfield goes defense -> attack. Reverse it so forwards are first (top),
  // then add the goalkeeper (1) at the end so they sit at the bottom.
  const lines = [...[...outfield].reverse(), 1]

  return (
    <View style={styles.pitch}>
      <View style={styles.halfwayLine} />
      <View style={styles.centerCircle} />

      {lines.map((count, lineIndex) => (
        <View key={lineIndex} style={styles.line}>
          {Array.from({ length: count }).map((_, dotIndex) => (
            <View key={dotIndex} style={[styles.dot, { backgroundColor: color }]} />
          ))}
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  pitch: {
    backgroundColor: '#2E7D46',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    aspectRatio: 0.7,
    padding: 16,
    justifyContent: 'space-evenly',
    overflow: 'hidden',
  },
  halfwayLine: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  centerCircle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    transform: [{ translateX: -40 }, { translateY: -40 }],
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#fff',
  },
})