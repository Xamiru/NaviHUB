import { definePlace } from '../../schema'

export default definePlace({
  id: 'lausanne',
  names: [
    { text: 'Lausanne', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'CH',
  coords: {
    lat: 46.5304,
    lon: 6.65,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Lausanne (ne_id 1159135705)' }
      }
    ]
  }
})
