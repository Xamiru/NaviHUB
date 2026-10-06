import { definePlace } from '../../schema'

export default definePlace({
  id: 'omdurman',
  names: [
    { text: 'Omdurman', lang: 'en', role: 'primary' },
    { text: 'أم درمان', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['subsaharan-africa'],
  modernCountry: 'SD',
  coords: {
    lat: 15.6167,
    lon: 32.48,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Omdurman (ne_id 1159149453)' }
      }
    ]
  }
})
