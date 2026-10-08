import { definePlace } from '../../schema'

export default definePlace({
  id: 'honolulu',
  names: [
    { text: 'Honolulu', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['oceania'],
  modernCountry: 'US',
  coords: {
    lat: 21.3088,
    lon: -157.8599,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Honolulu (ne_id 1159151221)' }
      }
    ]
  }
})
