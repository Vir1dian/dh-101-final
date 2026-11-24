import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router'
import { site } from '../content/site'
import type { HeroConfig } from '../content/types'
import './Hero.css'

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Full-screen opener on the Home page (Figma "Hero"), with an optional looping background clip. */
export default function Hero({ hero }: { hero: HeroConfig }) {
  const ref = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  // Paused by the visitor's button press, or from the start if their system asks
  // for less motion. Separately, the clip pauses itself while scrolled out of view.
  const [paused, setPaused] = useState(reducedMotion)

  useEffect(() => {
    const video = videoRef.current
    const header = ref.current
    if (!video || !header) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !paused) {
        // Browsers can refuse to autoplay (e.g. iOS Low Power Mode): show the play button instead.
        video.play().catch(() => setPaused(true))
      } else {
        video.pause()
      }
    })
    observer.observe(header)
    return () => observer.disconnect()
  }, [paused])

  // "Explore" scrolls past the hero to the nav bar + content (the Figma prototype's
  // scroll-to), then moves keyboard focus there too.
  function explore() {
    const el = ref.current
    if (!el) return
    window.scrollTo({ top: el.offsetTop + el.offsetHeight })
    document.getElementById('main')?.focus({ preventScroll: true })
  }

  const video = hero.video

  return (
    <header className="hero" ref={ref}>
      <div className="hero__card">
        <div className="hero__media">
          {video && (
            // Decorative: what the clip shows belongs in the caption.
            <video
              ref={videoRef}
              className="hero__video"
              src={video.src}
              poster={video.poster}
              muted
              loop
              playsInline
              preload={paused ? 'metadata' : 'auto'}
              aria-hidden="true"
              tabIndex={-1}
            />
          )}
        </div>

        <div className="hero__content">
          <h1 className="hero__title">{hero.title}</h1>
          <p className="hero__kicker">{hero.kicker}</p>
          <p className="hero__description">{hero.description}</p>
          <button type="button" className="hero__explore" onClick={explore}>
            {hero.cta}
          </button>
        </div>

        {/* the same pages as the nav bar's tabs, listed down the right side */}
        <nav className="hero__nav" aria-label="Pages">
          <ul className="hero__tabs">
            {site.nav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className="hero__tab"
                  // Home is this page already, so it does what Explore does: scrolls
                  // down to the content, so it doesn't look like the hero is all there is.
                  // (Ctrl/Cmd/Shift-click still opens it in a new tab or window.)
                  onClick={
                    item.to === '/'
                      ? (event) => {
                          if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
                          event.preventDefault()
                          explore()
                        }
                      : undefined
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {(hero.caption || video?.credit) && (
          <p className="hero__caption">
            {hero.caption}
            {video?.credit && <span className="hero__credit">{video.credit}</span>}
          </p>
        )}

        {video && (
          // Anything that moves on its own for more than 5 seconds needs a way to stop it (WCAG 2.2.2).
          <button
            type="button"
            className="hero__toggle"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? 'Play background video' : 'Pause background video'}
            title={paused ? 'Play background video' : 'Pause background video'}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              {paused ? (
                <path d="M7 4.5v15l12.5-7.5z" fill="currentColor" />
              ) : (
                <path d="M6.5 4.5h4v15h-4zm7 0h4v15h-4z" fill="currentColor" />
              )}
            </svg>
          </button>
        )}
      </div>
    </header>
  )
}
