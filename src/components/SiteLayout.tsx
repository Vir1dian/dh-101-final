import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { hero } from '../content/pages'
import Footer from './Footer'
import Hero from './Hero'
import NavBar from './NavBar'
import { WatermarkTextureFilter } from './Watermark'

/** Back to the top on every page change (but not for #anchor jumps). */
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
  return null
}

/** Frame shared by every page: (hero on Home) → nav bar → page → footer. */
export default function SiteLayout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <div className="app">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <WatermarkTextureFilter />
      {isHome && <Hero hero={hero} />}
      <NavBar />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
