import { View, Text, StyleSheet, ScrollView } from 'react-native'
import colors from '../theme/colors'
import typography from '../theme/typography'

export default function LessonScreen({ route }) {
  const { lesson } = route.params

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      <Text style={styles.category}>{lesson.category}</Text>
      <Text style={styles.title}>{lesson.icon} {lesson.title}</Text>
      <Text style={styles.duration}>{lesson.duration} read</Text>

      <View style={styles.divider} />

      {lesson.content.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.heading}>{section.heading}</Text>
          <Text style={styles.body}>{section.body}</Text>
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
  category: {
    fontSize: typography.sizes.xs,
    color: colors.accent,
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.white,
    marginBottom: 8,
    lineHeight: 34,
  },
  duration: {
    fontSize: typography.sizes.sm,
    color: colors.muted,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 28,
  },
  section: {
    marginBottom: 28,
  },
  heading: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.white,
    marginBottom: 10,
  },
  body: {
    fontSize: typography.sizes.md,
    color: colors.muted,
    lineHeight: 26,
  },
})