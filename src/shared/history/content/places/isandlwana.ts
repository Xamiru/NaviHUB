import { definePlace } from '../../schema'

export default definePlace({
  id: 'isandlwana',
  names: [
    { text: 'Isandlwana', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'battlefield',
  regions: ['subsaharan-africa'],
  coords: {
    lat: -28.3587,
    lon: 30.6513,
    cites: [
      {
        source: 'geonames-geographical-database',
        loc: { section: 'Isandlwana (geonameid 994530)' }
      }
    ]
  },
  modernCountry: 'ZA'
})
