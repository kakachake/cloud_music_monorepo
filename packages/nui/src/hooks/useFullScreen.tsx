import { useEffect, useState } from 'react'

export const useFullScreen = () => {
  const el = window.document as any

  const [isFullScreen, setIsFullScreen] = useState(false)

  const fullScreenChange = () => {
    console.log(el.fullscreenElement)

    setIsFullScreen(el.fullscreenElement !== null)
  }
  useEffect(() => {
    if (!el) return void 0
    el.addEventListener('fullscreenchange', fullScreenChange)
    return () => {
      el.removeEventListener('fullscreenchange', fullScreenChange)
    }
  }, [])
  return [isFullScreen]
}
