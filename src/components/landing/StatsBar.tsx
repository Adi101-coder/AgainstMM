import { motion } from 'framer-motion'
import AnimatedPill from './AnimatedPill'
import DotIcon from './DotIcon'
import DotMatrixText from './DotMatrixText'
import Reveal from './Reveal'
import { staggerContainer, staggerItem } from './motion'

const metrics = [
  {
    eyebrow: 'Reserve target',
    value: '20%',
    caption: 'Of AUM retained before any profit becomes distributable',
  },
  {
    eyebrow: 'Surplus allocation',
    value: '40%',
    caption: 'Of realized profit compounded into protocol equity',
  },
]

export default function StatsBar() {
  return (
    <section className="stats-bar">
      <Reveal>
        <motion.div
          className="stats-bar__inner"
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
        >
          {metrics.map((metric) => (
            <motion.div key={metric.eyebrow} className="stats-bar__col" variants={staggerItem}>
              <p className="stats-bar__eyebrow">{metric.eyebrow}</p>
              <div className="stats-bar__metric">
                <DotMatrixText text={metric.value} dotSize={7} gap={4} charGap={12} />
              </div>
              <p className="stats-bar__caption">{metric.caption}</p>
            </motion.div>
          ))}

          <motion.div className="stats-bar__col stats-bar__col--cta" variants={staggerItem}>
            <p className="stats-bar__description">
              Connect your inventory. KEEL prices every venue against a conservative
              multi-source reference and quotes both sides continuously.
            </p>
            <AnimatedPill href="#" className="pill-btn pill-btn--light pill-btn--with-icon">
              <DotIcon variant="dark" size={16} />
              Request access
            </AnimatedPill>
          </motion.div>
        </motion.div>
      </Reveal>
    </section>
  )
}
