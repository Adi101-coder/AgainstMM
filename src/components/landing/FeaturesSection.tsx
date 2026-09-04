import { motion } from 'framer-motion'
import Reveal from './Reveal'
import { staggerContainer, staggerItem } from './motion'

const features = [
  {
    title: 'Reference pricing',
    description:
      'Three independent sources produce asymmetric buy and sell references, haircut for wrapper risk. Disagreement beyond threshold triggers an automatic halt.',
  },
  {
    title: 'Competitive acquisition',
    description:
      'A passive bid ladder absorbs natural selling pressure below fair value. Aggressive purchases occur only when inventory falls short of target.',
  },
  {
    title: 'Two-sided quoting',
    description:
      'Standing bids and asks are posted around fair value, scaled by realized volatility and skewed by inventory imbalance.',
  },
  {
    title: 'Dislocation harvesting',
    description:
      'Deviation, fillability, and liquidity score combine into an effective dislocation. Dead pools and fake quotes are rejected before execution.',
  },
  {
    title: 'Inventory financing',
    description:
      'Idle inventory is deployed into approved lending and financing venues, so the balance sheet stays productive through low-volatility regimes.',
  },
  {
    title: 'Portfolio hedging',
    description:
      'Net portfolio delta is driven toward zero using index perps, sector baskets, and synthetic exposure, with residual limits enforced on-chain.',
  },
]

export default function FeaturesSection() {
  return (
    <section className="features-section">
      <div className="features-section__inner">
        <Reveal className="features-section__header">
          <p className="section-eyebrow">Protocol functions</p>
          <h2 className="features-section__title">
            Six functions on one balance sheet,{' '}
            <span className="text-muted">operating continuously.</span>
          </h2>
        </Reveal>

        <motion.div
          className="features-section__grid"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-8% 0px' }}
        >
          {features.map((feature) => (
            <motion.article
              key={feature.title}
              className="feature-card"
              variants={staggerItem}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
            >
              <div className="feature-card__dot-grid" aria-hidden="true">
                {Array.from({ length: 9 }).map((_, i) => (
                  <span key={i} className={i % 3 === 0 ? 'active' : ''} />
                ))}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
