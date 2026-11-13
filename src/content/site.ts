// Site-wide settings: names, footer, and the nav tabs (in order).

export const site = {
  title: 'Immigration Archive',
  course: 'UCLA DH 101',
  team: 'Travel Crew',
  year: 2026,
  repoUrl: 'https://github.com/Vir1dian/dh-101-final',
  nav: [
    { label: 'Home', to: '/' },
    { label: 'Analysis', to: '/analysis' },
    { label: 'About', to: '/about' },
    { label: 'Data', to: '/data' },
    { label: 'Sources', to: '/sources' },
  ],
} as const
