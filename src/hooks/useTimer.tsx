import { useEffect, useState } from 'react'

function formatSeconds(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  const formattedTime = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds} secs`
  return formattedTime
}

export const useTimer = (initialTimer = 0, enabled: boolean) => {
  const [timer, setTimer] = useState(initialTimer)

  useEffect(() => {
    if (!enabled) return
    const interval = setTimeout(() => {
      setTimer((prev) => prev - 1)
    }, 1000)

    if (timer < 1) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [timer, enabled])

  const resetTimer = (initialTimer: number) => {
    setTimer(initialTimer)
  }

  const realTimer = formatSeconds(timer)
  return { timer, resetTimer, realTimer }
}
