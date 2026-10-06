import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '11831', title: 'Amistad', year: 1997 },
  links: [
    { target: 'event:amistad-case', kind: 'dramatisation-of' }
  ],
  researched: '2026-10-06'
})
