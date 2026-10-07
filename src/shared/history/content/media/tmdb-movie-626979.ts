import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '626979', title: 'Coup 53', year: 2019 },
  links: [
    { target: 'event:1953-iranian-coup', kind: 'documentary-about' },
    { target: 'person:mohammad-mosaddegh', kind: 'features-person' }
  ],
  researched: '2026-10-07'
})
