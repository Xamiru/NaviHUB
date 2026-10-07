import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '549559', title: 'Apollo 11', year: 2019 },
  links: [
    { target: 'event:apollo-11', kind: 'documentary-about' }
  ],
  researched: '2026-10-07'
})
