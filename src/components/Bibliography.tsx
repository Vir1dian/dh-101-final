import { bibliography } from '../content/bibliography'
import type { BibliographyEntry } from '../content/types'
import { Markdown } from './Markdown'
import PaperCard from './PaperCard'
import './Bibliography.css'

const GROUPS: { kind: BibliographyEntry['kind']; title: string }[] = [
  { kind: 'data', title: 'Data' },
  { kind: 'scholarship', title: 'Scholarship' },
  { kind: 'tool', title: 'Tools & Methods' },
]

// Alphabetical by citation, ignoring punctuation and a leading "The"/"A"/"An"
// (so an untitled work like “The Biden Administration…” files under B).
const sortKey = (entry: BibliographyEntry) =>
  entry.citation
    .replace(/[^\p{L}\p{N} ]/gu, '')
    .toLowerCase()
    .replace(/^(the|a|an) /, '')

export default function Bibliography() {
  const groups = GROUPS.map((group) => ({
    ...group,
    entries: bibliography
      .filter((entry) => entry.kind === group.kind)
      .sort((a, b) => sortKey(a).localeCompare(sortKey(b))),
  })).filter((group) => group.entries.length > 0)

  return (
    <PaperCard id="annotated-bibliography" title="Annotated Bibliography">
      {groups.map((group) => (
        <section key={group.kind} className="bibliography__group" aria-label={group.title}>
          <h3>{group.title}</h3>
          <ul className="bibliography">
            {group.entries.map((entry) => (
              <li key={entry.citation}>
                <div className="bibliography__citation">
                  <Markdown source={entry.citation} />
                </div>
                {entry.annotation && (
                  <details className="bibliography__annotation">
                    <summary>Annotation</summary>
                    <Markdown source={entry.annotation} />
                  </details>
                )}
                {entry.url && (
                  <a className="bibliography__link" href={entry.url}>
                    {entry.url}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </PaperCard>
  )
}
