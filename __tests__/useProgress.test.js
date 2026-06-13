import { renderHook, act } from '@testing-library/react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useProgress from '../src/hooks/useProgress'

beforeEach(async () => {
  await AsyncStorage.clear()
})

describe('useProgress', () => {
  it('starts with an empty completed list', async () => {
    const { result } = renderHook(() => useProgress())
    await act(async () => {
      await result.current.loadProgress()
    })
    expect(result.current.completed).toEqual([])
  })

  it('markComplete adds a lesson id to completed', async () => {
    const { result } = renderHook(() => useProgress())
    await act(async () => {
      await result.current.loadProgress()
      await result.current.markComplete(1)
    })
    expect(result.current.completed).toContain(1)
  })

  it('isComplete returns true for a completed lesson', async () => {
    const { result } = renderHook(() => useProgress())
    await act(async () => {
      await result.current.loadProgress()
      await result.current.markComplete(3)
    })
    expect(result.current.isComplete(3)).toBe(true)
  })

  it('isComplete returns false for an uncompleted lesson', async () => {
    const { result } = renderHook(() => useProgress())
    await act(async () => {
      await result.current.loadProgress()
    })
    expect(result.current.isComplete(99)).toBe(false)
  })

  it('does not duplicate a lesson id if marked complete twice', async () => {
    const { result } = renderHook(() => useProgress())
    await act(async () => {
      await result.current.loadProgress()
      await result.current.markComplete(2)
      await result.current.markComplete(2)
    })
    const count = result.current.completed.filter(id => id === 2).length
    expect(count).toBe(1)
  })

  it('persists completed lessons across hook remounts', async () => {
    const { result: first } = renderHook(() => useProgress())
    await act(async () => {
      await first.current.loadProgress()
      await first.current.markComplete(7)
    })

    const { result: second } = renderHook(() => useProgress())
    await act(async () => {
      await second.current.loadProgress()
    })
    expect(second.current.completed).toContain(7)
  })

  it('loadProgress handles a missing AsyncStorage key gracefully', async () => {
    await AsyncStorage.removeItem('completedLessons')
    const { result } = renderHook(() => useProgress())
    await act(async () => {
      await result.current.loadProgress()
    })
    expect(result.current.completed).toEqual([])
  })
})