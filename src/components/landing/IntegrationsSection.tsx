import Reveal from './Reveal'

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
    </section>
  )
}
