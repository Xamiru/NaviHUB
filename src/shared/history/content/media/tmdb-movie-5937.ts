import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '5937', title: 'John Rabe', year: 2009 },
  links: [
    { target: 'event:nanjing-massacre', kind: 'dramatisation-of' }
  ],
  researched: '2026-10-06'
})
