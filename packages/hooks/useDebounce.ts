import { useEffect, useState } from 'react'

export function useDebounce<T>(value: T, delay: number): T {
  const [state, setState] = useState(value)
  useEffect(() => {
    const timeout = setTimeout(() => setState(value), delay)
  }, [value])
  return state
}
