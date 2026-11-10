import { useEffect, useRef, useState } from 'react'

/** Returns a ref that receives focus when the component mounts (if enabled at mount time). */
export function useFocusOnMount<T extends HTMLElement>(enabled: boolean) {
  const ref = useRef<T>(null)
  // Captured once so later prop changes never steal focus.
  const [focusOnMount] = useState(enabled)
  useEffect(() => {
    if (focusOnMount) ref.current?.focus({ preventScroll: true })
  }, [focusOnMount])
  return ref
}
