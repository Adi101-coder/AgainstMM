import { motion } from 'framer-motion'
import BackToTop from '../components/docs/BackToTop'
import DocSection from '../components/docs/DocSection'
import DocToc from '../components/docs/DocToc'
import Figure from '../components/docs/Figure'
import PullQuote from '../components/docs/PullQuote'
import ReadingProgress from '../components/docs/ReadingProgress'
import Illu01SystemArchitecture from '../components/illustrations/Illu01SystemArchitecture'
import Illu14EndToEnd from '../components/illustrations/Illu14EndToEnd'
import DotMatrixText from '../components/landing/DotMatrixText'
import LandingFooter from '../components/landing/LandingFooter'
import LandingHeader from '../components/landing/LandingHeader'
import { fadeUp, staggerContainer, staggerItem } from '../components/landing/motion'
import { SECTIONS } from '../content/methodology'

export default function Methodology() {
  return (
    <div className="landing doc-page">
      <ReadingProgress />
      <LandingHeader />

      <main>
        <section className="doc-hero">
          <div className="doc-hero__inner">
            <motion.div
              className="doc-hero__wordmark"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              <DotMatrixText text="KEEL" dotSize={7} gap={4} charGap={16} />
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer(0.12, 0.25)}
            >
              <motion.p className="doc-hero__eyebrow" variants={staggerItem}>
                Technical methodology · v1
              </motion.p>

              <motion.h1 className="doc-hero__title" variants={staggerItem}>
                Systematic liquidity provision, spread capture, inventory financing, and{' '}
                <span className="text-muted">reference-price arbitrage in tokenized equities.</span>
              </motion.h1>
            </motion.div>

            <Figure number={1} caption="Full system architecture" wide>
              <Illu01SystemArchitecture />
            </Figure>

            <motion.div
              className="doc-hero__intro"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-8% 0px' }}
              variants={staggerContainer(0.08)}
            >
              <motion.p className="doc-hero__lead" variants={staggerItem}>
                KEEL is an autonomous liquidity infrastructure protocol for tokenized
                equities. It continuously prices venues against a conservative multi-source
                reference, acquires inventory through competitive bidding, provides
                two-sided liquidity around fair value, harvests verified dislocations,
                finances idle inventory, hedges residual risk, and compounds realized profit
                into protocol equity.
              </motion.p>

              <motion.p className="doc-hero__premise-label" variants={staggerItem}>
                The protocol is built around a simple observation:
              </motion.p>

              <motion.div variants={staggerItem}>
                <PullQuote>
                  Dislocations are episodic. Liquidity demand is continuous.
                </PullQuote>
              </motion.div>

              <motion.p className="doc-hero__premise-body" variants={staggerItem}>
                Most tokenized-equity systems monetize only dislocations. KEEL monetizes
                liquidity itself.
              </motion.p>

              <motion.p className="doc-hero__premise-body" variants={staggerItem}>
                The objective is not merely to be the fastest seller when a pool becomes
                irrational.
              </motion.p>

              <motion.p className="doc-hero__premise-body" variants={staggerItem}>
                The objective is to become the standing balance sheet of tokenized-equity
                markets.
              </motion.p>
            </motion.div>
          </div>
        </section>

        <div className="doc-body">
          <aside className="doc-body__aside">
            <DocToc entries={SECTIONS} />
          </aside>

          <article className="doc-body__article">
            {SECTIONS.map((section) => (
              <DocSection
                key={section.id}
                id={section.id}
                number={section.number}
                title={section.title}
              >
                {section.body}
              </DocSection>
            ))}

            <Figure number={14} caption="Full end-to-end architecture diagram" wide>
              <Illu14EndToEnd />
            </Figure>
          </article>
        </div>
      </main>

      <LandingFooter />
      <BackToTop />
    </div>
  )
}
