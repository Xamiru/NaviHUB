import { defineSource } from '../../schema'

export default defineSource({
  id: 'paine-1791-rights-of-man',
  type: 'primary',
  title: 'Rights of Man',
  lang: 'en',
  contributors: [
    { name: 'Thomas Paine', role: 'author' }
  ],
  publisher: 'J. S. Jordan',
  date: '1791',
  url: 'https://en.wikisource.org/wiki/Rights_of_Man',
  accessed: '2026-10-13',
  place: 'London',
  license: { id: 'public-domain' }
})
