import {
  View, Text, StyleSheet,
  TouchableOpacity, Alert, Switch
} from 'react-native'
import { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import colors from '../theme/colors'
import typography from '../theme/typography'
import ScreenWrapper from '../components/ScreenWrapper'
import Card from '../components/Card'
import IconContainer from '../components/IconContainer'
import {
  requestNotificationPermission,
  scheduleDailyReminder,
  cancelDailyReminder,
  getNotificationsEnabled,
} from '../services/notifications'

const SettingsRow = ({ icon, iconColor = colors.accent, label, sub, value, onPress, destructive, right }) => (
  <TouchableOpacity
    style={styles.row}
    onPress={onPress}
    disabled={!onPress}
    activeOpacity={onPress ? 0.6 : 1}
  >
    <IconContainer
      icon={icon}
      size={32}
      iconSize={17}
      color={iconColor || colors.accent}
      style={{ borderRadius: 8, flexShrink: 0 }}
    />
    <View style={styles.rowContent}>
      <Text style={[styles.rowLabel, destructive && styles.destructiveLabel]}>{label}</Text>
      {sub && <Text style={styles.rowSub}>{sub}</Text>}
    </View>
    {right ?? (
      <>
        {value && <Text style={styles.rowValue}>{value}</Text>}
        {onPress && !value && (
          <Ionicons name="chevron-forward" size={16} color={colors.border} />
        )}
      </>
    )}
  </TouchableOpacity>
)

export default function SettingsScreen() {
  const [notificationsOn, setNotificationsOn] = useState(false)

  useEffect(() => {
    getNotificationsEnabled().then(setNotificationsOn)
  }, [])

  const handleNotificationToggle = async (value) => {
    if (value) {
      const granted = await requestNotificationPermission()
      if (!granted) {
        Alert.alert(
          'Permission required',
          'Enable notifications in your device Settings to receive daily reminders.'
        )
        return
      }
      await scheduleDailyReminder()
    } else {
      await cancelDailyReminder()
    }
    setNotificationsOn(value)
  }

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
            setNotificationsOn(false)
            Alert.alert('Done', 'All data has been cleared.')
          },
        },
      ]
    )
  }

  return (
    <ScreenWrapper edges={['top']} contentStyle={styles.content}>

      <Text style={styles.heading}>Settings</Text>

      <Text style={styles.sectionTitle}>Notifications</Text>
      <Card style={{ overflow: 'hidden' }}>
        <SettingsRow
          icon="notifications-outline"
          label="Daily reminder"
          sub="Reminds you to complete your daily challenge at 9am"
          right={
            <Switch
              value={notificationsOn}
              onValueChange={handleNotificationToggle}
              trackColor={{ false: colors.border, true: colors.accent + '66' }}
              thumbColor={notificationsOn ? colors.accent : colors.muted}
            />
          }
        />
      </Card>

      <Text style={styles.sectionTitle}>Progress</Text>
      <Card style={{ overflow: 'hidden' }}>
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
      </Card>

      <Text style={styles.sectionTitle}>Data</Text>
      <Card style={{ overflow: 'hidden' }}>
        <SettingsRow
          icon="trash-outline"
          iconColor="#FF4D4D"
          label="Clear all data"
          sub="Reset everything, including onboarding"
          onPress={clearAllData}
          destructive
        />
      </Card>

      <Text style={styles.sectionTitle}>About</Text>
      <Card style={{ overflow: 'hidden' }}>
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
      </Card>

    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
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