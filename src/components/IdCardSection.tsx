import type { CSSProperties, ReactNode } from 'react'
import './IdCardSection.css'

type Props = {
  id?: string
  title?: ReactNode
  /** Text before each card's number, e.g. "ID.RQ." → ID.RQ.1 */
  label: string
  /** Anything in the section besides the list, shown above the cards. */
  intro?: ReactNode
  items: ReactNode[]
}

/** Heading on the dark page + a row of ID-style cards (Figma "Research Questions" / "RQCard"). */
export default function IdCardSection({ id, title, label, intro, items }: Props) {
  const headingId = id ? `${id}-title` : undefined
  return (
    <section id={id} className="id-section" aria-labelledby={title ? headingId : undefined}>
      {title && (
        <h2 id={headingId} className="id-section__title">
          {title}
        </h2>
      )}
      {intro && <div className="id-section__intro">{intro}</div>}
      <ol className="id-section__cards" style={{ '--id-count': items.length } as CSSProperties}>
        {items.map((item, index) => (
          <li key={index} className="id-card">
            <p className="id-card__label">
              {label}
              {index + 1}
            </p>
            <div className="id-card__body">{item}</div>
          </li>
        ))}
      </ol>
    </section>
  )
}
