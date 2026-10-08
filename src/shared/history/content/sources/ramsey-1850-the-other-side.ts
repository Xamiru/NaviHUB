import { defineSource } from '../../schema'

export default defineSource({
  id: 'ramsey-1850-the-other-side',
  type: 'book',
  title: 'The Other Side: or Notes for the History of the War between Mexico and the United States, Written in Mexico',
  lang: 'en',
  contributors: [
    { name: 'Ramón Alcaraz', role: 'author' },
    { name: 'Albert C. Ramsey', role: 'translator' }
  ],
  publisher: 'John Wiley',
  place: 'New York',
  date: '1850',
  translationOf: 'alcaraz-1848-apuntes-para-la-historia-de-la-guerra',
  ids: {
    archive: 'the-other-side-or-notes-for-the-history-of-the-war-between-mexico-and-the-united'
  },
  url: 'https://archive.org/details/the-other-side-or-notes-for-the-history-of-the-war-between-mexico-and-the-united',
  license: { id: 'public-domain' },
  accessed: '2026-10-08',
  holding: 'Google Books scan (Internet Archive)'
})
