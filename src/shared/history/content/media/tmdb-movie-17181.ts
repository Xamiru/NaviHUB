import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '17181', title: 'Nanking', year: 2007 },
  links: [
    { target: 'event:nanjing-massacre', kind: 'documentary-about' }
  ],
  researched: '2026-10-06'
})
