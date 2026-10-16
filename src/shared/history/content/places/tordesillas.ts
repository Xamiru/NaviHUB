import { definePlace } from '../../schema'

export default definePlace({
  id: 'tordesillas',
  names: [
    { text: 'Tordesillas', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'ES',
  coords: {
    lat: 41.502,
    lon: -5.0015,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Tordesillas (geonameid 3107952)' } }
    ]
  }
})
