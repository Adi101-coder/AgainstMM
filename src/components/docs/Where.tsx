import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '../landing/motion'
import { renderMath } from './math'

interface WhereProps {
  items: [string, string][]
  title?: string
}

export default function Where({ items, title = 'where' }: WhereProps) {
  return (
    <motion.dl
      className="where"
      variants={staggerContainer(0.06)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-8% 0px' }}
    >
      <p className="where__title">{title}</p>
      {items.map(([symbol, meaning]) => (
        <motion.div key={symbol} className="where__row" variants={staggerItem}>
          <dt>{renderMath(symbol)}</dt>
          <dd>{meaning}</dd>
        </motion.div>
      ))}
    </motion.dl>
  )
}
