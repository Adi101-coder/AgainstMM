import Reveal from './Reveal'
import StackedCardDeck, { type StackCardItem } from './StackedCardDeck'

const features: StackCardItem[] = [
  {
    id: 'reference-pricing',
    badge: '01',
    title: 'Reference pricing',
    subtitle: 'Conservative multi-source bands',
    description:
      'Three independent sources produce asymmetric buy and sell references, haircut for wrapper risk. Disagreement beyond threshold triggers an automatic halt.',
  },
  {
    id: 'competitive-acquisition',
    badge: '02',
    title: 'Competitive acquisition',
    subtitle: 'Passive bids below fair value',
    description:
      'A passive bid ladder absorbs natural selling pressure below fair value. Aggressive purchases occur only when inventory falls short of target.',
  },
  {
    id: 'two-sided-quoting',
    badge: '03',
    title: 'Two-sided quoting',
    subtitle: 'Spread capture around P_ref',
    description:
      'Standing bids and asks are posted around fair value, scaled by realized volatility and skewed by inventory imbalance.',
  },
  {
    id: 'dislocation-harvesting',
    badge: '04',
    title: 'Dislocation harvesting',
    subtitle: 'Execution-verified arbitrage',
    description:
      'Deviation, fillability, and liquidity score combine into an effective dislocation. Dead pools and fake quotes are rejected before execution.',
  },
  {
    id: 'inventory-financing',
    badge: '05',
    title: 'Inventory financing',
    subtitle: 'Productive idle capital',
    description:
      'Idle inventory is deployed into approved lending and financing venues, so the balance sheet stays productive through low-volatility regimes.',
  },
  {
    id: 'portfolio-hedging',
    badge: '06',
    title: 'Portfolio hedging',
    subtitle: 'Delta driven toward zero',
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

        <StackedCardDeck items={features} />
      </div>
    </section>
  )
}
