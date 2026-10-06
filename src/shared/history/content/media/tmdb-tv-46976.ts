import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'tv',
    source: 'tmdb',
    externalId: '46976',
    title: 'Hitler: The Rise of Evil',
    year: 2003
  },
  links: [
    { target: 'event:nazi-seizure-of-power', kind: 'dramatisation-of' },
    {
      target: 'person:adolf-hitler',
      kind: 'features-person',
      portrayals: [
        { person: 'person:adolf-hitler' }
      ]
    }
  ],
  researched: '2026-10-06'
})
