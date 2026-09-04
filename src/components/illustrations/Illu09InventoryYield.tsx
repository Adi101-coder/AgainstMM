import { motion } from 'framer-motion'
import { Arrow, Box, C, CardWithLines, Eyebrow, Stage, Txt, fadeV } from './primitives'

const BAR_X = 48
const BAR_W = 804
const BAR_Y = 78
const BAR_H = 56

const segments = [
  { label: 'Quoting reserve', pct: 30, fill: C.surfaceAlt },
  { label: 'Dislocation reserve', pct: 20, fill: C.surface },
  { label: 'Hedge collateral', pct: 12, fill: C.panel },
  { label: 'Utilized inventory', pct: 38, fill: C.accentSoft, accent: true },
]

const venues = [
  { title: 'Securities lending', lines: ['borrow demand'] },
  { title: 'Collateralized borrowing', lines: ['financing markets'] },
  { title: 'Inventory leasing', lines: ['approved venues only'] },
]

const U_MAX_PCT = 60

export default function Illu09InventoryYield() {
  let cursor = BAR_X
  const utilizedStart = BAR_X + ((30 + 20 + 12) / 100) * BAR_W
  const utilizedMid = utilizedStart + (38 / 200) * BAR_W
  const uMaxX = BAR_X + (U_MAX_PCT / 100) * BAR_W

  return (
    <Stage viewBox="0 0 900 400" title="Inventory yield layer">
      <Eyebrow x={48} y={30}>
        Inventory is treated as productive capital
      </Eyebrow>

      {segments.map((segment) => {
        const w = (segment.pct / 100) * BAR_W
        const x = cursor
        cursor += w

        return (
          <g key={segment.label}>
            <Box
              x={x}
              y={BAR_Y}
              w={w - 4}
              h={BAR_H}
              rx={10}
              fill={segment.fill}
              stroke={segment.accent ? C.accent : C.border}
            />
            <Txt
              x={x + 14}
              y={BAR_Y + 24}
              size={10.5}
              weight={600}
              fill={segment.accent ? C.accent : C.text}
            >
              {segment.label}
            </Txt>
            <Txt x={x + 14} y={BAR_Y + 42} size={11} weight={400} fill={C.muted} mono>
              {segment.pct}%
            </Txt>
          </g>
        )
      })}

      {/* Utilization cap */}
      <motion.line
        x1={uMaxX}
        y1={BAR_Y - 8}
        x2={uMaxX}
        y2={BAR_Y + BAR_H + 16}
        stroke={C.accent}
        strokeWidth={1.2}
        strokeDasharray="5 4"
        variants={fadeV}
      />
      <Txt
        x={uMaxX}
        y={BAR_Y - 22}
        size={10}
        weight={600}
        anchor="middle"
        fill={C.accent}
      >
        U_max
      </Txt>

      {venues.map((venue, i) => {
        const x = 108 + i * 250
        return (
          <g key={venue.title}>
            <Arrow x1={utilizedMid} y1={BAR_Y + BAR_H + 18} x2={x + 100} y2={196} dashed />
            <CardWithLines x={x} y={202} w={200} h={62} title={venue.title} lines={venue.lines} />
            <Arrow x1={x + 100} y1={264} x2={450} y2={310} dashed />
          </g>
        )
      })}

      <Box x={288} y={316} w={324} h={48} rx={14} fill={C.accentSoft} stroke={C.accent} />
      <Txt x={450} y={346} size={12} weight={600} anchor="middle" fill={C.accent} mono>
        Yᵢ = BorrowRateᵢ × Inventoryᵢ
      </Txt>

      <Txt x={48} y={346} size={10.5} weight={400} fill={C.muted}>
        The balance sheet
      </Txt>
      <Txt x={48} y={362} size={10.5} weight={400} fill={C.muted}>
        stays productive even
      </Txt>
      <Txt x={48} y={378} size={10.5} weight={400} fill={C.muted}>
        in low volatility.
      </Txt>
    </Stage>
  )
}
