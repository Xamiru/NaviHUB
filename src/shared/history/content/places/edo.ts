import { definePlace } from '../../schema'

export default definePlace({
  id: 'edo',
  names: [
    { text: 'Edo', lang: 'en', role: 'primary' },
    { text: '江戸', lang: 'ja', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['east-asia'],
  coords: {
    lat: 35.6895,
    lon: 139.6917,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Tokyo (geonameid 1850147)' } }
    ]
  },
  modernCountry: 'JP'
})
