# Immigration Archive

UCLA DH 101 final project by Travel Crew. A static site built with Vite, React and TypeScript, published to GitHub Pages at **https://vir1dian.github.io/dh-101-final/**.

The design follows the Figma file *UCLA-Projects → DH101 - Project Website (V1)*.

## Run it locally

[Node.js](https://nodejs.org) 22.22+ required

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
  pages.ts              page settings: card colours, images, hero text + clip, Google Doc links
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

**Styling a card:** in `pages.ts`, add the heading as a slug under `cards`: "Research Questions" becomes `'research-questions'`. The options are `tone` (`'paper'`, `'sage'`, `'sky'`, `'id'`, `'open'`, `'board'`; see the Figma paragraph templates), `ruled`, `numerals`, `lead`, `figure` and `decoration`, plus `layout: 'id-cards'`, which turns each item of the section's list into an ID card like the Home research questions (see `src/content/types.ts`). If a heading gets renamed in the Doc, the browser console says which card setting no longer matches anything.

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

## Hero background clip

The Home hero can play a looping clip behind the title, darkened so the text stays readable.

1. Put the clip and a still frame from it in `src/assets/home/` (for example `hero-clip.mp4` and `hero-poster.jpg`).
2. In `src/content/pages.ts`, uncomment the two `import` lines and the `video:` line, and fill in the credit.
3. Use `caption` to say what the clip shows; the video itself is hidden from screen readers.

Keep the file small, since every visit to the Home page loads it: MP4, no audio, 5–15 seconds that loop cleanly, 1280×720 or 1920×1080, ideally a few MB. With [ffmpeg](https://ffmpeg.org):

```bash
ffmpeg -i original.mov -an -vf scale=1920:-2 -c:v libx264 -crf 28 -preset slow -movflags +faststart hero-clip.mp4
ffmpeg -i hero-clip.mp4 -frames:v 1 hero-poster.jpg
```

The clip pauses itself while scrolled out of view. It has a pause button, and it starts paused for visitors whose system is set to reduce motion (the poster shows instead). Without a clip, the hero shows its plain dark background.

