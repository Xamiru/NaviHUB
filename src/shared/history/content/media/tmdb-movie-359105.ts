import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '359105',
    title: 'Heneral Luna',
    year: 2015
  },
  links: [
    {
      target: 'event:philippine-american-war',
      kind: 'set-during',
      portrayals: [
        { person: 'person:emilio-aguinaldo' }
      ]
    }
  ],
  researched: '2026-10-06'
})
