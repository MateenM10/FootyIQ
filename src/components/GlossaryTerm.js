import { useState } from 'react'
import {
  Text, Modal, View, StyleSheet,
  TouchableOpacity, Pressable
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import colors from '../theme/colors'
import typography from '../theme/typography'
import glossary from '../data/glossary'

export default function GlossaryTerm({ termKey, children }) {
  const [visible, setVisible] = useState(false)
  const entry = glossary[termKey]

  if (!entry) return <Text>{children}</Text>

  return (
    <>
      <Text style={styles.trigger} onPress={() => setVisible(true)}>
        {children}
      </Text>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setVisible(false)}>
          <Pressable style={styles.card} onPress={e => e.stopPropagation()}>

            <View style={styles.cardHeader}>
              <View style={styles.iconContainer}>
                <Ionicons name="bulb-outline" size={20} color={colors.accent} />
              </View>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setVisible(false)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Ionicons name="close" size={20} color={colors.muted} />
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Key Term</Text>
            <Text style={styles.term}>{entry.term}</Text>
            <Text style={styles.definition}>{entry.definition}</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => setVisible(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Got it</Text>
            </TouchableOpacity>

          </Pressable>
        </Pressable>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  trigger: {
    color: colors.accent,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.sm,
    textDecorationLine: 'underline',
    textDecorationColor: colors.accent + '66',
    textDecorationStyle: 'dotted',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 28,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 24,
    width: '100%',
    gap: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.accent + '18',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.surface2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: typography.sizes.xs,
    color: colors.accent,
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  term: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.white,
    lineHeight: 26,
  },
  definition: {
    fontSize: typography.sizes.md,
    color: colors.muted,
    lineHeight: 26,
  },
  button: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginTop: 6,
  },
  buttonText: {
    color: colors.black,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.md,
  },
})