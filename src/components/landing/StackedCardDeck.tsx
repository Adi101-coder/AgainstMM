import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from 'framer-motion'
import { useMemo, useRef, useState } from 'react'

export interface StackCardItem {
  id: string
  badge: string
  title: string
  subtitle: string
  description: string
}

/** Position in stack → surface color (back → front). */
const STACK_SURFACES = [
  { bg: '#384358', text: '#c8ccd4', badge: '#242f49' },
  { bg: '#4a5568', text: '#d4d8de', badge: '#384358' },
  { bg: '#6b7280', text: '#ececea', badge: '#4a5568' },
  { bg: '#f7ded3', text: '#1a1a1a', badge: '#e8622a' },
  { bg: '#ffd4c4', text: '#1a1a1a', badge: '#e8622a' },
  { bg: '#ffffff', text: '#1a1a1a', badge: '#e8622a' },
]

function surfaceForPosition(stackPos: number, total: number) {
  const index = Math.round((stackPos / Math.max(total - 1, 1)) * (STACK_SURFACES.length - 1))
  return STACK_SURFACES[index] ?? STACK_SURFACES.at(-1)!
}

/** Front card is `frontIndex`; cards behind follow in order 02, 03, … wrapping. */
function stackOrderForStep(total: number, frontIndex: number) {
  const sequence = Array.from({ length: total }, (_, i) => (frontIndex + i) % total)
  return [...sequence].reverse()
}

const STEP_PX = 52
const SCALE_STEP = 0.045

interface StackedCardDeckProps {
  items: StackCardItem[]
  scrollMultiplier?: number
}

export default function StackedCardDeck({
  items,
  scrollMultiplier = 0.75,
}: StackedCardDeckProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  })

  useMotionValueEvent(smoothProgress, 'change', (value) => {
    const next = Math.min(
      items.length - 1,
      Math.max(0, Math.floor(value * items.length)),
    )
    setStep((prev) => (prev !== next ? next : prev))
  })

  const stackOrder = useMemo(
    () => stackOrderForStep(items.length, step),
    [items.length, step],
  )

  return (
    <div
      ref={containerRef}
      className="stack-scroll"
      style={{ height: `${items.length * scrollMultiplier * 100}vh` }}
    >
      <div className="stack-scroll__sticky">
        <div className="stack-scroll__bg" aria-hidden="true" />

        <div className="stack-deck">
          {stackOrder.map((itemIndex, stackPos) => {
            const item = items[itemIndex]
            const depthFromFront = items.length - 1 - stackPos
            const isFront = depthFromFront === 0
            const surface = surfaceForPosition(stackPos, items.length)

            return (
              <motion.div
                key={item.id}
                className="stack-card"
                layout
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 28,
                }}
                style={{
                  zIndex: stackPos + 1,
                  background: surface.bg,
                  color: surface.text,
                }}
                animate={{
                  y: -depthFromFront * STEP_PX,
                  scale: 1 - depthFromFront * SCALE_STEP,
                  opacity: 1 - depthFromFront * 0.07,
                }}
              >
                <div className="stack-card__row">
                  <span
                    className="stack-card__badge"
                    style={{ background: surface.badge }}
                  >
                    {item.badge}
                  </span>
                  <div className="stack-card__copy">
                    <h3>{item.title}</h3>
                    {isFront && (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="stack-card__subtitle">{item.subtitle}</p>
                        <p className="stack-card__description">{item.description}</p>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
