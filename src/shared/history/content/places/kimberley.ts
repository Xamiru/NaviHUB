import { definePlace } from '../../schema'

export default definePlace({
  id: 'kimberley',
  names: [
    { text: 'Kimberley', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  placeType: 'city',
  regions: ['subsaharan-africa'],
  modernCountry: 'ZA',
  coords: {
    lat: -28.7468,
    lon: 24.77,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Kimberley (ne_id 1159148011)' }
      }
    ]
  }
})
