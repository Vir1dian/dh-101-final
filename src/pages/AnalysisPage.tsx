import ChapterBlock from '../components/ChapterBlock'
import { MarkdownCards } from '../components/Markdown'
import { chapters } from '../content/analysis'
import { analysisPage } from '../content/pages'
import { site } from '../content/site'
import { pageTitle } from '../lib/site-url'
import './pages.css'

/** Analysis landing page (Figma "Analysis Content"): intro, then a block for each chapter. */
export default function AnalysisPage() {
  return (
    <div className="page">
      <title>{pageTitle(analysisPage.title, site.title)}</title>
      <h1 className="visually-hidden">{analysisPage.title}</h1>
      <MarkdownCards source={analysisPage.body} cards={analysisPage.cards} />
      <ol className="chapter-list" aria-label="Chapters">
        {chapters.map((chapter, index) => (
          <li key={chapter.slug}>
            <ChapterBlock chapter={chapter} number={index + 1} to={`/analysis/${chapter.slug}`} />
          </li>
        ))}
      </ol>
    </div>
  )
}
