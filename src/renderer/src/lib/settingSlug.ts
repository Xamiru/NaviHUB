// The anchor a Settings card's <section> carries (`data-setting`), derived from
// its visible title. Separate from settingsCatalog.ts so QuietWorkspace can tag
// every card without pulling the catalog into each page that uses it.
export function settingSlug(title: string): string {
  return title
    .toLocaleLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
