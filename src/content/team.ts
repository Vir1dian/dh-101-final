// Member cards on the About page, in display order (left to right, top to bottom).
// Empty fields show a faint "content here" placeholder until they're filled in.
// Photos: drop a square image in src/assets/team/, import it, and set `photo`.
// Bios come from the team's "About Me Draft" Google Doc.

import type { Member } from './types'

import gavinPhoto from '../assets/team/gavin.jpg'
import jaiPhoto from '../assets/team/jai.jpg'

export const team: Member[] = [
  {
    name: 'Melvin Tam',
    major: 'Statistics and Data Science',
    role: 'Project Manager',
    details:
      'Hi! My name is Melvin, a third year Statistics and Data Science major. As the project manager, I ensured that communication among team members was efficient, and kept track of all project documentation.',
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
    major: 'Cognitive Science',
    role: 'Data Visualization Specialist',
    details:
      'Hello, I’m Jai, a fourth year Cognitive Science major with strong interest in UX/UI. As the Data Visualization Specialist, I oversaw the project’s data visualizations. I ensured that the data was in the right format. Also fine tuned data visualizations and added them to the site.',
    contact: [{ href: 'https://www.linkedin.com/in/jaibinning' }],
    photo: jaiPhoto,
  },
  {
    name: 'Francesca He',
    major: 'Economics',
    role: 'Content Developer',
    details:
      "Hi! My name is Francesca, and my major is Econ. I am interested in business, data analysis, and how economic and social factors affect people's lives. As a content developer for TravelCrew, I am responsible for organizing research results and creating clear and engaging content for the website. Through this project, I hope to explore immigration trends from different perspectives, make complex data more understandable, and make it more meaningful for our audience.",
  },
]
