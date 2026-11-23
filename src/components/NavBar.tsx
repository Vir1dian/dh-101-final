import { useEffect, useRef, useState } from 'react'
import type { FocusEvent, PointerEvent } from 'react'
import { Link, NavLink } from 'react-router'
import tabEdgeActive from '../assets/nav/tab-edge-active.svg'
import tabEdge from '../assets/nav/tab-edge.svg'
import { site } from '../content/site'
import ChapterMenu from './ChapterMenu'
import './NavBar.css'

/** The tab with the chapter slip under it. */
const MENU_TAB = '/analysis'
const MENU_ID = 'chapter-menu'

/**
 * When the slip under a tab is out: it opens on mouse hover or keyboard focus,
 * and closes once neither is on the tab or the slip (after a short pause, so
 * the pointer can travel from the tab down into the slip), on Escape, or when a
 * link in it is picked. A tap on a touch screen just follows the tab's link.
 */
function useSlipMenu() {
  const [open, setOpen] = useState(false)
  const itemRef = useRef<HTMLLIElement>(null)
  const closeTimer = useRef(0)
  const ignoreFocus = useRef(false)

  // still being used: the mouse is over the tab or slip, or keyboard focus is in them
  const engaged = () => {
    const item = itemRef.current
    return !!item && (item.matches(':hover') || item.querySelector(':focus-visible') !== null)
  }

  const show = () => {
    window.clearTimeout(closeTimer.current)
    // on narrow screens the tabs scroll sideways and the slip stays hidden (see ChapterMenu.css)
    if (window.matchMedia('(min-width: 761px)').matches) setOpen(true)
  }

  const hideSoon = (delay: number) => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => {
      if (!engaged()) setOpen(false)
    }, delay)
  }

  const close = () => {
    window.clearTimeout(closeTimer.current)
    setOpen(false)
  }

  // Escape closes it wherever focus is, since it may have opened on hover alone.
  useEffect(() => {
    if (!open) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      window.clearTimeout(closeTimer.current)
      setOpen(false)
      const item = itemRef.current
      if (item?.contains(document.activeElement)) {
        // back to the tab itself, without that focus opening the slip again
        ignoreFocus.current = true
        item.querySelector('a')?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  useEffect(() => {
    const timer = closeTimer
    return () => window.clearTimeout(timer.current)
  }, [])

  const itemProps = {
    ref: itemRef,
    onPointerEnter(event: PointerEvent) {
      if (event.pointerType === 'mouse') show()
    },
    onPointerLeave(event: PointerEvent) {
      if (event.pointerType === 'mouse') hideSoon(200)
    },
    onFocus(event: FocusEvent) {
      if (ignoreFocus.current) ignoreFocus.current = false
      // keyboard focus only: a click or tap also focuses the link, and that alone shouldn't open it
      else if (event.target.matches(':focus-visible')) show()
    },
    onBlur(event: FocusEvent<HTMLLIElement>) {
      if (!event.currentTarget.contains(event.relatedTarget)) hideSoon(0)
    },
  }

  return { open, close, itemProps }
}

/** Title + folder-tab navigation (Figma "NavBar" / "NavTab"), with the chapter slip under Analysis. */
export default function NavBar() {
  const count = site.nav.length
  const menu = useSlipMenu()

  return (
    <nav className="navbar" aria-label="Main">
      <div className="navbar__bar">
        <Link to="/" className="navbar__title">
          {site.title}
        </Link>
        <ul className="navbar__tabs">
          {site.nav.map((item, index) => {
            const hasMenu = item.to === MENU_TAB
            return (
              // earlier tabs sit on top of later ones, like a stack of folders
              <li key={item.to} style={{ zIndex: count - index }} {...(hasMenu ? menu.itemProps : {})}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) => (isActive ? 'tab tab--active' : 'tab')}
                  aria-expanded={hasMenu ? menu.open : undefined}
                  aria-controls={hasMenu ? MENU_ID : undefined}
                >
                  {({ isActive }) => (
                    <>
                      <img className="tab__edge" src={isActive ? tabEdgeActive : tabEdge} alt="" />
                      <span className="tab__label">{item.label}</span>
                      <img className="tab__edge tab__edge--end" src={isActive ? tabEdgeActive : tabEdge} alt="" />
                    </>
                  )}
                </NavLink>
                {hasMenu && <ChapterMenu id={MENU_ID} open={menu.open} onPick={menu.close} />}
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
