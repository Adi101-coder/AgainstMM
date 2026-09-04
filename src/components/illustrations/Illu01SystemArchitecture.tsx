import { Arrow, Box, C, CardWithLines, Eyebrow, PathArrow, Stage, Txt } from './primitives'

const inputs = [
  { title: 'Reference pricing', lines: ['min / max · haircut h'] },
  { title: 'Oracle consensus', lines: ['Ω vs η disagreement'] },
  { title: 'Liquidity survey', lines: ['I(Q) classification'] },
  { title: 'Regime classifier', lines: ['OPEN · CLOSED · HALT'] },
]

const outputs = [
  { title: 'Passive bid ladder', lines: ['B1–B4 discounts'] },
  { title: 'Two-sided quoting', lines: ['P_ref ± λσ'] },
  { title: 'Dislocation harvest', lines: ['δ_eff ≥ δ*'] },
  { title: 'Inventory utilization', lines: ['lending · financing'] },
]

const ROW_Y = [58, 124, 190, 256]

export default function Illu01SystemArchitecture() {
  return (
    <Stage viewBox="0 0 900 420" title="KEEL full system architecture">
      <Eyebrow x={48} y={34}>
        Signal layer
      </Eyebrow>
      <Eyebrow x={450} y={34} anchor="middle">
        Allocation core
      </Eyebrow>
      <Eyebrow x={852} y={34} anchor="end">
        Execution layer
      </Eyebrow>

      {inputs.map((item, i) => (
        <g key={item.title}>
          <CardWithLines
            x={48}
            y={ROW_Y[i]}
            w={182}
            h={54}
            title={item.title}
            lines={item.lines}
          />
          <Arrow x1={230} y1={ROW_Y[i] + 27} x2={366} y2={200} />
        </g>
      ))}

      <Box x={366} y={140} w={168} h={120} rx={18} fill={C.surface} stroke={C.text} />
      <Txt x={450} y={178} size={14} weight={700} anchor="middle" spacing={1.4}>
        KEEL CORE
      </Txt>
      <Txt x={450} y={200} size={10.5} weight={400} anchor="middle" fill={C.muted}>
        internal capital auction
      </Txt>
      <Txt x={450} y={228} size={11} anchor="middle" fill={C.accent} mono>
        Wᵢ = Scoreᵢ / ΣScoreⱼ
      </Txt>

      {outputs.map((item, i) => (
        <g key={item.title}>
          <Arrow x1={534} y1={200} x2={664} y2={ROW_Y[i] + 27} />
          <CardWithLines
            x={670}
            y={ROW_Y[i]}
            w={182}
            h={54}
            title={item.title}
            lines={item.lines}
          />
        </g>
      ))}

      <Arrow x1={450} y1={260} x2={450} y2={324} />
      <CardWithLines
        x={330}
        y={330}
        w={240}
        h={58}
        title="Hedging · treasury · surplus"
        lines={['Δ_port ≈ 0 · profit retained before distribution']}
        accent
      />

      <PathArrow
        d="M330 359 L282 359 L282 200 L360 200"
        dashed
        headAt={{ x: 360, y: 200, angle: 0 }}
      />
      <Txt x={276} y={286} size={9.5} weight={500} fill={C.faint} anchor="end">
        compounded
      </Txt>
      <Txt x={276} y={299} size={9.5} weight={500} fill={C.faint} anchor="end">
        equity
      </Txt>
    </Stage>
  )
}
