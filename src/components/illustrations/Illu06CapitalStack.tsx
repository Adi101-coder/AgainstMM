import { Arrow, Box, C, Eyebrow, Stage, Txt } from './primitives'

const layers = [
  { name: 'Senior Vault', fn: 'Depositor capital', tone: C.panel },
  { name: 'Surplus Reserve', fn: 'Protocol equity', tone: C.surfaceAlt },
  { name: 'Insurance Fund', fn: 'First-loss protection', tone: C.surface },
  { name: 'Junior Layer', fn: 'Governance & residual risk', tone: C.accentSoft },
]

const BAR_X = 250
const BAR_W = 400
const BAR_H = 62
const GAP = 18
const TOP = 56

export default function Illu06CapitalStack() {
  const bottom = TOP + layers.length * (BAR_H + GAP) - GAP

  return (
    <Stage viewBox="0 0 900 380" title="Capital stack and loss waterfall">
      <Eyebrow x={48} y={30}>
        Independent capital layers
      </Eyebrow>

      {layers.map((layer, i) => {
        const y = TOP + i * (BAR_H + GAP)
        const isJunior = layer.name === 'Junior Layer'

        return (
          <g key={layer.name}>
            <Box
              x={BAR_X}
              y={y}
              w={BAR_W}
              h={BAR_H}
              rx={14}
              fill={layer.tone}
              stroke={isJunior ? C.accent : C.border}
            />
            <Txt
              x={BAR_X + 20}
              y={y + 27}
              size={13}
              weight={600}
              fill={isJunior ? C.accent : C.text}
            >
              {layer.name}
            </Txt>
            <Txt x={BAR_X + 20} y={y + 45} size={10.5} weight={400} fill={C.muted}>
              {layer.fn}
            </Txt>
            <Txt x={BAR_X + BAR_W - 20} y={y + 38} size={10} weight={600} anchor="end" fill={C.faint}>
              {String(layers.length - i).padStart(2, '0')}
            </Txt>
          </g>
        )
      })}

      <Arrow x1={200} y1={bottom - 10} x2={200} y2={TOP + 12} color={C.accent} />
      <Txt x={186} y={TOP - 12} size={11} weight={600} anchor="end" fill={C.accent}>
        losses
      </Txt>
      <Txt x={186} y={TOP + 3} size={9.5} weight={400} anchor="end" fill={C.muted}>
        flow upward
      </Txt>

      <Arrow x1={700} y1={TOP + 12} x2={700} y2={bottom - 10} />
      <Txt x={714} y={TOP - 12} size={11} weight={600}>
        profits
      </Txt>
      <Txt x={714} y={TOP + 3} size={9.5} weight={400} fill={C.muted}>
        flow downward
      </Txt>
    </Stage>
  )
}
