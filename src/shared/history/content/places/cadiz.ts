import { definePlace } from '../../schema'

export default definePlace({
  id: 'cadiz',
  names: [
    { text: 'Cádiz', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'ES',
  coords: {
    lat: 36.535,
    lon: -6.225,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Cádiz (ne_id 1159146295)' }
      }
    ]
  }
})
