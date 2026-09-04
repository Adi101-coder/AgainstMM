interface LogoProps {
  size?: number
  className?: string
}

export default function Logo({ size = 28, className = '' }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect x="2" y="2" width="10" height="10" rx="2.5" fill="currentColor" />
      <rect x="16" y="2" width="10" height="10" rx="2.5" fill="currentColor" />
      <rect x="2" y="16" width="10" height="10" rx="2.5" fill="currentColor" />
      <rect x="16" y="16" width="10" height="10" rx="2.5" fill="currentColor" />
    </svg>
  )
}
