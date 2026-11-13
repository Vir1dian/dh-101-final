import { Link, NavLink } from 'react-router'
import tabEdgeActive from '../assets/nav/tab-edge-active.svg'
import tabEdge from '../assets/nav/tab-edge.svg'
import { site } from '../content/site'
import './NavBar.css'

/** Title + folder-tab navigation (Figma "NavBar" / "NavTab"). */
export default function NavBar() {
  const count = site.nav.length
  return (
    <nav className="navbar" aria-label="Main">
      <div className="navbar__bar">
        <Link to="/" className="navbar__title">
          {site.title}
        </Link>
        <ul className="navbar__tabs">
          {site.nav.map((item, index) => (
            // earlier tabs sit on top of later ones, like a stack of folders
            <li key={item.to} style={{ zIndex: count - index }}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => (isActive ? 'tab tab--active' : 'tab')}
              >
                {({ isActive }) => (
                  <>
                    <img className="tab__edge" src={isActive ? tabEdgeActive : tabEdge} alt="" />
                    <span className="tab__label">{item.label}</span>
                    <img className="tab__edge tab__edge--end" src={isActive ? tabEdgeActive : tabEdge} alt="" />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
