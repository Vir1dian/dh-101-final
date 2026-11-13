import type { Paragraph, Root } from 'mdast'
import { toString } from 'mdast-util-to-string'
import { visit } from 'unist-util-visit'

// A paragraph containing only [[viz:some-id]] becomes a placeholder <figure>
// that the renderer swaps for the matching entry in content/visualizations.ts.
//
// This syntax survives a Google Docs export: Docs may escape the brackets
// (\[\[viz:…\]\]) and turns straight quotes into curly ones, so we match on the
// parsed text and avoid quotes entirely.
const VIZ_LINE = /^\[\[\s*viz\s*:\s*([\w-]+)\s*\]\]$/i

export default function remarkViz() {
  return (tree: Root) => {
    visit(tree, 'paragraph', (node: Paragraph) => {
      const match = VIZ_LINE.exec(toString(node).trim())
      if (!match) return
      node.data = { hName: 'figure', hProperties: { dataVizId: match[1] }, hChildren: [] }
    })
  }
}
