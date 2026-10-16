import { definePlace } from '../../schema'

export default definePlace({
  id: 'aleppo',
  names: [
    { text: 'Aleppo', lang: 'en', role: 'primary' },
    { text: 'حلب', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-16',
  placeType: 'city',
  regions: ['mena'],
  modernCountry: 'SY',
  coords: {
    lat: 36.2319,
    lon: 37.1681,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Aleppo (ne_id 1159151267)' }
      }
    ]
  }
})
