import { NavLink } from 'react-router'
import thumbWatermark from '../assets/nav/thumbwatermark.png'
import { chapters } from '../content/analysis'
import './ChapterMenu.css'

const ROMAN: [number, string][] = [
  [10, 'x'],
  [9, 'ix'],
  [5, 'v'],
  [4, 'iv'],
  [1, 'i'],
]

/** 1 → i, 4 → iv, 12 → xii */
function roman(n: number) {
  let out = ''
  for (const [value, digits] of ROMAN) {
    while (n >= value) {
      out += digits
      n -= value
    }
  }
  return out
}

/**
 * The paper slip of chapter links under the Analysis tab (Figma "Analysis
 * Navigation"). It's always on the page, tucked out of sight behind the nav
 * bar, and slides down when `open`. The list comes from content/analysis.ts,
 * and the slip grows to fit the longest title.
 */
export default function ChapterMenu({ id, open, onPick }: { id: string; open: boolean; onPick: () => void }) {
  return (
    <div className={open ? 'chapter-menu chapter-menu--open' : 'chapter-menu'}>
      <div className="chapter-menu__drop">
        <div className="chapter-menu__slip" id={id}>
          <ul className="chapter-menu__list" aria-label="Analysis chapters">
            <li>
              <NavLink to="/analysis" end className="chapter-menu__link" onClick={onPick}>
                <span className="chapter-menu__num" aria-hidden="true">
                  &gt;
                </span>
                <span className="chapter-menu__title">Chapters</span>
              </NavLink>
            </li>
            {chapters.map((chapter, index) => (
              <li key={chapter.slug}>
                <NavLink to={`/analysis/${chapter.slug}`} className="chapter-menu__link" onClick={onPick}>
                  <span className="chapter-menu__num" aria-hidden="true">
                    {roman(index + 1)}
                  </span>
                  <span className="chapter-menu__title">{chapter.title}</span>
                </NavLink>
              </li>
            ))}
          </ul>
          <span className="chapter-menu__watermark" aria-hidden="true">
            <img src={thumbWatermark} alt="" />
          </span>
        </div>
      </div>
    </div>
  )
}
