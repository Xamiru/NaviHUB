import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '41614', title: 'Jinnah', year: 1998 },
  links: [
    {
      target: 'person:muhammad-ali-jinnah',
      kind: 'features-person',
      portrayals: [
        { person: 'person:muhammad-ali-jinnah' }
      ]
    },
    { target: 'event:partition-of-india', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
