import { definePlace } from '../../schema'

export default definePlace({
  id: 'lepanto',
  names: [
    { text: 'Lepanto', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'GR',
  coords: {
    lat: 38.3917,
    lon: 21.8275,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Náfpaktos (geonameid 256639)' } }
    ]
  }
})
