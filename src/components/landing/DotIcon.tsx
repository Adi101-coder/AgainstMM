interface DotIconProps {
  variant?: 'orange' | 'dark'
  size?: number
}

const ORANGE = new Set(['0-1', '1-0', '1-1', '2-0'])
const DARK = new Set(['0-0', '0-1', '0-2', '1-0', '1-2', '2-0', '2-1', '2-2'])

export default function DotIcon({ variant = 'dark', size = 18 }: DotIconProps) {
  const active = variant === 'orange' ? ORANGE : DARK
  const dot = size / 5

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      {Array.from({ length: 3 }, (_, row) =>
        Array.from({ length: 3 }, (_, col) => {
          const key = `${row}-${col}`
          if (!active.has(key)) return null
          return (
            <circle
              key={key}
              cx={dot + col * (dot * 1.4)}
              cy={dot + row * (dot * 1.4)}
              r={dot * 0.38}
              fill={variant === 'orange' ? '#e8622a' : 'currentColor'}
            />
          )
        }),
      )}
    </svg>
  )
}
