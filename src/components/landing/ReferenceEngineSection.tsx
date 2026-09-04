import { motion } from 'framer-motion'
import AnimatedPill from './AnimatedPill'
import DotIcon from './DotIcon'
import Reveal from './Reveal'
import { slideInLeft, slideInRight } from './motion'

/** Abstract dotted field standing in for a fragmented liquidity surface. */
function LiquiditySurfaceGraphic() {
  const dots: { cx: number; cy: number; r: number; o: number }[] = []

  for (let y = 0; y < 28; y += 1) {
    for (let x = 0; x < 36; x += 1) {
      const nx = x / 36
      const ny = y / 28
      const d1 = Math.hypot(nx - 0.35, ny - 0.45)
      const d2 = Math.hypot(nx - 0.65, ny - 0.55)
      const d3 = Math.hypot(nx - 0.5, ny - 0.25)
      const field = Math.exp(-d1 * 3.2) + Math.exp(-d2 * 2.8) + Math.exp(-d3 * 2.4)
      if (field > 0.22 && (x + y) % 2 === 0) {
        dots.push({
          cx: 20 + x * 14,
          cy: 20 + y * 14,
          r: 1.2 + field * 1.8,
          o: 0.15 + field * 0.45,
        })
      }
    }
  }

  return (
    <motion.svg
      className="engine-section__graphic"
      viewBox="0 0 520 400"
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <rect width="520" height="400" fill="#f3f3f1" rx="24" />
      {dots.map((dot, i) => (
        <motion.circle
          key={i}
          cx={dot.cx}
          cy={dot.cy}
          r={dot.r}
          fill="#1a1a1a"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: dot.o }}
          viewport={{ once: true }}
          transition={{ delay: (i % 40) * 0.008, duration: 0.4 }}
        />
      ))}
    </motion.svg>
  )
}

export default function ReferenceEngineSection() {
  return (
    <section className="engine-section">
      <div className="engine-section__inner">
        <Reveal variants={slideInLeft}>
          <div className="engine-section__content">
            <h2 className="engine-section__title">
              The reference engine
              <span className="engine-section__title-muted">
                {' '}
                Conservative multi-source pricing that refuses to trade uncertainty
              </span>
            </h2>
            <p className="engine-section__body">
              Primary market prints, deep-liquidity TWAPs, and oracle consensus are
              combined into asymmetric buy and sell references. The protocol buys only
              below the lowest honest estimate and sells only above the highest — and halts
              entirely when sources disagree.
            </p>
            <AnimatedPill to="/methodology" className="pill-btn pill-btn--light pill-btn--with-icon">
              <DotIcon variant="dark" size={16} />
              Read more
            </AnimatedPill>
          </div>
        </Reveal>

        <Reveal variants={slideInRight}>
          <LiquiditySurfaceGraphic />
        </Reveal>
      </div>
    </section>
  )
}
