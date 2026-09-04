import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export default function PullQuote({ children }: { children: ReactNode }) {
  return (
    <motion.blockquote
      className="pull-quote"
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.blockquote>
  )
}
