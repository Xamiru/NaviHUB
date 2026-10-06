import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'tv', source: 'tmdb', externalId: '87523', title: 'The Good Lord Bird' },
  links: [
    { target: 'event:john-browns-raid', kind: 'dramatisation-of' },
    {
      target: 'person:john-brown',
      kind: 'features-person',
      portrayals: [
        { person: 'person:john-brown' }
      ]
    }
  ],
  researched: '2026-10-06'
})
