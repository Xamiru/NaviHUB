import { definePlace } from '../../schema'

export default definePlace({
  id: 'havana',
  names: [
    { text: 'Havana', lang: 'en', role: 'primary' },
    { text: 'La Habana', lang: 'es', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['latin-america'],
  modernCountry: 'CU',
  coords: {
    lat: 23.1339,
    lon: -82.3661,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Havana (ne_id 1159151347)' }
      }
    ]
  }
})
