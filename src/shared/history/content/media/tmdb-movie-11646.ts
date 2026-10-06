import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '11646', title: 'Gallipoli', year: 1981 },
  links: [
    { target: 'event:gallipoli-campaign', kind: 'dramatisation-of' }
  ],
  researched: '2026-10-06'
})
