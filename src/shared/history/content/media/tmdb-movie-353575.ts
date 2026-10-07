import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '353575', title: 'LBJ', year: 2016 },
  links: [
    {
      target: 'person:lyndon-b-johnson',
      kind: 'features-person',
      portrayals: [
        { person: 'person:lyndon-b-johnson' }
      ]
    }
  ],
  researched: '2026-10-07'
})
