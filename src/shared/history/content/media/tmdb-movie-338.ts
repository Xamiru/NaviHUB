import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '338',
    title: 'Good Bye Lenin!',
    year: 2003
  },
  links: [
    { target: 'event:fall-of-the-berlin-wall', kind: 'set-during' }
  ],
  researched: '2026-10-08'
})
