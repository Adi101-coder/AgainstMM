import { motion } from 'framer-motion'
import { staggerContainer } from '../landing/motion'
import { renderMath } from './math'

/**
 * The source document uses short standalone lines for emphasis. Cadence renders
 * them as a single rhythmic block instead of a run of loose paragraphs.
 */
export default function Cadence({
  lines,
  strong = false,
}: {
  lines: string[]
  strong?: boolean
}) {
  return (
    <motion.div
      className={strong ? 'cadence cadence--strong' : 'cadence'}
      variants={staggerContainer(0.08)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-8% 0px' }}
    >
      {lines.map((line) => (
        <motion.p
          key={line}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
          }}
        >
          {renderMath(line)}
        </motion.p>
      ))}
    </motion.div>
  )
}
