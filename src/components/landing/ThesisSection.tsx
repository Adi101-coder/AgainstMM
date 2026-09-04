import Reveal from './Reveal'
import { slideInLeft, slideInRight } from './motion'

export default function ThesisSection() {
  return (
    <section className="thesis-section">
      <div className="thesis-section__inner">
        <Reveal variants={slideInLeft}>
          <h2 className="thesis-section__title">
            Own the balance sheet before the market needs it,{' '}
            <span className="thesis-section__title-muted">
              and earn on entry as well as exit.
            </span>
          </h2>
        </Reveal>

        <Reveal variants={slideInRight} delay={0.12}>
          <p className="thesis-section__aside">
            Dislocations are episodic. Liquidity demand is continuous. Most systems
            monetize only the former.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
