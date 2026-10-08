import { definePlace } from '../../schema'

export default definePlace({
  id: 'friedrichsruh',
  names: [
    { text: 'Friedrichsruh', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['europe'],
  coords: {
    lat: 53.5293,
    lon: 10.3403,
    cites: [
      {
        source: 'geonames-geographical-database',
        loc: { section: 'Friedrichsruh (geonameid 2924486)' }
      }
    ]
  },
  modernCountry: 'DE'
})
