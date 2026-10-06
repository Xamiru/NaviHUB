import { definePlace } from '../../schema'

export default definePlace({
  id: 'madrid',
  names: [
    { text: 'Madrid', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'ES',
  coords: {
    lat: 40.402,
    lon: -3.6853,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Madrid (ne_id 1159151503)' }
      }
    ]
  }
})
