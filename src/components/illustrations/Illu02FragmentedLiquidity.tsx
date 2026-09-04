import { Box, C, Eyebrow, Stage, Txt, fadeV } from './primitives'
import { motion } from 'framer-motion'

const FAIR_Y = 190
const FAIR_PRICE = 100

/** 1 basis point of deviation maps to this many pixels. */
const SCALE = 92

const venues = [
  { name: 'Liquidity Book', symbol: 'P₁', price: 100.42 },
  { name: 'Uniswap v4', symbol: 'P₂', price: 99.58 },
  { name: 'CL range', symbol: 'P₃', price: 100.11 },
  { name: 'Stock wrapper', symbol: 'P₄', price: 99.31 },
  { name: 'Cross-quoted synth', symbol: 'P₅', price: 100.28 },
]

const XS = [110, 288, 466, 644, 822]

export default function Illu02FragmentedLiquidity() {
  return (
    <Stage viewBox="0 0 900 380" title="Fragmented liquidity ecosystem">
      <Eyebrow x={48} y={30}>
        Independent liquidity surfaces · one economic asset
      </Eyebrow>

      {/* Institutional market-making spread band */}
      <Box
        x={48}
        y={FAIR_Y - 11}
        w={804}
        h={22}
        rx={6}
        fill={C.surface}
        stroke="none"
      />
      <Txt x={852} y={FAIR_Y + 30} size={9.5} weight={500} fill={C.faint} anchor="end">
        institutional MM spread band
      </Txt>

      <motion.line
        x1={48}
        y1={FAIR_Y}
        x2={852}
        y2={FAIR_Y}
        stroke={C.faint}
        strokeWidth={1}
        strokeDasharray="6 5"
        variants={fadeV}
      />
      <Txt x={48} y={FAIR_Y - 20} size={11} weight={600} fill={C.text}>
        P_fair
      </Txt>
      <Txt x={92} y={FAIR_Y - 20} size={11} weight={400} fill={C.muted} mono>
        100.00
      </Txt>

      {venues.map((venue, i) => {
        const x = XS[i]
        const delta = venue.price - FAIR_PRICE
        const y = FAIR_Y - delta * SCALE
        const above = delta > 0
        const cardY = above ? y - 62 : y + 18

        return (
          <g key={venue.name}>
            <motion.line
              x1={x}
              y1={FAIR_Y}
              x2={x}
              y2={y}
              stroke={C.line}
              strokeWidth={1}
              variants={fadeV}
            />
            <motion.circle cx={x} cy={y} r={4.5} fill={C.accent} variants={fadeV} />

            <Box x={x - 74} y={cardY} w={148} h={44} rx={10} fill={C.panel} />
            <Txt x={x} y={cardY + 19} size={11} weight={600} anchor="middle">
              {venue.name}
            </Txt>
            <Txt x={x} y={cardY + 34} size={10.5} weight={400} anchor="middle" fill={C.muted} mono>
              {venue.symbol} {venue.price.toFixed(2)}
            </Txt>

            <Txt
              x={x + 12}
              y={above ? y + 4 : y + 4}
              size={10}
              weight={600}
              fill={above ? C.accent : C.muted}
              mono
            >
              {delta > 0 ? '+' : '−'}
              {Math.abs(delta).toFixed(2)}
            </Txt>
          </g>
        )
      })}

      <Txt x={48} y={356} size={10.5} weight={400} fill={C.muted}>
        P₁ ≠ P₂ ≠ P₃ ≠ P₄ ≠ P₅ ≠ P_fair — deviations exceeding the spread band are economically harvestable
      </Txt>
    </Stage>
  )
}
