import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '../landing/motion'
import { renderMath } from './math'

interface DataTableProps {
  head: string[]
  rows: string[][]
  mono?: number[]
  highlightLast?: boolean
}

export default function DataTable({
  head,
  rows,
  mono = [],
  highlightLast = false,
}: DataTableProps) {
  return (
    <motion.div
      className="data-table"
      variants={staggerContainer(0.05)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-8% 0px' }}
    >
      <table>
        <thead>
          <tr>
            {head.map((cell) => (
              <th key={cell}>{cell}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <motion.tr
              key={row.join('|')}
              variants={staggerItem}
              className={
                highlightLast && rowIndex === rows.length - 1 ? 'is-highlighted' : undefined
              }
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={`${rowIndex}-${cellIndex}`}
                  className={mono.includes(cellIndex) ? 'is-mono' : undefined}
                >
                  {renderMath(cell)}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  )
}
