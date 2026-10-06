import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '317161',
    title: 'Bonifacio: Ang Unang Pangulo',
    year: 2014
  },
  links: [
    { target: 'event:philippine-revolution', kind: 'dramatisation-of' }
  ],
  researched: '2026-10-06'
})
