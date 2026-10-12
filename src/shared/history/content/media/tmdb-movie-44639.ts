import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '44639', title: 'Inside Job', year: 2010 },
  links: [
    { target: 'event:2008-financial-crisis', kind: 'documentary-about' }
  ],
  researched: '2026-10-12'
})
