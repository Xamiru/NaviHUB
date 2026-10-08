import { definePlace } from '../../schema'

export default definePlace({
  id: 'austerlitz',
  names: [
    { text: 'Austerlitz', lang: 'en', role: 'primary' },
    { text: 'Slavkov u Brna', lang: 'cs', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'battlefield',
  regions: ['europe'],
  coords: {
    lat: 49.1532,
    lon: 16.8765,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Slavkov u Brna (geonameid 3065824)' } }
    ]
  },
  modernCountry: 'CZ'
})
