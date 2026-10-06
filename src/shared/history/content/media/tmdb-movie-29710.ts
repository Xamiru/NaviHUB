import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '29710', title: 'Khartoum', year: 1966 },
  links: [
    { target: 'event:siege-of-khartoum', kind: 'dramatisation-of' },
    {
      target: 'person:charles-gordon',
      kind: 'features-person',
      portrayals: [
        { person: 'person:charles-gordon' }
      ]
    },
    {
      target: 'person:muhammad-ahmad-al-mahdi',
      kind: 'features-person',
      portrayals: [
        { person: 'person:muhammad-ahmad-al-mahdi' }
      ]
    },
    {
      target: 'person:william-gladstone',
      kind: 'features-person',
      portrayals: [
        { person: 'person:william-gladstone' }
      ]
    }
  ],
  researched: '2026-10-06'
})
