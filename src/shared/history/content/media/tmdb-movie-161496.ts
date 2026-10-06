import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '161496',
    title: 'Iris Chang: The Rape of Nanking'
  },
  links: [
    { target: 'event:nanjing-massacre', kind: 'documentary-about' }
  ],
  researched: '2026-10-06'
})
