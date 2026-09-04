import { motion } from 'framer-motion'
import { Box, C, CardWithLines, Eyebrow, Stage, Txt, fadeV } from './primitives'

const AXIS_X = 452
const SELL_Y = 108
const MAX_Y = 148
const MID_Y = 178
const MIN_Y = 208
const BUY_Y = 248

const sources = [
  { y: 96, tick: MAX_Y, label: 'P_print', detail: 'primary market reference', price: '100.20' },
  { y: 164, tick: MID_Y, label: 'P_oracle', detail: 'oracle consensus', price: '100.05' },
  { y: 232, tick: MIN_Y, label: 'P_twap', detail: 'deep-liquidity TWAP', price: '99.90' },
]

export default function Illu03OracleConsensus() {
  return (
    <Stage viewBox="0 0 900 400" title="Oracle consensus layer">
      <Eyebrow x={48} y={30}>
        Untrusted sources
      </Eyebrow>
      <Eyebrow x={852} y={30} anchor="end">
        Derived trading bands
      </Eyebrow>

      {sources.map((source) => (
        <g key={source.label}>
          <CardWithLines
            x={48}
            y={source.y}
            w={222}
            h={56}
            title={source.label}
            lines={[source.detail]}
          />
          <Txt x={258} y={source.y + 22} size={11} weight={600} anchor="end" fill={C.accent} mono>
            {source.price}
          </Txt>
          <motion.line
            x1={270}
            y1={source.y + 28}
            x2={AXIS_X}
            y2={source.tick}
            stroke={C.line}
            strokeWidth={1}
            variants={fadeV}
          />
          <motion.circle cx={AXIS_X} cy={source.tick} r={4} fill={C.text} variants={fadeV} />
        </g>
      ))}

      {/* Price axis */}
      <motion.line
        x1={AXIS_X}
        y1={62}
        x2={AXIS_X}
        y2={344}
        stroke={C.faint}
        strokeWidth={1}
        variants={fadeV}
      />
      <Txt x={AXIS_X} y={54} size={9.5} weight={600} anchor="middle" fill={C.faint}>
        PRICE
      </Txt>

      {/* Ω bracket */}
      <motion.path
        d={`M${AXIS_X - 22} ${MAX_Y} L${AXIS_X - 32} ${MAX_Y} L${AXIS_X - 32} ${MIN_Y} L${AXIS_X - 22} ${MIN_Y}`}
        fill="none"
        stroke={C.accent}
        strokeWidth={1.2}
        variants={fadeV}
      />
      <Txt x={AXIS_X - 40} y={MID_Y - 2} size={11} weight={600} anchor="end" fill={C.accent}>
        Ω
      </Txt>
      <Txt x={AXIS_X - 40} y={MID_Y + 13} size={9.5} weight={400} anchor="end" fill={C.muted}>
        max − min
      </Txt>

      {/* Zones */}
      <Box x={492} y={62} w={360} h={46} rx={10} fill={C.panel} />
      <Txt x={508} y={82} size={11} weight={600}>
        SELL ZONE
      </Txt>
      <Txt x={508} y={97} size={10} weight={400} fill={C.muted} mono>
        P_sell = max(sources) · (1 + h)
      </Txt>

      <Box x={492} y={SELL_Y} w={360} h={BUY_Y - SELL_Y} rx={10} fill={C.surface} />
      <Txt x={672} y={172} size={11} weight={600} anchor="middle" fill={C.muted}>
        NO-TRADE BAND
      </Txt>
      <Txt x={672} y={188} size={9.5} weight={400} anchor="middle" fill={C.faint}>
        volume sacrificed for correctness
      </Txt>

      <Box x={492} y={BUY_Y} w={360} h={46} rx={10} fill={C.panel} />
      <Txt x={508} y={268} size={11} weight={600}>
        BUY ZONE
      </Txt>
      <Txt x={508} y={283} size={10} weight={400} fill={C.muted} mono>
        P_buy = min(sources) · (1 − h)
      </Txt>

      {[SELL_Y, BUY_Y].map((y) => (
        <motion.line
          key={y}
          x1={AXIS_X}
          y1={y}
          x2={852}
          y2={y}
          stroke={C.accent}
          strokeWidth={1}
          strokeDasharray="5 4"
          variants={fadeV}
        />
      ))}

      <Box x={492} y={312} w={360} h={40} rx={10} fill={C.accentSoft} stroke={C.accent} />
      <Txt x={672} y={337} size={11} weight={600} anchor="middle" fill={C.accent} mono>
        Ω &gt; η → HALT MODE
      </Txt>

      <Txt x={48} y={330} size={10.5} weight={400} fill={C.muted}>
        Buy below the lowest
      </Txt>
      <Txt x={48} y={346} size={10.5} weight={400} fill={C.muted}>
        honest estimate. Sell above
      </Txt>
      <Txt x={48} y={362} size={10.5} weight={400} fill={C.muted}>
        the highest.
      </Txt>
    </Stage>
  )
}
