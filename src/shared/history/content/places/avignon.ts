import { definePlace } from '../../schema'

export default definePlace({
  id: 'avignon',
  names: [
    { text: 'Avignon', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'FR',
  coords: {
    lat: 43.9483,
    lon: 4.8089,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Avignon (geonameid 3035681)' } }
    ]
  }
})
