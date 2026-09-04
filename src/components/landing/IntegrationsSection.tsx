import { motion } from 'framer-motion'
import Reveal from './Reveal'

const surfaces = [
  'Liquidity Book',
  'Uniswap v4',
  'Concentrated ranges',
  'Stock wrappers',
  'Synthetic equities',
  'Index perpetuals',
  'Sector baskets',
  'Securities lending',
  'Financing markets',
  'Oracle networks',
]

const track = [...surfaces, ...surfaces]

export default function IntegrationsSection() {
  return (
    <section className="integrations-section">
      <Reveal className="integrations-section__header">
        <p className="section-eyebrow">Liquidity surfaces</p>
        <h2 className="integrations-section__title">
          Every venue quoting the same asset{' '}
          <span className="text-muted">with independent liquidity.</span>
        </h2>
      </Reveal>

      <div className="integrations-section__marquee-wrap">
        <motion.div
          className="integrations-section__marquee"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            x: { repeat: Infinity, repeatType: 'loop', duration: 28, ease: 'linear' },
          }}
        >
          {track.map((name, index) => (
            <span key={`${name}-${index}`} className="integration-pill">
              {name}
            </span>
          ))}
        </motion.div>
      </div>

      <Reveal delay={0.1}>
        <p className="integrations-section__note">
          Venues are allowlisted at contract level and every instrument carries an
          exposure cap. New surfaces are added by governance, never by keeper discretion.
        </p>
      </Reveal>
    </section>
  )
}
