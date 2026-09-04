import { motion } from 'framer-motion'
import { Box, C, Eyebrow, Stage, Txt, drawV, fadeV } from './primitives'

const PLOT = { left: 96, right: 762, top: 60, bottom: 330 }
const MAX_IMPACT = 6

/** Q is spaced by decade: 100 → 1 000 → 10 000 USD. */
const QX = [PLOT.left + 54, (PLOT.left + PLOT.right) / 2, PLOT.right - 40]

const y = (impact: number) =>
  PLOT.bottom - (impact / MAX_IMPACT) * (PLOT.bottom - PLOT.top)

const curves = [
  { name: 'Deep', values: [0.01, 0.03, 0.08], color: C.faint, dashed: false, note: 'I(10k) ≈ 0' },
  { name: 'Tradeable', values: [0.05, 0.25, 0.9], color: C.text, dashed: false, note: 'moderate impact' },
  { name: 'Thin', values: [0.15, 0.8, 2.6], color: C.accent, dashed: false, note: 'significant impact' },
  { name: 'Extreme', values: [0.5, 2.4, 5.6], color: C.muted, dashed: true, note: 'structural risk' },
]

function curvePath(values: number[]) {
  const [a, b, c] = values.map(y)
  const [x0, x1, x2] = QX
  return `M${x0} ${a} Q${(x0 + x1) / 2} ${(a + b) / 2 - 6} ${x1} ${b} Q${(x1 + x2) / 2} ${(b + c) / 2 - 10} ${x2} ${c}`
}

export default function Illu05ImpactCurves() {
  return (
    <Stage viewBox="0 0 900 400" title="Impact function curves by liquidity class">
      <Eyebrow x={48} y={30}>
        I(Q) = P_eff(Q) / P_ref − 1
      </Eyebrow>

      {/* Target corridor */}
      <Box
        x={PLOT.left}
        y={y(3)}
        w={PLOT.right - PLOT.left}
        h={y(0.2) - y(3)}
        rx={8}
        fill={C.surface}
        stroke="none"
      />
      <Txt x={PLOT.left + 12} y={y(3) + 18} size={9.5} weight={600} fill={C.faint}>
        TARGET CORRIDOR
      </Txt>

      {/* Gridlines */}
      {[0, 1.5, 3, 4.5, 6].map((tick) => (
        <g key={tick}>
          <motion.line
            x1={PLOT.left}
            y1={y(tick)}
            x2={PLOT.right}
            y2={y(tick)}
            stroke={C.border}
            strokeWidth={1}
            variants={fadeV}
          />
          <Txt x={PLOT.left - 12} y={y(tick) + 4} size={10} weight={400} anchor="end" fill={C.muted} mono>
            {tick.toFixed(1)}%
          </Txt>
        </g>
      ))}

      {/* Axes */}
      <motion.line
        x1={PLOT.left}
        y1={PLOT.top}
        x2={PLOT.left}
        y2={PLOT.bottom}
        stroke={C.faint}
        strokeWidth={1}
        variants={fadeV}
      />

      {QX.map((x, i) => (
        <g key={x}>
          <motion.line
            x1={x}
            y1={PLOT.bottom}
            x2={x}
            y2={PLOT.bottom + 6}
            stroke={C.faint}
            strokeWidth={1}
            variants={fadeV}
          />
          <Txt x={x} y={PLOT.bottom + 22} size={10.5} weight={500} anchor="middle" fill={C.muted} mono>
            {['100', '1 000', '10 000'][i]}
          </Txt>
        </g>
      ))}
      <Txt x={(PLOT.left + PLOT.right) / 2} y={PLOT.bottom + 44} size={10} weight={500} anchor="middle" fill={C.faint}>
        Q — probe size (USD)
      </Txt>

      {curves.map((curve, index) => (
        <g key={curve.name}>
          <motion.path
            d={curvePath(curve.values)}
            fill="none"
            stroke={curve.color}
            strokeWidth={curve.name === 'Thin' ? 2 : 1.6}
            strokeDasharray={curve.dashed ? '5 4' : undefined}
            variants={drawV}
          />
          {curve.values.map((value, i) => (
            <motion.circle
              key={i}
              cx={QX[i]}
              cy={y(value)}
              r={3.2}
              fill={curve.color}
              variants={fadeV}
            />
          ))}

          {/* Legend */}
          <motion.line
            x1={790}
            y1={92 + index * 46}
            x2={818}
            y2={92 + index * 46}
            stroke={curve.color}
            strokeWidth={2}
            strokeDasharray={curve.dashed ? '5 4' : undefined}
            variants={fadeV}
          />
          <Txt x={790} y={80 + index * 46} size={11} weight={600} fill={curve.color}>
            {curve.name}
          </Txt>
          <Txt x={790} y={108 + index * 46} size={9.5} weight={400} fill={C.muted}>
            {curve.note}
          </Txt>
        </g>
      ))}
    </Stage>
  )
}
