import { Link, useParams } from 'react-router'
import { MarkdownCards } from '../components/Markdown'
import { chapters } from '../content/analysis'
import { site } from '../content/site'
import { pageTitle } from '../lib/site-url'
import NotFoundPage from './NotFoundPage'
import './pages.css'

/** One Analysis chapter: /analysis/<slug> */
export default function ChapterPage() {
  const { slug } = useParams()
  const index = chapters.findIndex((chapter) => chapter.slug === slug)
  if (index === -1) return <NotFoundPage />

  const chapter = chapters[index]
  const previous = chapters[index - 1]
  const next = chapters[index + 1]

  return (
    <div className="page">
      <title>{pageTitle(chapter.title, site.title)}</title>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/analysis">Analysis</Link>
        <span aria-hidden="true"> / </span>
        <span>
          Chapter {index + 1} of {chapters.length}
        </span>
      </nav>
      <h1 className="visually-hidden">{chapter.title}</h1>
      <MarkdownCards source={chapter.body} cards={chapter.cards} />
      <nav className="chapter-nav" aria-label="Chapters">
        {previous ? (
          <Link className="button" to={`/analysis/${previous.slug}`} rel="prev">
            ← {previous.title}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link className="button" to={`/analysis/${next.slug}`} rel="next">
            {next.title} →
          </Link>
        )}
      </nav>
    </div>
  )
}
