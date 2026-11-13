import { MarkdownCards } from '../components/Markdown'
import { homePage } from '../content/pages'
import { site } from '../content/site'
import { pageTitle } from '../lib/site-url'

// The hero (with the page's <h1>) is rendered by SiteLayout above the nav bar.
export default function HomePage() {
  return (
    <div className="page">
      <title>{pageTitle(undefined, site.title)}</title>
      <MarkdownCards source={homePage.body} cards={homePage.cards} />
    </div>
  )
}
