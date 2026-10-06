import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '185987', title: 'Black Rain', year: 1989 },
  links: [
    { target: 'event:atomic-bombings-of-hiroshima-and-nagasaki', kind: 'inspired-by' }
  ],
  researched: '2026-10-06'
})
