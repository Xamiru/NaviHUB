import { defineSource } from '../../schema'

export default defineSource({
  id: 'ataturk-1999-nutuk',
  type: 'book',
  lang: 'tr',
  title: 'Nutuk, 1919-1927',
  contributors: [
    { name: 'Kemal Atatürk', role: 'author' }
  ],
  publisher: 'Atatürk Araştırma Merkezi',
  place: 'Ankara',
  date: '1999',
  ids: { isbn: '975160401X' },
  url: 'https://id.loc.gov/resources/instances/12608034',
  accessed: '2026-10-08'
})
