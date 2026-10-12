import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '10523', title: 'W.', year: 2008 },
  links: [
    {
      target: 'person:george-w-bush',
      kind: 'features-person',
      portrayals: [
        { person: 'person:george-w-bush' }
      ]
    }
  ],
  researched: '2026-10-12'
})
