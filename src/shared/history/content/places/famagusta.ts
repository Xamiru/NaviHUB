import { definePlace } from '../../schema'

export default definePlace({
  id: 'famagusta',
  names: [
    { text: 'Famagusta', lang: 'en', role: 'primary' },
    { text: 'Αμμόχωστος', lang: 'el', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['europe'],
  coords: {
    lat: 35.1249,
    lon: 33.9413,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Famagusta (geonameid 146617)' } }
    ]
  },
  modernCountry: 'CY'
})
