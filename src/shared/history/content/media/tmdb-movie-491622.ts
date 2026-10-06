import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '491622',
    title: 'Manikarnika—The Queen of Jhansi',
    year: 2018
  },
  links: [
    { target: 'event:indian-rebellion-of-1857', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
