import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

function CountdownTimer({ seconds = 30, onComplete }) {
  const [timeLeft, setTimeLeft] = useState(seconds)

  useEffect(() => {
    setTimeLeft(seconds)
  }, [seconds])

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete?.()
      return undefined
    }

    const interval = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          window.clearInterval(interval)
          return 0
        }

        return current - 1
      })
    }, 1000)

    return () => window.clearInterval(interval)
  }, [timeLeft, onComplete])

  const progress = useMemo(() => (timeLeft / seconds) * 100, [seconds, timeLeft])
  const radius = 96
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference - (progress / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-64 w-64">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 240 240">
          <circle
            cx="120"
            cy="120"
            r={radius}
            fill="none"
            stroke="#1f1f1f"
            strokeWidth="12"
          />
          <motion.circle
            cx="120"
            cy="120"
            r={radius}
            fill="none"
            stroke="#e63946"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 0.85, ease: 'easeInOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-6xl font-black text-white">{timeLeft}</div>
          <div className="mt-2 text-[10px] uppercase tracking-[0.38em] text-zinc-500">
            Seconds
          </div>
        </div>
      </div>
    </div>
  )
}

export default CountdownTimer
