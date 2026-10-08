import { definePlace } from '../../schema'

export default definePlace({
  id: 'wounded-knee-creek',
  names: [
    { text: 'Wounded Knee Creek', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'site',
  regions: ['north-america'],
  coords: {
    lat: 43.4364,
    lon: -102.5457,
    cites: [
      {
        source: 'geonames-geographical-database',
        loc: { section: 'Wounded Knee Creek (geonameid 5770539)' }
      }
    ]
  },
  modernCountry: 'US'
})
