import { renderHook, act } from '@testing-library/react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useStreak from '../src/hooks/useStreak'

beforeEach(async () => {
  await AsyncStorage.clear()
})

describe('useStreak', () => {
  it('starts with a streak of 0', async () => {
    const { result } = renderHook(() => useStreak())
    await act(async () => {
      await result.current.loadStreak()
    })
    expect(result.current.streak).toBe(0)
  })

  it('incrementStreak sets streak to 1 on first call', async () => {
    const { result } = renderHook(() => useStreak())
    await act(async () => {
      await result.current.loadStreak()
      await result.current.incrementStreak()
    })
    expect(result.current.streak).toBe(1)
  })

  it('calling incrementStreak twice on the same day does not double-count', async () => {
    const { result } = renderHook(() => useStreak())
    await act(async () => {
      await result.current.loadStreak()
      await result.current.incrementStreak()
      await result.current.incrementStreak()
    })
    expect(result.current.streak).toBe(1)
  })

  it('persists streak across hook remounts', async () => {
    const { result: first } = renderHook(() => useStreak())
    await act(async () => {
      await first.current.loadStreak()
      await first.current.incrementStreak()
    })

    const { result: second } = renderHook(() => useStreak())
    await act(async () => {
      await second.current.loadStreak()
    })
    expect(second.current.streak).toBe(1)
  })

  it('loadStreak handles missing AsyncStorage keys gracefully', async () => {
    await AsyncStorage.removeItem('streak')
    await AsyncStorage.removeItem('lastPlayed')
    const { result } = renderHook(() => useStreak())
    await act(async () => {
      await result.current.loadStreak()
    })
    expect(result.current.streak).toBe(0)
  })

  it('streak resets to 1 when lastPlayed is more than one day ago', async () => {
    // Simulate a streak of 5 set two days ago
    const twoDaysAgo = new Date()
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)
    await AsyncStorage.setItem('streak', '5')
    await AsyncStorage.setItem('lastPlayed', twoDaysAgo.toDateString())

    const { result } = renderHook(() => useStreak())
    await act(async () => {
      await result.current.loadStreak()
      await result.current.incrementStreak()
    })
    expect(result.current.streak).toBe(1)
  })
})