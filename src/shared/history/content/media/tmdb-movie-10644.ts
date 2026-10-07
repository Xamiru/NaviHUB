import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '10644',
    title: 'The Unbearable Lightness of Being',
    year: 1988
  },
  links: [
    { target: 'event:prague-spring', kind: 'set-during' }
  ],
  researched: '2026-10-07'
})
