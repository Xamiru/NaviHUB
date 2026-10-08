import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '2011', title: 'Persepolis', year: 2007 },
  links: [
    { target: 'event:iranian-revolution', kind: 'set-during' }
  ],
  researched: '2026-10-09'
})
