import { Arrow, Box, C, Eyebrow, Stage, Txt } from './primitives'

const CENTER = 372

const stages = [
  { w: 620, label: 'Candidate pools', formula: 'venue scan', count: 128, reject: null },
  {
    w: 500,
    label: 'Deviation filter',
    formula: 'δ_p = (P_pool − P_ref) / P_ref',
    count: 41,
    reject: '−87 below threshold',
  },
  {
    w: 392,
    label: 'Fillability probe',
    formula: 'Φ_p = V_out(q₀)',
    count: 17,
    reject: '−24 unfillable quotes',
  },
  {
    w: 288,
    label: 'Liquidity score',
    formula: 'L_p',
    count: 9,
    reject: '−8 dead pools',
  },
  {
    w: 196,
    label: 'Qualified',
    formula: 'δ_eff ≥ δ*',
    count: 4,
    reject: '−5 structural artifacts',
  },
]

const TOP = 56
const H = 54
const GAP = 16

export default function Illu11DislocationPipeline() {
  return (
    <Stage viewBox="0 0 900 400" title="Dislocation qualification pipeline">
      <Eyebrow x={48} y={30}>
        δ_eff = δ_p × Φ_p × L_p — displayed price is not evidence, execution is
      </Eyebrow>

      {stages.map((stage, i) => {
        const y = TOP + i * (H + GAP)
        const x = CENTER - stage.w / 2
        const isLast = i === stages.length - 1

        return (
          <g key={stage.label}>
            <Box
              x={x}
              y={y}
              w={stage.w}
              h={H}
              rx={12}
              fill={isLast ? C.accentSoft : C.surfaceAlt}
              stroke={isLast ? C.accent : C.border}
            />
            <Txt
              x={x + 18}
              y={y + 23}
              size={12}
              weight={600}
              fill={isLast ? C.accent : C.text}
            >
              {stage.label}
            </Txt>
            <Txt x={x + 18} y={y + 40} size={10} weight={400} fill={C.muted} mono>
              {stage.formula}
            </Txt>
            <Txt
              x={x + stage.w - 18}
              y={y + 34}
              size={15}
              weight={700}
              anchor="end"
              fill={isLast ? C.accent : C.text}
              mono
            >
              {stage.count}
            </Txt>

            {stage.reject && (
              <>
                <Arrow x1={x + stage.w + 8} y1={y + 27} x2={x + stage.w + 52} y2={y + 27} color={C.faint} />
                <Txt x={x + stage.w + 60} y={y + 31} size={10} weight={400} fill={C.faint}>
                  {stage.reject}
                </Txt>
              </>
            )}

            {i < stages.length - 1 && (
              <Arrow x1={CENTER} y1={y + H} x2={CENTER} y2={y + H + GAP - 2} />
            )}
          </g>
        )
      })}
    </Stage>
  )
}
