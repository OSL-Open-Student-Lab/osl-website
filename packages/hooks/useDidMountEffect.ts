import { useEffect, useRef } from 'react'

export function useDidMountEffect(
  func: (...args: unknown[]) => unknown,
  deps: unknown[]
) {
  const didMount = useRef<boolean>(false)
  useEffect(() => {
    if (didMount.current) func()
    else didMount.current = true
  }, deps)
}
