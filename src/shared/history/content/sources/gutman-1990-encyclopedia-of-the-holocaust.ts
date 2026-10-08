import { defineSource } from '../../schema'

export default defineSource({
  id: 'gutman-1990-encyclopedia-of-the-holocaust',
  type: 'book',
  lang: 'en',
  title: 'Encyclopedia of the Holocaust',
  contributors: [
    { name: 'Israel Gutman', role: 'editor' }
  ],
  publisher: 'Macmillan Pub. Co',
  place: 'New York',
  date: '1990',
  ids: { isbn: '0028960904' },
  url: 'https://id.loc.gov/resources/instances/3398224',
  accessed: '2026-10-08'
})
