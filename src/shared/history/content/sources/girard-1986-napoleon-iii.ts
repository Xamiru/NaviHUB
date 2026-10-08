import { defineSource } from '../../schema'

export default defineSource({
  id: 'girard-1986-napoleon-iii',
  type: 'book',
  title: 'Napoléon III',
  lang: 'fr',
  contributors: [
    { name: 'Louis Girard', role: 'author' }
  ],
  publisher: 'Fayard',
  place: 'Paris',
  date: '1986',
  ids: { isbn: '2213018200', oclc: '16162816' },
  url: 'https://openlibrary.org/books/OL2452399M',
  accessed: '2026-10-08'
})
