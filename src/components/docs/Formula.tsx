import { motion } from 'framer-motion'
import { renderMath } from './math'

interface FormulaProps {
  label?: string
  lines: string[]
  accent?: boolean
}

export default function Formula({ label, lines, accent = false }: FormulaProps) {
  return (
    <motion.div
      className={accent ? 'formula formula--accent' : 'formula'}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {label && <span className="formula__label">{label}</span>}
      {lines.map((line) => (
        <span key={line} className="formula__line">
          {renderMath(line)}
        </span>
      ))}
    </motion.div>
  )
}
