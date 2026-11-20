// Shapes for everything in src/content. If you leave out a required field
// (say, a visualization's caption or description), `npm run build` fails and
// tells you which one, so it gets fixed before it goes live.

/**
 * Card styles. 'paper', 'sage', 'sky': Figma Paragraph Template 1 in different colours.
 * 'id': Paragraph Template 2 (framed ID page). 'open': Paragraph Template 3 (rules above and
 * below, no card). 'board': the About page's dark clipboard panel.
 */
export type Tone = 'paper' | 'sage' | 'sky' | 'id' | 'open' | 'board'

/** Optional styling for one card. Cards come from the top-level headings in a page's Markdown. */
export type CardOptions = {
  /**
   * 'card' (default): a paper card. 'id-cards': the heading sits on the dark page and
   * each item of the section's list becomes its own ID card (Home research questions).
   */
  layout?: 'card' | 'id-cards'
  /** For 'id-cards': text before each card's number, e.g. 'ID.RQ.' → ID.RQ.1, ID.RQ.2… */
  idLabel?: string
  /** Background colour. Default: 'paper'. */
  tone?: Tone
  /** Thin rule under every paragraph / list item (Home intro + research questions style). */
  ruled?: boolean
  /** Number list items i, ii, iii… in bold (research questions style). */
  numerals?: boolean
  /** Larger body text (About intro style). */
  lead?: boolean
  /**
   * Image beside the text with a caption under it (Home intro style). Leave
   * `src` empty to show a placeholder box; once there's an image, `alt` is required.
   */
  figure?: { src: string; alt: string; caption?: string } | { src?: undefined; alt?: string; caption?: string }
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
  /** Line in the bottom-right corner, e.g. what the background clip shows. */
  caption?: string
  /** Looping background clip. Without one, the hero shows its plain darkened background. */
  video?: {
    /** The clip: import it at the top of pages.ts (MP4 plays in every browser). */
    src: string
    /** Still frame shown while the clip loads, and instead of it for visitors who turn off motion. */
    poster?: string
    /** Who made the footage; shown after the caption. */
    credit?: string
  }
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
  /**
   * URL the iframe loads. Leave '' until it's published; a placeholder box shows instead.
   * Tableau Public: https://public.tableau.com/views/<Workbook>/<View>?:showVizHome=no&:embed=true
   */
  embedUrl?: string
  /** The original's own page (e.g. its Tableau Public profile page), linked under the chart. */
  link?: string
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
