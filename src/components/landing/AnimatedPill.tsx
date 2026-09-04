import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface AnimatedPillProps {
  children: ReactNode
  className?: string
  /** Internal route — rendered through the router. */
  to?: string
  /** External or in-page target. */
  href?: string
}

const hover = { scale: 1.04, y: -2 }
const tap = { scale: 0.97 }
const spring = { type: 'spring' as const, stiffness: 420, damping: 24 }

export default function AnimatedPill({
  children,
  className = '',
  to,
  href = '#',
}: AnimatedPillProps) {
  if (to) {
    return (
      <motion.span
        className="pill-btn-wrap"
        whileHover={hover}
        whileTap={tap}
        transition={spring}
      >
        <Link to={to} className={className}>
          {children}
        </Link>
      </motion.span>
    )
  }

  return (
    <motion.a
      href={href}
      className={className}
      whileHover={hover}
      whileTap={tap}
      transition={spring}
    >
      {children}
    </motion.a>
  )
}
