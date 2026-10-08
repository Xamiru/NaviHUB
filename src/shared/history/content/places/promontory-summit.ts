import { definePlace } from '../../schema'

export default definePlace({
  id: 'promontory-summit',
  names: [
    { text: 'Promontory Summit', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'site',
  regions: ['north-america'],
  coords: {
    lat: 41.6185,
    lon: -112.5483,
    cites: [
      {
        source: 'geonames-geographical-database',
        loc: { section: 'Promontory Summit (geonameid 5780012)' }
      }
    ]
  },
  modernCountry: 'US'
})
