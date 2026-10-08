import { definePlace } from '../../schema'

export default definePlace({
  id: 'ghent',
  names: [
    { text: 'Ghent', lang: 'en', role: 'primary' },
    { text: 'Gent', lang: 'nl', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['europe'],
  coords: {
    lat: 51.05,
    lon: 3.7167,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Gent (geonameid 2797656)' } }
    ]
  },
  modernCountry: 'BE'
})
