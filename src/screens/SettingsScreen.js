import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import colors from '../theme/colors'
import typography from '../theme/typography'

export default function SettingsScreen() {

  const resetProgress = () => {
    Alert.alert(
      'Reset Lesson Progress',
      'This will clear all completed lessons. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('completedLessons')
            Alert.alert('Done', 'Your lesson progress has been reset.')
          },
        },
      ]
    )
  }

  const resetStreak = () => {
    Alert.alert(
      'Reset Streak',
      'This will reset your daily streak back to zero. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('streak')
            await AsyncStorage.removeItem('lastPlayed')
            Alert.alert('Done', 'Your streak has been reset.')
          },
        },
      ]
    )
  }

  const clearAllData = () => {
    Alert.alert(
      'Clear All Data',
      'This resets everything — progress, streak, and onboarding. The app will feel brand new.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear Everything',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.clear()
            Alert.alert('Done', 'All data has been cleared.')
          },
        },
      ]
    )
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      <Text style={styles.heading}>Settings</Text>

      <Text style={styles.sectionLabel}>Progress</Text>
      <View style={styles.card}>
        <TouchableOpacity style={styles.row} onPress={resetProgress}>
          <View style={styles.rowText}>
            <Text style={styles.rowTitle}>Reset lesson progress</Text>
            <Text style={styles.rowSub}>Clear all completed lessons</Text>
          </View>
          <Text style={styles.rowArrow}>→</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.row} onPress={resetStreak}>
          <View style={styles.rowText}>
            <Text style={styles.rowTitle}>Reset streak</Text>
            <Text style={styles.rowSub}>Reset your daily challenge streak to zero</Text>
          </View>
          <Text style={styles.rowArrow}>→</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionLabel}>Data</Text>
      <View style={styles.card}>
        <TouchableOpacity style={styles.row} onPress={clearAllData}>
          <View style={styles.rowText}>
            <Text style={[styles.rowTitle, styles.destructive]}>Clear all data</Text>
            <Text style={styles.rowSub}>Reset everything including onboarding</Text>
          </View>
          <Text style={styles.rowArrow}>→</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionLabel}>About</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.rowTitle}>App</Text>
          <Text style={styles.rowValue}>FootyIQ</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.rowTitle}>Version</Text>
          <Text style={styles.rowValue}>1.0.0</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.rowTitle}>Built with</Text>
          <Text style={styles.rowValue}>React Native + Expo</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.rowTitle}>Match data</Text>
          <Text style={styles.rowValue}>API-Football</Text>
        </View>
      </View>

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
    paddingBottom: 40,
    gap: 12,
  },
  heading: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.white,
    marginBottom: 8,
  },
  sectionLabel: {
    fontSize: typography.sizes.xs,
    color: colors.accent,
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 8,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  rowText: {
    flex: 1,
    gap: 3,
  },
  rowTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    color: colors.white,
  },
  rowSub: {
    fontSize: typography.sizes.sm,
    color: colors.muted,
  },
  rowArrow: {
    fontSize: typography.sizes.md,
    color: colors.muted,
    marginLeft: 12,
  },
  rowValue: {
    fontSize: typography.sizes.sm,
    color: colors.muted,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 16,
  },
  destructive: {
    color: '#FF4D4D',
  },
})