import { definePlace } from '../../schema'

export default definePlace({
  id: 'fords-theatre',
  names: [
    { text: 'Ford\'s Theatre', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'building',
  regions: ['north-america'],
  coords: {
    lat: 38.8967,
    lon: -77.0258,
    cites: [
      {
        source: 'geonames-geographical-database',
        loc: { section: 'Ford\'s Theatre National Historic Site (geonameid 4138676)' }
      }
    ]
  },
  modernCountry: 'US'
})
