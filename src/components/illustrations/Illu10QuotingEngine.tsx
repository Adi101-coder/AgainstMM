import { motion } from 'framer-motion'
import { Box, C, Eyebrow, Stage, Txt, fadeV } from './primitives'

interface PanelProps {
  x: number
  title: string
  caption: string
  refY: number
  askY: number
  bidY: number
  accent?: boolean
}

const PANEL_W = 366
const PANEL_Y = 68
const PANEL_H = 262

function Panel({ x, title, caption, refY, askY, bidY, accent }: PanelProps) {
  const innerLeft = x + 92
  const innerRight = x + PANEL_W - 24

  return (
    <g>
      <Box x={x} y={PANEL_Y} w={PANEL_W} h={PANEL_H} rx={16} fill={C.surfaceAlt} />
      <Txt x={x + 20} y={PANEL_Y + 26} size={12.5} weight={600} fill={accent ? C.accent : C.text}>
        {title}
      </Txt>
      <Txt x={x + 20} y={PANEL_Y + 43} size={9.5} weight={400} fill={C.muted}>
        {caption}
      </Txt>

      {/* Spread fill */}
      <motion.rect
        x={innerLeft}
        y={askY}
        width={innerRight - innerLeft}
        height={bidY - askY}
        rx={6}
        fill={accent ? C.accentSoft : C.surface}
        variants={fadeV}
      />

      {/* Reference */}
      <motion.line
        x1={innerLeft - 40}
        y1={refY}
        x2={innerRight}
        y2={refY}
        stroke={C.faint}
        strokeWidth={1}
        strokeDasharray="6 5"
        variants={fadeV}
      />
      <Txt x={innerLeft - 46} y={refY + 4} size={10} weight={600} anchor="end" fill={C.muted}>
        P_ref
      </Txt>

      {/* Ask */}
      <motion.line
        x1={innerLeft}
        y1={askY}
        x2={innerRight}
        y2={askY}
        stroke={C.text}
        strokeWidth={2}
        variants={fadeV}
      />
      <Txt x={innerLeft - 8} y={askY + 4} size={10} weight={600} anchor="end">
        Ask
      </Txt>

      {/* Bid */}
      <motion.line
        x1={innerLeft}
        y1={bidY}
        x2={innerRight}
        y2={bidY}
        stroke={C.text}
        strokeWidth={2}
        variants={fadeV}
      />
      <Txt x={innerLeft - 8} y={bidY + 4} size={10} weight={600} anchor="end">
        Bid
      </Txt>

      {/* λσ brackets */}
      <motion.path
        d={`M${innerRight + 8} ${askY} L${innerRight + 16} ${askY} L${innerRight + 16} ${refY} L${innerRight + 8} ${refY}`}
        fill="none"
        stroke={C.faint}
        strokeWidth={1}
        variants={fadeV}
      />
      <Txt x={innerRight + 22} y={(askY + refY) / 2 + 4} size={9.5} weight={500} fill={C.muted}>
        λσ
      </Txt>
      <motion.path
        d={`M${innerRight + 8} ${refY} L${innerRight + 16} ${refY} L${innerRight + 16} ${bidY} L${innerRight + 8} ${bidY}`}
        fill="none"
        stroke={C.faint}
        strokeWidth={1}
        variants={fadeV}
      />
      <Txt x={innerRight + 22} y={(refY + bidY) / 2 + 4} size={9.5} weight={500} fill={C.muted}>
        λσ
      </Txt>
    </g>
  )
}

export default function Illu10QuotingEngine() {
  return (
    <Stage viewBox="0 0 900 380" title="Dynamic quoting engine">
      <Eyebrow x={48} y={30}>
        Bidᵢ = P_ref − λσᵢ   ·   Askᵢ = P_ref + λσᵢ
      </Eyebrow>

      <Panel
        x={48}
        title="Balanced inventory"
        caption="symmetric two-sided quote"
        refY={202}
        askY={152}
        bidY={252}
      />

      <Panel
        x={486}
        title="Long inventory — skewed"
        caption="both quotes shift to shed risk"
        refY={202}
        askY={186}
        bidY={292}
        accent
      />

      <Txt x={48} y={356} size={10.5} weight={400} fill={C.muted}>
        Inventory imbalance skews both sides. This revenue stream persists even if dislocations disappear entirely.
      </Txt>
    </Stage>
  )
}
