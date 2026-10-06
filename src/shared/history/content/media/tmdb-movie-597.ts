import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '597', title: 'Titanic', year: 1997 },
  links: [
    { target: 'event:sinking-of-the-titanic', kind: 'dramatisation-of' }
  ],
  researched: '2026-10-06'
})
