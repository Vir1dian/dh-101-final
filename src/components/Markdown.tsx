import type { Element, RootContent } from 'hast'
import { toJsxRuntime, type Components } from 'hast-util-to-jsx-runtime'
import { Fragment, useEffect, type ComponentProps, type ReactNode } from 'react'
import { jsx, jsxs } from 'react/jsx-runtime'
import { Link } from 'react-router'
import type { CardOptions } from '../content/types'
import { toSections, toTree, type Section } from '../lib/markdown'
import { withBase } from '../lib/site-url'
import IdCardSection from './IdCardSection'
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

const isElement = (node: RootContent, ...tags: string[]): node is Element =>
  node.type === 'element' && tags.includes(node.tagName)

/** One section as ID cards: each item of its first list becomes a card. */
function IdCards({ section, options }: { section: Section; options: CardOptions }) {
  const list = section.nodes.find((node) => isElement(node, 'ol', 'ul')) as Element | undefined
  const items = (list?.children ?? []).filter((node) => isElement(node, 'li')) as Element[]
  const rest = section.nodes.filter((node) => node !== list)
  const hasIntro = rest.some((node) => !(node.type === 'text' && !node.value.trim()))
  return (
    <IdCardSection
      id={section.id}
      title={section.title}
      label={options.idLabel ?? ''}
      intro={hasIntro ? <MarkdownNodes nodes={rest} /> : undefined}
      items={items.map((li, index) => (
        <MarkdownNodes key={index} nodes={li.children} />
      ))}
    />
  )
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
  /** Extra elements to place inside a given card, after its text, keyed by heading slug. */
  inside?: Record<string, ReactNode>
}

/** Render a Markdown page as a stack of paper cards, one per top-level heading. */
export function MarkdownCards({ source, cards = {}, after = {}, inside = {} }: CardsProps) {
  const sections = toSections(source)
  const ids = new Set(sections.map((s) => s.id))
  const extras = { ...inside, ...after }
  const orphans = Object.keys(extras).filter((key) => !ids.has(key))

  useEffect(() => {
    if (!import.meta.env.DEV) return
    const unknown = [...Object.keys(cards), ...Object.keys(extras)].filter((key) => !ids.has(key))
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
          {cards[section.id]?.layout === 'id-cards' ? (
            <IdCards section={section} options={cards[section.id]} />
          ) : (
            <PaperCard
              id={section.id}
              title={section.title}
              titleId={section.titleId}
              extra={inside[section.id]}
              {...cards[section.id]}
            >
              <MarkdownNodes nodes={section.nodes} />
            </PaperCard>
          )}
          {after[section.id]}
        </Fragment>
      ))}
      {/* anything meant to follow a heading that no longer exists still shows up, at the end */}
      {orphans.map((key) => (
        <Fragment key={`extra-${key}`}>{extras[key]}</Fragment>
      ))}
    </>
  )
}
