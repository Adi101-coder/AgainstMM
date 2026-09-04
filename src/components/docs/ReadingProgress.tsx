import { motion, useScroll, useSpring } from 'framer-motion'

export default function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 34,
    restDelta: 0.001,
  })

  return <motion.div className="reading-progress" style={{ scaleX }} aria-hidden="true" />
}
