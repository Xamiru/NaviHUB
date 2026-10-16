import { definePlace } from '../../schema'

export default definePlace({
  id: 'gonaives',
  names: [
    { text: 'Gonaïves', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  placeType: 'city',
  regions: ['latin-america'],
  modernCountry: 'HT',
  coords: {
    lat: 19.4504,
    lon: -72.6832,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Gonaïves (ne_id 1159135037)' }
      }
    ]
  }
})
