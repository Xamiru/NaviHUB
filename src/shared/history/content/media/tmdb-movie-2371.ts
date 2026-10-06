import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '2371', title: 'Teheran 43', year: 1981 },
  links: [
    { target: 'event:tehran-conference', kind: 'inspired-by' }
  ],
  researched: '2026-10-06'
})
