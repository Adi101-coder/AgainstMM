import {
  animate,
  motion,
  useMotionValue,
  useTransform,
} from 'framer-motion'
import { useEffect } from 'react'
import { scaleIn, staggerContainer } from './motion'

const CENTER_X = 400
const CENTER_Y = 230
const ORBIT_TILT = 0.4

/** Three widely spaced rings — inner planets orbit faster. */
const ORBIT_RADII = [118, 205, 292] as const

interface OrbitBody {
  label: string
  ring: 0 | 1 | 2
  startAngle: number
  period: number
}

const bodies: OrbitBody[] = [
  { label: 'Oracles', ring: 0, startAngle: -90, period: 16 },
  { label: 'Inventory', ring: 0, startAngle: 95, period: 18 },
  { label: 'Quotes', ring: 1, startAngle: 10, period: 24 },
  { label: 'Hedges', ring: 1, startAngle: 190, period: 26 },
  { label: 'Venues', ring: 2, startAngle: -35, period: 34 },
  { label: 'Yield', ring: 2, startAngle: 85, period: 38 },
  { label: 'Reserve', ring: 2, startAngle: 205, period: 42 },
]

function orbitPosition(radius: number, degrees: number) {
  const rad = (degrees * Math.PI) / 180
  return {
    x: radius * Math.cos(rad),
    y: radius * Math.sin(rad) * ORBIT_TILT,
  }
}

function OrbitRing({ radius }: { radius: number }) {
  return (
    <ellipse
      cx={0}
      cy={0}
      rx={radius}
      ry={radius * ORBIT_TILT}
      stroke="#d4d4d2"
      strokeWidth="1"
      fill="none"
    />
  )
}

interface OrbitingNodeProps {
  body: OrbitBody
}

function OrbitingNode({ body }: OrbitingNodeProps) {
  const radius = ORBIT_RADII[body.ring]
  const angle = useMotionValue(body.startAngle)

  useEffect(() => {
    const controls = animate(angle, body.startAngle + 360, {
      duration: body.period,
      repeat: Infinity,
      ease: 'linear',
      delay: 0.25,
    })

    return () => controls.stop()
  }, [angle, body])

  const x = useTransform(angle, (deg) => orbitPosition(radius, deg).x)
  const y = useTransform(angle, (deg) => orbitPosition(radius, deg).y)
  const textY = useTransform(y, (value) => value + (value > 0 ? 22 : -14))

  return (
    <>
      <motion.circle cx={x} cy={y} r="4" fill="#c8c8c6" />
      <motion.text
        x={x}
        y={textY}
        textAnchor="middle"
        fill="#8a8a88"
        fontSize="13"
        fontFamily="Inter, system-ui, sans-serif"
      >
        {body.label}
      </motion.text>
    </>
  )
}

export default function HeroDiagram() {
  return (
    <motion.div
      className="hero-diagram"
      initial="hidden"
      animate="visible"
      variants={staggerContainer(0.08, 0.2)}
    >
      <svg
        className="hero-diagram__svg"
        viewBox="0 0 800 440"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="hero-sun-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e8622a" stopOpacity="0.18" />
            <stop offset="55%" stopColor="#e8622a" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#e8622a" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g transform={`translate(${CENTER_X} ${CENTER_Y})`}>
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            {ORBIT_RADII.map((radius) => (
              <OrbitRing key={radius} radius={radius} />
            ))}
          </motion.g>

          <motion.circle
            cx={0}
            cy={0}
            r={48}
            fill="url(#hero-sun-glow)"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          />

          <motion.g transform="translate(-14, -14)" variants={scaleIn}>
            <rect x="2" y="2" width="10" height="10" rx="2.5" fill="#1a1a1a" />
            <rect x="16" y="2" width="10" height="10" rx="2.5" fill="#1a1a1a" />
            <rect x="2" y="16" width="10" height="10" rx="2.5" fill="#1a1a1a" />
            <rect x="16" y="16" width="10" height="10" rx="2.5" fill="#1a1a1a" />
          </motion.g>

          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            {bodies.map((body) => (
              <OrbitingNode key={body.label} body={body} />
            ))}
          </motion.g>
        </g>
      </svg>
    </motion.div>
  )
}
