import { definePlace } from '../../schema'

export default definePlace({
  id: 'orleans',
  names: [
    { text: 'Orléans', lang: 'en', role: 'primary' },
    { text: 'Orleans', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-16',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'FR',
  coords: {
    lat: 47.9004,
    lon: 1.9,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Orléans (ne_id 1159142017)' }
      }
    ]
  }
})
