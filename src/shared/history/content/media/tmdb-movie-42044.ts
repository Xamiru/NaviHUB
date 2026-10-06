import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '42044', title: 'Shoah', year: 1985 },
  links: [
    { target: 'event:the-holocaust', kind: 'documentary-about' }
  ],
  researched: '2026-10-06'
})
