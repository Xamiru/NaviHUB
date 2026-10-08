import { definePlace } from '../../schema'

export default definePlace({
  id: 'sydney',
  names: [
    { text: 'Sydney', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['oceania'],
  modernCountry: 'AU',
  coords: {
    lat: -33.9181,
    lon: 151.1832,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Sydney (ne_id 1159151623)' }
      }
    ]
  }
})
