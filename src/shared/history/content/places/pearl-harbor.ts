import { definePlace } from '../../schema'

export default definePlace({
  id: 'pearl-harbor',
  names: [
    { text: 'Pearl Harbor', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'site',
  regions: ['north-america'],
  coords: {
    lat: 21.3527,
    lon: -157.9696,
    cites: [
      {
        source: 'geonames-geographical-database',
        loc: { section: 'Pearl Harbor (geonameid 5852289)' }
      }
    ]
  },
  modernCountry: 'US'
})
