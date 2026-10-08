import { defineSource } from '../../schema'

export default defineSource({
  id: 'bredin-1983-laffaire',
  type: 'book',
  title: 'L\'affaire',
  lang: 'fr',
  contributors: [
    { name: 'Jean-Denis Bredin', role: 'author' }
  ],
  publisher: 'Julliard',
  date: '1983',
  ids: { isbn: '226000346X', oclc: '10664173' },
  url: 'https://openlibrary.org/books/OL2921501M',
  accessed: '2026-10-08'
})
