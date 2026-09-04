import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import Reveal from './Reveal'
import { staggerContainer, staggerItem } from './motion'

const faqs = [
  {
    question: 'What does KEEL actually earn on?',
    answer:
      'Four independent streams: the spread on two-sided quotes, the discount captured when passive bids absorb natural selling, verified cross-venue dislocations, and borrow rates on inventory financed out to approved venues.',
  },
  {
    question: 'Why buy below the lowest price estimate?',
    answer:
      'Buy references take the minimum of all sources and apply a wrapper haircut; sell references take the maximum and add one. The asymmetry deliberately sacrifices volume for correctness — the protocol only transacts where every honest estimate agrees it has edge.',
  },
  {
    question: 'What happens when oracles disagree?',
    answer:
      'Source dispersion Ω is measured continuously. Once it exceeds the threshold η, the instrument enters halt mode: no inventory growth, no dislocation trades, and only risk-reducing actions remain available.',
  },
  {
    question: 'Is depositor capital exposed to trading losses?',
    answer:
      'Capital is layered. The junior layer and insurance fund absorb first loss, then the surplus reserve, before the senior vault is ever touched. Withdrawal safety is a contract-level invariant that holds even during a pause.',
  },
  {
    question: 'Does the protocol depend on volatility or token speculation?',
    answer:
      'Neither. Quoting revenue and inventory financing both operate in flat markets, and no strategy depends on token price or volume. The single dependency is the continued existence of fragmented liquidity.',
  },
]

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="faq-section">
      <div className="faq-section__inner">
        <Reveal className="faq-section__header">
          <p className="section-eyebrow">FAQ</p>
          <h2 className="faq-section__title">
            Common questions{' '}
            <span className="text-muted">about the protocol.</span>
          </h2>
        </Reveal>

        <motion.div
          className="faq-section__list"
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-8% 0px' }}
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index

            return (
              <motion.div key={faq.question} className="faq-item" variants={staggerItem}>
                <button
                  type="button"
                  className="faq-item__trigger"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span>{faq.question}</span>
                  <motion.span
                    className="faq-item__icon"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="faq-item__panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
