import { definePlace } from '../../schema'

export default definePlace({
  id: 'erzurum',
  names: [
    { text: 'Erzurum', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['mena'],
  modernCountry: 'TR',
  coords: {
    lat: 39.9204,
    lon: 41.29,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Erzurum (ne_id 1159135215)' }
      }
    ]
  }
})
