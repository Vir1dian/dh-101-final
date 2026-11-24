import { Link } from 'react-router'
import type { Chapter } from '../content/types'
import { roman } from '../lib/roman'
import './ChapterBlock.css'

type Props = {
  chapter: Chapter
  /** Position in the reading order (1 → i). */
  number: number
  /**
   * Where the block leads. With it, the block is a link (the Analysis page's
   * chapter list); without it, it's the header at the top of the chapter's own page.
   */
  to?: string
}

/**
 * A chapter as a thin hero strip (Figma "Chapter Block"): numeral, title,
 * summary and a caption over the chapter's photo, darkened like the Home hero.
 */
export default function ChapterBlock({ chapter, number, to }: Props) {
  const { image, caption } = chapter
  const titleId = `chapter-${chapter.slug}-title`
  const summaryId = `chapter-${chapter.slug}-summary`
  const Heading = to ? 'h2' : 'h1'

  const content = (
    <>
      <span className="chapter-block__media">
        {image && (
          // Decorative: what the photo shows belongs in the caption.
          <img
            className="chapter-block__image"
            src={image.src}
            alt=""
            style={image.focus ? { objectPosition: image.focus } : undefined}
            loading={to ? 'lazy' : 'eager'}
            decoding="async"
          />
        )}
      </span>
      {/* the list's own numbering (or the breadcrumb on a chapter page) says this to screen readers */}
      <span className="chapter-block__numeral" aria-hidden="true">
        {roman(number)}
      </span>
      {/* each text sits in a "mark" span: the highlight behind it on hover, line by line */}
      <div className="chapter-block__details">
        <Heading id={titleId} className="chapter-block__title">
          <span className="chapter-block__mark">{chapter.title}</span>
        </Heading>
        <p id={summaryId} className="chapter-block__summary">
          <span className="chapter-block__mark">{chapter.summary}</span>
        </p>
        {(caption || image?.credit) && (
          <p className="chapter-block__caption">
            {caption && <span className="chapter-block__mark">{caption}</span>}
            {image?.credit && (
              <span className="chapter-block__credit">
                <span className="chapter-block__mark">{image.credit}</span>
              </span>
            )}
          </p>
        )}
      </div>
    </>
  )

  if (!to) {
    return <header className="chapter-block">{content}</header>
  }

  return (
    // Named by its title alone (the summary is its description), so screen
    // readers don't read the whole block out as the link text.
    <Link
      to={to}
      className="chapter-block chapter-block--link"
      aria-labelledby={titleId}
      aria-describedby={summaryId}
    >
      {content}
    </Link>
  )
}
