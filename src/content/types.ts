// Shapes for everything in src/content. If you leave out a required field
// (say, a visualization's caption or description), `npm run build` fails and
// tells you which one, so it gets fixed before it goes live.

export type Tone = 'paper' | 'sage' | 'sky'

/** Optional styling for one card. Cards come from the top-level headings in a page's Markdown. */
export type CardOptions = {
  /** Background colour. Default: 'paper'. */
  tone?: Tone
  /** Thin rule under every paragraph / list item (Home intro + research questions style). */
  ruled?: boolean
  /** Number list items i, ii, iii… in bold (research questions style). */
  numerals?: boolean
  /** Larger body text (About intro style). */
  lead?: boolean
  /** Image beside the text with a caption under it (Home intro style). */
  figure?: { src: string; alt: string; caption?: string }
  /** Faint decorative image in the top-right corner. */
  decoration?: { src: string }
}

export type PageConfig = {
  /** Shown in the browser tab. */
  title: string
  /** Link to the Google Doc the text comes from, so everyone knows where to edit it. */
  sourceDoc?: string
  /** The page text: a Google Docs → Markdown export, imported with `?raw`. */
  body: string
  /**
   * Styling per card, keyed by the card's heading as a slug:
   * "Research Questions" → 'research-questions'. Cards not listed here use the defaults.
   */
  cards?: Record<string, CardOptions>
}

export type Chapter = PageConfig & {
  /** URL segment: /analysis/<slug> */
  slug: string
  /** One line for the chapter list on the Analysis page. */
  summary: string
}

export type HeroConfig = {
  title: string
  kicker: string
  description: string
  cta: string
  caption?: string
  /** Background images, left to right. `width` is the % of the hero each one covers. */
  media: { src: string; alt: string; width: number; position?: string; credit?: string }[]
}

export type Member = {
  name: string
  role: string
  major?: string
  details?: string
  /** Links shown under CONTACT. `label` defaults to the URL itself. */
  contact?: { href: string; label?: string }[]
  /** Import the image file at the top of team.ts and put it here. */
  photo?: string
}

export type VisualizationKind =
  | 'tableau'
  | 'flourish'
  | 'datawrapper'
  | 'arcgis'
  | 'voyant'
  | 'iframe'
  | 'image'

export type Visualization = {
  /** Used in Markdown as [[viz:<id>]] */
  id: string
  title: string
  kind: VisualizationKind
  /** Embed/share URL for iframe-based tools. Leave '' until it's published; a placeholder box shows instead. */
  embedUrl?: string
  /** For kind 'image': a path inside /public, e.g. '/images/chart.png'. */
  image?: string
  /** CSS aspect ratio of the embed, e.g. '16 / 9' (default) or '4 / 3'. */
  aspectRatio?: string
  /** Shown under the chart: what it shows and why it matters. */
  caption: string
  /** Text alternative for screen readers: the key pattern in words. */
  description: string
  /** Data source, tool, and who made it. */
  credit: string
}

export type BibliographyEntry = {
  /** Full citation in Markdown; wrap titles in *asterisks* for italics. */
  citation: string
  /** Annotation in Markdown (optional while drafting). */
  annotation?: string
  /** Link to the source, if there is one. */
  url?: string
  kind: 'data' | 'scholarship' | 'tool'
}
