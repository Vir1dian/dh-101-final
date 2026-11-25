// Every chart, map and embed on the site, in one place. Put one on a page by
// typing its id on its own line in the Google Doc / Markdown:
//
//   [[viz:refugee-declines-map]]
//
// While `embedUrl` is empty, a placeholder box shows where it will go.
// `caption`, `description` (screen-reader text) and `credit` are required, so
// the build fails if one is missing.

import type { Visualization } from './types'

export const visualizations: Visualization[] = [
  // Digital Method 1 (Analysis → Admissions by State)
  {
    id: 'refugee-declines-map',
    title: 'Drop in refugee arrivals per million residents, FY2013–16 vs. FY2018–19',
    kind: 'tableau',
    embedUrl: 'https://public.tableau.com/views/DH1017_1/DeclinesMapped?:showVizHome=no&:embed=true',
    link: 'https://public.tableau.com/app/profile/gavin.torrecampo/viz/DH1017_1/DeclinesMapped',
    aspectRatio: '16 / 10',
    caption:
      'Measured against population, yearly refugee arrivals fell most in the Northern Plains and Mountain West, led by North Dakota (509 fewer per million residents), Nebraska (420) and South Dakota (384). Hover over a state for its before and after averages.',
    description:
      'Map of the lower 48 states shaded in five steps of purple by how many fewer refugees per million residents arrived each year in FY2018–2019 than in FY2013–2016. The darkest states are North Dakota, Nebraska, South Dakota, Idaho, Vermont and Arizona; Texas and California fall in the middle; Wyoming shows zero because it has no refugee resettlement program.',
    credit: 'Data: DHS Office of Homeland Security Statistics. Map: Gavin Torrecampo, Tableau Public.',
  },
  // Digital Method 2 (Analysis → Introduction)
  {
    id: 'policy-timeline',
    title: 'Timeline of immigration legislation and policies, 2013–2024',
    kind: 'iframe',
    embedUrl: '',
    caption: 'Placeholder: legislation and policies lined up with the years in our data.',
    description: 'Placeholder: list the main events the timeline shows.',
    credit: 'Travel Crew.',
  },
  // Digital Method 3 (Analysis → Administrations and COVID-19)
  {
    id: 'refugees-asylees-by-administration',
    title: 'Refugee and asylee admissions by administration, FY2013–2024',
    kind: 'tableau',
    embedUrl: 'https://public.tableau.com/views/LineGraphDH101/Dashboard2?:showVizHome=no&:embed=true',
    link: 'https://public.tableau.com/app/profile/jai.binning/viz/LineGraphDH101/Dashboard2',
    // A dashboard at Tableau's default fixed size. Delete `fixedSize` once Jai sets it to
    // Automatic (Dashboard → Size); it then fills a 4:3 box like the other charts.
    fixedSize: { width: 1000, height: 800 },
    aspectRatio: '4 / 3',
    caption:
      'Refugee admissions peaked at 85,020 in 2016 and fell to 22,390 by 2018, while asylum grants rose to 45,580 in 2019. Both reached their lowest points in 2021 and their highest in 2024.',
    description:
      'Line chart of yearly refugee admissions (orange) and asylum grants (blue), FY2013–2024, with shaded bands for the Obama, Trump and Biden administrations and a note marking the 2020 COVID-19 shutdowns. The refugee line falls sharply after 2016 while the asylee line rises until 2019; both drop to their lows in 2021 and climb to their highs in 2024.',
    credit: 'Data: DHS Office of Homeland Security Statistics. Chart: Jai Binning, Tableau Public.',
  },
  // Digital Method 4 (Analysis → Administrations and COVID-19)
  {
    id: 'affirmative-vs-defensive-asylum',
    title: 'Affirmative and defensive asylum grants by year',
    kind: 'tableau',
    embedUrl:
      'https://public.tableau.com/views/AsylumCasesStackedBarChart/AsluymCasesStackedBar?:showVizHome=no&:embed=true',
    link: 'https://public.tableau.com/app/profile/melvin.tam1944/viz/AsylumCasesStackedBarChart/AsluymCasesStackedBar',
    aspectRatio: '16 / 10',
    caption:
      'Both kinds of asylum grants climbed after 2017 and peaked in 2019, with defensive grants growing faster than before.',
    description:
      'Stacked bar chart with one bar per year, split into affirmative and defensive asylum grants. Totals stay fairly steady from 2013 to 2016, then rise after 2017 to a peak in 2019. A slider lets you choose which years to show.',
    credit: 'Data: DHS Office of Homeland Security Statistics. Chart: Melvin Tam, Tableau Public.',
  },
  // Animated map (Analysis → Admissions by State). Replaces Jai's bar chart (Digital Method 5).
  // Caption and description describe the map as published on Nov 24; update them after Kevin's
  // changes (smaller circles, lower 48, title, starting year).
  {
    id: 'refugee-arrivals-by-year-map',
    title: 'Refugee arrivals by state each year, FY2013–2024',
    kind: 'tableau',
    embedUrl:
      'https://public.tableau.com/views/7_1_17944694183500/RefugeePopulationFlucuationbyState?:showVizHome=no&:embed=true',
    link: 'https://public.tableau.com/app/profile/kevin.blake5347/viz/7_1_17944694183500/RefugeePopulationFlucuationbyState',
    aspectRatio: '16 / 10',
    caption:
      'Each circle is one state’s refugee arrivals that year, colored by the administration in office. The circles shrink after 2017, are smallest around 2020–2021, and grow back to their largest by 2024. Use the arrows or the play button to step through the years.',
    description:
      'Animated map of North America with one circle per US state, sized by that year’s refugee arrivals and colored by administration: dark blue for Obama (2013–2016), red for Trump (2017–2020) and teal for Biden (2021–2024). A page control steps through the years and a checklist filters the states. In 2013–2017 and 2023–2024 the circles are large enough to overlap across much of the country; from 2018 to 2022 they are much smaller, smallest in 2020–2021. Texas, for example, had 7,470 arrivals in 2013.',
    credit: 'Data: DHS Office of Homeland Security Statistics. Map: Kevin Blake, Tableau Public.',
  },
  // Research question ii (Analysis → Political Leaning). Not made yet.
  {
    id: 'admissions-vs-partisan-lean',
    title: 'State admissions vs. political leaning, 2013–2022',
    kind: 'tableau',
    embedUrl: '',
    caption: 'Placeholder: what the chart shows and why it matters for research question ii.',
    description: 'Placeholder: describe the relationship the chart shows.',
    credit: 'Data: DHS Office of Homeland Security Statistics. Chart: Travel Crew.',
  },
]
