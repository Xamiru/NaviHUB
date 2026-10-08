import { definePlace } from '../../schema'

export default definePlace({
  id: 'fort-sumter',
  names: [
    { text: 'Fort Sumter', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'site',
  regions: ['north-america'],
  coords: {
    lat: 32.7536,
    lon: -79.8793,
    cites: [
      {
        source: 'geonames-geographical-database',
        loc: { section: 'Fort Sumter National Monument (geonameid 4579000)' }
      }
    ]
  },
  modernCountry: 'US'
})
