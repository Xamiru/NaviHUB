import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '1810', title: 'Viva Zapata!', year: 1952 },
  links: [
    { target: 'event:mexican-revolution', kind: 'set-during' },
    {
      target: 'person:emiliano-zapata',
      kind: 'features-person',
      portrayals: [
        { person: 'person:emiliano-zapata' }
      ]
    }
  ],
  researched: '2026-10-06'
})
