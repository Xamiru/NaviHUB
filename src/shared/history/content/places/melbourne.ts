import { definePlace } from '../../schema'

export default definePlace({
  id: 'melbourne',
  names: [
    { text: 'Melbourne', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['oceania'],
  modernCountry: 'AU',
  coords: {
    lat: -37.8181,
    lon: 144.9731,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Melbourne (ne_id 1159151565)' }
      }
    ]
  }
})
