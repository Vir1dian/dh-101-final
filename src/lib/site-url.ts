/** Prefix a root-relative path ("/images/map.png") with the site's base path. */
export function withBase(path: string): string {
  return path.startsWith('/') ? import.meta.env.BASE_URL + path.slice(1) : path
}

/** Browser-tab title for a page. */
export function pageTitle(title: string | undefined, siteTitle: string): string {
  return title ? `${title} · ${siteTitle}` : siteTitle
}
