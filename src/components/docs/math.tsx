import type { ReactNode } from 'react'

const SUBSCRIPT = /([A-Za-z\u0370-\u03FF])_([A-Za-z0-9*]+)/g

/**
 * Renders `X_yyy` notation as real subscripts so formulas read like the source
 * document rather than like code.
 */
export function renderMath(text: string): ReactNode[] {
  const out: ReactNode[] = []
  let cursor = 0
  let key = 0
  let match: RegExpExecArray | null

  SUBSCRIPT.lastIndex = 0
  while ((match = SUBSCRIPT.exec(text)) !== null) {
    if (match.index > cursor) out.push(text.slice(cursor, match.index))
    out.push(
      <span key={key++}>
        {match[1]}
        <sub>{match[2]}</sub>
      </span>,
    )
    cursor = match.index + match[0].length
  }

  if (cursor < text.length) out.push(text.slice(cursor))
  return out
}

/** Inline math for use inside prose. */
export function M({ children }: { children: string }) {
  return <span className="math-inline">{renderMath(children)}</span>
}
