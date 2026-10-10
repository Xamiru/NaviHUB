import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '352200',
    title: 'Rabin, the Last Day',
    year: 2015
  },
  links: [
    { target: 'event:assassination-of-yitzhak-rabin', kind: 'documentary-about' }
  ],
  researched: '2026-10-10'
})
