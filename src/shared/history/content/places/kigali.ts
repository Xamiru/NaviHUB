import { definePlace } from '../../schema'

export default definePlace({
  id: 'kigali',
  names: [
    { text: 'Kigali', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-10',
  placeType: 'city',
  regions: ['subsaharan-africa'],
  modernCountry: 'RW',
  coords: {
    lat: -1.9516,
    lon: 30.0586,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Kigali (ne_id 1159149385)' }
      }
    ]
  }
})
