import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '10971',
    title: 'A Night to Remember',
    year: 1958
  },
  links: [
    { target: 'event:sinking-of-the-titanic', kind: 'dramatisation-of' }
  ],
  researched: '2026-10-06'
})
