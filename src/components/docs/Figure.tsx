import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface FigureProps {
  number: number
  caption: string
  children: ReactNode
  wide?: boolean
}

export default function Figure({ number, caption, children, wide = false }: FigureProps) {
  return (
    <motion.figure
      className={wide ? 'figure figure--wide' : 'figure'}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-6% 0px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="figure__frame">{children}</div>
      <figcaption>
        <span className="figure__index">Illustration {number}</span>
        <span className="figure__divider">·</span>
        <span>{caption}</span>
      </figcaption>
    </motion.figure>
  )
}
