import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function useStreak() {
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    loadStreak()
  }, [])

  const loadStreak = async () => {
    try {
      const saved = await AsyncStorage.getItem('streak')
      const lastPlayed = await AsyncStorage.getItem('lastPlayed')
      const today = new Date().toDateString()
      const yesterday = new Date(Date.now() - 86400000).toDateString()

      if (!saved) {
        setStreak(0)
        return
      }

      if (lastPlayed === today || lastPlayed === yesterday) {
        setStreak(parseInt(saved))
      } else {
        setStreak(0)
        await AsyncStorage.setItem('streak', '0')
      }
    } catch (e) {
      console.log(e)
    }
  }

  const incrementStreak = async () => {
    try {
      const today = new Date().toDateString()
      const lastPlayed = await AsyncStorage.getItem('lastPlayed')

      if (lastPlayed === today) return

      const saved = await AsyncStorage.getItem('streak')
      const lastStreak = saved ? parseInt(saved) : 0
      const newStreak = lastStreak + 1

      await AsyncStorage.setItem('streak', newStreak.toString())
      await AsyncStorage.setItem('lastPlayed', today)
      setStreak(newStreak)
      console.log('Streak updated to', newStreak)
    } catch (e) {
      console.log(e)
    }
  }

  return { streak, incrementStreak }
}