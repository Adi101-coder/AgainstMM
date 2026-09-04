import { motion } from 'framer-motion'
import { useActiveSection } from '../../hooks/useActiveSection'

interface TocEntry {
  id: string
  number: string
  short: string
}

export default function DocToc({ entries }: { entries: TocEntry[] }) {
  const ids = entries.map((entry) => entry.id)
  const active = useActiveSection(ids)

  return (
    <nav className="doc-toc" aria-label="Table of contents">
      <p className="doc-toc__label">Contents</p>
      <ol className="doc-toc__list">
        {entries.map((entry) => {
          const isActive = active === entry.id
          return (
            <li key={entry.id}>
              <a
                href={`#${entry.id}`}
                className={isActive ? 'doc-toc__link is-active' : 'doc-toc__link'}
                aria-current={isActive ? 'true' : undefined}
              >
                {isActive && (
                  <motion.span layoutId="toc-marker" className="doc-toc__marker" />
                )}
                <span className="doc-toc__num">{entry.number}</span>
                <span className="doc-toc__text">{entry.short}</span>
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
