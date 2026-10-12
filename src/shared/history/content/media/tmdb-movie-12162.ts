import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '12162',
    title: 'The Hurt Locker',
    year: 2008
  },
  links: [
    { target: 'event:iraq-war', kind: 'set-during' }
  ],
  researched: '2026-10-13'
})
