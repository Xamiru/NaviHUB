import { definePlace } from '../../schema'

export default definePlace({
  id: 'freetown',
  names: [
    { text: 'Freetown', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['subsaharan-africa'],
  modernCountry: 'SL',
  coords: {
    lat: 8.472,
    lon: -13.2362,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Freetown (ne_id 1159150625)' }
      }
    ]
  }
})
