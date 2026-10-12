import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '9829', title: 'United 93', year: 2006 },
  links: [
    { target: 'event:september-11-attacks', kind: 'dramatisation-of' }
  ],
  researched: '2026-10-12'
})
