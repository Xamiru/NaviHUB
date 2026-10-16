import { defineSource } from '../../schema'

export default defineSource({
  id: 'catholic-encyclopedia-western-schism',
  type: 'encyclopedia',
  title: 'Western Schism',
  lang: 'en',
  contributors: [
    { name: 'Louis Salembier', role: 'author' }
  ],
  container: 'The Catholic Encyclopedia',
  volume: '13',
  publisher: 'Robert Appleton Company',
  place: 'New York',
  date: '1912',
  url: 'https://www.newadvent.org/cathen/13539a.htm',
  accessed: '2026-10-16',
  license: { id: 'public-domain' }
})
