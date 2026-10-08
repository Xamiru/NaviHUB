import { definePlace } from '../../schema'

export default definePlace({
  id: 'owerri',
  names: [
    { text: 'Owerri', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['subsaharan-africa'],
  modernCountry: 'NG',
  coords: {
    lat: 5.493,
    lon: 7.026,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Owerri (ne_id 1159116695)' }
      }
    ]
  }
})
