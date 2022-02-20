import { useRef, useEffect } from 'react'

export function usePrev<T>(state: T): T {
  const prevState = useRef<T>(state)
  useEffect(() => {
    prevState.current = state
  }, [state])
  return prevState.current
}
