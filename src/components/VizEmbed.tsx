import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { visualizations } from '../content/visualizations'
import type { Visualization } from '../content/types'
import { withBase } from '../lib/site-url'
import './VizEmbed.css'

const byId = new Map<string, Visualization>(visualizations.map((viz) => [viz.id, viz]))

/** Height of the toolbar Tableau adds under every embed ("View on Tableau Public", Share…). */
const TABLEAU_TOOLBAR = 27

/**
 * Tableau never shrinks its own text, so in a narrow card a chart's title and legend crowd out
 * the chart itself. Below this width (phones, small tablets) a Tableau embed is laid out this
 * wide and shrunk to fit the card, like a picture.
 */
const TABLEAU_MIN_LAYOUT_WIDTH = 700

/** The element's rendered size, kept up to date as the window resizes. */
function useSize<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      const { width, height } = el.getBoundingClientRect()
      setSize((old) => (old.width === width && old.height === height ? old : { width, height }))
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, size] as const
}

/**
 * The size an iframe is laid out at, and how much it's shrunk to fit its box.
 * Undefined means it simply fills the box.
 */
function layoutFor(viz: Visualization, box: { width: number; height: number }) {
  if (!box.width) return undefined
  if (viz.fixedSize) {
    const width = viz.fixedSize.width
    const height = viz.fixedSize.height + (viz.kind === 'tableau' ? TABLEAU_TOOLBAR : 0)
    return { width, height, scale: Math.min(1, box.width / width) }
  }
  if (viz.kind === 'tableau' && box.width < TABLEAU_MIN_LAYOUT_WIDTH) {
    const scale = box.width / TABLEAU_MIN_LAYOUT_WIDTH
    return { width: TABLEAU_MIN_LAYOUT_WIDTH, height: box.height / scale, scale }
  }
  return undefined
}

/** A chart / map / embed from content/visualizations.ts, with caption and credit. */
export default function VizEmbed({ id }: { id: string }) {
  const viz = byId.get(id)
  const [frameRef, frameSize] = useSize<HTMLDivElement>()

  if (!viz) {
    return (
      <p className="viz viz--missing" role="note">
        No visualization with id “{id}”. Check the id in src/content/visualizations.ts.
      </p>
    )
  }

  const descriptionId = `viz-${viz.id}-description`
  const fixed = viz.embedUrl && viz.kind !== 'image' ? viz.fixedSize : undefined
  let frameStyle: CSSProperties = { aspectRatio: viz.aspectRatio ?? '16 / 9' }
  if (fixed) {
    const height = fixed.height + (viz.kind === 'tableau' ? TABLEAU_TOOLBAR : 0)
    frameStyle = { aspectRatio: `${fixed.width} / ${height}`, maxWidth: `${fixed.width}px` }
  }

  let media
  if (viz.kind === 'image' && viz.image) {
    media = <img src={withBase(viz.image)} alt={viz.description} loading="lazy" />
  } else if (viz.embedUrl) {
    const layout = layoutFor(viz, frameSize)
    media = (
      <iframe
        src={viz.embedUrl}
        title={viz.title}
        loading="lazy"
        allowFullScreen
        aria-describedby={descriptionId}
        className={layout ? 'viz__scaled' : undefined}
        style={
          layout && {
            width: `${layout.width}px`,
            height: `${layout.height}px`,
            transform: layout.scale < 1 ? `scale(${layout.scale})` : undefined,
          }
        }
      />
    )
  } else {
    media = (
      <div className="viz__placeholder">
        <span className="viz__placeholder-label">Visualization placeholder</span>
        <span>{viz.title}</span>
      </div>
    )
  }

  return (
    <figure className="viz">
      <div ref={frameRef} className={fixed ? 'viz__frame viz__frame--fixed' : 'viz__frame'} style={frameStyle}>
        {media}
      </div>
      <figcaption className="viz__caption">
        <span className="viz__title">{viz.title}.</span> {viz.caption}
        <span className="viz__credit">
          {viz.credit}
          {viz.link && (
            <>
              {' · '}
              <a href={viz.link}>{viz.kind === 'tableau' ? 'Open in Tableau Public' : 'Open the original'}</a>
            </>
          )}
        </span>
      </figcaption>
      {viz.kind !== 'image' && (
        <details className="viz__description">
          <summary>Text description</summary>
          <p id={descriptionId}>{viz.description}</p>
        </details>
      )}
    </figure>
  )
}
