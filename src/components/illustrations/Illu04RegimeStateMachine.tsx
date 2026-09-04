import { Box, C, Eyebrow, PathArrow, Stage, Txt } from './primitives'

interface State {
  x: number
  y: number
  w: number
  h: number
  name: string
  caption: string
  lines: string[]
  accent?: boolean
}

const states: State[] = [
  {
    x: 60,
    y: 84,
    w: 226,
    h: 134,
    name: 'OPEN',
    caption: 'primary session active',
    lines: ['tight spreads', 'two-sided quoting', 'inventory acquisition', 'dislocation harvest'],
  },
  {
    x: 614,
    y: 84,
    w: 226,
    h: 134,
    name: 'CLOSED',
    caption: 'after-hours · weekend',
    lines: ['reduced position sizes', 'widened thresholds', 'cross-venue basis only'],
  },
  {
    x: 337,
    y: 268,
    w: 226,
    h: 106,
    name: 'HALT',
    caption: 'event or oracle risk',
    lines: ['inventory reduction', 'hedging only', 'no new directional risk'],
    accent: true,
  },
]

export default function Illu04RegimeStateMachine() {
  return (
    <Stage viewBox="0 0 900 400" title="Regime state machine">
      <Eyebrow x={48} y={34}>
        Every instrument occupies exactly one operating state
      </Eyebrow>

      {states.map((state) => (
        <g key={state.name}>
          <Box
            x={state.x}
            y={state.y}
            w={state.w}
            h={state.h}
            rx={16}
            fill={state.accent ? C.accentSoft : C.surfaceAlt}
            stroke={state.accent ? C.accent : C.border}
          />
          <Txt
            x={state.x + 18}
            y={state.y + 28}
            size={15}
            weight={700}
            spacing={1.2}
            fill={state.accent ? C.accent : C.text}
          >
            {state.name}
          </Txt>
          <Txt x={state.x + 18} y={state.y + 45} size={9.5} weight={400} fill={C.muted}>
            {state.caption}
          </Txt>
          {state.lines.map((line, i) => (
            <g key={line}>
              <circle
                cx={state.x + 22}
                cy={state.y + 66 + i * 17}
                r={1.8}
                fill={state.accent ? C.accent : C.faint}
              />
              <Txt
                x={state.x + 32}
                y={state.y + 70 + i * 17}
                size={10.5}
                weight={400}
                fill={C.text}
              >
                {line}
              </Txt>
            </g>
          ))}
        </g>
      ))}

      {/* OPEN ⇄ CLOSED */}
      <PathArrow
        d="M286 122 Q450 76 614 122"
        headAt={{ x: 614, y: 122, angle: 20 }}
      />
      <Txt x={450} y={84} size={10} weight={500} anchor="middle" fill={C.muted}>
        session close
      </Txt>

      <PathArrow
        d="M614 180 Q450 226 286 180"
        headAt={{ x: 286, y: 180, angle: 200 }}
      />
      <Txt x={450} y={222} size={10} weight={500} anchor="middle" fill={C.muted}>
        session open
      </Txt>

      {/* OPEN → HALT */}
      <PathArrow
        d="M172 218 Q186 320 337 316"
        color={C.accent}
        headAt={{ x: 337, y: 316, angle: 2 }}
      />
      <Txt x={150} y={276} size={10} weight={500} fill={C.accent}>
        Ω &gt; η
      </Txt>
      <Txt x={150} y={290} size={10} weight={500} fill={C.accent}>
        earnings · halts
      </Txt>

      {/* HALT → CLOSED */}
      <PathArrow
        d="M563 316 Q716 320 728 218"
        dashed
        headAt={{ x: 728, y: 218, angle: -84 }}
      />
      <Txt x={608} y={356} size={10} weight={500} fill={C.muted}>
        resolution · governance clear
      </Txt>
    </Stage>
  )
}
