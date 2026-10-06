import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'tv',
    source: 'tmdb',
    externalId: '77053',
    title: 'The First Olympics: Athens 1896',
    year: 1984
  },
  links: [
    { target: 'event:first-modern-olympic-games', kind: 'dramatisation-of' }
  ],
  researched: '2026-10-06'
})
