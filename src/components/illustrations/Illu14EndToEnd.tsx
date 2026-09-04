import { Arrow, Box, C, Chip, Eyebrow, PathArrow, Stage, Txt } from './primitives'

const LEFT = 56
const WIDE = 762
const CENTER = LEFT + WIDE / 2

interface Node {
  y: number
  h: number
  cells: { x: number; w: number; title: string; sub?: string; accent?: boolean }[]
}

const rows: Node[] = [
  {
    y: 52,
    h: 46,
    cells: [
      { x: LEFT, w: 246, title: 'Primary market print', sub: 'P_print' },
      { x: LEFT + 258, w: 246, title: 'Deep-liquidity TWAP', sub: 'P_twap' },
      { x: LEFT + 516, w: 246, title: 'Oracle consensus', sub: 'P_oracle' },
    ],
  },
  {
    y: 122,
    h: 44,
    cells: [
      {
        x: LEFT,
        w: WIDE,
        title: 'Reference pricing — P_buy = min · (1 − h)   ·   P_sell = max · (1 + h)',
      },
    ],
  },
  {
    y: 190,
    h: 44,
    cells: [
      { x: LEFT, w: 372, title: 'Regime classifier', sub: 'OPEN · CLOSED · HALT' },
      { x: LEFT + 390, w: 372, title: 'Liquidity eligibility', sub: 'I(Q) → Tradeable + Thin' },
    ],
  },
  {
    y: 258,
    h: 44,
    cells: [
      {
        x: LEFT,
        w: WIDE,
        title: 'Internal capital auction — Wᵢ = Scoreᵢ / ΣScoreⱼ',
        accent: true,
      },
    ],
  },
  {
    y: 326,
    h: 56,
    cells: [
      { x: LEFT, w: 180, title: 'Bid ladder', sub: 'B1–B4' },
      { x: LEFT + 194, w: 180, title: 'Two-sided quoting', sub: 'P_ref ± λσ' },
      { x: LEFT + 388, w: 180, title: 'Dislocation harvest', sub: 'δ_eff ≥ δ*' },
      { x: LEFT + 582, w: 180, title: 'Inventory utilization', sub: 'Y = rate × inv' },
    ],
  },
  {
    y: 406,
    h: 44,
    cells: [
      { x: LEFT, w: 372, title: 'Hedging overlay', sub: 'Δ_port ≈ 0' },
      { x: LEFT + 390, w: 372, title: 'Realized P&L', sub: 'spread · basis · yield' },
    ],
  },
  {
    y: 474,
    h: 44,
    cells: [
      {
        x: LEFT,
        w: WIDE,
        title: 'Treasury waterfall — surplus reserve · reinvestment · insurance · governance',
      },
    ],
  },
]

const invariants = [
  { label: 'single custody', w: 118 },
  { label: 'venue allowlist', w: 124 },
  { label: 'oracle halt', w: 104 },
  { label: 'exposure caps', w: 118 },
  { label: 'keeper rotation', w: 126 },
  { label: 'emergency pause', w: 134 },
]

export default function Illu14EndToEnd() {
  let chipX = LEFT

  return (
    <Stage viewBox="0 0 900 610" title="Full end-to-end protocol architecture">
      <Eyebrow x={LEFT} y={30}>
        Signal → allocation → execution → equity
      </Eyebrow>

      {rows.map((row, rowIndex) => (
        <g key={row.y}>
          {row.cells.map((cell) => (
            <g key={cell.title}>
              <Box
                x={cell.x}
                y={row.y}
                w={cell.w}
                h={row.h}
                rx={12}
                fill={cell.accent ? C.accentSoft : C.surfaceAlt}
                stroke={cell.accent ? C.accent : C.border}
              />
              <Txt
                x={cell.x + 16}
                y={cell.sub ? row.y + 22 : row.y + row.h / 2 + 4}
                size={11.5}
                weight={600}
                fill={cell.accent ? C.accent : C.text}
              >
                {cell.title}
              </Txt>
              {cell.sub && (
                <Txt x={cell.x + 16} y={row.y + 38} size={10} weight={400} fill={C.muted} mono>
                  {cell.sub}
                </Txt>
              )}
            </g>
          ))}

          {rowIndex < rows.length - 1 && (
            <Arrow
              x1={CENTER}
              y1={row.y + row.h}
              x2={CENTER}
              y2={rows[rowIndex + 1].y - 2}
            />
          )}
        </g>
      ))}

      {/* Compounding loop back into the capital auction */}
      <PathArrow
        d={`M${LEFT + WIDE} 496 L858 496 L858 280 L${LEFT + WIDE + 8} 280`}
        dashed
        color={C.accent}
        headAt={{ x: LEFT + WIDE + 8, y: 280, angle: 180 }}
      />
      <Txt x={866} y={392} size={9.5} weight={600} fill={C.accent}>
        compound
      </Txt>

      <Eyebrow x={LEFT} y={548}>
        CONTRACT-ENFORCED INVARIANTS
      </Eyebrow>
      {invariants.map((chip) => {
        const x = chipX
        chipX += chip.w + 10
        return <Chip key={chip.label} x={x} y={562} w={chip.w} label={chip.label} />
      })}
    </Stage>
  )
}
