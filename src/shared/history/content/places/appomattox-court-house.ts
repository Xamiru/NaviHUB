import { definePlace } from '../../schema'

export default definePlace({
  id: 'appomattox-court-house',
  names: [
    { text: 'Appomattox Court House', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'site',
  regions: ['north-america'],
  coords: {
    lat: 37.3571,
    lon: -78.8253,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Appomattox (geonameid 4744609)' } }
    ]
  },
  modernCountry: 'US'
})
