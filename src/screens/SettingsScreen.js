import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Alert
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import colors from '../theme/colors'
import typography from '../theme/typography'

const SettingsRow = ({ icon, iconColor = colors.accent, label, sub, value, onPress, destructive }) => (
  <TouchableOpacity
    style={styles.row}
    onPress={onPress}
    disabled={!onPress}
    activeOpacity={onPress ? 0.6 : 1}
  >
    <View style={[styles.rowIcon, { backgroundColor: (iconColor || colors.accent) + '18' }]}>
      <Ionicons name={icon} size={17} color={iconColor || colors.accent} />
    </View>
    <View style={styles.rowContent}>
      <Text style={[styles.rowLabel, destructive && styles.destructiveLabel]}>{label}</Text>
      {sub && <Text style={styles.rowSub}>{sub}</Text>}
    </View>
    {value && <Text style={styles.rowValue}>{value}</Text>}
    {onPress && !value && (
      <Ionicons name="chevron-forward" size={16} color={colors.border} />
    )}
  </TouchableOpacity>
)

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
            await AsyncStorage.removeItem('dailyAnswer')
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
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        <Text style={styles.heading}>Settings</Text>

        <Text style={styles.sectionTitle}>Progress</Text>
        <View style={styles.section}>
          <SettingsRow
            icon="library-outline"
            label="Reset lesson progress"
            sub="Clear all completed lessons"
            onPress={resetProgress}
          />
          <View style={styles.separator} />
          <SettingsRow
            icon="flame-outline"
            label="Reset streak"
            sub="Reset your daily challenge streak to zero"
            onPress={resetStreak}
          />
        </View>

        <Text style={styles.sectionTitle}>Data</Text>
        <View style={styles.section}>
          <SettingsRow
            icon="trash-outline"
            iconColor="#FF4D4D"
            label="Clear all data"
            sub="Reset everything, including onboarding"
            onPress={clearAllData}
            destructive
          />
        </View>

        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.section}>
          <SettingsRow
            icon="football-outline"
            label="App"
            value="FootyIQ"
          />
          <View style={styles.separator} />
          <SettingsRow
            icon="information-circle-outline"
            label="Version"
            value="1.0.0"
          />
          <View style={styles.separator} />
          <SettingsRow
            icon="code-outline"
            label="Built with"
            value="React Native + Expo"
          />
          <View style={styles.separator} />
          <SettingsRow
            icon="server-outline"
            label="Match data"
            value="API-Football"
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.black,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
    paddingBottom: 40,
    gap: 10,
  },
  heading: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.white,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  sectionTitle: {
    fontSize: typography.sizes.xs,
    color: colors.muted,
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: 12,
    marginBottom: 2,
    paddingHorizontal: 4,
  },
  section: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 56,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  rowContent: {
    flex: 1,
    gap: 2,
  },
  rowLabel: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    color: colors.white,
  },
  destructiveLabel: {
    color: '#FF4D4D',
  },
  rowSub: {
    fontSize: typography.sizes.sm,
    color: colors.muted,
  },
  rowValue: {
    fontSize: typography.sizes.sm,
    color: colors.muted,
    fontWeight: typography.weights.medium,
  },
})