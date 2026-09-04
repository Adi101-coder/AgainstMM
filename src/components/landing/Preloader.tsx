import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const ORANGE = '#e8622a'
const DOTS = [
  { row: 0, col: 1 },
  { row: 1, col: 0 },
  { row: 1, col: 1 },
  { row: 1, col: 2 },
  { row: 2, col: 1 },
]

const MIN_VISIBLE_MS = 3000
const EXIT_MS = 450

export default function Preloader() {
  const [phase, setPhase] = useState<'visible' | 'exit' | 'done'>('visible')

  useEffect(() => {
    const timer = window.setTimeout(() => setPhase('exit'), MIN_VISIBLE_MS)
    return () => window.clearTimeout(timer)
  }, [])

  if (phase === 'done') return null

  return (
    <AnimatePresence onExitComplete={() => setPhase('done')}>
      {phase === 'visible' && (
        <motion.div
          className="preloader"
          role="status"
          aria-label="Loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: EXIT_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="preloader__inner">
            <svg
              className="preloader__dots"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              aria-hidden="true"
            >
              {DOTS.map(({ row, col }, index) => (
                <motion.circle
                  key={`${row}-${col}`}
                  cx={6 + col * 8}
                  cy={6 + row * 8}
                  r="2.6"
                  fill={ORANGE}
                  initial={{ opacity: 0.25, scale: 0.7 }}
                  animate={{ opacity: [0.25, 1, 0.25], scale: [0.7, 1, 0.7] }}
                  transition={{
                    duration: 0.9,
                    repeat: Infinity,
                    delay: index * 0.1,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </svg>
            <motion.span
              className="preloader__label"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
            >
              KEEL
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
