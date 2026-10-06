import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '1214931', title: 'Nuremberg', year: 2025 },
  links: [
    { target: 'event:nuremberg-trials', kind: 'dramatisation-of' }
  ],
  researched: '2026-10-06'
})
