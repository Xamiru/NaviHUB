import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '11209', title: 'The Alamo', year: 1960 },
  links: [
    { target: 'event:texas-revolution', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
