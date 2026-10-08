import { definePlace } from '../../schema'

export default definePlace({
  id: 'san-stefano',
  names: [
    { text: 'San Stefano', lang: 'en', role: 'primary' },
    { text: 'Yeşilköy', lang: 'tr', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'site',
  regions: ['europe'],
  coords: {
    lat: 36.6745,
    lon: 35.4926,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Yeşilköy (geonameid 296848)' } }
    ]
  },
  modernCountry: 'TR'
})
