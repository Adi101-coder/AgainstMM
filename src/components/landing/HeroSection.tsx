import { motion } from 'framer-motion'
import useMediaQuery from '../../hooks/useMediaQuery'
import AnimatedPill from './AnimatedPill'
import DotIcon from './DotIcon'
import DotMatrixText from './DotMatrixText'
import HeroDiagram from './HeroDiagram'
import { fadeDown, fadeUp, staggerContainer, staggerItem } from './motion'

export default function HeroSection() {
  const isCompact = useMediaQuery('(max-width: 540px)')

  return (
    <section className="hero-section">
      <motion.div
        className="hero-section__headline hero-section__headline--top"
        initial="hidden"
        animate="visible"
        variants={fadeDown}
      >
        <DotMatrixText
          text="PRICE. PROVIDE."
          dotSize={isCompact ? 4 : 5}
          gap={isCompact ? 2 : 3}
          charGap={isCompact ? 7 : 11}
        />
      </motion.div>

      <HeroDiagram />

      <motion.div
        className="hero-section__headline hero-section__headline--bottom"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ delay: 0.35 }}
      >
        <DotMatrixText
          text="COMPOUND."
          dotSize={isCompact ? 4 : 5}
          gap={isCompact ? 2 : 3}
          charGap={isCompact ? 7 : 11}
        />
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer(0.14, 0.55)}
        className="hero-section__bottom"
      >
        <motion.p className="hero-section__tagline" variants={staggerItem}>
          KEEL is autonomous liquidity infrastructure for tokenized equities — pricing
          fragmented venues, financing inventory, and compounding realized profit into
          protocol equity.
        </motion.p>

        <motion.div className="hero-section__actions" variants={staggerItem}>
          <AnimatedPill to="/methodology" className="pill-btn pill-btn--dark pill-btn--with-icon">
            <DotIcon variant="orange" size={16} />
            Read the methodology
          </AnimatedPill>
          <AnimatedPill href="#" className="pill-btn pill-btn--light">
            Request access
          </AnimatedPill>
        </motion.div>
      </motion.div>
    </section>
  )
}
