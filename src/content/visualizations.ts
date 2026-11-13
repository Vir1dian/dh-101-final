// Every chart, map and embed on the site, in one place. Put one on a page by
// typing its id on its own line in the Google Doc / Markdown:
//
//   [[viz:refugee-arrivals-map]]
//
// While `embedUrl` is empty, a placeholder box shows where it will go.
// `caption`, `description` (screen-reader text) and `credit` are required, so
// the build fails if one is missing.

import type { Visualization } from './types'

export const visualizations: Visualization[] = [
  {
    id: 'refugee-arrivals-map',
    title: 'Refugee arrivals by state, FY2013–2024',
    kind: 'arcgis',
    embedUrl: '',
    caption: 'Placeholder: what the map shows and why it matters for research question i.',
    description: 'Placeholder: describe the main geographic pattern in a sentence or two.',
    credit: 'Data: DHS Office of Homeland Security Statistics. Map: Travel Crew.',
  },
  {
    id: 'admissions-vs-partisan-lean',
    title: "State admissions vs. political leaning, 2013–2022",
    kind: 'tableau',
    embedUrl: '',
    caption: 'Placeholder: what the chart shows and why it matters for research question ii.',
    description: 'Placeholder: describe the relationship the chart shows.',
    credit: 'Data: DHS Office of Homeland Security Statistics. Chart: Travel Crew.',
  },
  {
    id: 'admissions-by-administration',
    title: 'Annual refugee and asylee admissions by administration',
    kind: 'flourish',
    embedUrl: '',
    caption: 'Placeholder: what the chart shows and why it matters for research question iii.',
    description: 'Placeholder: describe the trend, including the 2020 drop.',
    credit: 'Data: DHS Office of Homeland Security Statistics. Chart: Travel Crew.',
  },
]
