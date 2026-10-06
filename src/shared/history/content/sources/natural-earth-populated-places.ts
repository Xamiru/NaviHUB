import { defineSource } from '../../schema'

export default defineSource({
  id: 'natural-earth-populated-places',
  type: 'dataset',
  title: 'Natural Earth 1:10m Populated Places',
  lang: 'en',
  contributors: [
    { name: 'Tom Patterson', role: 'compiler' },
    { name: 'Nathaniel Vaughn Kelso', role: 'compiler' }
  ],
  publisher: 'Natural Earth',
  date: 'n.d.',
  url: 'https://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-populated-places/',
  license: { id: 'public-domain' },
  accessed: '2026-10-06'
})
