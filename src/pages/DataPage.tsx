import { MarkdownCards } from '../components/Markdown'
import { dataPage } from '../content/pages'
import { site } from '../content/site'
import { pageTitle } from '../lib/site-url'

export default function DataPage() {
  return (
    <div className="page">
      <title>{pageTitle(dataPage.title, site.title)}</title>
      <h1 className="visually-hidden">{dataPage.title}</h1>
      <MarkdownCards source={dataPage.body} cards={dataPage.cards} />
    </div>
  )
}
