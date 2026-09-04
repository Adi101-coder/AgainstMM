import type { ReactNode } from 'react'
import Reveal from '../landing/Reveal'

interface DocSectionProps {
  id: string
  number: string
  title: string
  children: ReactNode
}

export default function DocSection({ id, number, title, children }: DocSectionProps) {
  return (
    <section id={id} className="doc-section">
      <Reveal>
        <header className="doc-section__head">
          <h2 className="doc-section__title">
            <span className="doc-section__num">{number}</span>
            <span className="doc-section__sep" aria-hidden="true">
              ·
            </span>
            {title}
          </h2>
        </header>
      </Reveal>
      <div className="doc-section__body">{children}</div>
    </section>
  )
}
