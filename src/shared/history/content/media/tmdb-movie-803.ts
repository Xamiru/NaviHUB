import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '803', title: 'Night and Fog', year: 1956 },
  links: [
    { target: 'event:the-holocaust', kind: 'documentary-about' }
  ],
  researched: '2026-10-06'
})
