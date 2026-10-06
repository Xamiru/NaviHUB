import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '18320',
    title: 'The Young Victoria',
    year: 2009
  },
  links: [
    { target: 'event:accession-of-queen-victoria', kind: 'dramatisation-of' }
  ],
  researched: '2026-10-06'
})
