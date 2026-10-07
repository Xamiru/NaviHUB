import { definePlace } from '../../schema'

export default definePlace({
  id: 'montgomery',
  names: [
    { text: 'Montgomery', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  placeType: 'city',
  regions: ['north-america'],
  modernCountry: 'US',
  coords: {
    lat: 32.3616,
    lon: -86.2792,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Montgomery (ne_id 1159149275)' }
      }
    ]
  }
})
