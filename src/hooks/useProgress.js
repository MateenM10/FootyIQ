import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function useProgress() {
  const [completed, setCompleted] = useState([])

  useEffect(() => {
    loadProgress()
  }, [])

  const loadProgress = async () => {
    try {
      const saved = await AsyncStorage.getItem('completedLessons')
      if (saved) {
        setCompleted(JSON.parse(saved))
      } else {
        setCompleted([])
      }
    } catch (e) {
      console.log(e)
    }
  }

  const markComplete = async (lessonId) => {
    try {
      if (completed.includes(lessonId)) return
      const updated = [...completed, lessonId]
      setCompleted(updated)
      await AsyncStorage.setItem('completedLessons', JSON.stringify(updated))
    } catch (e) {
      console.log(e)
    }
  }

  const isComplete = (lessonId) => {
    return completed.includes(lessonId)
  }

  return { completed, markComplete, isComplete, loadProgress }
}