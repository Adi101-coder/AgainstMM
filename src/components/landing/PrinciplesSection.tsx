import { motion } from 'framer-motion'
import Reveal from './Reveal'
import { staggerContainer, staggerItem } from './motion'

const principles = [
  {
    quote: 'The protocol would rather miss profit than trade uncertainty.',
    source: 'Oracle disagreement',
    detail: 'Sources diverging beyond η force an automatic halt',
  },
  {
    quote: 'Most traders pay for immediacy. The protocol monetizes that impatience.',
    source: 'Competitive acquisition',
    detail: 'Passive ladders earn on entry, not only on exit',
  },
  {
    quote: 'Inventory is not alpha. Inventory is risk.',
    source: 'Portfolio hedging',
    detail: 'Net delta is driven toward zero and capped on-chain',
  },
]

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
          className="principles-section__grid"
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-8% 0px' }}
        >
          {principles.map((item) => (
            <motion.blockquote
              key={item.source}
              className="principle-card"
              variants={staggerItem}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
            >
              <p className="principle-card__quote">{item.quote}</p>
              <footer>
                <strong>{item.source}</strong>
                <span>{item.detail}</span>
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
