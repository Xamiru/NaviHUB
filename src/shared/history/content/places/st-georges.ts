import { definePlace } from '../../schema'

export default definePlace({
  id: 'st-georges',
  names: [
    { text: 'St. George\'s', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  placeType: 'city',
  regions: ['latin-america'],
  modernCountry: 'GD',
  coords: {
    lat: 12.0526,
    lon: -61.7416,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Saint George\'s (ne_id 1159150447)' }
      }
    ]
  }
})
