import { motion } from 'framer-motion'
import Reveal from './Reveal'
import { staggerContainer, staggerItem } from './motion'

const steps = [
  {
    step: '01',
    title: 'Price and classify',
    description:
      'Every instrument is priced against three independent sources and assigned a regime — open, closed, or halted — alongside a daily liquidity impact class.',
  },
  {
    step: '02',
    title: 'Auction the capital',
    description:
      'Expected edge divided by risk produces a score per instrument. Capital is allocated proportionally, so the best risk-adjusted opportunities are funded first.',
  },
  {
    step: '03',
    title: 'Acquire and provide',
    description:
      'Passive bid ladders build inventory below fair value, then standing two-sided quotes earn the spread while verified dislocations are harvested in tranches.',
  },
  {
    step: '04',
    title: 'Hedge and compound',
    description:
      'Residual delta is hedged toward zero, idle inventory is financed, and realized profit flows through the treasury waterfall into protocol equity.',
  },
]

export default function WorkflowSection() {
  return (
    <section className="workflow-section">
      <div className="workflow-section__inner">
        <Reveal className="workflow-section__header">
          <p className="section-eyebrow">Operating cycle</p>
          <h2 className="workflow-section__title">
            From reference price to retained equity{' '}
            <span className="text-muted">in four stages.</span>
          </h2>
        </Reveal>

        <motion.ol
          className="workflow-section__steps"
          variants={staggerContainer(0.14)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-8% 0px' }}
        >
          {steps.map((item, index) => (
            <motion.li
              key={item.step}
              className="workflow-step"
              variants={staggerItem}
            >
              <div className="workflow-step__indicator">
                <span className="workflow-step__number">{item.step}</span>
                {index < steps.length - 1 && (
                  <motion.span
                    className="workflow-step__line"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </div>
              <div className="workflow-step__content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}
