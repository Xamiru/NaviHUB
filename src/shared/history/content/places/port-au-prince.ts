import { definePlace } from '../../schema'

export default definePlace({
  id: 'port-au-prince',
  names: [
    { text: 'Port-au-Prince', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  placeType: 'city',
  regions: ['latin-america'],
  modernCountry: 'HT',
  coords: {
    lat: 18.543,
    lon: -72.338,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Port-au-Prince (ne_id 1159150589)' }
      }
    ]
  }
})
