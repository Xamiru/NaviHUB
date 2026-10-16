import { definePlace } from '../../schema'

export default definePlace({
  id: 'palos',
  names: [
    { text: 'Palos', lang: 'en', role: 'primary' },
    { text: 'Palos de la Frontera', lang: 'es', role: 'native' }
  ],
  researched: '2026-10-16',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'ES',
  coords: {
    lat: 37.2346,
    lon: -6.8947,
    cites: [
      {
        source: 'geonames-cities500',
        loc: { section: 'Palos de la Frontera (geonameid 2512950)' }
      }
    ]
  }
})
