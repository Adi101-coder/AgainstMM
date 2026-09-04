import { motion } from 'framer-motion'
import { Arrow, Box, C, Eyebrow, GrowBar, Stage, Txt, fadeV } from './primitives'

const REF_Y = 72
const BAR_X = 258

const levels = [
  { level: 'B1', discount: '0.5%', price: '99.50', y: 112, w: 118 },
  { level: 'B2', discount: '1.0%', price: '99.00', y: 168, w: 178 },
  { level: 'B3', discount: '2.0%', price: '98.00', y: 224, w: 254 },
  { level: 'B4', discount: '3.5%', price: '96.50', y: 280, w: 330 },
]

export default function Illu07BidLadder() {
  return (
    <Stage viewBox="0 0 900 380" title="Passive bid ladder engine">
      <Eyebrow x={48} y={30}>
        Bᵢ(k) = P_buy(i) · (1 − βₖ)
      </Eyebrow>

      <motion.line
        x1={48}
        y1={REF_Y}
        x2={852}
        y2={REF_Y}
        stroke={C.text}
        strokeWidth={1}
        strokeDasharray="6 5"
        variants={fadeV}
      />
      <Txt x={48} y={REF_Y - 12} size={11} weight={600}>
        P_buy
      </Txt>
      <Txt x={92} y={REF_Y - 12} size={10.5} weight={400} fill={C.muted} mono>
        100.00 — min(sources) · (1 − h)
      </Txt>

      <Eyebrow x={48} y={116}>
        NATURAL
      </Eyebrow>
      <Eyebrow x={48} y={130}>
        SELL FLOW
      </Eyebrow>

      {levels.map((level, i) => (
        <g key={level.level}>
          <Arrow x1={48} y1={level.y + 18} x2={BAR_X - 84} y2={level.y + 18} color={C.faint} />

          <Txt x={BAR_X - 74} y={level.y + 15} size={12} weight={700}>
            {level.level}
          </Txt>
          <Txt x={BAR_X - 74} y={level.y + 30} size={10} weight={400} fill={C.muted} mono>
            −{level.discount}
          </Txt>

          <GrowBar
            x={BAR_X}
            y={level.y}
            w={level.w}
            h={36}
            rx={8}
            fill={i === 3 ? C.accent : C.text}
            delay={i * 0.08}
          />
          <Txt x={BAR_X + level.w + 14} y={level.y + 23} size={10.5} weight={500} fill={C.muted} mono>
            {level.price}
          </Txt>
        </g>
      ))}

      <Box x={640} y={112} w={212} h={110} rx={14} fill={C.surfaceAlt} dashed />
      <Txt x={658} y={136} size={11.5} weight={600}>
        Aggressive purchase
      </Txt>
      <Txt x={658} y={156} size={10} weight={400} fill={C.muted}>
        permitted only when
      </Txt>
      <Txt x={658} y={176} size={10.5} weight={500} fill={C.accent} mono>
        Inventoryᵢ &lt; Targetᵢ
      </Txt>
      <Txt x={658} y={196} size={10} weight={400} fill={C.muted}>
        and passive fill is
      </Txt>
      <Txt x={658} y={210} size={10} weight={400} fill={C.muted}>
        insufficient
      </Txt>

      <Txt x={48} y={344} size={10.5} weight={400} fill={C.muted}>
        Most traders pay for immediacy — the protocol monetizes that impatience and earns on entry as well as exit
      </Txt>
    </Stage>
  )
}
