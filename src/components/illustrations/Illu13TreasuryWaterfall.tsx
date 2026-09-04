import { Arrow, Box, C, Eyebrow, GrowBar, Stage, Txt } from './primitives'

const buckets = [
  { name: 'Surplus Reserve', pct: 40, x: 48, w: 274 },
  { name: 'Reinvestment', pct: 30, x: 334, w: 205 },
  { name: 'Insurance Fund', pct: 20, x: 551, w: 137 },
  { name: 'Governance', pct: 10, x: 700, w: 68, accent: true },
]

const BUCKET_Y = 258

export default function Illu13TreasuryWaterfall() {
  return (
    <Stage viewBox="0 0 900 400" title="Treasury and surplus waterfall">
      <Eyebrow x={48} y={30}>
        Profit is retained before distribution
      </Eyebrow>

      <Box x={318} y={50} w={264} h={50} rx={14} fill={C.surface} stroke={C.text} />
      <Txt x={450} y={72} size={12.5} weight={600} anchor="middle">
        Realized profit
      </Txt>
      <Txt x={450} y={88} size={9.5} weight={400} anchor="middle" fill={C.muted}>
        spread capture · dislocations · inventory yield
      </Txt>

      <Arrow x1={450} y1={100} x2={450} y2={140} />

      <Box x={318} y={146} w={264} h={48} rx={14} fill={C.accentSoft} stroke={C.accent} dashed />
      <Txt x={450} y={168} size={11.5} weight={600} anchor="middle" fill={C.accent} mono>
        Reserve ≥ 20% of AUM
      </Txt>
      <Txt x={450} y={184} size={9.5} weight={400} anchor="middle" fill={C.muted}>
        distribution gate
      </Txt>

      {buckets.map((bucket, i) => {
        const centerX = bucket.x + bucket.w / 2
        return (
          <g key={bucket.name}>
            <Arrow x1={450} y1={194} x2={centerX} y2={BUCKET_Y - 8} dashed={bucket.accent} />

            <GrowBar
              x={bucket.x}
              y={BUCKET_Y}
              w={bucket.w}
              h={62}
              rx={12}
              fill={bucket.accent ? C.accentSoft : C.surfaceAlt}
              stroke={bucket.accent ? C.accent : C.border}
              delay={i * 0.08}
            />
            <Txt
              x={bucket.x + 14}
              y={BUCKET_Y + 26}
              size={11}
              weight={600}
              fill={bucket.accent ? C.accent : C.text}
            >
              {bucket.name}
            </Txt>
            <Txt
              x={bucket.x + 14}
              y={BUCKET_Y + 48}
              size={16}
              weight={700}
              fill={bucket.accent ? C.accent : C.text}
              mono
            >
              {bucket.pct}%
            </Txt>
          </g>
        )
      })}

      <Txt x={700} y={344} size={9.5} weight={400} fill={C.muted}>
        only above
      </Txt>
      <Txt x={700} y={356} size={9.5} weight={400} fill={C.muted}>
        the threshold
      </Txt>

      <Txt x={48} y={356} size={10.5} weight={400} fill={C.muted}>
        The protocol prioritizes compounding over extraction
      </Txt>
    </Stage>
  )
}
