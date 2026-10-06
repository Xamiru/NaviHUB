import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '655082', title: 'Eiffel', year: 2021 },
  links: [
    { target: 'event:exposition-universelle-1889', kind: 'inspired-by' }
  ],
  researched: '2026-10-06'
})
