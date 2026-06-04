import { useState } from 'react'
import { Text, Modal, View, StyleSheet, TouchableOpacity, Pressable } from 'react-native'
import colors from '../theme/colors'
import typography from '../theme/typography'
import glossary from '../data/glossary'

export default function GlossaryTerm({ termKey, children }) {
  const [visible, setVisible] = useState(false)
  const entry = glossary[termKey]

  if (!entry) {
    return <Text>{children}</Text>
  }

  return (
    <>
      <Text style={styles.term} onPress={() => setVisible(true)}>
        {children}
      </Text>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          <Pressable style={styles.card} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.cardLabel}>Key Term</Text>
            <Text style={styles.cardTerm}>{entry.term}</Text>
            <Text style={styles.cardDefinition}>{entry.definition}</Text>
            <TouchableOpacity style={styles.button} onPress={() => setVisible(false)}>
              <Text style={styles.buttonText}>Got it</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  term: {
    color: colors.accent,
    fontWeight: typography.weights.bold,
    textDecorationLine: 'underline',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 24,
    width: '100%',
    gap: 12,
  },
  cardLabel: {
    fontSize: typography.sizes.xs,
    color: colors.accent,
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  cardTerm: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.white,
  },
  cardDefinition: {
    fontSize: typography.sizes.md,
    color: colors.muted,
    lineHeight: 24,
  },
  button: {
    backgroundColor: colors.accent,
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: colors.black,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.md,
  },
})