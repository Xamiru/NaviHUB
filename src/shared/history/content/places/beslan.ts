import { definePlace } from '../../schema'

export default definePlace({
  id: 'beslan',
  names: [
    { text: 'Beslan', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-12',
  placeType: 'city',
  regions: ['russia-central-asia'],
  modernCountry: 'RU',
  coords: {
    lat: 43.1928,
    lon: 44.5327,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Beslan (geonameid 576697)' } }
    ]
  }
})
