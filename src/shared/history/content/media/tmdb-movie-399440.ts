import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '399440', title: 'Peterloo', year: 2018 },
  links: [
    { target: 'event:peterloo-massacre', kind: 'dramatisation-of' }
  ],
  researched: '2026-10-06'
})
