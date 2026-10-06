import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '775012',
    title: 'Lewis & Clark: The Journey of the Corps of Discovery',
    year: 1997
  },
  links: [
    { target: 'event:lewis-and-clark-expedition', kind: 'documentary-about' }
  ],
  researched: '2026-10-06'
})
