import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '76349', title: '1911', year: 2011 },
  links: [
    { target: 'event:xinhai-revolution', kind: 'dramatisation-of' },
    {
      target: 'person:sun-yat-sen',
      kind: 'features-person',
      portrayals: [
        { person: 'person:sun-yat-sen' }
      ]
    }
  ],
  researched: '2026-10-06'
})
