import { visualizations } from '../content/visualizations'
import type { Visualization } from '../content/types'
import { withBase } from '../lib/site-url'
import './VizEmbed.css'

const byId = new Map<string, Visualization>(visualizations.map((viz) => [viz.id, viz]))

/** A chart / map / embed from content/visualizations.ts, with caption and credit. */
export default function VizEmbed({ id }: { id: string }) {
  const viz = byId.get(id)

  if (!viz) {
    return (
      <p className="viz viz--missing" role="note">
        No visualization with id “{id}”. Check the id in src/content/visualizations.ts.
      </p>
    )
  }

  const descriptionId = `viz-${viz.id}-description`
  let media
  if (viz.kind === 'image' && viz.image) {
    media = <img src={withBase(viz.image)} alt={viz.description} loading="lazy" />
  } else if (viz.embedUrl) {
    media = (
      <iframe
        src={viz.embedUrl}
        title={viz.title}
        loading="lazy"
        allowFullScreen
        aria-describedby={descriptionId}
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
      <div className="viz__frame" style={{ aspectRatio: viz.aspectRatio ?? '16 / 9' }}>
        {media}
      </div>
      <figcaption className="viz__caption">
        <span className="viz__title">{viz.title}.</span> {viz.caption}
        <span className="viz__credit">{viz.credit}</span>
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
