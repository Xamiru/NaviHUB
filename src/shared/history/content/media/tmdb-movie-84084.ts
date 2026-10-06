import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '84084', title: 'Wilson', year: 1944 },
  links: [
    {
      target: 'person:woodrow-wilson',
      kind: 'features-person',
      portrayals: [
        { person: 'person:woodrow-wilson' }
      ]
    },
    { target: 'event:paris-peace-conference', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
