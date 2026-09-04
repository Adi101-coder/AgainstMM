import { Arrow, Box, C, Eyebrow, GrowBar, Stage, Txt } from './primitives'

const rows = [
  { symbol: 'TSLAx', edge: '42 bps', risk: '1.40', score: 30 },
  { symbol: 'NVDAx', edge: '55 bps', risk: '2.20', score: 25 },
  { symbol: 'AAPLx', edge: '18 bps', risk: '0.90', score: 20 },
  { symbol: 'MSFTx', edge: '12 bps', risk: '0.80', score: 15 },
  { symbol: 'SPYx', edge: '6 bps', risk: '0.60', score: 10 },
]

const ROW_H = 46
const TOP = 74
const GAP = 14
const BAR_X = 596
const PX_PER_PCT = 7.6

export default function Illu08CapitalAuction() {
  return (
    <Stage viewBox="0 0 900 400" title="Internal capital market allocation">
      <Eyebrow x={48} y={30}>
        Scoreᵢ = ExpectedEdgeᵢ / Riskᵢ
      </Eyebrow>
      <Eyebrow x={852} y={30} anchor="end">
        Wᵢ = Scoreᵢ / ΣScoreⱼ
      </Eyebrow>

      <Eyebrow x={48} y={62}>
        INSTRUMENT
      </Eyebrow>
      <Eyebrow x={252} y={62} anchor="end">
        EDGE / RISK
      </Eyebrow>
      <Eyebrow x={392} y={62} anchor="middle">
        SCORE
      </Eyebrow>
      <Eyebrow x={596} y={62}>
        ALLOCATED WEIGHT
      </Eyebrow>

      {rows.map((row, i) => {
        const y = TOP + i * (ROW_H + GAP)
        const top = i === 0

        return (
          <g key={row.symbol}>
            <Box x={48} y={y} w={296} h={ROW_H} rx={10} fill={C.surfaceAlt} />
            <Txt x={66} y={y + 28} size={12} weight={600}>
              {row.symbol}
            </Txt>
            <Txt x={326} y={y + 28} size={10.5} weight={400} anchor="end" fill={C.muted} mono>
              {row.edge} / {row.risk}
            </Txt>

            <Box
              x={356}
              y={y + 5}
              w={72}
              h={ROW_H - 10}
              rx={9}
              fill={top ? C.accentSoft : C.panel}
              stroke={top ? C.accent : C.border}
            />
            <Txt
              x={392}
              y={y + 29}
              size={12.5}
              weight={700}
              anchor="middle"
              fill={top ? C.accent : C.text}
              mono
            >
              {row.score}
            </Txt>

            <Arrow x1={436} y1={y + ROW_H / 2} x2={588} y2={y + ROW_H / 2} />

            <GrowBar
              x={BAR_X}
              y={y + 11}
              w={row.score * PX_PER_PCT}
              h={24}
              rx={6}
              fill={top ? C.accent : C.text}
              delay={i * 0.07}
            />
            <Txt
              x={BAR_X + row.score * PX_PER_PCT + 12}
              y={y + 28}
              size={11}
              weight={600}
              fill={C.muted}
              mono
            >
              {row.score}%
            </Txt>
          </g>
        )
      })}

      <Box x={356} y={352} w={472} h={34} rx={10} fill={C.surface} />
      <Txt x={392} y={374} size={11} weight={600} anchor="middle" mono>
        Σ 100
      </Txt>
      <Txt x={452} y={374} size={10.5} weight={400} fill={C.muted}>
        Highest risk-adjusted opportunities receive capital first — allocation is an auction, not a round robin
      </Txt>
    </Stage>
  )
}
