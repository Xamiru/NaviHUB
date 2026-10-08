import { definePlace } from '../../schema'

export default definePlace({
  id: 'lahaina',
  names: [
    { text: 'Lahaina', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['oceania'],
  coords: {
    lat: 20.8753,
    lon: -156.6798,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Lahaina (geonameid 5849996)' } }
    ]
  },
  modernCountry: 'US'
})
