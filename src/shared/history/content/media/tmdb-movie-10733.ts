import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '10733', title: 'The Alamo', year: 2004 },
  links: [
    { target: 'event:texas-revolution', kind: 'dramatisation-of' }
  ],
  researched: '2026-10-06'
})
