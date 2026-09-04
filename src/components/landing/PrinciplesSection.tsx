import { motion } from 'framer-motion'
import Logo from './Logo'
import Reveal from './Reveal'
import { staggerContainer, staggerItem } from './motion'

const principles = [
  {
    index: '01',
    source: 'Oracle disagreement',
    quote: 'The protocol would rather miss profit than trade uncertainty.',
    detail: 'Sources diverging beyond η force an automatic halt',
    visual: 'discs' as const,
  },
  {
    index: '02',
    source: 'Competitive acquisition',
    quote: 'Most traders pay for immediacy. The protocol monetizes that impatience.',
    detail: 'Passive ladders earn on entry, not only on exit',
    visual: 'arc' as const,
  },
  {
    index: '03',
    source: 'Portfolio hedging',
    quote: 'Inventory is not alpha. Inventory is risk.',
    detail: 'Net delta is driven toward zero and capped on-chain',
    visual: 'columns' as const,
  },
]

function PrincipleVisual({ type }: { type: 'discs' | 'arc' | 'columns' }) {
  if (type === 'discs') {
    return (
      <svg className="principle-poster__art" viewBox="0 0 240 200" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <ellipse
            key={i}
            cx={118 - i * 4}
            cy={148 - i * 14}
            rx={92 - i * 6}
            ry={18 - i * 1.5}
            fill={i === 0 ? '#1a1a1a' : `rgb(26 26 26 / ${0.12 + i * 0.1})`}
            stroke="#dddcda"
            strokeWidth="1"
          />
        ))}
      </svg>
    )
  }

  if (type === 'arc') {
    const dots: { cx: number; cy: number; r: number }[] = []
    for (let i = 0; i < 56; i += 1) {
      const t = i / 55
      const angle = Math.PI * (0.15 + t * 0.7)
      const radius = 70 + t * 34
      dots.push({
        cx: 120 + Math.cos(angle) * radius,
        cy: 168 - Math.sin(angle) * radius * 0.72,
        r: 2 + t * 3.5,
      })
    }

    return (
      <svg className="principle-poster__art" viewBox="0 0 240 200" aria-hidden="true">
        {dots.map((dot, i) => (
          <circle
            key={i}
            cx={dot.cx}
            cy={dot.cy}
            r={dot.r}
            fill={i > 42 ? '#1a1a1a' : '#c8c8c6'}
            opacity={0.35 + (i / 55) * 0.65}
          />
        ))}
      </svg>
    )
  }

  return (
    <svg className="principle-poster__art" viewBox="0 0 240 200" aria-hidden="true">
      <ellipse cx="92" cy="168" rx="46" ry="11" fill="rgb(26 26 26 / 8%)" />
      <ellipse cx="152" cy="168" rx="46" ry="11" fill="rgb(26 26 26 / 8%)" />
      <rect x="58" y="72" width="56" height="92" rx="28" fill="#ececea" stroke="#dddcda" strokeWidth="1" />
      <rect x="126" y="56" width="56" height="108" rx="28" fill="#e8e8e6" stroke="#dddcda" strokeWidth="1" />
      <circle cx="86" cy="98" r="10" fill="#1a1a1a" />
      <circle cx="154" cy="92" r="10" fill="#e8622a" />
    </svg>
  )
}

export default function PrinciplesSection() {
  return (
    <section className="principles-section">
      <div className="principles-section__inner">
        <Reveal className="principles-section__header">
          <p className="section-eyebrow">Design principles</p>
          <h2 className="principles-section__title">
            Assumptions the protocol refuses{' '}
            <span className="text-muted">to trade against.</span>
          </h2>
        </Reveal>

        <motion.div
          className="principles-section__stage"
          variants={staggerContainer(0.14)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-8% 0px' }}
        >
          {principles.map((item) => (
            <motion.article
              key={item.source}
              className="principle-poster"
              variants={staggerItem}
              whileHover={{ y: -4, transition: { duration: 0.28 } }}
            >
              <header className="principle-poster__brand">
                <Logo size={18} className="principle-poster__logo" />
                <span className="principle-poster__label">{item.index}</span>
              </header>

              <div className="principle-poster__copy">
                <p className="principle-poster__source">{item.source}</p>
                <h3 className="principle-poster__quote">{item.quote}</h3>
                <p className="principle-poster__detail">{item.detail}</p>
              </div>

              <div className="principle-poster__visual">
                <PrincipleVisual type={item.visual} />
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
