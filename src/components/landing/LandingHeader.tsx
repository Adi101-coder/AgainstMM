import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import { fadeDown } from './motion'

const navItems = [
  { label: 'Methodology', to: '/methodology' },
  { label: 'Distribution', to: '/distribution' },
]

export default function LandingHeader() {
  const ref = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()
  const headerBg = useTransform(
    scrollY,
    [0, 80],
    ['rgba(243, 243, 241, 0.72)', 'rgba(243, 243, 241, 0.96)'],
  )
  const headerShadow = useTransform(
    scrollY,
    [0, 80],
    ['0 0 0 rgba(0,0,0,0)', '0 8px 32px rgba(0,0,0,0.04)'],
  )

  return (
    <motion.header
      ref={ref}
      className="landing-header"
      style={{ backgroundColor: headerBg, boxShadow: headerShadow }}
      initial="hidden"
      animate="visible"
      variants={fadeDown}
    >
      <div className="landing-header__inner">
        <motion.div
          className="landing-header__logo-wrap"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
        >
          <Link to="/" className="landing-header__logo" aria-label="Home">
            <Logo size={26} />
          </Link>
        </motion.div>

        <nav className="landing-nav" aria-label="Main navigation">
          {navItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.06, duration: 0.45 }}
              whileHover={{ y: -1 }}
            >
              <Link to={item.to} className="landing-nav__link">
                {item.label}
              </Link>
            </motion.div>
          ))}
        </nav>
      </div>
    </motion.header>
  )
}
