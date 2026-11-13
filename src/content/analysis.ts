// The Analysis section is split into chapters, one page each (the "V2: split up
// the Analysis page" note in Figma). Each chapter's text is its own .md file.
// To add a chapter: create the .md file, import it, and add an entry below.
// The order here is the reading order (and the Previous / Next buttons).

import type { Chapter } from './types'

import introduction from './analysis/01-introduction.md?raw'
import admissionsByState from './analysis/02-admissions-by-state.md?raw'
import politicalLeaning from './analysis/03-political-leaning.md?raw'
import administrationsAndCovid from './analysis/04-administrations-and-covid.md?raw'
import conclusion from './analysis/05-conclusion.md?raw'

export const chapters: Chapter[] = [
  {
    slug: 'introduction',
    title: 'Introduction',
    summary: 'Topic, argument, scholarly context, and why it matters.',
    sourceDoc: '',
    body: introduction,
  },
  {
    slug: 'admissions-by-state',
    title: 'Admissions by State',
    summary: 'How state-level refugee admissions shifted after 2017, and where they fell most.',
    sourceDoc: '',
    body: admissionsByState,
  },
  {
    slug: 'political-leaning',
    title: 'Political Leaning',
    summary: "How closely a state's admissions track its politics, 2013–2022.",
    sourceDoc: '',
    body: politicalLeaning,
  },
  {
    slug: 'administrations-and-covid',
    title: 'Administrations & COVID-19',
    summary: 'Admissions across administrations, and how the pandemic complicates the comparison.',
    sourceDoc: '',
    body: administrationsAndCovid,
  },
  {
    slug: 'conclusion',
    title: 'Conclusion',
    summary: 'What the evidence adds up to, and what the data leaves out.',
    sourceDoc: '',
    body: conclusion,
  },
]
