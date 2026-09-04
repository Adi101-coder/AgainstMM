import { motion } from 'framer-motion'
import AnimatedPill from './AnimatedPill'
import DotIcon from './DotIcon'
import DotMatrixText from './DotMatrixText'
import Reveal from './Reveal'
import { scaleIn, staggerContainer, staggerItem } from './motion'

export default function CtaSection() {
  return (
    <section className="cta-section">
      <Reveal variants={scaleIn}>
        <motion.div
          className="cta-section__inner"
          variants={staggerContainer(0.12, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
        >
          <motion.div className="cta-section__matrix" variants={staggerItem}>
            <DotMatrixText text="KEEL" dotSize={5} gap={3} charGap={10} />
          </motion.div>

          <motion.h2 className="cta-section__title" variants={staggerItem}>
            Become the standing balance sheet{' '}
            <span className="text-muted">of tokenized-equity markets.</span>
          </motion.h2>

          <motion.p className="cta-section__body" variants={staggerItem}>
            The methodology document sets out the full system: reference pricing, regime
            classification, capital architecture, execution logic, and every operating
            parameter the protocol publishes.
          </motion.p>

          <motion.div className="cta-section__actions" variants={staggerItem}>
            <AnimatedPill to="/methodology" className="pill-btn pill-btn--dark pill-btn--with-icon">
              <DotIcon variant="orange" size={16} />
              Read the methodology
            </AnimatedPill>
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
