import { definePlace } from '../../schema'

export default definePlace({
  id: 'waitangi',
  names: [
    { text: 'Waitangi', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  placeType: 'site',
  regions: ['oceania'],
  modernCountry: 'NZ',
  coords: {
    lat: -44.0263,
    lon: -176.3696,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Waitangi (ne_id 1159151737)' }
      }
    ]
  }
})
