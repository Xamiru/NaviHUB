import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '74714',
    title: 'Dien Bien Phu',
    year: 1992
  },
  links: [
    { target: 'event:battle-of-dien-bien-phu', kind: 'dramatisation-of' }
  ],
  researched: '2026-10-07'
})
