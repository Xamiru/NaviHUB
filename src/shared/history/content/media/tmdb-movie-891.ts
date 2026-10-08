import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '891',
    title: 'All the President\'s Men',
    year: 1976
  },
  links: [
    { target: 'event:watergate-scandal', kind: 'dramatisation-of' }
  ],
  researched: '2026-10-09'
})
