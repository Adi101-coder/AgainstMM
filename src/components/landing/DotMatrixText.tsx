import { DOT_FONT } from './dotFont'

interface DotMatrixTextProps {
  text: string
  dotSize?: number
  gap?: number
  charGap?: number
  className?: string
}

export default function DotMatrixText({
  text,
  dotSize = 5,
  gap = 3,
  charGap = 10,
  className = '',
}: DotMatrixTextProps) {
  return (
    <div className={`dot-matrix ${className}`.trim()} aria-label={text}>
      {text.split('').map((char, index) => {
        if (char === ' ') {
          return (
            <div
              key={`space-${index}`}
              className="dot-matrix__char dot-matrix__char--space"
              style={{ width: charGap * 1.2 }}
              aria-hidden="true"
            />
          )
        }

        const pattern = DOT_FONT[char] ?? DOT_FONT[char.toUpperCase()]
        if (!pattern) return null

        return (
          <div
            key={`${char}-${index}`}
            className="dot-matrix__char"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(5, ${dotSize}px)`,
              gridTemplateRows: `repeat(7, ${dotSize}px)`,
              gap: `${gap}px`,
              marginRight: charGap,
            }}
            aria-hidden="true"
          >
            {pattern.flatMap((row, rowIndex) =>
              row.split('').map((cellValue, colIndex) => (
                <span
                  key={`${rowIndex}-${colIndex}`}
                  style={{
                    width: dotSize,
                    height: dotSize,
                    borderRadius: '50%',
                    background: cellValue === '1' ? 'currentColor' : 'transparent',
                  }}
                />
              )),
            )}
          </div>
        )
      })}
    </div>
  )
}
