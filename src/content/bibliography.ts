// The annotated bibliography on the Sources page. Entries are sorted
// alphabetically when shown, so add them in any order. Citations and
// annotations are Markdown: *italics* for titles.

import type { BibliographyEntry } from './types'

export const bibliography: BibliographyEntry[] = [
  {
    kind: 'data',
    citation:
      'U.S. Department of Homeland Security, Office of Homeland Security Statistics. *[Dataset title]*. Accessed [date].',
    annotation: 'Placeholder: what the dataset contains, who produced it and why, and how we used it.',
  },
  {
    kind: 'scholarship',
    citation: 'Lastname, Firstname. *Title of Book*. City: Publisher, Year.',
    annotation: 'Placeholder: the argument, and how it relates to our findings.',
  },
]
