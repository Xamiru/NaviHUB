import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '232784',
    title: 'Independência ou Morte',
    year: 1972
  },
  links: [
    { target: 'event:independence-of-brazil', kind: 'dramatisation-of' }
  ],
  researched: '2026-10-06'
})
