# Immigration Archive

UCLA DH 101 final project by Travel Crew. A static site built with Vite, React and TypeScript, published to GitHub Pages at **https://vir1dian.github.io/dh-101-final/**.

The design follows the Figma file *UCLA-Projects → DH101 - Project Website (V1)*.

## Run it locally

You need [Node.js](https://nodejs.org) 22.22 or newer (the 24 LTS is a good choice).

```bash
npm install
npm run dev      # http://localhost:5173/dh-101-final/
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build
```

## Where things live

```
src/content/            ← everything the team edits
  pages/*.md            page text, exported from Google Docs
  analysis/*.md         one file per Analysis chapter
  pages.ts              page settings: card colours, images, hero text, Google Doc links
  analysis.ts           chapter list and order
  team.ts               member cards on the About page
  visualizations.ts     every chart / map / embed
  bibliography.ts       annotated bibliography on the Sources page
  site.ts               site name, footer, nav tabs
src/components/         layout pieces (NavBar, Hero, PaperCard, MemberCard…)
src/styles/tokens.css   colours, fonts and sizes from Figma
```

## Updating text from Google Docs

The Google Docs are the master copy until we lock content for the showcase. To bring a Doc's changes onto the site:

1. In the Doc: **File → Download → Markdown (.md)**.
2. Replace the matching file in `src/content/pages/` or `src/content/analysis/` with the download.
3. Check the diff (the export sometimes mangles complicated lists), then commit and push.

Don't edit the prose in the `.md` files directly until the lock, or the site and the Doc will drift apart. Layout settings live in the `.ts` files, so re-exporting never wipes them.

**How a Doc becomes cards:** each top-level heading in the Doc (Heading 1 or Heading 2, whichever the Doc uses for its sections) starts a new paper card, and the heading becomes the card title. A single title heading at the very top of the Doc is skipped. Footnotes are collected in a "Notes" card at the end.

**Styling a card:** in `pages.ts`, add the heading as a slug under `cards`: "Research Questions" becomes `'research-questions'`. The options are `tone` (`'paper'`, `'sage'`, `'sky'`), `ruled`, `numerals`, `lead`, `figure` and `decoration` (see `src/content/types.ts`). If a heading gets renamed in the Doc, the browser console says which card setting no longer matches anything.

## Charts, maps and other embeds

1. Add an entry to `src/content/visualizations.ts` with an `id`, `title`, `caption`, `description` (screen-reader text) and `credit`. The build fails if any of these are missing.
2. In the Doc, put the id on its own line where the chart should appear:

   ```
   [[viz:refugee-arrivals-map]]
   ```

3. When the chart is published (Tableau Public, Flourish, ArcGIS, Voyant…), paste its embed URL into `embedUrl`. Until then a placeholder box shows the spot.

## Team, bibliography, chapters

- **Team member:** edit `src/content/team.ts`. For a photo, add a square image to `src/assets/team/`, import it at the top of the file and set `photo`.
- **Bibliography entry:** add to `src/content/bibliography.ts`. Entries are sorted alphabetically; use `*asterisks*` for italic titles.
- **Analysis chapter:** add a `.md` file in `src/content/analysis/`, import it in `analysis.ts` and add an entry. The order in that list is the reading order.

## Publishing

Every push to `main` builds and deploys the site automatically (`.github/workflows/deploy.yml`).

One-time setup: in the GitHub repo, go to **Settings → Pages** and set **Source** to **GitHub Actions**.

Notes:

- The site lives under `/dh-101-final/`. That prefix is set in `vite.config.ts`. Change it if the repo is renamed or the site moves to a custom domain.
- GitHub Pages can't route single-page apps by itself, so the build copies `index.html` to `404.html`. Deep links like `/dh-101-final/about` still load the right page.
