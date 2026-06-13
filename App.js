import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AppNavigator from './src/navigation/AppNavigator'
import OnboardingScreen from './src/screens/OnboardingScreen'
import {
  requestNotificationPermission,
  scheduleDailyReminder,
} from './src/services/notifications'

export default function App() {
  const [showOnboarding, setShowOnboarding] = useState(null)

  useEffect(() => {
    checkOnboarding()
  }, [])

  const checkOnboarding = async () => {
    try {
      const seen = await AsyncStorage.getItem('onboardingSeen')
      setShowOnboarding(seen !== 'true')
    } catch (e) {
      setShowOnboarding(false)
    }
  }

  const handleOnboardingDone = async () => {
    await AsyncStorage.setItem('onboardingSeen', 'true')
    setShowOnboarding(false)

    // Request notification permission after onboarding completes.
    // If granted, schedule the daily 9am reminder straight away.
    const granted = await requestNotificationPermission()
    if (granted) {
      await scheduleDailyReminder()
    }
  }

  if (showOnboarding === null) return null

  return (
    <SafeAreaProvider>
      {showOnboarding
        ? <OnboardingScreen onDone={handleOnboardingDone} />
        : <AppNavigator />
      }
    </SafeAreaProvider>
  )
}