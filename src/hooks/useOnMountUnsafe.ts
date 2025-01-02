import { EffectCallback, useLayoutEffect, useRef } from 'react'

function useOnMountUnsafe(effect: EffectCallback, p0: never[]) {
  const initialized = useRef(false)

  useLayoutEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      effect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
export default useOnMountUnsafe
