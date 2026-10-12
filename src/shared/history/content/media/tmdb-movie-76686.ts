import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '76686',
    title: 'The Green Wave',
    year: 2010
  },
  links: [
    { target: 'event:2009-iranian-presidential-election-protests', kind: 'documentary-about' }
  ],
  researched: '2026-10-13'
})
