// Member cards on the About page, in display order (left to right, top to bottom).
// Empty fields show a faint "content here" placeholder until they're filled in.
// Photos: drop a square image in src/assets/team/, import it, and set `photo`.

import type { Member } from './types'

import gavinPhoto from '../assets/team/gavin.jpg'

export const team: Member[] = [
  {
    name: 'Melvin Tam',
    role: 'Project Manager',
  },
  {
    name: 'Gavin Torrecampo',
    major: 'Computer Science',
    role: 'Web Designer',
    details: 'Oversaw the design and structure of the site. Drafted Wireframes. WIP DESCRIPTION',
    contact: [
      { href: 'https://www.linkedin.com/in/gavin-torrecampo-a93164267/' },
      { href: 'https://github.com/Vir1dian' },
      { href: 'https://vir1dian.github.io/portfolio/' },
    ],
    photo: gavinPhoto,
  },
  {
    name: 'Nicole Pang',
    role: 'Editor',
  },
  {
    name: 'Kevin Blake',
    role: 'Data Specialist',
  },
  {
    name: 'Jai Binning',
    role: 'Data Visualization Specialist',
  },
  {
    name: 'Francesca He',
    role: 'Content Developer',
  },
]
