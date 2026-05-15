import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import colors from '../theme/colors'
import typography from '../theme/typography'
import lessons from '../data/lessons'

export default function LearnScreen() {
  const navigation = useNavigation()

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      <Text style={styles.heading}>Learn</Text>
      <Text style={styles.subheading}>Pick a lesson to get started</Text>

      {lessons.map(lesson => (
        <TouchableOpacity
          key={lesson.id}
          style={styles.lessonCard}
          onPress={() => navigation.navigate('Lesson', { lesson })}
        >
          <Text style={styles.lessonIcon}>{lesson.icon}</Text>
          <View style={styles.lessonInfo}>
            <Text style={styles.lessonTitle}>{lesson.title}</Text>
            <Text style={styles.lessonMeta}>{lesson.category} · {lesson.duration}</Text>
          </View>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
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
  heading: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.white,
    marginBottom: 8,
  },
  subheading: {
    fontSize: typography.sizes.md,
    color: colors.muted,
    marginBottom: 32,
  },
  lessonCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 14,
  },
  lessonIcon: {
    fontSize: 28,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.white,
    marginBottom: 4,
  },
  lessonMeta: {
    fontSize: typography.sizes.sm,
    color: colors.muted,
  },
  arrow: {
    fontSize: typography.sizes.lg,
    color: colors.accent,
  },
})