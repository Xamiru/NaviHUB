import { definePlace } from '../../schema'

export default definePlace({
  id: 'genoa',
  names: [
    { text: 'Genoa', lang: 'en', role: 'primary' },
    { text: 'Genova', lang: 'it', role: 'native' }
  ],
  researched: '2026-10-16',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'IT',
  coords: {
    lat: 44.41,
    lon: 8.93,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Genoa (ne_id 1159148297)' }
      }
    ]
  }
})
