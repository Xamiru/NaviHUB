import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '256917',
    title: 'The Water Diviner',
    year: 2014
  },
  links: [
    { target: 'event:gallipoli-campaign', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
