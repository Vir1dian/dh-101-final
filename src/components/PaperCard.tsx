import type { ReactNode } from 'react'
import type { CardOptions } from '../content/types'
import Watermark from './Watermark'
import './PaperCard.css'

type Props = CardOptions & {
  id?: string
  title?: ReactNode
  /** Override the heading's id (otherwise `${id}-title`). */
  titleId?: string
  className?: string
  children?: ReactNode
}

/** The aged-paper card from the Figma "Paragraph Template", with its variants. */
export default function PaperCard({
  id,
  title,
  titleId,
  tone = 'paper',
  ruled,
  numerals,
  lead,
  figure,
  decoration,
  className,
  children,
}: Props) {
  const headingId = titleId ?? (id ? `${id}-title` : undefined)
  const classes = [
    'card',
    `card--${tone}`,
    ruled && 'card--ruled',
    numerals && 'card--numerals',
    lead && 'card--lead',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const body = <div className="card__body">{children}</div>

  return (
    <section id={id} className={classes} aria-labelledby={title ? headingId : undefined}>
      <Watermark className="card__watermark" />
      {decoration && <img className="card__decoration" src={decoration.src} alt="" />}
      {title && (
        <h2 id={headingId} className="card__title">
          {title}
        </h2>
      )}
      {figure ? (
        <div className="card__split">
          <figure className="card__figure">
            <img src={figure.src} alt={figure.alt} />
            {figure.caption && <figcaption>{figure.caption}</figcaption>}
          </figure>
          {body}
        </div>
      ) : (
        body
      )}
    </section>
  )
}
