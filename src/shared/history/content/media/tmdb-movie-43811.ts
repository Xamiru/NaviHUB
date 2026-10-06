import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '43811',
    title: 'Edison, the Man',
    year: 1940
  },
  links: [
    {
      target: 'person:thomas-edison',
      kind: 'features-person',
      portrayals: [
        { person: 'person:thomas-edison' }
      ]
    },
    { target: 'event:edisons-incandescent-lamp', kind: 'dramatisation-of' }
  ],
  researched: '2026-10-06'
})
