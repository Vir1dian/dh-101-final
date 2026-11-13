import type { Element, ElementContent, Root, RootContent } from 'hast'
import { toString } from 'hast-util-to-string'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import remarkViz from './remark-viz'
import { slugify } from './slugify'

export type Section = {
  /** Slug of the heading: the card's HTML id and its key in a page's `cards` config. */
  id: string
  /** Heading text. Undefined for text that comes before the first heading. */
  title?: string
  /** Id for the card heading when something else already points at it (footnotes). */
  titleId?: string
  nodes: RootContent[]
}

// Markdown (GitHub flavour: tables, footnotes, strikethrough, autolinks) → HTML tree.
// Raw HTML inside the Markdown is ignored, which keeps pasted content safe.
const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkViz)
  .use(remarkRehype, { footnoteLabel: 'Notes', footnoteBackLabel: 'Back to the text' })

const cache = new Map<string, Root>()

/** Parse once per file; content never changes while the site is running. */
export function toTree(markdown: string): Root {
  let tree = cache.get(markdown)
  if (!tree) {
    tree = processor.runSync(processor.parse(markdown)) as Root
    cache.set(markdown, tree)
  }
  return tree
}

const headingLevel = (node: RootContent | ElementContent) =>
  node.type === 'element' && /^h[1-6]$/.test(node.tagName) ? Number(node.tagName[1]) : 0

const isFootnotes = (node: RootContent): node is Element =>
  node.type === 'element' && node.tagName === 'section' && 'dataFootnotes' in node.properties

/**
 * Split a document into cards: one per top-level heading.
 *
 * "Top-level" is the biggest heading size the document uses, so it works
 * whether the writer used Heading 1 or Heading 2 for sections. If the document
 * opens with a lone bigger heading (its title), that one is skipped.
 */
export function toSections(markdown: string): Section[] {
  const tree = toTree(markdown)
  let blocks = tree.children.filter((n) => !(n.type === 'text' && !n.value.trim()))
  const footnotes = blocks.find(isFootnotes)
  blocks = blocks.filter((n) => n !== footnotes)

  let levels = blocks.map(headingLevel).filter((l) => l > 0)
  let top = Math.min(...levels)
  const isLoneTitle =
    levels.length > 1 && headingLevel(blocks[0]) === top && levels.filter((l) => l === top).length === 1
  if (isLoneTitle) {
    blocks = blocks.slice(1)
    levels = levels.slice(1)
    top = Math.min(...levels)
  }

  const sections: Section[] = []
  const seen = new Map<string, number>()
  const uniqueId = (base: string) => {
    const count = (seen.get(base) ?? 0) + 1
    seen.set(base, count)
    return count === 1 ? base : `${base}-${count}`
  }

  for (const node of blocks) {
    if (headingLevel(node) === top) {
      const title = toString(node)
      sections.push({ id: uniqueId(slugify(title) || 'section'), title, nodes: [] })
    } else {
      if (sections.length === 0) sections.push({ id: uniqueId('intro'), nodes: [] })
      sections[sections.length - 1].nodes.push(node)
    }
  }

  // A Doc title exported at the same size as its section headings shows up as
  // an empty first card; drop it.
  if (sections.length > 1 && sections[0].title && sections[0].nodes.length === 0) {
    sections.shift()
  }

  if (footnotes) {
    // Footnotes become a "Notes" card at the end. Its heading takes over the id
    // of the generated (visually hidden) label that footnote links point to.
    const label = footnotes.children.find((c) => headingLevel(c) > 0)
    const labelId = label?.type === 'element' ? String(label.properties.id ?? '') : ''
    sections.push({
      id: uniqueId('notes'),
      title: 'Notes',
      titleId: labelId || undefined,
      nodes: footnotes.children.filter((c) => c !== label),
    })
  }

  return sections
}
