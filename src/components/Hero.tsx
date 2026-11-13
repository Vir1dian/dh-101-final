import { useRef } from 'react'
import type { HeroConfig } from '../content/types'
import './Hero.css'

/** Full-screen opener on the Home page (Figma "Hero"). */
export default function Hero({ hero }: { hero: HeroConfig }) {
  const ref = useRef<HTMLElement>(null)

  // "Explore" scrolls past the hero to the nav bar + content (the Figma prototype's
  // scroll-to), then moves keyboard focus there too.
  function explore() {
    const el = ref.current
    if (!el) return
    window.scrollTo({ top: el.offsetTop + el.offsetHeight })
    document.getElementById('main')?.focus({ preventScroll: true })
  }

  const credits = hero.media.map((m) => m.credit).filter(Boolean)

  return (
    <header className="hero" ref={ref}>
      <div className="hero__card">
        <div className="hero__media">
          {hero.media.map((m) => (
            <div key={m.src} className="hero__panel" style={{ flexBasis: `${m.width}%` }}>
              <img src={m.src} alt={m.alt} style={{ objectPosition: m.position ?? 'center' }} />
            </div>
          ))}
        </div>

        <div className="hero__content">
          <h1 className="hero__title">{hero.title}</h1>
          <p className="hero__kicker">{hero.kicker}</p>
          <p className="hero__description">{hero.description}</p>
          <button type="button" className="hero__explore" onClick={explore}>
            {hero.cta}
          </button>
        </div>

        {(hero.caption || credits.length > 0) && (
          <p className="hero__caption">
            {hero.caption}
            {credits.length > 0 && <span className="hero__credits">Photos: {credits.join('; ')}</span>}
          </p>
        )}
      </div>
    </header>
  )
}
