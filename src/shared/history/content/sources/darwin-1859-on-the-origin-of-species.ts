import { defineSource } from '../../schema'

export default defineSource({
  id: 'darwin-1859-on-the-origin-of-species',
  type: 'book',
  title: 'On the Origin of Species by Means of Natural Selection, or the Preservation of Favoured Races in the Struggle for Life',
  lang: 'en',
  contributors: [
    { name: 'Charles Darwin', role: 'author' }
  ],
  publisher: 'John Murray',
  place: 'London',
  date: '1859',
  edition: 'first edition',
  ids: { archive: 'gutenberg 1228' },
  url: 'https://www.gutenberg.org/cache/epub/1228/pg1228.txt',
  accessed: '2026-10-06'
})
