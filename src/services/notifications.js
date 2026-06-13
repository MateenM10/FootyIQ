import * as Notifications from 'expo-notifications'
import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY = 'notificationsEnabled'
const NOTIFICATION_HOUR = 9
const NOTIFICATION_MINUTE = 0

// How the notification appears when the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

export const requestNotificationPermission = async () => {
  const { status: existing } = await Notifications.getPermissionsAsync()
  if (existing === 'granted') return true

  const { status } = await Notifications.requestPermissionsAsync()
  return status === 'granted'
}

export const scheduleDailyReminder = async () => {
  // Cancel any existing scheduled notifications before re-scheduling
  await Notifications.cancelAllScheduledNotificationsAsync()

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Daily Challenge',
      body: 'Your question for today is ready. Keep your streak going.',
    },
    trigger: {
      hour: NOTIFICATION_HOUR,
      minute: NOTIFICATION_MINUTE,
      repeats: true,
    },
  })

  await AsyncStorage.setItem(STORAGE_KEY, 'true')
}

export const cancelDailyReminder = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync()
  await AsyncStorage.setItem(STORAGE_KEY, 'false')
}

export const getNotificationsEnabled = async () => {
  const value = await AsyncStorage.getItem(STORAGE_KEY)
  return value === 'true'
}