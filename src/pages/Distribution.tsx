import { motion } from 'framer-motion'
import BackToTop from '../components/docs/BackToTop'
import DocSection from '../components/docs/DocSection'
import DocToc from '../components/docs/DocToc'
import PullQuote from '../components/docs/PullQuote'
import ReadingProgress from '../components/docs/ReadingProgress'
import DotMatrixText from '../components/landing/DotMatrixText'
import LandingFooter from '../components/landing/LandingFooter'
import LandingHeader from '../components/landing/LandingHeader'
import StackedCardDeck, { type StackCardItem } from '../components/landing/StackedCardDeck'
import { fadeUp, staggerContainer, staggerItem } from '../components/landing/motion'
import { DISTRIBUTION_SECTIONS } from '../content/distribution'

const allocations: StackCardItem[] = [
  {
    id: 'surplus-reserve',
    badge: '40%',
    title: 'Surplus Reserve',
    subtitle: 'Protocol equity',
    description: 'The primary sink for realized profit — compounds the balance sheet without diluting depositor claims.',
  },
  {
    id: 'reinvestment',
    badge: '30%',
    title: 'Reinvestment',
    subtitle: 'Capacity expansion',
    description: 'Deployed into inventory acquisition, quoting capital, and dislocation harvesting capacity.',
  },
  {
    id: 'insurance-fund',
    badge: '20%',
    title: 'Insurance Fund',
    subtitle: 'First-loss protection',
    description: 'Absorbs losses before depositor capital is touched and is replenished continuously from profit.',
  },
  {
    id: 'governance-distribution',
    badge: '10%',
    title: 'Governance Distribution',
    subtitle: 'External distribution',
    description: 'The only allocation that leaves the protocol — paid only after the 20% AUM reserve gate is satisfied.',
  },
]

export default function Distribution() {
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
                Treasury policy · v1
              </motion.p>

              <motion.h1 className="doc-hero__title" variants={staggerItem}>
                Profit retention, surplus compounding, and{' '}
                <span className="text-muted">governance distribution.</span>
              </motion.h1>
            </motion.div>

            <motion.div
              className="doc-hero__intro"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-8% 0px' }}
              variants={staggerContainer(0.08)}
            >
              <motion.p className="doc-hero__lead" variants={staggerItem}>
                KEEL does not maximize distributions. It maximizes balance-sheet
                efficiency — retaining profit, funding protection, and compounding equity
                before any external distribution occurs.
              </motion.p>

              <motion.div variants={staggerItem}>
                <PullQuote>
                  The protocol prioritizes compounding over extraction.
                </PullQuote>
              </motion.div>

              <motion.p className="doc-hero__premise-body" variants={staggerItem}>
                Only 10% of realized profit is allocated to governance distribution — and
                only when surplus reserve exceeds 20% of assets under management.
              </motion.p>
            </motion.div>
          </div>
        </section>

        <StackedCardDeck items={allocations} scrollMultiplier={0.65} />

        <div className="doc-body">
          <aside className="doc-body__aside">
            <DocToc entries={DISTRIBUTION_SECTIONS} />
          </aside>

          <article className="doc-body__article">
            {DISTRIBUTION_SECTIONS.map((section) => (
              <DocSection
                key={section.id}
                id={section.id}
                number={section.number}
                title={section.title}
              >
                {section.body}
              </DocSection>
            ))}
          </article>
        </div>
      </main>

      <LandingFooter />
      <BackToTop />
    </div>
  )
}
