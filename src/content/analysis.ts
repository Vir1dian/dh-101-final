// The Analysis section is split into chapters, one page each (the "V2: split up
// the Analysis page" note in Figma). Each chapter's text is its own .md file.
// To add a chapter: create the .md file, import it, and add an entry below.
// Text comes from the team's "Analysis Page Draft" Google Doc.
// The order here is the reading order (and the Previous / Next buttons).
//
// Each chapter has a block (a thin hero strip) on the Analysis page and at the
// top of its own page. `summary` and `caption` are its text. Chapter photos:
// put them in src/assets/analysis/, import them below (like the hero clip in
// pages.ts) and add `image: { src, focus, credit }`; see types.ts and the README.
// Without an image, the block shows the hero's plain darkened background.

import type { Chapter } from './types'

import introduction from './analysis/01-introduction.md?raw'
import admissionsByState from './analysis/02-admissions-by-state.md?raw'
import politicalLeaning from './analysis/03-political-leaning.md?raw'
import administrationsAndCovid from './analysis/04-administrations-and-covid.md?raw'
import conclusion from './analysis/05-conclusion.md?raw'

// import introductionPhoto from '../assets/analysis/introduction.jpg'

export const chapters: Chapter[] = [
  {
    slug: 'introduction',
    title: 'Introduction',
    summary: 'The project’s opening, the policy background behind the data, and a policy timeline.',
    caption: 'Buses along a road',
    // image: { src: introductionPhoto, focus: '50% 50%', credit: 'Photo: … / Pexels' },
    sourceDoc: '',
    body: introduction,
    cards: {
      'background-of-immigration-policies-obama-vs-trump': { tone: 'open' },
      'policy-timeline': { tone: 'id' },
    },
  },
  {
    slug: 'admissions-by-state',
    title: 'Admissions by State',
    summary: 'How state-level refugee admissions shifted after 2017, and where they fell most.',
    caption: 'US state borders, stylized',
    sourceDoc: '',
    body: admissionsByState,
    cards: {
      'refugee-declines-mapped': { tone: 'open' },
      'refugee-declines-by-state': { tone: 'id' },
    },
  },
  {
    slug: 'political-leaning',
    title: 'Political Leaning',
    summary: "How closely a state's admissions track its politics, 2013–2022.",
    caption: 'Symbols of the Democratic and Republican parties',
    sourceDoc: '',
    body: politicalLeaning,
  },
  {
    slug: 'administrations-and-covid',
    title: 'Administrations & COVID-19',
    summary: 'Refugee and asylum admissions across administrations, and how the pandemic complicates the comparison.',
    caption: 'USCIS Field Office',
    sourceDoc: '',
    body: administrationsAndCovid,
    cards: {
      'refugees-and-asylees-by-administration': { tone: 'open' },
      'affirmative-and-defensive-asylum': { tone: 'id' },
    },
  },
  {
    slug: 'conclusion',
    title: 'Conclusion',
    summary: 'What the evidence adds up to, and what the data leaves out.',
    caption: 'Stacks of passports on desk',
    sourceDoc: '',
    body: conclusion,
  },
]
