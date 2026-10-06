import { definePlace } from '../../schema'

export default definePlace({
  id: 'ayacucho',
  names: [
    { text: 'Ayacucho', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  placeType: 'battlefield',
  regions: ['latin-america'],
  modernCountry: 'PE',
  coords: {
    lat: -13.175,
    lon: -74.22,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Ayacucho (ne_id 1159146413)' }
      }
    ]
  }
})
