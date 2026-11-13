import { Link } from 'react-router'
import PaperCard from '../components/PaperCard'
import { site } from '../content/site'
import { pageTitle } from '../lib/site-url'

export default function NotFoundPage() {
  return (
    <div className="page">
      <title>{pageTitle('Page not found', site.title)}</title>
      <h1 className="visually-hidden">Page not found</h1>
      <PaperCard id="not-found" title="Page not found">
        <p>
          This page isn't in the archive. Try the <Link to="/">home page</Link> or the tabs above.
        </p>
      </PaperCard>
    </div>
  )
}
