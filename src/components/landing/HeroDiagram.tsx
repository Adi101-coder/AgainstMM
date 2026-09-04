import { motion } from 'framer-motion'
import { lineDraw, nodePop, scaleIn, staggerContainer } from './motion'

interface Node {
  label: string
  x: number
  y: number
}

/** The surfaces and functions that surround the protocol balance sheet. */
const nodes: Node[] = [
  { label: 'Oracles', x: 400, y: 72 },
  { label: 'Venues', x: 610, y: 120 },
  { label: 'Reserve', x: 170, y: 300 },
  { label: 'Inventory', x: 280, y: 360 },
  { label: 'Quotes', x: 400, y: 390 },
  { label: 'Hedges', x: 520, y: 360 },
  { label: 'Yield', x: 630, y: 300 },
]

export default function HeroDiagram() {
  const centerX = 400
  const centerY = 230

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
        {nodes.map((node, index) => (
          <motion.line
            key={`line-${node.label}`}
            x1={centerX}
            y1={centerY}
            x2={node.x}
            y2={node.y}
            stroke="#d4d4d2"
            strokeWidth="1"
            variants={lineDraw}
            custom={index}
            transition={{ delay: 0.15 + index * 0.08, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}

        <motion.rect
          x={centerX - 56}
          y={centerY - 56}
          width="112"
          height="112"
          rx="22"
          fill="#e8e8e6"
          stroke="#dddcda"
          strokeWidth="1"
          variants={scaleIn}
        />

        <motion.g
          transform={`translate(${centerX - 14}, ${centerY - 14})`}
          variants={scaleIn}
        >
          <rect x="2" y="2" width="10" height="10" rx="2.5" fill="#1a1a1a" />
          <rect x="16" y="2" width="10" height="10" rx="2.5" fill="#1a1a1a" />
          <rect x="2" y="16" width="10" height="10" rx="2.5" fill="#1a1a1a" />
          <rect x="16" y="16" width="10" height="10" rx="2.5" fill="#1a1a1a" />
        </motion.g>

        {nodes.map((node, index) => (
          <motion.g
            key={node.label}
            variants={nodePop}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="3"
              fill="#c8c8c6"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                delay: index * 0.25,
                ease: 'easeInOut',
              }}
            />
            <text
              x={node.x}
              y={node.y + (node.y > centerY ? 22 : -14)}
              textAnchor="middle"
              fill="#8a8a88"
              fontSize="13"
              fontFamily="Inter, system-ui, sans-serif"
            >
              {node.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </motion.div>
  )
}
