import { definePlace } from '../../schema'

export default definePlace({
  id: 'dallas',
  names: [
    { text: 'Dallas', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  placeType: 'city',
  regions: ['north-america'],
  modernCountry: 'US',
  coords: {
    lat: 32.822,
    lon: -96.842,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Dallas (ne_id 1159151235)' }
      }
    ]
  }
})
