import { definePlace } from '../../schema'

export default definePlace({
  id: 'dandi',
  names: [
    { text: 'Dandi', lang: 'en', role: 'primary' },
    { text: 'દાંડી', lang: 'gu', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['south-asia'],
  coords: {
    lat: 19.7982,
    lon: 72.7651,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Dandi (geonameid 13353653)' } }
    ]
  },
  modernCountry: 'IN'
})
