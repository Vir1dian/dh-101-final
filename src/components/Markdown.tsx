import type { RootContent } from 'hast'
import { toJsxRuntime, type Components } from 'hast-util-to-jsx-runtime'
import { Fragment, useEffect, type ComponentProps, type ReactNode } from 'react'
import { jsx, jsxs } from 'react/jsx-runtime'
import { Link } from 'react-router'
import type { CardOptions } from '../content/types'
import { toSections, toTree } from '../lib/markdown'
import { withBase } from '../lib/site-url'
import PaperCard from './PaperCard'
import VizEmbed from './VizEmbed'

// How Markdown elements become React elements.
const components: Partial<Components> = {
  // "/about" → in-site link (keeps the /dh-101-final/ prefix); everything else is a normal link
  a: ({ href = '', ...props }: ComponentProps<'a'>) =>
    href.startsWith('/') ? <Link to={href} {...props} /> : <a href={href} {...props} />,
  img: ({ src = '', alt = '', ...props }: ComponentProps<'img'>) => (
    <img src={typeof src === 'string' ? withBase(src) : src} alt={alt} loading="lazy" {...props} />
  ),
  // [[viz:id]] lines arrive as <figure data-viz-id="id">
  figure: ({ 'data-viz-id': vizId, ...props }: ComponentProps<'figure'> & { 'data-viz-id'?: string }) =>
    vizId ? <VizEmbed id={vizId} /> : <figure {...props} />,
  table: (props: ComponentProps<'table'>) => (
    <div className="table-scroll">
      <table {...props} />
    </div>
  ),
}

function MarkdownNodes({ nodes }: { nodes: RootContent[] }) {
  return toJsxRuntime({ type: 'root', children: nodes }, { Fragment, jsx, jsxs, components, passKeys: true })
}

/** Render a Markdown string as-is (no cards), e.g. a citation. */
export function Markdown({ source }: { source: string }) {
  return <MarkdownNodes nodes={toTree(source).children} />
}

type CardsProps = {
  source: string
  /** Per-card options keyed by heading slug. */
  cards?: Record<string, CardOptions>
  /** Extra elements to place right after a given card, keyed by heading slug. */
  after?: Record<string, ReactNode>
}

/** Render a Markdown page as a stack of paper cards, one per top-level heading. */
export function MarkdownCards({ source, cards = {}, after = {} }: CardsProps) {
  const sections = toSections(source)
  const ids = new Set(sections.map((s) => s.id))
  const orphans = Object.keys(after).filter((key) => !ids.has(key))

  useEffect(() => {
    if (!import.meta.env.DEV) return
    const unknown = [...Object.keys(cards), ...Object.keys(after)].filter((key) => !ids.has(key))
    if (unknown.length > 0) {
      console.warn(
        `[content] No card heading matches: ${unknown.join(', ')}. ` +
          `Headings on this page: ${[...ids].join(', ')}. A heading may have been renamed in the Doc.`,
      )
    }
  })

  return (
    <>
      {sections.map((section) => (
        <Fragment key={section.id}>
          <PaperCard id={section.id} title={section.title} titleId={section.titleId} {...cards[section.id]}>
            <MarkdownNodes nodes={section.nodes} />
          </PaperCard>
          {after[section.id]}
        </Fragment>
      ))}
      {/* anything meant to follow a heading that no longer exists still shows up, at the end */}
      {orphans.map((key) => (
        <Fragment key={`after-${key}`}>{after[key]}</Fragment>
      ))}
    </>
  )
}
