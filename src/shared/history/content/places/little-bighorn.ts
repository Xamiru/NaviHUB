import { definePlace } from '../../schema'

export default definePlace({
  id: 'little-bighorn',
  names: [
    { text: 'Little Bighorn', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'battlefield',
  regions: ['north-america'],
  coords: {
    lat: 45.565,
    lon: -107.4286,
    cites: [
      {
        source: 'geonames-geographical-database',
        loc: { section: 'Little Bighorn Battlefield National Monument (geonameid 5662650)' }
      }
    ]
  },
  modernCountry: 'US'
})
