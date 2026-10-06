import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '316152',
    title: 'Free State of Jones',
    year: 2016
  },
  links: [
    { target: 'event:american-civil-war', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
