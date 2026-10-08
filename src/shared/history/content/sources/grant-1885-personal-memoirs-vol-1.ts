import { defineSource } from '../../schema'

export default defineSource({
  id: 'grant-1885-personal-memoirs-vol-1',
  type: 'book',
  title: 'Personal Memoirs of U. S. Grant',
  lang: 'en',
  contributors: [
    { name: 'Ulysses S. Grant', role: 'author' }
  ],
  volume: '1',
  publisher: 'Charles L. Webster & Company',
  place: 'New York',
  date: '1885',
  ids: { archive: 'gutenberg 4367' },
  url: 'https://www.gutenberg.org/cache/epub/4367/pg4367.txt',
  license: { id: 'public-domain' },
  accessed: '2026-10-08'
})
