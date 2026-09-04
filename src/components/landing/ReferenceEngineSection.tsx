import AnimatedPill from './AnimatedPill'
import DotIcon from './DotIcon'
import Reveal from './Reveal'
import { slideInLeft } from './motion'

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
      </div>
    </section>
  )
}
