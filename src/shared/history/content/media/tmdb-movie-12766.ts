import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '12766', title: 'Vera Cruz', year: 1954 },
  links: [
    { target: 'event:french-intervention-in-mexico', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
