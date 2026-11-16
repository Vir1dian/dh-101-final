// Page settings. The words live in the .md files next to this one (exported
// from Google Docs); this file only says how to lay them out.
//
// Each top-level heading in a .md file becomes one card. To style a card, add
// its heading as a slug under `cards` ("Research Questions" → 'research-questions').

import type { HeroConfig, PageConfig } from './types'

import homeBody from './pages/home.md?raw'
import aboutBody from './pages/about.md?raw'
import dataBody from './pages/data.md?raw'
import sourcesBody from './pages/sources.md?raw'
import analysisBody from './pages/analysis.md?raw'

// Hero background clip: put the files in src/assets/home/, then uncomment these
// two lines and the `video` line below. See the README for size tips.
// import heroClip from '../assets/home/hero-clip.mp4'
// import heroPoster from '../assets/home/hero-poster.jpg'

export const hero: HeroConfig = {
  title: 'Immigration Archive',
  kicker: 'UCLA DH 101',
  description: 'Short description of our project here',
  cta: 'Explore',
  caption: 'looping gif and description here',
  // video: { src: heroClip, poster: heroPoster, credit: 'Footage: …' },
}

export const homePage: PageConfig = {
  title: 'Home',
  sourceDoc: '',
  body: homeBody,
  cards: {
    'what-is-immigration-archive': {
      tone: 'sage',
      ruled: true,
      figure: {
        src: '',
        alt: 'in-line image example',
        caption: 'Placeholder image description',
      },
    },
    // each numbered question becomes an ID card: ID.RQ.1, ID.RQ.2…
    'research-questions': { layout: 'id-cards', idLabel: 'ID.RQ.' },
  },
}

export const aboutPage: PageConfig = {
  title: 'About',
  sourceDoc: '',
  body: aboutBody,
  cards: {
    'meet-the-team': { lead: true },
  },
}

/** On the About page, the member cards go right after this card. */
export const teamCardsAfter = 'meet-the-team'

export const dataPage: PageConfig = {
  title: 'Data',
  sourceDoc: '',
  body: dataBody,
}

export const sourcesPage: PageConfig = {
  title: 'Sources',
  sourceDoc: '',
  body: sourcesBody,
}

export const analysisPage: PageConfig = {
  title: 'Analysis',
  sourceDoc: '',
  body: analysisBody,
}
