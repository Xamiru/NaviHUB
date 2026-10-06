import { definePlace } from '../../schema'

export default definePlace({
  id: 'edirne',
  names: [
    { text: 'Edirne', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'TR',
  coords: {
    lat: 41.6704,
    lon: 26.57,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Edirne (ne_id 1159135139)' }
      }
    ]
  }
})
