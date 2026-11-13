import Bibliography from '../components/Bibliography'
import { MarkdownCards } from '../components/Markdown'
import { sourcesPage } from '../content/pages'
import { site } from '../content/site'
import { pageTitle } from '../lib/site-url'

export default function SourcesPage() {
  return (
    <div className="page">
      <title>{pageTitle(sourcesPage.title, site.title)}</title>
      <h1 className="visually-hidden">{sourcesPage.title}</h1>
      <MarkdownCards source={sourcesPage.body} cards={sourcesPage.cards} />
      <Bibliography />
    </div>
  )
}
