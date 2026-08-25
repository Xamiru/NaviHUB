export interface SettingsSearchSection<T extends string = string> {
  key: T
  title: string
  terms?: readonly string[]
}

function normalize(value: string): string {
  return value.trim().toLocaleLowerCase()
}

export function matchesSettingsSection(
  section: SettingsSearchSection,
  query: string
): boolean {
  const needle = normalize(query)
  if (!needle) return true
  return [section.title, ...(section.terms ?? [])]
    .map(normalize)
    .some((value) => value.includes(needle))
}

export function filterSettingsSections<T extends string>(
  sections: readonly SettingsSearchSection<T>[],
  query: string
): SettingsSearchSection<T>[] {
  return sections.filter((section) => matchesSettingsSection(section, query))
}
