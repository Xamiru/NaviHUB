import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'tv', source: 'tmdb', externalId: '7389', title: 'Nuremberg', year: 2000 },
  links: [
    { target: 'event:nuremberg-trials', kind: 'dramatisation-of' }
  ],
  researched: '2026-10-06'
})
