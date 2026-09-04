import { motion, useInView, type Variants } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { fadeUp } from './motion'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  variants?: Variants
  once?: boolean
}

export default function Reveal({
  children,
  className = '',
  delay = 0,
  variants = fadeUp,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-10% 0px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}
