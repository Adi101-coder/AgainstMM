import { motion } from 'framer-motion'
import { Arrow, Box, C, Eyebrow, GrowBar, Stage, Txt, fadeV } from './primitives'

const ZERO_X = 236
const UNIT = 34

const positions = [
  { symbol: 'TSLAx', delta: 1.8 },
  { symbol: 'NVDAx', delta: 0.9 },
  { symbol: 'AAPLx', delta: -0.6 },
  { symbol: 'MSFTx', delta: 1.2 },
  { symbol: 'SPYx', delta: -0.4 },
]

const hedges = [
  { name: 'Index perpetual', delta: '−1.6' },
  { name: 'Sector basket', delta: '−0.9' },
  { name: 'Synthetic equity', delta: '−0.4' },
]

const NET = positions.reduce((sum, p) => sum + p.delta, 0)

export default function Illu12HedgingFramework() {
  return (
    <Stage viewBox="0 0 900 400" title="Portfolio hedging framework">
      <Eyebrow x={48} y={30}>
        Δ_port = ΣΔᵢ → target Δ_port ≈ 0
      </Eyebrow>

      <Eyebrow x={48} y={62}>
        GROSS INSTRUMENT DELTA
      </Eyebrow>

      <motion.line
        x1={ZERO_X}
        y1={72}
        x2={ZERO_X}
        y2={252}
        stroke={C.faint}
        strokeWidth={1}
        variants={fadeV}
      />

      {positions.map((position, i) => {
        const y = 84 + i * 34
        const w = Math.abs(position.delta) * UNIT
        const isLong = position.delta > 0

        return (
          <g key={position.symbol}>
            <Txt x={48} y={y + 15} size={11} weight={500}>
              {position.symbol}
            </Txt>
            <GrowBar
              x={isLong ? ZERO_X : ZERO_X - w}
              y={y}
              w={w}
              h={20}
              rx={5}
              fill={isLong ? C.text : C.faint}
              delay={i * 0.06}
            />
            <Txt
              x={isLong ? ZERO_X + w + 10 : ZERO_X - w - 10}
              y={y + 15}
              size={10}
              weight={500}
              anchor={isLong ? 'start' : 'end'}
              fill={C.muted}
              mono
            >
              {position.delta > 0 ? '+' : '−'}
              {Math.abs(position.delta).toFixed(1)}
            </Txt>
          </g>
        )
      })}

      <Arrow x1={402} y1={158} x2={452} y2={158} />

      <Box x={458} y={122} w={148} h={74} rx={14} fill={C.surface} stroke={C.text} />
      <Txt x={532} y={148} size={10} weight={600} anchor="middle" fill={C.muted}>
        Δ_port
      </Txt>
      <Txt x={532} y={176} size={19} weight={700} anchor="middle" mono>
        +{NET.toFixed(1)}
      </Txt>

      <Eyebrow x={852} y={62} anchor="end">
        HEDGE OVERLAY
      </Eyebrow>
      {hedges.map((hedge, i) => {
        const y = 84 + i * 56
        return (
          <g key={hedge.name}>
            <Box x={664} y={y} w={188} h={44} rx={10} fill={C.surfaceAlt} />
            <Txt x={680} y={y + 20} size={11} weight={600}>
              {hedge.name}
            </Txt>
            <Txt x={680} y={y + 35} size={10} weight={400} fill={C.accent} mono>
              Δ {hedge.delta}
            </Txt>
            <Arrow x1={658} y1={y + 22} x2={612} y2={162} dashed />
          </g>
        )
      })}

      <Arrow x1={532} y1={196} x2={532} y2={288} />

      {/* Residual band */}
      <Box x={200} y={294} w={664} h={54} rx={12} fill={C.surfaceAlt} />
      <Box x={488} y={302} w={88} h={38} rx={8} fill={C.accentSoft} stroke={C.accent} />
      <Txt x={532} y={326} size={12} weight={700} anchor="middle" fill={C.accent} mono>
        ≈ 0.0
      </Txt>
      <Txt x={216} y={326} size={10} weight={500} fill={C.muted} mono>
        −D_max
      </Txt>
      <Txt x={848} y={326} size={10} weight={500} anchor="end" fill={C.muted} mono>
        +D_max
      </Txt>

      <Txt x={48} y={382} size={10.5} weight={400} fill={C.muted}>
        Inventory is not alpha — inventory is risk. Residual limits are enforced at contract level.
      </Txt>
    </Stage>
  )
}
