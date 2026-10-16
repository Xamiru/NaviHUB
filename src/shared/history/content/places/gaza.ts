import { definePlace } from '../../schema'

export default definePlace({
  id: 'gaza',
  names: [
    { text: 'Gaza', lang: 'en', role: 'primary' },
    { text: 'غزة', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-16',
  placeType: 'city',
  regions: ['mena'],
  modernCountry: 'PS',
  coords: {
    lat: 31.53,
    lon: 34.445,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Gaza City (ne_id 1159150445)' }
      }
    ]
  }
})
