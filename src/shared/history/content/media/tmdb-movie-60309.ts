import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '60309',
    title: 'The Conspirator',
    year: 2010
  },
  links: [
    { target: 'event:assassination-of-abraham-lincoln', kind: 'dramatisation-of' }
  ],
  researched: '2026-10-06'
})
