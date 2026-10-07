import { definePlace } from '../../schema'

export default definePlace({
  id: 'kinshasa',
  names: [
    { text: 'Kinshasa', lang: 'en', role: 'primary' },
    {
      text: 'Leopoldville',
      lang: 'en',
      role: 'former',
      cites: [
        {
          source: 'state-dept-milestones-congo-decolonization',
          loc: { section: 'The Congo, Decolonization, and the Cold War, 1960–1965', para: '4' }
        }
      ]
    }
  ],
  researched: '2026-10-07',
  placeType: 'city',
  regions: ['subsaharan-africa'],
  modernCountry: 'CD',
  coords: {
    lat: -4.3278,
    lon: 15.313,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Kinshasa (ne_id 1159151539)' }
      }
    ]
  }
})
