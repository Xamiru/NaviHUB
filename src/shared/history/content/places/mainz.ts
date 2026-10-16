import { definePlace } from '../../schema'

export default definePlace({
  id: 'mainz',
  names: [
    { text: 'Mainz', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'DE',
  coords: {
    lat: 49.9825,
    lon: 8.2732,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Mainz (ne_id 1159122449)' }
      }
    ]
  }
})
