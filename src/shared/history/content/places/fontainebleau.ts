import { definePlace } from '../../schema'

export default definePlace({
  id: 'fontainebleau',
  names: [
    { text: 'Fontainebleau', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'FR',
  coords: {
    lat: 48.4091,
    lon: 2.7018,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Fontainebleau (geonameid 3018074)' } }
    ]
  }
})
