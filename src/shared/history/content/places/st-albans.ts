import { definePlace } from '../../schema'

export default definePlace({
  id: 'st-albans',
  names: [
    { text: 'St Albans', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'GB',
  coords: {
    lat: 51.75,
    lon: -0.3333,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'St Albans (geonameid 2638867)' } }
    ]
  }
})
