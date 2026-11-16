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
  /** Rendered inside the card after the text, e.g. the About page's member cards. */
  extra?: ReactNode
}

// Templates 2 ('id') and 3 ('open') have no watermark in Figma.
const NO_WATERMARK = new Set(['id', 'open'])

/** A content card: the Figma "Paragraph Template" 1–3 styles and the About board, with their variants. */
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
  extra,
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
      {!NO_WATERMARK.has(tone) && <Watermark className="card__watermark" />}
      {decoration && <img className="card__decoration" src={decoration.src} alt="" />}
      {title && (
        <h2 id={headingId} className="card__title">
          {title}
        </h2>
      )}
      {figure ? (
        <div className="card__split">
          <figure className="card__figure">
            {figure.src ? (
              <img src={figure.src} alt={figure.alt} />
            ) : (
              <div className="card__figure-placeholder">
                <span>Image placeholder</span>
                {figure.alt && <span className="card__figure-note">{figure.alt}</span>}
              </div>
            )}
            {figure.caption && <figcaption>{figure.caption}</figcaption>}
          </figure>
          {body}
        </div>
      ) : (
        body
      )}
      {extra && <div className="card__extra">{extra}</div>}
    </section>
  )
}
