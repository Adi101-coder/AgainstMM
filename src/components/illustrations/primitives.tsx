import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { easeOut } from '../landing/motion'

export const C = {
  bg: '#f3f3f1',
  surface: '#e8e8e6',
  surfaceAlt: '#ececea',
  panel: '#ffffff',
  border: '#dddcda',
  line: '#c8c8c6',
  text: '#1a1a1a',
  muted: '#8a8a88',
  faint: '#b0b0ae',
  accent: '#e8622a',
  accentSoft: '#f7ded3',
}

export const FONT = 'Inter, system-ui, sans-serif'
export const MONO = "'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace"

/**
 * SVG children may only animate opacity, pathLength, or geometry attributes —
 * animating x/y on SVG elements writes the attribute rather than a transform.
 */
export const stage: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
}

export const fadeV: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: easeOut } },
}

export const drawV: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.9, ease: easeOut },
  },
}

interface StageProps {
  viewBox: string
  title: string
  children: ReactNode
}

export function Stage({ viewBox, title, children }: StageProps) {
  return (
    <motion.svg
      className="illu"
      viewBox={viewBox}
      role="img"
      aria-label={title}
      variants={stage}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-6% 0px' }}
    >
      <title>{title}</title>
      {children}
    </motion.svg>
  )
}

interface BoxProps {
  x: number
  y: number
  w: number
  h: number
  rx?: number
  fill?: string
  stroke?: string
  dashed?: boolean
  strokeWidth?: number
}

export function Box({
  x,
  y,
  w,
  h,
  rx = 12,
  fill = C.surfaceAlt,
  stroke = C.border,
  dashed = false,
  strokeWidth = 1,
}: BoxProps) {
  return (
    <motion.rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={rx}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeDasharray={dashed ? '5 5' : undefined}
      variants={fadeV}
    />
  )
}

interface TxtProps {
  x: number
  y: number
  children: ReactNode
  size?: number
  weight?: number
  fill?: string
  anchor?: 'start' | 'middle' | 'end'
  mono?: boolean
  spacing?: number
  uppercase?: boolean
}

export function Txt({
  x,
  y,
  children,
  size = 12,
  weight = 500,
  fill = C.text,
  anchor = 'start',
  mono = false,
  spacing,
  uppercase = false,
}: TxtProps) {
  return (
    <motion.text
      x={x}
      y={y}
      fontSize={size}
      fontWeight={weight}
      fill={fill}
      textAnchor={anchor}
      fontFamily={mono ? MONO : FONT}
      letterSpacing={spacing}
      style={uppercase ? { textTransform: 'uppercase' } : undefined}
      variants={fadeV}
    >
      {children}
    </motion.text>
  )
}

/** Section eyebrow used to group regions of a diagram. */
export function Eyebrow({
  x,
  y,
  children,
  anchor = 'start',
}: {
  x: number
  y: number
  children: ReactNode
  anchor?: 'start' | 'middle' | 'end'
}) {
  return (
    <Txt x={x} y={y} size={9.5} weight={600} fill={C.faint} anchor={anchor} spacing={1.1}>
      {children}
    </Txt>
  )
}

interface ArrowProps {
  x1: number
  y1: number
  x2: number
  y2: number
  dashed?: boolean
  color?: string
  head?: number
}

export function Arrow({
  x1,
  y1,
  x2,
  y2,
  dashed = false,
  color = C.line,
  head = 6,
}: ArrowProps) {
  const len = Math.hypot(x2 - x1, y2 - y1) || 1
  const ux = (x2 - x1) / len
  const uy = (y2 - y1) / len
  const ex = x2 - ux * head
  const ey = y2 - uy * head
  const angle = (Math.atan2(uy, ux) * 180) / Math.PI

  return (
    <g>
      <motion.line
        x1={x1}
        y1={y1}
        x2={ex}
        y2={ey}
        stroke={color}
        strokeWidth={1.2}
        strokeDasharray={dashed ? '4 4' : undefined}
        variants={drawV}
      />
      <motion.polygon
        points={`0,-3.1 ${head},0 0,3.1`}
        fill={color}
        transform={`translate(${ex} ${ey}) rotate(${angle})`}
        variants={fadeV}
      />
    </g>
  )
}

/** Arrow that follows an explicit polyline path (for loop-backs). */
export function PathArrow({
  d,
  color = C.line,
  dashed = false,
  headAt,
}: {
  d: string
  color?: string
  dashed?: boolean
  headAt?: { x: number; y: number; angle: number }
}) {
  return (
    <g>
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={1.2}
        strokeDasharray={dashed ? '4 4' : undefined}
        variants={drawV}
      />
      {headAt && (
        <motion.polygon
          points="0,-3.1 6,0 0,3.1"
          fill={color}
          transform={`translate(${headAt.x} ${headAt.y}) rotate(${headAt.angle})`}
          variants={fadeV}
        />
      )}
    </g>
  )
}

interface GrowBarProps {
  x: number
  y: number
  w: number
  h: number
  rx?: number
  fill?: string
  stroke?: string
  from?: 'left' | 'bottom'
  delay?: number
}

/** Bar that animates its width/height attribute so SVG geometry stays intact. */
export function GrowBar({
  x,
  y,
  w,
  h,
  rx = 4,
  fill = C.text,
  stroke,
  from = 'left',
  delay = 0,
}: GrowBarProps) {
  const transition = { duration: 0.85, ease: easeOut, delay }

  const variants: Variants =
    from === 'left'
      ? { hidden: { width: 0 }, visible: { width: w, transition } }
      : {
          hidden: { height: 0, y: y + h },
          visible: { height: h, y, transition },
        }

  return (
    <motion.rect
      x={x}
      y={from === 'left' ? y : y + h}
      width={from === 'left' ? 0 : w}
      height={from === 'left' ? h : 0}
      rx={rx}
      fill={fill}
      stroke={stroke}
      strokeWidth={stroke ? 1 : undefined}
      variants={variants}
    />
  )
}

/** Small rounded chip used for tags and invariant labels. */
export function Chip({
  x,
  y,
  w,
  label,
  accent = false,
}: {
  x: number
  y: number
  w: number
  label: string
  accent?: boolean
}) {
  return (
    <g>
      <Box
        x={x}
        y={y}
        w={w}
        h={24}
        rx={12}
        fill={accent ? C.accentSoft : C.panel}
        stroke={accent ? C.accent : C.border}
      />
      <Txt
        x={x + w / 2}
        y={y + 16}
        size={10}
        weight={500}
        anchor="middle"
        fill={accent ? C.accent : C.muted}
      >
        {label}
      </Txt>
    </g>
  )
}

/** Card with a heading and a stack of muted detail lines. */
export function CardWithLines({
  x,
  y,
  w,
  h,
  title,
  lines,
  accent = false,
  mono = false,
}: {
  x: number
  y: number
  w: number
  h: number
  title: string
  lines?: string[]
  accent?: boolean
  mono?: boolean
}) {
  return (
    <g>
      <Box
        x={x}
        y={y}
        w={w}
        h={h}
        fill={accent ? C.accentSoft : C.surfaceAlt}
        stroke={accent ? C.accent : C.border}
      />
      <Txt x={x + 14} y={y + 22} size={12.5} weight={600} fill={accent ? C.accent : C.text}>
        {title}
      </Txt>
      {lines?.map((line, i) => (
        <Txt
          key={line}
          x={x + 14}
          y={y + 40 + i * 15}
          size={10.5}
          weight={400}
          fill={C.muted}
          mono={mono}
        >
          {line}
        </Txt>
      ))}
    </g>
  )
}

/** Dotted texture block that echoes the dot-matrix type treatment. */
export function DotField({
  x,
  y,
  cols,
  rows,
  step = 9,
  r = 1.6,
  color = C.line,
}: {
  x: number
  y: number
  cols: number
  rows: number
  step?: number
  r?: number
  color?: string
}) {
  const dots: ReactNode[] = []
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      dots.push(
        <circle
          key={`${row}-${col}`}
          cx={x + col * step}
          cy={y + row * step}
          r={r}
          fill={color}
        />,
      )
    }
  }
  return <motion.g variants={fadeV}>{dots}</motion.g>
}
