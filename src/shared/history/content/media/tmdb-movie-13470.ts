import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '13470',
    title: 'Bury My Heart at Wounded Knee',
    year: 2007
  },
  links: [
    { target: 'event:wounded-knee-massacre', kind: 'dramatisation-of' }
  ],
  researched: '2026-10-06'
})
