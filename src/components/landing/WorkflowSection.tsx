import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useRef, useState } from 'react'
import Reveal from './Reveal'

const steps = [
  {
    step: '01',
    title: 'Price and classify',
    description:
      'Every instrument is priced against three independent sources and assigned a regime — open, closed, or halted — alongside a daily liquidity impact class.',
  },
  {
    step: '02',
    title: 'Auction the capital',
    description:
      'Expected edge divided by risk produces a score per instrument. Capital is allocated proportionally, so the best risk-adjusted opportunities are funded first.',
  },
  {
    step: '03',
    title: 'Acquire and provide',
    description:
      'Passive bid ladders build inventory below fair value, then standing two-sided quotes earn the spread while verified dislocations are harvested in tranches.',
  },
  {
    step: '04',
    title: 'Hedge and compound',
    description:
      'Residual delta is hedged toward zero, idle inventory is financed, and realized profit flows through the treasury waterfall into protocol equity.',
  },
]

function CycleDotPattern() {
  const dots = Array.from({ length: 72 }, (_, i) => ({
    cx: 8 + (i % 12) * 14,
    cy: 8 + Math.floor(i / 12) * 14,
    o: 0.04 + ((i * 7) % 10) * 0.018,
  }))

  return (
    <svg className="cycle-card__pattern" viewBox="0 0 176 104" aria-hidden="true">
      {dots.map((dot, i) => (
        <circle key={i} cx={dot.cx} cy={dot.cy} r="1.5" fill="currentColor" opacity={dot.o} />
      ))}
    </svg>
  )
}

export default function WorkflowSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  })

  const fillHeight = useTransform(smoothProgress, [0, 1], ['0%', '100%'])

  useMotionValueEvent(smoothProgress, 'change', (value) => {
    const next = Math.min(
      steps.length - 1,
      Math.max(0, Math.floor(value * steps.length)),
    )
    setActiveStep((prev) => (prev !== next ? next : prev))
  })

  return (
    <section className="cycle-section" aria-label="Operating cycle">
      <div
        ref={containerRef}
        className="cycle-section__scroll"
        style={{ height: `${steps.length * 55}vh` }}
      >
        <div className="cycle-section__sticky">
          <div className="cycle-section__inner">
            <aside className="cycle-section__rail">
              <Reveal className="cycle-section__header">
                <p className="section-eyebrow">Operating cycle</p>
                <h2 className="cycle-section__title">
                  From reference price to retained equity{' '}
                  <span className="text-muted">in four stages.</span>
                </h2>
              </Reveal>

              <ol className="cycle-rail" aria-label="Cycle progress">
                <span className="cycle-rail__track" aria-hidden="true">
                  <motion.span className="cycle-rail__fill" style={{ height: fillHeight }} />
                </span>

                {steps.map((item, index) => {
                  const isActive = index === activeStep
                  const isComplete = index < activeStep

                  return (
                    <li
                      key={item.step}
                      className={[
                        'cycle-rail__item',
                        isActive ? 'is-active' : '',
                        isComplete ? 'is-complete' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      aria-current={isActive ? 'step' : undefined}
                    >
                      <span className="cycle-rail__dot">{item.step}</span>
                      <span className="cycle-rail__label">{item.title}</span>
                    </li>
                  )
                })}
              </ol>
            </aside>

            <div className="cycle-section__stage">
              <div className="cycle-section__flow" aria-hidden="true">
                {steps.map((item, index) => (
                  <span
                    key={item.step}
                    className={[
                      'cycle-flow__chip',
                      index <= activeStep ? 'is-lit' : '',
                      index === activeStep ? 'is-current' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    {item.step}
                  </span>
                ))}
              </div>

              <div className="cycle-section__cards">
                {steps.map((item, index) => {
                  const isActive = index === activeStep

                  return (
                    <motion.article
                      key={item.step}
                      className="cycle-card"
                      aria-hidden={!isActive}
                      initial={false}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        y: isActive ? 0 : index < activeStep ? -28 : 28,
                        scale: isActive ? 1 : 0.97,
                        filter: isActive ? 'blur(0px)' : 'blur(6px)',
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 220,
                        damping: 28,
                      }}
                      style={{ pointerEvents: isActive ? 'auto' : 'none' }}
                    >
                      <CycleDotPattern />
                      <p className="cycle-card__eyebrow">Stage {item.step}</p>
                      <h3 className="cycle-card__title">{item.title}</h3>
                      <p className="cycle-card__body">{item.description}</p>
                    </motion.article>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
