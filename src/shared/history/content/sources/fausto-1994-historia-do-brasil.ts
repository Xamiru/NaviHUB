import { defineSource } from '../../schema'

export default defineSource({
  id: 'fausto-1994-historia-do-brasil',
  type: 'book',
  title: 'História do Brasil',
  lang: 'pt',
  contributors: [
    { name: 'Boris Fausto', role: 'author' }
  ],
  publisher: 'Edusp',
  place: 'São Paulo, SP, Brasil',
  date: '1994',
  ids: { isbn: '8531402409', oclc: '32666087' },
  url: 'https://openlibrary.org/books/OL1244727M',
  accessed: '2026-10-08'
})
