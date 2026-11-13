import { Link } from 'react-router'
import { MarkdownCards } from '../components/Markdown'
import PaperCard from '../components/PaperCard'
import { chapters } from '../content/analysis'
import { analysisPage } from '../content/pages'
import { site } from '../content/site'
import { pageTitle } from '../lib/site-url'
import './pages.css'

/** Analysis landing page: intro + list of chapters. */
export default function AnalysisPage() {
  return (
    <div className="page">
      <title>{pageTitle(analysisPage.title, site.title)}</title>
      <h1 className="visually-hidden">{analysisPage.title}</h1>
      <MarkdownCards source={analysisPage.body} cards={analysisPage.cards} />
      <PaperCard id="chapters" title="Chapters" ruled numerals>
        <ol>
          {chapters.map((chapter) => (
            <li key={chapter.slug}>
              <Link className="chapter-link" to={`/analysis/${chapter.slug}`}>
                {chapter.title}
              </Link>
              <span className="chapter-summary">{chapter.summary}</span>
            </li>
          ))}
        </ol>
      </PaperCard>
    </div>
  )
}
